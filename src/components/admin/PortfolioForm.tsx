"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface InitialPortfolio {
  id?: string;
  slug: string;
  event_type: string;
  location?: string;
  event_date?: string;
  title: { hy?: string; en?: string };
  short_description: { hy?: string; en?: string };
  full_description: { hy?: string; en?: string };
  cover_image_url?: string;
  video_url?: string;
  is_featured: boolean;
  status: "draft" | "published";
}

const EMPTY: InitialPortfolio = {
  slug: "",
  event_type: "wedding",
  location: "",
  event_date: "",
  title: { hy: "", en: "" },
  short_description: { hy: "", en: "" },
  full_description: { hy: "", en: "" },
  cover_image_url: "",
  video_url: "",
  is_featured: false,
  status: "draft",
};

const EVENT_TYPES = ["wedding", "destination_wedding", "baptism", "birthday", "engagement", "proposal", "gender_reveal", "corporate", "private", "other"];

export function PortfolioForm({ initial }: { initial?: InitialPortfolio }) {
  const router = useRouter();
  const isEdit = !!initial?.id;
  const [form, setForm] = useState<InitialPortfolio>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof InitialPortfolio>(key: K, value: InitialPortfolio[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateLocalized(field: "title" | "short_description" | "full_description", lang: "hy" | "en", value: string) {
    setForm((f) => ({ ...f, [field]: { ...f[field], [lang]: value } }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    if (!form.slug.trim()) {
      setError("Slug is required.");
      setSaving(false);
      return;
    }

    const supabase = createClient();
    const payload = {
      slug: form.slug.trim(),
      event_type: form.event_type,
      location: form.location || null,
      event_date: form.event_date || null,
      title: form.title,
      short_description: form.short_description,
      full_description: form.full_description,
      cover_image_url: form.cover_image_url || null,
      video_url: form.video_url || null,
      is_featured: form.is_featured,
      status: form.status,
      updated_at: new Date().toISOString(),
    };

    const { error } = isEdit
      ? await supabase.from("portfolio_items").update(payload).eq("id", initial!.id)
      : await supabase.from("portfolio_items").insert(payload);

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/portfolio");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (!confirm("Delete this portfolio item? This cannot be undone.")) return;
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("portfolio_items").delete().eq("id", initial.id);
    setDeleting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/portfolio");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FieldWrap label="Slug (URL) *">
          <input value={form.slug} onChange={(e) => update("slug", e.target.value)} className={inputClass} required />
        </FieldWrap>
        <FieldWrap label="Event type">
          <select value={form.event_type} onChange={(e) => update("event_type", e.target.value)} className={inputClass}>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </FieldWrap>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FieldWrap label="Location">
          <input value={form.location ?? ""} onChange={(e) => update("location", e.target.value)} className={inputClass} />
        </FieldWrap>
        <FieldWrap label="Event date">
          <input type="date" value={form.event_date ?? ""} onChange={(e) => update("event_date", e.target.value)} className={inputClass} />
        </FieldWrap>
      </div>

      <LocalizedPair label="Title" hy={form.title.hy ?? ""} en={form.title.en ?? ""} onChange={(l, v) => updateLocalized("title", l, v)} />
      <LocalizedPair
        label="Short description"
        hy={form.short_description.hy ?? ""}
        en={form.short_description.en ?? ""}
        onChange={(l, v) => updateLocalized("short_description", l, v)}
        textarea
      />
      <LocalizedPair
        label="Full description"
        hy={form.full_description.hy ?? ""}
        en={form.full_description.en ?? ""}
        onChange={(l, v) => updateLocalized("full_description", l, v)}
        textarea
        rows={6}
      />

      <FieldWrap label="Cover image URL (until Media Library upload is built)">
        <input value={form.cover_image_url ?? ""} onChange={(e) => update("cover_image_url", e.target.value)} className={inputClass} />
      </FieldWrap>
      <FieldWrap label="Video URL (optional)">
        <input value={form.video_url ?? ""} onChange={(e) => update("video_url", e.target.value)} className={inputClass} />
      </FieldWrap>

      <div className="grid grid-cols-2 gap-4">
        <FieldWrap label="Status">
          <select value={form.status} onChange={(e) => update("status", e.target.value as "draft" | "published")} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </FieldWrap>
        <label className="flex items-center gap-2 self-end pb-2 text-sm text-slate-700">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => update("is_featured", e.target.checked)} />
          Featured
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50">
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create item"}
        </button>
        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-md border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}

function FieldWrap({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}

function LocalizedPair({
  label,
  hy,
  en,
  onChange,
  textarea,
  rows = 3,
}: {
  label: string;
  hy: string;
  en: string;
  onChange: (lang: "hy" | "en", value: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-500">{label}</label>
      <div className="grid grid-cols-2 gap-3">
        <Tag rows={textarea ? rows : undefined} value={hy} onChange={(e) => onChange("hy", e.target.value)} placeholder="Հայերեն" className={inputClass} />
        <Tag rows={textarea ? rows : undefined} value={en} onChange={(e) => onChange("en", e.target.value)} placeholder="English" className={inputClass} />
      </div>
    </div>
  );
}

const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500";
