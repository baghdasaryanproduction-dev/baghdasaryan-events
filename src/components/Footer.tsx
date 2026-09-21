import Link from "next/link";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionary";

export function Footer({ locale = "hy" as Locale }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-stone/60">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg text-ink">Baghdasaryan Production</p>
            <p className="mt-2 max-w-[32ch] text-sm text-char">
              {locale === "hy"
                ? "Միջոցառումների պրոֆեսիոնալ կազմակերպում Հայաստանում։"
                : "Professional event organization in Armenia."}
            </p>
          </div>

          <div className="text-sm text-char">
            <p className="mb-2 text-ink">{locale === "hy" ? "Կապ" : "Contact"}</p>
            <p>+374 33 033 087</p>
            <p>baghdasaryanproduction@gmail.com</p>
          </div>

          <div className="text-sm text-char">
            <p className="mb-2 text-ink">{locale === "hy" ? "Ընկերություն" : "Company"}</p>
            <nav className="flex flex-col gap-1">
              <Link href="/about">{locale === "hy" ? "Մեր մասին" : "About"}</Link>
              <Link href="/privacy">{locale === "hy" ? "Գաղտնիություն" : "Privacy Policy"}</Link>
              <Link href="/terms">{locale === "hy" ? "Պայմաններ" : "Terms"}</Link>
            </nav>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-xs text-char/70">
          © {year} Baghdasaryan Production. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
