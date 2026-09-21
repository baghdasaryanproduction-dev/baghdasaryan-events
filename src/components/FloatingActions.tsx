import Link from "next/link";

/**
 * Discreet floating actions for mobile — call, WhatsApp, consultation.
 * WhatsApp link only renders once a real number is confirmed (avoid
 * inventing one) — wire whatsappNumber from site_settings once supplied.
 */
export function FloatingActions({ phone = "+37433033087", whatsappNumber }: { phone?: string; whatsappNumber?: string }) {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col gap-2 sm:hidden">
      <Link
        href={`tel:${phone}`}
        aria-label="Call"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper shadow-lg"
      >
        ☎
      </Link>
      {whatsappNumber && (
        <Link
          href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
          aria-label="WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
        >
          ✆
        </Link>
      )}
    </div>
  );
}
