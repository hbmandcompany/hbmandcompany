"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type Typography = "luxury" | "robinhood";

const defaultSuccess = "You are on the list. Protocol updates will follow by email.";

export default function VotingProtocolSignup({
  typography,
  instanceId = "footer",
  eyebrow,
  heading,
  description,
  descriptionClassName,
  submitLabel,
  successMessage,
}: {
  typography: Typography;
  instanceId?: string;
  eyebrow?: string;
  heading?: ReactNode;
  description?: ReactNode;
  /** Overrides default all-caps label styling for the note (e.g. thesis prose). */
  descriptionClassName?: string;
  submitLabel?: string;
  successMessage?: string;
}) {
  const displayFont = typography === "robinhood" ? "font-robinhood" : "font-cormorant";
  const uiFont = typography === "robinhood" ? "font-robinhood" : "font-mono-hbm";
  const headingId = `${instanceId}-voting-protocol-heading`;
  const emailId = `${instanceId}-voting-email`;

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/voting-protocol-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage(successMessage ?? defaultSuccess);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const eyebrowText = eyebrow ?? "Voting protocol";
  const headingNode =
    heading ??
    (
      <>
        Join the <span className="font-semibold italic">governance quorum</span>
      </>
    );
  const descriptionNode =
    description ??
    (
      <>
        Request access to on-chain voting cadence. By submitting, you agree we may contact you about the voting
        protocol and related governance. See our{" "}
        <a href="/privacy" className="text-gold/50 hover:text-gold/70 transition-colors">
          Privacy policy
        </a>
        .
      </>
    );
  const buttonLabel = submitLabel ?? "Request access";

  const descClass =
    descriptionClassName ??
    `${uiFont} mt-3 text-[11px] uppercase tracking-[0.14em] leading-relaxed text-silver-dim/55`;

  return (
    <aside
      className="relative w-full min-w-0 max-w-md rounded-2xl border border-white/[0.09] bg-gradient-to-b from-obsidian/95 via-void/90 to-void/95 p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_64px_rgba(0,0,0,0.55)]"
      aria-labelledby={headingId}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/[0.04] blur-3xl" aria-hidden />

      <div className="relative">
        <p className={`${uiFont} text-label-xs text-gold/65 uppercase tracking-[0.32em]`}>{eyebrowText}</p>
        <h3
          id={headingId}
          className={`${displayFont} mt-3 text-xl font-light leading-snug text-cream/88 md:text-2xl`}
        >
          {headingNode}
        </h3>
        <p className={descClass} role="note">
          {descriptionNode}
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div className="space-y-2">
            <label htmlFor={emailId} className={`${uiFont} sr-only`}>
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={status === "loading"}
                placeholder="Email address"
                className={`${uiFont} min-h-[48px] flex-1 rounded-xl border border-white/[0.10] bg-void/70 px-4 text-[13px] tracking-[0.06em] text-cream/90 placeholder:text-silver-dim/35 outline-none transition-[border-color,box-shadow] duration-300 focus:border-gold/35 focus:ring-1 focus:ring-gold/25 disabled:opacity-55`}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className={`gold-outline-btn ${uiFont} inline-block shrink-0 whitespace-nowrap bg-black px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cream shadow-[0_0_36px_rgba(0,0,0,0.4)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-45 sm:px-5 sm:py-2 sm:text-label-xs sm:tracking-[0.22em]`}
              >
                {status === "loading" ? "Sending…" : buttonLabel}
              </button>
            </div>
          </div>

          {(status === "success" || status === "error") && message && (
            <p
              className={`${uiFont} text-label-xs uppercase tracking-[0.12em] ${
                status === "success" ? "text-digital-80s" : "text-cream/55"
              }`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </aside>
  );
}
