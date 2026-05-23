"use client";

import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";

export function DeskStubPlaceholder({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col items-center justify-center px-6 py-16">
      <h1 className={clsx("font-cormorant text-4xl font-light", deskPaper.inkHeading)}>{title}</h1>
      <div className={clsx("mx-auto mt-6 h-px w-24", deskPaper.divider)} />
      <p className={clsx("mt-6 max-w-md text-center font-robinhood text-sm", deskPaper.inkBody)}>
        {subtitle}
      </p>
    </div>
  );
}
