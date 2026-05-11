import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-void px-6 py-24 text-center">
      <p className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/50">404</p>
      <h1 className="font-cormorant text-2xl font-light text-cream md:text-3xl">Page not found</h1>
      <p className="max-w-md font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.18em] text-silver-dim/60">
        The route you requested does not exist or has moved.
      </p>
      <Link
        href="/"
        className="garnet-btn inline-block px-10 py-3 font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void"
      >
        Back home
      </Link>
    </div>
  );
}
