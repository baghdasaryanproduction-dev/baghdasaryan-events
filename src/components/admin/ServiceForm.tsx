"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface InitialService {
  id?: string;
  slug: string;
  category_slug?: string;
  title: { hy?: string; en?: string };
  short_description: { hy?: string; en?: string };
  full_description: { hy?: string; en?: string };
  inclusions: { hy?: string; en?: string }[];
  cover_image_url?: string;
  status: "draft" | "published";
  sort_order: number;
}

const EMPTY: InitialService = {
  slug: "",
  category_slug: "",
  title: { hy: "", en: "" },
  short_description: { hy: "", en: "" },
  full_description: { hy: "", en: "" },
  inclusions: [],
  cover_image_url: "",
  status: "draft",
  sort_order: 0,
};

export function ServiceForm({ initial }: { initial?: InitialService }) {
  const router = useRouter();
  const isEdit = !!initial?.id;
  const [form, setForm] = useState<InitialService>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof InitialService>(key: K, value: InitialService[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateLocalized(field: "title" | "short_description" | "full_description", lang: "hy" | "en", value: string) {
    setForm((f) => ({ ...f, [field]: { ...f[field], [lang]: value } }));
  }

  function addInclusion() {
    setForm((f) => ({ ...f, inclusions: [...f.inclusions, { hy: "", en: "" }] }));
  }

  function updateInclusion(index: number, lang: "hy" | "en", value: string) {
    setForm((f) => {
      const next = [...f.inclusions];
      next[index] = { ...next[index], [lang]: value };
      return { ...f, inclusions: next };
    });
  }

  function removeInclusion(index: number) {
    setForm((f) => ({ ...f, inclusions: f.inclusions.filter((_, i) => i !== index) }));
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
      category_slug: form.category_slug || null,
      title: form.title,
      short_description: form.short_description,
      full_description: form.full_description,
      inclusions: form.inclusions,
      cover_image_url: form.cover_image_url || null,
      status: form.status,
      sort_order: form.sort_order,
      updated_at: new Date().toISOString(),
    };

    const { error } = isEdit
      ? await supabase.from("services").update(payload).eq("id", initial!.id)
      : await supabase.from("services").insert(payload);

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/services");
    router.refresh();
  }

  async function handleDelete() {
    if (!initial?.id) return;
    if (!confirm("Delete this service? This cannot be undone.")) return;
    setDeleting(true);
    const supabase = createClient();
    const { error } = await supabase.from("services").delete().eq("id", initial.id);
    setDeleting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/services");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FieldWrap label="Slug (URL) *">
          <input
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="weddings"
            className={inputClass}
            required
          />
        </FieldWrap>
        <FieldWrap label="Category slug">
          <input
            value={form.category_slug ?? ""}
            onChange={(e) => update("category_slug", e.target.value)}
            placeholder="weddings / celebrations / corporate / production"
            className={inputClass}
          />
        </FieldWrap>
      </div>

      <LocalizedPair
        label="Title"
        hy={form.title.hy ?? ""}
        en={form.title.en ?? ""}
        onChange={(lang, v) => updateLocalized("title", lang, v)}
      />
      <LocalizedPair
        label="Short description"
        hy={form.short_description.hy ?? ""}
        en={form.short_description.en ?? ""}
        onChange={(lang, v) => updateLocalized("short_description", lang, v)}
        textarea
      />
      <LocalizedPair
        label="Full description"
        hy={form.full_description.hy ?? ""}
        en={form.full_description.en ?? ""}
        onChange={(lang, v) => updateLocalized("full_description", lang, v)}
        textarea
        rows={6}
      />

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-medium text-slate-500">Inclusions</label>
          <button type="button" onClick={addInclusion} className="text-xs text-slate-600 underline">
            + Add
          </button>
        </div>
        <div className="space-y-2">
          {form.inclusions.map((inc, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={inc.hy ?? ""}
                onChange={(e) => updateInclusion(i, "hy", e.target.value)}
                placeholder="Armenian"
                className={inputClass}
              />
              <input
                value={inc.en ?? ""}
                onChange={(e) => updateInclusion(i, "en", e.target.value)}
                placeholder="English"
                className={inputClass}
              />
              <button type="button" onClick={() => removeInclusion(i)} className="px-2 text-slate-400 hover:text-red-600">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <FieldWrap label="Cover image URL (until Media Library upload is built)">
        <input
          value={form.cover_image_url ?? ""}
          onChange={(e) => update("cover_image_url", e.target.value)}
          placeholder="https://…supabase.co/storage/v1/object/public/media/…"
          className={inputClass}
        />
      </FieldWrap>

      <div className="grid grid-cols-2 gap-4">
        <FieldWrap label="Status">
          <select value={form.status} onChange={(e) => update("status", e.target.value as "draft" | "published")} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </FieldWrap>
        <FieldWrap label="Sort order">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => update("sort_order", Number(e.target.value))}
            className={inputClass}
          />
        </FieldWrap>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50">
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create service"}
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
        <Tag
          rows={textarea ? rows : undefined}
          value={hy}
          onChange={(e) => onChange("hy", e.target.value)}
          placeholder="Հայերեն"
          className={inputClass}
        />
        <Tag
          rows={textarea ? rows : undefined}
          value={en}
          onChange={(e) => onChange("en", e.target.value)}
          placeholder="English"
          className={inputClass}
        />
      </div>
    </div>
  );
}

const inputClass = "w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500";
