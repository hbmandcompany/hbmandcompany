import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";

export function DeskEmptyState({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className={clsx("mb-4", deskPaper.accent)}
        aria-hidden
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
      <p className="font-cormorant text-[#8d6f4d]">{title}</p>
      {subtitle ? (
        <p className={clsx("mt-2 max-w-sm font-robinhood text-[12px]", deskPaper.inkMeta)}>{subtitle}</p>
      ) : null}
    </div>
  );
}
