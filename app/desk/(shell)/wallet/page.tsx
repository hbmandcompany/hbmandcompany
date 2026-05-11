"use client";

import { useMemo } from "react";
import { clsx } from "clsx";
import { StatusPill } from "@/components/desk/StatusPill";

type Holding = { asset: string; balance: string; price: string; value: string; ch24: number; alloc: number };

const holdings: Holding[] = [
  { asset: "BTC", balance: "14.20", price: "$103,820", value: "$1,474,244", ch24: 1.8, alloc: 31 },
  { asset: "ETH", balance: "380.00", price: "$3,418", value: "$1,298,840", ch24: -0.7, alloc: 27 },
  { asset: "SOL", balance: "12,400", price: "$162", value: "$2,008,800", ch24: 3.1, alloc: 22 },
  { asset: "AVAX", balance: "18,900", price: "$36.20", value: "$684,180", ch24: -1.2, alloc: 8 },
  { asset: "ARB", balance: "610,000", price: "$1.04", value: "$634,400", ch24: 0.9, alloc: 6 },
  { asset: "OP", balance: "420,000", price: "$2.33", value: "$978,600", ch24: 1.1, alloc: 6 },
];

export default function DeskWalletPage() {
  const total = useMemo(() => "$7,078,900", []);

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <div className="font-cormorant text-4xl font-semibold text-cream">Treasury</div>
        <div className="mt-2 flex items-center gap-3">
          <div className="font-robinhood text-[15px] text-cream/70">{total}</div>
          <StatusPill label="+0.8% 24h" tone="green" />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/[0.04]">
        <div className="grid grid-cols-[120px_1fr_1fr_1fr_140px_200px] border-b border-white/[0.04] bg-obsidian">
          {["Asset", "Balance", "Price", "Value", "24h Change", "Allocation"].map((h) => (
            <div
              key={h}
              className="flex h-9 items-center px-3 font-robinhood text-[11px] uppercase tracking-wider text-silver-dim/40"
            >
              {h}
            </div>
          ))}
        </div>

        {holdings.map((h) => (
          <div
            key={h.asset}
            className="grid grid-cols-[120px_1fr_1fr_1fr_140px_200px] border-b border-white/[0.02] bg-void hover:bg-charcoal-light/50"
          >
            <div className="flex h-10 items-center px-3 font-robinhood text-[13px] font-medium text-cream/80">
              {h.asset}
            </div>
            <div className="flex h-10 items-center px-3 font-robinhood text-[13px] text-cream/70">{h.balance}</div>
            <div className="flex h-10 items-center px-3 font-robinhood text-[13px] text-cream/60">{h.price}</div>
            <div className="flex h-10 items-center px-3 font-robinhood text-[13px] text-cream/60">{h.value}</div>
            <div className="flex h-10 items-center px-3">
              <span
                className={clsx(
                  "desk-pill",
                  h.ch24 >= 0 ? "bg-desk-green-dim/20 text-desk-green" : "bg-desk-red-dim/20 text-desk-red"
                )}
              >
                {h.ch24 >= 0 ? "+" : ""}
                {h.ch24.toFixed(1)}%
              </span>
            </div>
            <div className="flex h-10 items-center gap-3 px-3">
              <div className="h-1 w-full overflow-hidden rounded-full bg-charcoal-light">
                <div className="h-full bg-gold/60" style={{ width: `${h.alloc}%` }} />
              </div>
              <div className="w-10 text-right font-robinhood text-[11px] text-silver-dim/35">{h.alloc}%</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-3 font-robinhood text-[11px] uppercase tracking-[0.24em] text-silver-dim/40">
          Recent transactions
        </div>
        <div className="overflow-hidden rounded-lg border border-white/[0.04]">
          {[
            { dir: "IN", asset: "ETH", amt: "2.4", cp: "0x7A2…E31F", ts: "09:12", status: "Confirmed", tone: "green" as const },
            { dir: "OUT", asset: "SOL", amt: "0.5", cp: "FJ9…pQ3", ts: "Yesterday", status: "Pending", tone: "amber" as const },
            { dir: "OUT", asset: "BTC", amt: "0.15", cp: "bc1q…9m2", ts: "Mon", status: "Confirmed", tone: "green" as const },
          ].map((t, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[80px_90px_120px_1fr_120px_160px] border-b border-white/[0.02] bg-void px-3 py-3 hover:bg-charcoal-light/50"
            >
              <div className="font-robinhood text-[12px] text-silver-dim/60">{t.dir}</div>
              <div className="font-robinhood text-[12px] text-cream/75">{t.asset}</div>
              <div className="font-robinhood text-[12px] text-cream/60">{t.amt}</div>
              <div className="font-robinhood text-[12px] text-silver-dim/45">{t.cp}</div>
              <div className="text-right font-robinhood text-[11px] text-silver-dim/35">{t.ts}</div>
              <div className="text-right">
                <StatusPill label={t.status} tone={t.tone} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

