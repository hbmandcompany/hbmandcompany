import clsx from "clsx";

interface GoldDividerProps {
  className?: string;
  width?: "full" | "half" | "quarter";
  label?: string;
  variant?: "gold" | "garnet";
}

export default function GoldDivider({
  className = "",
  width = "full",
  label,
  variant = "gold",
}: GoldDividerProps) {
  const widths = { full: "w-full", half: "w-1/2", quarter: "w-1/4" };
  const ruleClass = variant === "garnet" ? "garnet-rule" : "gold-rule";
  const labelColor = variant === "garnet" ? "text-garnet/70" : "text-gold/60";

  if (label) {
    return (
      <div className={clsx("flex items-center gap-5", className)}>
        <div className={clsx(ruleClass, "flex-1")} />
        <span className={clsx("font-mono-hbm text-label-xs uppercase tracking-[0.28em] shrink-0", labelColor)}>
          {label}
        </span>
        <div className={clsx(ruleClass, "flex-1")} />
      </div>
    );
  }

  return <div className={clsx(ruleClass, widths[width], className)} />;
}
