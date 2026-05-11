"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M3 3l18 18" />
          <path d="M10.2 10.2a3 3 0 0 0 4.2 4.2" />
          <path d="M6.3 6.3C3.9 8.1 2 12 2 12s3.5 7 10 7c2.2 0 4.1-.6 5.7-1.4" />
          <path d="M9.9 4.2A10.7 10.7 0 0 1 12 5c6.5 0 10 7 10 7s-1.2 2.5-3.5 4.5" />
        </>
      )}
    </svg>
  );
}

export default function DeskLoginPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function goToDesk() {
    router.push("/desk");
  }

  return (
    <div className="desk-app min-h-dvh bg-void text-cream">
      <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[55%_45%]">
        {/* Brand panel */}
        <section className="relative flex items-center justify-center bg-void px-8 py-14 md:px-12">
          <div className="animate-fade-up text-center [animation-duration:600ms] [animation-timing-function:var(--tw-ease-luxury)]">
            <div className="font-cormorant text-[40px] font-light uppercase tracking-[0.22em] text-cream md:text-[48px]">
              HBM &amp; Company
            </div>
            <div className="mx-auto mt-4 h-px w-20 gold-rule" />
            <div className="mt-4 font-robinhood text-xs uppercase tracking-[0.3em] text-silver-dim">
              The Desk
            </div>
            <div className="mt-6 font-robinhood text-[11px] text-silver-dim/40">
              Duration · Precision · Patrimony
            </div>
          </div>
        </section>

        {/* Form panel */}
        <section className="relative flex items-center justify-center bg-obsidian px-8 py-14 md:px-12">
          <div className="w-full max-w-[380px]">
            <div className="opacity-0 [animation:fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:400ms]">
              <h1 className="font-robinhood text-xl font-medium text-cream">Sign in to your desk</h1>
              <p className="mt-2 font-robinhood text-sm text-silver-dim">
                Access is by credential only. Development: any email and password are accepted.
              </p>
            </div>

            <form
              className="mt-8 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                goToDesk();
              }}
            >
              <div className="opacity-0 [animation:fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:500ms]">
                <input
                  className="input-dark w-full font-robinhood"
                  placeholder="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  inputMode="email"
                  autoComplete="username"
                />
              </div>
              <div className="relative opacity-0 [animation:fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:600ms]">
                <input
                  className="input-dark w-full pr-12 font-robinhood"
                  placeholder="PASSWORD"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-silver-dim/50 transition-colors hover:bg-white/[0.04] hover:text-silver-dim"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={show} />
                </button>
              </div>

              <div className="flex justify-end opacity-0 [animation:fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:700ms]">
                <button
                  type="button"
                  className="font-robinhood text-[11px] text-silver-dim/50 transition-colors hover:text-silver-dim"
                >
                  Forgot credentials?
                </button>
              </div>

              <div className="opacity-0 [animation:fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:800ms]">
                <button
                  type="submit"
                  className="garnet-btn w-full py-3 font-robinhood text-[11px] uppercase tracking-[0.32em]"
                >
                  SIGN IN
                </button>
              </div>

              <div className="opacity-0 [animation:fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:900ms]">
                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 gold-rule opacity-70" />
                  <span className="font-robinhood text-[11px] text-silver-dim/40">or</span>
                  <div className="h-px flex-1 gold-rule opacity-70" />
                </div>
                <button
                  type="button"
                  onClick={goToDesk}
                  className="gold-outline-btn w-full py-3 font-robinhood text-[11px] uppercase tracking-[0.26em]"
                >
                  Continue with SSO
                </button>
              </div>

              <p className="pt-8 text-center font-robinhood text-[10px] text-silver-dim/30 opacity-0 [animation:fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] [animation-delay:1000ms]">
                By signing in, you agree to the operating protocols of the Company.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

