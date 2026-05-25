import type { Article } from "@/lib/supabase/types";

type JsonPanelProps = {
  data: Article[] | null;
  count: number;
  label: string;
};

export function JsonPanel({ data, count, label }: JsonPanelProps) {
  return (
    <div className="space-y-3">
      <p className="font-mono-hbm text-label-xs uppercase tracking-[0.22em] text-gold-dim">
        {label} — {count} row{count === 1 ? "" : "s"}
      </p>
      <pre className="max-h-[420px] overflow-auto rounded-xl border border-white/[0.08] bg-obsidian p-4 font-mono text-[12px] leading-relaxed text-cream-dim">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

type ErrorPanelProps = {
  title: string;
  message: string;
  hint?: string;
};

export function ErrorPanel({ title, message, hint }: ErrorPanelProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-desk-red/40 bg-desk-red-dim/20 p-5"
    >
      <p className="font-mono-hbm text-label-xs uppercase tracking-[0.22em] text-desk-red">
        {title}
      </p>
      <p className="mt-2 text-body-md text-cream">{message}</p>
      {hint ? <p className="mt-2 text-body-md text-cream-dim">{hint}</p> : null}
    </div>
  );
}

type ConfigMissingPanelProps = {
  context: string;
};

export function ConfigMissingPanel({ context }: ConfigMissingPanelProps) {
  return (
    <ErrorPanel
      title={`${context} — configuration missing`}
      message="NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are not set."
      hint="Copy .env.local.example to .env.local, add your Supabase credentials, and restart the dev server."
    />
  );
}

type LoadingPanelProps = {
  label: string;
};

export function LoadingPanel({ label }: LoadingPanelProps) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-obsidian p-5">
      <p className="font-mono-hbm text-label-xs uppercase tracking-[0.22em] text-gold-dim">
        {label}
      </p>
      <p className="mt-2 animate-pulse text-body-md text-cream-dim">
        Querying Supabase…
      </p>
    </div>
  );
}

type SuccessBadgeProps = {
  connected: boolean;
};

export function ConnectionBadge({ connected }: SuccessBadgeProps) {
  return (
    <span
      className={
        connected
          ? "inline-flex items-center rounded-full border border-desk-green/40 bg-desk-green-dim/30 px-3 py-1 font-mono-hbm text-label-xs uppercase tracking-[0.18em] text-desk-green"
          : "inline-flex items-center rounded-full border border-desk-red/40 bg-desk-red-dim/30 px-3 py-1 font-mono-hbm text-label-xs uppercase tracking-[0.18em] text-desk-red"
      }
    >
      {connected ? "Connected" : "Not connected"}
    </span>
  );
}
