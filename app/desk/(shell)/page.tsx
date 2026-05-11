"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { useDesk } from "@/components/desk/DeskContext";
import { StatCard } from "@/components/desk/StatCard";
import { StatusPill } from "@/components/desk/StatusPill";
import {
  IconCalendar,
  IconFileText,
  IconLayoutGrid,
  IconStar,
  IconVote,
  IconWallet,
} from "@/components/desk/desk-icons";

type InboxCategory = "Tasks" | "Governance" | "Wallet" | "Calendar" | "Submissions" | "Board";
type InboxTab = "All" | InboxCategory;

type InboxItem = {
  id: string;
  category: InboxCategory;
  source: string;
  subject: string;
  preview: string;
  tsLabel: string;
  unread: boolean;
  starred?: boolean;
  priority?: "Urgent" | "High" | "Normal" | "Low";
};

const sampleItems: InboxItem[] = [
  {
    id: "i-01",
    category: "Tasks",
    source: "Desk Chief",
    subject: "Q2 Treasury Reconciliation — review required",
    preview: "Variance threshold exceeded on two custodial ledgers. Confirm the sign-off path and assign corrections.",
    tsLabel: "09:12",
    unread: true,
    priority: "High",
  },
  {
    id: "i-02",
    category: "Governance",
    source: "Governance",
    subject: "Proposal #47: Rotate cold storage signers to multisig v3",
    preview: "Voting window open. Quorum currently at 61%. Closing in 14h 22m.",
    tsLabel: "08:44",
    unread: true,
    priority: "Urgent",
  },
  {
    id: "i-03",
    category: "Submissions",
    source: "Pipeline",
    subject: "Document awaiting countersignature — EtherBonds Series A term sheet",
    preview: "Counterparty has signed. Controller review required before final countersignature is issued.",
    tsLabel: "Yesterday",
    unread: true,
    priority: "High",
  },
  {
    id: "i-04",
    category: "Calendar",
    source: "Calendar",
    subject: "Station Chief sync — Dallas desk — tomorrow 10:00 AM",
    preview: "Agenda: treasury rotations, audit schedule, vendor onboarding updates.",
    tsLabel: "Yesterday",
    unread: false,
  },
  {
    id: "i-05",
    category: "Wallet",
    source: "Treasury",
    subject: "Incoming: 2.4 ETH from Bridge Protocol settlement",
    preview: "Receipt confirmed. Tag allocation bucket and update weekly cashflow view.",
    tsLabel: "Mon",
    unread: false,
  },
  {
    id: "i-06",
    category: "Governance",
    source: "Governance",
    subject: "Proposal #51: Ratify Q2 risk framework amendment — vote closes 14h",
    preview: "Risk weights updated for L2 exposure. Review summary and cast ballot.",
    tsLabel: "Mon",
    unread: true,
  },
  {
    id: "i-07",
    category: "Tasks",
    source: "Operations",
    subject: "Infrastructure audit: validator set quarterly review",
    preview: "Confirm uptime deltas, slashing protection posture, and signing policy exceptions.",
    tsLabel: "Sun",
    unread: false,
  },
  {
    id: "i-08",
    category: "Board",
    source: "Workspace",
    subject: "Board update: “DeFi Vertical” — 3 items moved to Done",
    preview: "Cold storage rotation script, PIOL spec review, and backfill job have been completed.",
    tsLabel: "Sun",
    unread: false,
  },
  {
    id: "i-09",
    category: "Wallet",
    source: "Treasury",
    subject: "Outgoing: 0.5 SOL to reserve rotation",
    preview: "Transfer executed under procedure TR-04. Awaiting second approver note.",
    tsLabel: "Sat",
    unread: false,
  },
  {
    id: "i-10",
    category: "Tasks",
    source: "Desk Chief",
    subject: "Desk Chief review requested — PostCarrier integration milestone",
    preview: "Milestone slips by 6 days. Decide whether to re-sequence deliverables or add capacity.",
    tsLabel: "Sat",
    unread: true,
    priority: "High",
  },
  {
    id: "i-11",
    category: "Submissions",
    source: "Compliance",
    subject: "Monthly compliance brief — submission due in 2 days",
    preview: "APAC and EU jurisdictions. Ensure the delta section includes MiCA implementation notes.",
    tsLabel: "Fri",
    unread: false,
  },
  {
    id: "i-12",
    category: "Calendar",
    source: "Calendar",
    subject: "Treasury risk review — today 3:30 PM",
    preview: "Bring wallet exposure breakdown and open counterparty risk flags.",
    tsLabel: "Fri",
    unread: true,
  },
  {
    id: "i-13",
    category: "Governance",
    source: "Governance",
    subject: "Ballot opened — Proposal #52: Validator incentive restructure",
    preview: "Draft ballot created. Awaiting proposer signature before publication.",
    tsLabel: "Thu",
    unread: false,
  },
  {
    id: "i-14",
    category: "Board",
    source: "Workspace",
    subject: "Board item updated: “Bridge audit findings — round 2”",
    preview: "Status moved to Review. Owner requested an expedited controller pass.",
    tsLabel: "Thu",
    unread: true,
  },
  {
    id: "i-15",
    category: "Tasks",
    source: "Controller",
    subject: "Treasury policy exception request — vendor custody",
    preview: "Vendor requests temporary exception for settlement window. Review and approve/reject.",
    tsLabel: "Wed",
    unread: false,
  },
];

