"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { CredentialsService } from "@/services/auth.service";
import BankilyLogo from "@/components/common/BankilyLogo";

const LENGTH = 4;
const RESEND_SECONDS = 240; // 4 minutes before a new OTP can be requested

function OtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") ?? "";
  const secretCode = searchParams.get("secretCode") ?? "";

  const [digits, setDigits] = useState<string[]>(() => Array(LENGTH).fill(""));

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const verify = useMutation({
    mutationFn: CredentialsService.sendOTPWithCredentials,
  });

  const resend = useMutation({
    mutationFn: CredentialsService.sendCredentials,
  });

  // Countdown before the user can request a new OTP.
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [secondsLeft]);

  const onResend = () => {
    if (secondsLeft > 0 || resend.isPending) return;
    resend.mutate(
      { phone, codeSecret: secretCode },
      { onSuccess: () => setSecondsLeft(RESEND_SECONDS) },
    );
  };

  const mm = Math.floor(secondsLeft / 60);
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const otpCode = digits.join("");
  const canSubmit = /^\d{4}$/.test(otpCode);

  const focusBox = (i: number) => {
    inputsRef.current[Math.max(0, Math.min(LENGTH - 1, i))]?.focus();
  };

  const setDigit = (i: number, value: string) => {
    setDigits((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  };

  const onChange = (i: number, raw: string) => {
    const value = raw.replace(/\D/g, "");
    if (!value) {
      setDigit(i, "");
      return;
    }
    // Take the last typed digit so overwriting a filled box works.
    setDigit(i, value.slice(-1));
    if (i < LENGTH - 1) focusBox(i + 1);
  };

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[i]) {
        setDigit(i, "");
      } else if (i > 0) {
        focusBox(i - 1);
        setDigit(i - 1, "");
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      focusBox(i - 1);
    } else if (e.key === "ArrowRight" && i < LENGTH - 1) {
      focusBox(i + 1);
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, LENGTH);
    if (!pasted) return;
    const next = Array(LENGTH).fill("");
    for (let j = 0; j < pasted.length; j++) next[j] = pasted[j];
    setDigits(next);
    focusBox(Math.min(pasted.length, LENGTH - 1));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit || verify.isPending) return;

    verify.mutate(
      { phone, secretCode, otpCode },
      {
        onSuccess: () => {
          // TODO: route to the authenticated area once it exists.
          router.push("/");
        },
        onError: () => {
          setDigits(Array(LENGTH).fill(""));
          focusBox(0);
        },
      },
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col">
      <p className="mb-8 px-2 text-center text-sm text-[#737373]">
        الرجاء إدخال الرمز المكوّن من 4 أرقام المُرسل إلى ‪+222‬ {phone}
      </p>

      {/* 4 underline digit boxes */}
      <div className="mb-12 flex justify-center gap-4" dir="ltr">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            inputMode="numeric"
            maxLength={1}
            type="tel"
            autoFocus={i === 0}
            value={digit}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={onPaste}
            onFocus={(e) => e.target.select()}
            className="h-11 w-11 border-b-2 border-slate-400 bg-transparent text-center text-2xl font-semibold text-slate-700 caret-[#1cb4cd] outline-none transition-colors focus:border-[#1cb4cd]"
          />
        ))}
      </div>

      {verify.isError ? (
        <p className="mb-4 text-center text-sm text-red-500">
          رمز غير صحيح. حاول مرة أخرى.
        </p>
      ) : null}

      <div className="mb-2 text-center">
        <button
          type="button"
          onClick={onResend}
          disabled={secondsLeft > 0 || resend.isPending}
          className={`text-sm font-semibold transition ${
            secondsLeft > 0 || resend.isPending
              ? "cursor-not-allowed text-slate-400"
              : "text-[#1cb4cd] hover:text-[#189fb6]"
          }`}
        >
          {resend.isPending
            ? "جاري الإرسال…"
            : secondsLeft > 0
              ? `إعادة إرسال الرمز خلال ${mm}:${ss}`
              : "إعادة إرسال الرمز"}
        </button>
      </div>


      <button
        type="submit"
        disabled={!canSubmit || verify.isPending}
        className={`w-full mt-5 rounded-xl py-4 text-lg font-bold tracking-wide text-white transition ${
          canSubmit && !verify.isPending
            ? "bg-[#1cb4cd] hover:bg-[#189fb6] active:brightness-95"
            : "cursor-not-allowed bg-[#1cb4cd]/40"
        }`}
      >
        {verify.isPending ? "جاري التحقق…" : "تحقق"}
      </button>

      <div className="flex-1" />
    </form>
  );
}

export default function OtpPage() {
  return (
    <div
      dir="rtl"
      className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-white font-arabic"
    >
      {/* ── Cyan header ── */}
      {/* <header className="flex items-center justify-center bg-[#1cb4cd] py-3.5">
        <h1 className="text-lg font-bold tracking-wide text-white">
          Vérification
        </h1>
      </header> */}

      {/* ── Body ── */}
      <div className="flex flex-1 flex-col px-7">
        {/* logo */}
        <div className="flex justify-center pt-0">
          <BankilyLogo className="h-auto w-65" />
        </div>

        <Suspense>
          <OtpForm />
        </Suspense>
      </div>
    </div>
  );
}
