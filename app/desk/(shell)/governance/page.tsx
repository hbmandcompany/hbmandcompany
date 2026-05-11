"use client";

import { useMemo, useState } from "react";
import { StatusPill } from "@/components/desk/StatusPill";

type Proposal = {
  id: string;
  title: string;
  proposer: string;
  submitted: string;
  description: string;
  closesIn: string;
  quorum: { have: number; need: number };
  tally: { forPct: number; againstPct: number; abstainPct: number };
};

const proposals: Proposal[] = [
  {
    id: "47",
    title: "Rotate cold storage signers to multisig v3",
    proposer: "Tomás Kessler",
    submitted: "May 10, 2026",
    description:
      "Upgrade the signer set and operational policy for cold storage execution. Objective: reduce single-path risk, improve auditability, and formalize quorum behaviors under stress.",
    closesIn: "14h 22m",
    quorum: { have: 67, need: 75 },
    tally: { forPct: 58, againstPct: 21, abstainPct: 21 },
  },
  {
    id: "51",
    title: "Ratify Q2 risk framework amendment",
    proposer: "Marcus Lin",
    submitted: "May 08, 2026",
    description:
      "Adjust L2 exposure weights and update counterparty risk thresholds for bridged assets. Aligns reporting with new custody segmentation.",
    closesIn: "1d 04h",
    quorum: { have: 61, need: 75 },
    tally: { forPct: 44, againstPct: 31, abstainPct: 25 },
  },
];

function TallyBar({ p }: { p: Proposal }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between font-robinhood text-[11px] text-silver-dim/40">
        <span>For {p.tally.forPct}%</span>
        <span>Against {p.tally.againstPct}%</span>
        <span>Abstain {p.tally.abstainPct}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-charcoal-light">
        <div className="flex h-full w-full">
          <div className="h-full bg-desk-green" style={{ width: `${p.tally.forPct}%` }} />
          <div className="h-full bg-desk-red" style={{ width: `${p.tally.againstPct}%` }} />
          <div className="h-full bg-silver-dim/30" style={{ width: `${p.tally.abstainPct}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function DeskGovernancePage() {
  const [voted, setVoted] = useState<Record<string, "For" | "Against" | "Abstain" | undefined>>({});

  const history = useMemo(
    () => [
      { id: "45", title: "Treasury rotation cadence update", result: "Passed", date: "Apr 26, 2026" },
      { id: "44", title: "Oracle feed redundancy policy", result: "Passed", date: "Apr 12, 2026" },
      { id: "43", title: "Vendor custody exception (temporary)", result: "Rejected", date: "Mar 29, 2026" },
    ],
    []
  );

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <div className="font-cormorant text-2xl font-semibold text-cream">Governance</div>
        <div className="mt-1 font-robinhood text-[13px] text-silver-dim/50">
          Active proposals and voting history.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-4">
          {proposals.map((p) => (
            <section key={p.id} className="glass-panel p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-robinhood text-[15px] font-medium text-cream">
                    Proposal #{p.id}: {p.title}
                  </div>
                  <div className="mt-1 font-robinhood text-[11px] text-silver-dim/40">
                    Proposer: {p.proposer} · Submitted {p.submitted}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill
                    label={`Closes in ${p.closesIn}`}
                    tone="gold"
                    className="bg-gold/10 text-gold/90"
                  />
                </div>
              </div>

              <p className="mt-4 max-w-3xl font-raleway text-[13px] leading-[1.85] text-cream-dim/70">
                {p.description}
              </p>

              <TallyBar p={p} />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="font-robinhood text-[11px] text-desk-amber">
                  Quorum: {p.quorum.have}% reached (need {p.quorum.need}%)
                </div>
                <div className="flex gap-2">
                  {(["For", "Against", "Abstain"] as const).map((choice) => (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => setVoted((v) => ({ ...v, [p.id]: choice }))}
                      className={[
                        "gold-outline-btn px-4 py-2 font-robinhood text-[11px] uppercase tracking-[0.22em]",
                        voted[p.id] === choice ? "bg-gold/10" : "",
                      ].join(" ")}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-4">
          <section className="glass-panel-dark p-6">
            <div className="mb-3 font-robinhood text-[11px] uppercase tracking-[0.24em] text-silver-dim/40">
              Voting history
            </div>
            <div className="space-y-3">
              {history.map((h) => (
                <div key={h.id} className="rounded-lg border border-white/[0.04] bg-charcoal/30 p-4">
                  <div className="font-robinhood text-[13px] text-cream/80">
                    Proposal #{h.id}: {h.title}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <StatusPill label={h.result} tone={h.result === "Passed" ? "green" : "red"} />
                    <div className="font-robinhood text-[11px] text-silver-dim/35">{h.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

