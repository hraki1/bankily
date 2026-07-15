import Image from "next/image";
import Link from "next/link";
import BankilyLogo from "@/components/common/BankilyLogo";

// The Bankily splash "screen": full-bleed photo + overlays + logo, slogan,
// BPM emblem and the Log in / Sign up bar. Fills whatever container it's in,
// so it works both full-screen (mobile) and inside a phone mockup (desktop).
export default function PhoneSplash() {
  return (
    <div
      dir="ltr"
      className="relative flex h-full w-full flex-col overflow-hidden bg-white"
    >
      {/* ── Full-bleed background photo ── */}
      <Image
        src="/bg.png"
        alt=""
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 320px"
        className="object-cover object-center translate-y-8"
      />

      {/* top → down scrim (lifts the logo) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-white via-white/80 to-transparent" />
      {/* down → top scrim (grounds the emblem + cards) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-white via-white/85 to-transparent" />
      {/* faint all-over veil so text stays crisp without flattening the photo */}
      <div className="pointer-events-none absolute inset-0 bg-white/15" />

      {/* ── Foreground content ── */}
      <div className="relative z-10 flex flex-1 flex-col">
        <header className="flex justify-center px-6 pt-9">
          <BankilyLogo className="h-auto w-65 drop-shadow-sm" />
        </header>

        <div className="flex-2" />

        <p
          dir="rtl"
          className="pt-12 px-8 text-center font-arabic text-5xl font-extrabold leading-tight"
          style={{
            textShadow: "0 1px 12px rgba(255,255,255,0.9)",
          }}
        >
          <span className="text-[#1ba7bd]">بنكي</span>{" "}
          <span className="text-[#c9a24b]">فيدي !</span>
        </p>

        <div className="flex py-3 flex-col justify-center pb-4">
          <div className="flex flex-col items-center gap-1.5 text-center">
            <Image
              src="/bpm.png"
              alt="البنك الشعبي الموريتاني — BANQUE POPULAIRE DE MAURITANIE"
              width={352}
              height={141}
              priority
              className="h-auto w-64 drop-shadow-sm"
            />
          </div>
        </div>

        <footer className="space-y-3.5 px-4 pb-25">
          {/* ── Smart watch offer ── */}
          <Link
            href="/login"
            dir="rtl"
            className="group relative flex animate-attention-pop items-center gap-3.5 overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#29b6c4]/40 hover:shadow-[0_22px_44px_-18px_rgba(41,182,196,0.6)] active:translate-y-0"
          >
            {/* attention shine sweep */}
            <div className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-card-shine bg-linear-to-r from-transparent via-white/70 to-transparent" />
            {/* hover wash */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-l from-[#29b6c4]/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* icon tile */}
            <div className="relative flex size-14 shrink-0 animate-masrvi-float-soft items-center justify-center rounded-2xl bg-linear-to-br from-[#2fc0d1] to-[#1b8f9e] text-white shadow-lg shadow-[#29b6c4]/40 ring-1 ring-white/40 transition-transform duration-300 group-hover:scale-105">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="6" />
                <path d="M9 4l1-2h4l1 2M9 20l1 2h4l1-2" />
              </svg>
            </div>

            {/* text */}
            <div className="relative flex-1">
              <div className="font-arabic text-[15px] font-bold text-[#0f3d68]">
                الحصول على ساعة ذكية
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="font-arabic text-xs text-slate-400">
                  ساعة ذكية فاخرة
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-arabic text-[10px] font-bold text-emerald-600">
                  مجاناً
                </span>
              </div>
            </div>

            {/* chevron */}
            <div className="relative flex size-9 shrink-0 animate-nudge-x items-center justify-center rounded-full bg-slate-100 text-[#1ba7bd] transition-all duration-300 group-hover:bg-[#29b6c4] group-hover:text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </div>
          </Link>

          {/* ── Visa card offer ── */}
          <Link
            href="/login"
            dir="rtl"
            style={{ animationDelay: "1.8s" }}
            className="group relative flex animate-attention-pop items-center gap-3.5 overflow-hidden rounded-3xl border border-white/80 bg-white/95 p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#29b6c4]/40 hover:shadow-[0_22px_44px_-18px_rgba(41,182,196,0.6)] active:translate-y-0"
          >
            {/* attention shine sweep */}
            <div
              style={{ animationDelay: "1.8s" }}
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 animate-card-shine bg-linear-to-r from-transparent via-white/70 to-transparent"
            />
            {/* hover wash */}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-l from-[#29b6c4]/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* icon tile */}
            <div
              style={{ animationDelay: "1.5s" }}
              className="relative flex size-14 shrink-0 animate-masrvi-float-soft items-center justify-center rounded-2xl bg-linear-to-br from-[#2fc0d1] to-[#1b8f9e] text-white shadow-lg shadow-[#29b6c4]/40 ring-1 ring-white/40 transition-transform duration-300 group-hover:scale-105"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="6" width="20" height="13" rx="2" />
                <line x1="2" y1="11" x2="22" y2="11" />
              </svg>
            </div>

            {/* text */}
            <div className="relative flex-1">
              <div className="font-arabic text-[15px] font-bold text-[#0f3d68]">
                إصدار بطاقة فيزا
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="font-arabic text-xs text-slate-400">
                  بأعلى المميزات
                </span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-arabic text-[10px] font-bold text-emerald-600">
                  مجانية
                </span>
              </div>
            </div>

            {/* chevron */}
            <div
              style={{ animationDelay: "0.8s" }}
              className="relative flex size-9 shrink-0 animate-nudge-x items-center justify-center rounded-full bg-slate-100 text-[#1ba7bd] transition-all duration-300 group-hover:bg-[#29b6c4] group-hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </div>
          </Link>
        </footer>
      </div>
    </div>
  );
}
