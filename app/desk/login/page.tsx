"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";
import { DeskAuthProvider, routeForRole, useDeskAuth } from "@/components/desk/DeskAuthContext";

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

function LoginPanel({
  title,
  description,
  role,
}: {
  title: string;
  description: string;
  role: "writer" | "principal";
}) {
  const router = useRouter();
  const { signInAs } = useDeskAuth();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    signInAs(role);
    router.push(routeForRole(role));
  }

  return (
    <section className={clsx("flex flex-1 flex-col rounded-md border p-8", deskPaper.card, deskPaper.border)}>
      <h2 className={clsx("font-cormorant text-2xl", deskPaper.inkHeading)}>{title}</h2>
      <p className={clsx("mt-2 font-robinhood text-sm", deskPaper.inkBody)}>{description}</p>

      <form className="mt-8 flex flex-1 flex-col space-y-4" onSubmit={handleSubmit}>
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

        <button
          type="submit"
          className={clsx(
            "mt-auto w-full rounded-md border py-3 font-robinhood text-[11px] uppercase tracking-[0.24em] transition-colors",
            "border-[#6a5843] bg-[#8d6f4d] text-[#f2e6d1] hover:bg-[#6a5843]",
          )}
        >
          Sign in
        </button>
      </form>
    </section>
  );
}

function DeskLoginForm() {
  return (
    <div className={clsx("desk-app min-h-dvh px-6 py-10 md:px-10", deskPaper.page, deskPaper.ink)}>
      <header className="mx-auto max-w-5xl text-center">
        <div className={clsx("font-cormorant text-[36px] font-light uppercase tracking-[0.22em] md:text-[44px]", deskPaper.inkHeading)}>
          HBM <span className={deskPaper.accent}>&amp;</span> Company
        </div>
        <div className={clsx("mx-auto mt-4 h-px w-20", deskPaper.divider)} />
        <div className={clsx("mt-4 font-robinhood text-xs uppercase tracking-[0.3em]", deskPaper.inkLabel)}>
          Editorial Newsroom
        </div>
      </header>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
        <LoginPanel
          title="The Contributor"
          description="Sign in to file stories, manage your queue, and submit for review."
          role="writer"
        />
        <LoginPanel
          title="Editor in Chief"
          description="Sign in to review submissions, publish stories, and manage the newsroom."
          role="principal"
        />
      </div>

      <p className={clsx("mx-auto mt-8 max-w-5xl text-center font-robinhood text-[10px]", deskPaper.inkMeta)}>
        By signing in you agree to the editorial operating protocols of the Company.
      </p>
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
