"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";
import {
  DeskAuthProvider,
  routeForRole,
  useDeskAuth,
  type DeskRole,
} from "@/components/desk/DeskAuthContext";

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

const roleOptions: { label: string; value: DeskRole }[] = [
  { label: "Writer", value: "writer" },
  { label: "Editor", value: "editor" },
  { label: "Principal", value: "principal" },
  { label: "Analyst", value: "analyst" },
  { label: "Admin", value: "admin" },
];

function DeskLoginForm() {
  const router = useRouter();
  const { currentRole, setRole } = useDeskAuth();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signIn() {
    router.push(routeForRole(currentRole));
  }

  return (
    <div className={clsx("desk-app min-h-dvh", deskPaper.page, deskPaper.ink)}>
      <div className="grid min-h-dvh grid-cols-1 md:grid-cols-[52%_48%]">
        <section className={clsx("relative flex items-center justify-center px-8 py-14 md:px-12", deskPaper.pageAlt)}>
          <div className="relative z-10 text-center">
            <div className={clsx("font-cormorant text-[40px] font-light uppercase tracking-[0.22em] md:text-[48px]", deskPaper.inkHeading)}>
              HBM <span className={deskPaper.accent}>&amp;</span> Company
            </div>
            <div className={clsx("mx-auto mt-4 h-px w-20", deskPaper.divider)} />
            <div className={clsx("mt-4 font-robinhood text-xs uppercase tracking-[0.3em]", deskPaper.inkLabel)}>
              Editorial Newsroom
            </div>
            <div className={clsx("mt-6 font-robinhood text-[11px]", deskPaper.inkMeta)}>The contributor desk</div>
          </div>
        </section>

        <section className={clsx("flex items-center justify-center px-8 py-14 md:px-12", deskPaper.page)}>
          <div className="w-full max-w-[420px]">
            <h1 className={clsx("font-cormorant text-3xl", deskPaper.inkHeading)}>Sign in</h1>
            <p className={clsx("mt-2 font-robinhood text-sm", deskPaper.inkBody)}>
              Any credentials work in development. Access is permissioned by role.
            </p>

            <form
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <div className="flex flex-wrap gap-2">
                {roleOptions.map((opt) => {
                  const active = currentRole === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRole(opt.value)}
                      className={clsx(
                        "rounded-full border px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-[0.18em] transition-colors",
                        active
                          ? clsx("border-[#8d6f4d] bg-[#ebe0cc]", deskPaper.inkHeading)
                          : clsx(deskPaper.border, deskPaper.inkMeta, deskPaper.hover)
                      )}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <input
                className={clsx("h-10 w-full rounded-md border px-3 font-robinhood text-[13px] outline-none", deskPaper.input)}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                inputMode="email"
                autoComplete="username"
              />

              <div className="relative">
                <input
                  className={clsx("h-10 w-full rounded-md border px-3 pr-12 font-robinhood text-[13px] outline-none", deskPaper.input)}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className={clsx("absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 transition-colors", deskPaper.inkMeta, deskPaper.hover)}
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={show} />
                </button>
              </div>

              <div className="flex justify-end">
                <button type="button" className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.accent)}>
                  Forgot credentials
                </button>
              </div>

              <button
                type="submit"
                className={clsx(
                  "w-full rounded-md border py-3 font-robinhood text-[11px] uppercase tracking-[0.24em] transition-colors",
                  "border-[#6a5843] bg-[#8d6f4d] text-[#f2e6d1] hover:bg-[#6a5843]"
                )}
              >
                Sign in
              </button>

              <div className="flex items-center gap-3">
                <div className={clsx("h-px flex-1", deskPaper.divider)} />
                <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>or</span>
                <div className={clsx("h-px flex-1", deskPaper.divider)} />
              </div>

              <button
                type="button"
                onClick={signIn}
                className={clsx(
                  "w-full rounded-md border py-3 font-robinhood text-[11px] uppercase tracking-[0.2em] transition-colors",
                  deskPaper.border,
                  deskPaper.inkBody,
                  deskPaper.hover
                )}
              >
                Continue with SSO
              </button>

              <p className={clsx("pt-4 text-center font-robinhood text-[10px]", deskPaper.inkMeta)}>
                By signing in you agree to the editorial operating protocols of the Company.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function DeskLoginPage() {
  return (
    <DeskAuthProvider>
      <Suspense fallback={null}>
        <DeskLoginForm />
      </Suspense>
    </DeskAuthProvider>
  );
}