const tabs: InboxTab[] = ["All", "Tasks", "Governance", "Wallet", "Calendar", "Submissions"];

function iconForCategory(cat: InboxCategory) {
  switch (cat) {
    case "Tasks":
      return IconLayoutGrid;
    case "Governance":
      return IconVote;
    case "Wallet":
      return IconWallet;
    case "Calendar":
      return IconCalendar;
    case "Submissions":
      return IconFileText;
    case "Board":
    default:
      return IconLayoutGrid;
  }
}

export default function DeskInboxPage() {
  const { user } = useDesk();
  const [tab, setTab] = useState<InboxTab>("All");
  const [items, setItems] = useState<InboxItem[]>(sampleItems);
  const [selectedId, setSelectedId] = useState<string>(sampleItems[0]?.id ?? "");
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const list = useMemo(() => {
    let out = items;
    if (showStarredOnly) out = out.filter((i) => i.starred);
    if (tab !== "All") out = out.filter((i) => i.category === tab);
    return out;
  }, [items, tab, showStarredOnly]);

  const selectedIndex = useMemo(() => list.findIndex((i) => i.id === selectedId), [list, selectedId]);

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (key === "/" && (e.target as HTMLElement | null)?.tagName !== "INPUT") {
        // TopBar search exists; this is a local affordance only
        e.preventDefault();
        return;
      }

      if (key === "j") {
        e.preventDefault();
        const next = Math.min(list.length - 1, Math.max(0, selectedIndex) + 1);
        if (list[next]) setSelectedId(list[next].id);
      }
      if (key === "k") {
        e.preventDefault();
        const prev = Math.max(0, Math.max(0, selectedIndex) - 1);
        if (list[prev]) setSelectedId(list[prev].id);
      }
      if (key === "x") {
        e.preventDefault();
        if (!selectedId) return;
        setSelected((s) => {
          const next = new Set(s);
          if (next.has(selectedId)) next.delete(selectedId);
          else next.add(selectedId);
          return next;
        });
      }
      if (key === "s") {
        e.preventDefault();
        if (!selectedId) return;
        setItems((cur) => cur.map((it) => (it.id === selectedId ? { ...it, starred: !it.starred } : it)));
      }
      if (key === "e") {
        e.preventDefault();
        if (!selectedId) return;
        setItems((cur) => cur.filter((it) => it.id !== selectedId));
        setSelected((s) => {
          const next = new Set(s);
          next.delete(selectedId);
          return next;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [list, selectedId, selectedIndex]);

  useEffect(() => {
    if (!selectedId && list[0]) setSelectedId(list[0].id);
  }, [selectedId, list]);

  const unreadCount = useMemo(() => items.filter((i) => i.unread).length, [items]);
  const openItems = useMemo(() => items.filter((i) => i.unread).length + 7, [items]);

  return (
    <div className="flex min-h-[calc(100dvh-56px)] gap-6 px-6 py-6">
      {/* Column 1 — Feed */}
      <section className="min-w-0 flex-[3]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-end gap-6">
            <div className="font-cormorant text-2xl font-semibold text-cream/90">Inbox</div>
            <button
              type="button"
              onClick={() => setShowStarredOnly((v) => !v)}
              className={clsx(
                "inline-flex items-center gap-2 rounded-md px-2 py-1.5 font-robinhood text-[11px] uppercase tracking-[0.22em]",
                showStarredOnly ? "bg-gold/10 text-gold" : "text-silver-dim/50 hover:text-silver"
              )}
            >
              <IconStar className={clsx("h-4 w-4", showStarredOnly ? "text-gold" : "text-silver-dim/40")} />
              Starred
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button type="button" className="gold-outline-btn px-5 py-2 font-robinhood text-[11px] uppercase tracking-[0.26em]">
              + New
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-4 flex items-center justify-between border-b border-white/[0.04]">
          <div className="flex gap-5">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={clsx(
                  "pb-3 font-robinhood text-[12px] uppercase tracking-wider transition-colors duration-200",
                  tab === t ? "border-b-2 border-gold text-cream" : "text-silver-dim/40 hover:text-silver"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="pb-3 font-robinhood text-[11px] uppercase tracking-[0.22em] text-silver-dim/35">
            Sort: Recent
          </div>
        </div>

        <div ref={listRef} className="overflow-hidden rounded-lg border border-white/[0.04]">
          {list.map((it) => {
            const active = it.id === selectedId;
            const checked = selected.has(it.id);
            const Icon = iconForCategory(it.category);
            return (
              <div
                key={it.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedId(it.id);
                  setItems((cur) => cur.map((x) => (x.id === it.id ? { ...x, unread: false } : x)));
                }}
                className={clsx(
                  "relative flex h-16 items-center gap-4 border-b border-white/[0.03] px-5",
                  "transition-colors duration-200",
                  it.unread ? "bg-obsidian" : "bg-void",
                  "hover:bg-charcoal-light",
                  active ? "outline outline-1 outline-gold/20" : ""
                )}
              >
                {it.unread ? <span className="absolute left-0 top-0 h-full w-[3px] bg-gold" /> : null}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected((s) => {
                      const next = new Set(s);
                      if (next.has(it.id)) next.delete(it.id);
                      else next.add(it.id);
                      return next;
                    });
                  }}
                  className={clsx(
                    "h-4 w-4 rounded-sm border border-silver-ghost transition-colors",
                    checked ? "bg-gold/70 border-gold/60" : "bg-transparent"
                  )}
                  aria-label={checked ? "Deselect item" : "Select item"}
                />

                <Icon className="h-4 w-4 text-silver-dim/30" />

                <div className="w-[140px] shrink-0 truncate font-robinhood text-[13px] font-medium text-cream/70">
                  {it.source}
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className={clsx(
                      "truncate font-robinhood text-[13px]",
                      it.unread ? "font-medium text-cream" : "font-normal text-cream/60"
                    )}
                  >
                    {it.subject}
                  </div>
                  <div className="truncate font-robinhood text-[13px] text-silver-dim/40">{it.preview}</div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  {it.priority ? (
                    <StatusPill
                      label={it.priority}
                      tone={it.priority === "Urgent" ? "red" : it.priority === "High" ? "amber" : "neutral"}
                      className="hidden md:inline-flex"
                    />
                  ) : null}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setItems((cur) => cur.map((x) => (x.id === it.id ? { ...x, starred: !x.starred } : x)));
                    }}
                    className={clsx(
                      "rounded-md p-1.5 transition-colors hover:bg-white/[0.04]",
                      it.starred ? "text-gold" : "text-silver-dim/35 hover:text-silver"
                    )}
                    aria-label={it.starred ? "Unstar item" : "Star item"}
                  >
                    <IconStar className="h-4 w-4" />
                  </button>

                  <div className="w-[70px] text-right font-robinhood text-[11px] text-silver-dim/30">
                    {it.tsLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 font-robinhood text-[11px] text-silver-dim/35">
          Shortcuts: <span className="text-silver-dim/55">j/k</span> navigate ·{" "}
          <span className="text-silver-dim/55">x</span> select · <span className="text-silver-dim/55">s</span> star ·{" "}
          <span className="text-silver-dim/55">e</span> archive
        </div>
      </section>

      {/* Column 2 — Right cards */}
      <aside className="hidden w-full max-w-[380px] flex-[1] flex-col gap-3 md:flex">
        <StatCard title="Your Desk">
          <div className="font-cormorant text-xl font-semibold text-cream">{user.name}</div>
          <div className="mt-1 font-robinhood text-[11px] uppercase tracking-wider text-gold-dim">
            {user.role}
            {user.vertical ? ` · ${user.vertical}` : ""}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            {[
              { n: openItems, l: "Open items" },
              { n: 3, l: "Active proposals" },
              { n: 2, l: "Pending submissions" },
              { n: unreadCount, l: "Unread" },
            ].map((s) => (
              <div key={s.l} className="rounded-lg border border-white/[0.04] bg-charcoal/40 p-3">
                <div className="font-robinhood text-2xl font-semibold text-cream">{s.n}</div>
                <div className="mt-1 font-robinhood text-[10px] uppercase tracking-wider text-silver-dim/40">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </StatCard>

        <StatCard title="Treasury" footerHref="/desk/wallet" footerLabel="View treasury">
          <div className="space-y-3">
            {[
              { t: "BTC", p: "$103,820", ch: "+1.8%", up: true },
              { t: "ETH", p: "$3,418", ch: "-0.7%", up: false },
              { t: "SOL", p: "$162", ch: "+3.1%", up: true },
            ].map((r) => (
              <div key={r.t} className="flex items-center justify-between">
                <div className="font-robinhood text-[13px] font-medium text-cream/80">{r.t}</div>
                <div className="flex items-center gap-2">
                  <div className="font-robinhood text-[13px] text-cream/60">{r.p}</div>
                  <span
                    className={clsx(
                      "desk-pill",
                      r.up ? "bg-desk-green-dim/20 text-desk-green" : "bg-desk-red-dim/20 text-desk-red"
                    )}
                  >
                    {r.ch}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </StatCard>

        <StatCard title="Upcoming" footerHref="/desk/calendar" footerLabel="View calendar">
          <div className="space-y-3">
            {[
              { time: "10:00", t: "Station Chief sync — Dallas desk" },
              { time: "15:30", t: "Treasury risk review" },
              { time: "17:00", t: "Proposal #47 signers check" },
            ].map((e) => (
              <div key={e.t} className="flex items-start gap-3">
                <div className="mt-0.5 w-12 font-robinhood text-[11px] text-gold-dim">{e.time}</div>
                <div className="min-w-0 font-robinhood text-[13px] text-cream/70">{e.t}</div>
              </div>
            ))}
          </div>
        </StatCard>

        <StatCard title="Governance" footerHref="/desk/governance" footerLabel="Open governance">
          <div className="font-robinhood text-[13px] text-cream/70">3 proposals awaiting your vote</div>
          <div className="mt-2 font-robinhood text-[11px] text-desk-amber">Proposal #47 closes in 14h</div>
        </StatCard>
      </aside>
    </div>
  );
}

