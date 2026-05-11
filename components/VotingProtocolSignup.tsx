"use client";

import { useState, type FormEvent } from "react";

type Typography = "luxury" | "robinhood";

export default function VotingProtocolSignup({ typography }: { typography: Typography }) {
  const displayFont = typography === "robinhood" ? "font-robinhood" : "font-cormorant";
  const uiFont = typography === "robinhood" ? "font-robinhood" : "font-mono-hbm";

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
      setMessage("You are on the list. Protocol updates will follow by email.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <aside
      className="relative w-full max-w-md rounded-2xl border border-white/[0.09] bg-gradient-to-b from-obsidian/95 via-void/90 to-void/95 p-6 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_64px_rgba(0,0,0,0.55)]"
      aria-labelledby="voting-protocol-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/[0.04] blur-3xl" aria-hidden />

      <div className="relative">
        <p className={`${uiFont} text-label-xs text-gold/65 uppercase tracking-[0.32em]`}>
          Voting protocol
        </p>
        <h3
          id="voting-protocol-heading"
          className={`${displayFont} mt-3 text-xl font-light leading-snug text-cream/88 md:text-2xl`}
        >
          Join the <span className="text-gradient-gold font-semibold italic">governance quorum</span>
        </h3>
        <p className={`${uiFont} mt-3 text-[11px] uppercase tracking-[0.14em] leading-relaxed text-silver-dim/55`}>
          Request access to delegate notifications, proposal cycles, and on-chain voting cadence.
        </p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div className="space-y-2">
            <label htmlFor="voting-email" className={`${uiFont} sr-only`}>
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <input
                id="voting-email"
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
                className={`garnet-btn ${uiFont} min-h-[48px] shrink-0 px-6 py-3 text-label-xs uppercase tracking-[0.22em] text-void transition-[opacity,transform] duration-300 hover:opacity-95 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45 sm:px-8`}
              >
                {status === "loading" ? "Sending…" : "Request access"}
              </button>
            </div>
          </div>

          <p
            className={`${uiFont} text-[10px] uppercase tracking-[0.12em] text-silver-dim/38 leading-relaxed`}
            role="note"
          >
            By submitting, you agree we may contact you about the voting protocol and related governance.
            See our <a href="/privacy" className="text-gold/50 hover:text-gold/70 transition-colors">Privacy</a> policy.
          </p>

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
