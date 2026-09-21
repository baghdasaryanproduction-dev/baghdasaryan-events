import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createServiceRoleClient } from "@/lib/supabase/server";

/**
 * POST /api/leads
 * Public endpoint the consultation form submits to. Runs entirely
 * server-side so the service-role key never reaches the browser.
 *
 * Order of operations, matching MASTER PROMPT §30:
 * 1. Validate + sanitize with zod
 * 2. Reject bots (honeypot)
 * 3. Rate limit by IP
 * 4. Insert into `leads` via service-role client (bypasses RLS
 *    intentionally — leads are never readable by anon clients, see
 *    supabase/schema.sql policies)
 */

const leadSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  event_type: z.string().trim().min(1).max(60),
  event_location: z.string().trim().min(2).max(200),
  guest_count: z.coerce.number().int().min(1).max(20000),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(30),
  budget_range: z.string().trim().min(1).max(60),
  additional_information: z.string().trim().max(4000).optional().default(""),
  privacy_consent: z.boolean().refine((v) => v === true, "consent_required"),
  source: z.string().trim().max(100).optional().default("website"),
  website: z.string().max(0).optional().default(""), // honeypot: must be empty
});

// Simple in-memory rate limit — fine for a single Vercel instance during
// early traffic; swap for Upstash/Redis if traffic grows across regions.
const submissions = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissions.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation_failed", details: parsed.error.flatten() }, { status: 400 });
  }

  const { website, ...lead } = parsed.data;
  if (website) {
    // Honeypot tripped — pretend success so bots don't learn to adapt.
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("leads").insert({
      full_name: lead.full_name,
      event_type: lead.event_type,
      event_location: lead.event_location,
      guest_count: lead.guest_count,
      email: lead.email,
      phone: lead.phone,
      budget_range: lead.budget_range,
      additional_information: lead.additional_information || null,
      privacy_consent: lead.privacy_consent,
      source: lead.source,
      status: "new",
    });

    if (error) {
      console.error("lead_insert_failed", error);
      return NextResponse.json({ error: "database_error" }, { status: 500 });
    }

    // Optional: notify the team by email. Wire up Resend (or similar) once
    // RESEND_API_KEY is set — kept out of the critical path so a failed
    // email never blocks the database save.
    if (process.env.RESEND_API_KEY) {
      notifyTeam(lead).catch((e) => console.error("lead_notification_failed", e));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("lead_submission_error", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

async function notifyTeam(lead: Record<string, unknown>) {
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "leads@baghdasaryanevents.com",
      to: process.env.LEAD_NOTIFICATION_EMAIL,
      subject: `New consultation request — ${lead.full_name}`,
      text: JSON.stringify(lead, null, 2),
    }),
  });
}
