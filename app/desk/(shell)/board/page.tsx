"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { StatusPill } from "@/components/desk/StatusPill";

type Status = "Done" | "In Progress" | "Blocked" | "Review" | "Pending";
type Priority = "Urgent" | "High" | "Normal" | "Low";

type Person = { id: string; name: string; initials: string };

const people: Person[] = [
  { id: "tomas", name: "Tomás", initials: "TK" },
  { id: "adaeze", name: "Adaeze", initials: "AO" },
  { id: "marcus", name: "Marcus", initials: "ML" },
  { id: "sophie", name: "Sophie", initials: "SM" },
  { id: "elena", name: "Elena", initials: "EV" },
];

type BoardItem = {
  id: string;
  groupId: string;
  name: string;
  status: Status;
  ownerId: string;
  priority: Priority;
  due: string;
  notes: string;
};

type Group = { id: string; name: string; accent: "desk-blue" | "desk-purple" | "desk-amber" };

const groups: Group[] = [
  { id: "g-1", name: "Protocol Deployments", accent: "desk-blue" },
  { id: "g-2", name: "Governance & Compliance", accent: "desk-purple" },
  { id: "g-3", name: "Operations", accent: "desk-amber" },
];

const initialItems: BoardItem[] = [
  {
    id: "b-01",
    groupId: "g-1",
    name: "Finalize PIOL oracle v2 spec",
    status: "In Progress",
    ownerId: "tomas",
    priority: "High",
    due: "May 18",
    notes: "Spec + interface surfaces for feeds. Confirm signing schema.",
  },
  {
    id: "b-02",
    groupId: "g-1",
    name: "Bridge Protocol audit — round 2 findings",
    status: "Review",
    ownerId: "adaeze",
    priority: "Urgent",
    due: "May 14",
    notes: "Controller pass required before patch deployment.",
  },
  {
    id: "b-03",
    groupId: "g-1",
    name: "Cold storage rotation script — test on staging",
    status: "Done",
    ownerId: "marcus",
    priority: "Normal",
    due: "May 10",
    notes: "Procedure TR-04 met. Document variance notes.",
  },
  {
    id: "b-04",
    groupId: "g-1",
    name: "Base L2 indexer — backfill Q1 events",
    status: "In Progress",
    ownerId: "sophie",
    priority: "Normal",
    due: "May 22",
    notes: "Backfill needs checksum reconciliation and retry policy.",
  },
  {
    id: "b-05",
    groupId: "g-2",
    name: "Draft Proposal #52 — validator incentive restructure",
    status: "In Progress",
    ownerId: "sophie",
    priority: "High",
    due: "May 20",
    notes: "Align incentives to slashing risk and uptime history.",
  },
  {
    id: "b-06",
    groupId: "g-2",
    name: "Q2 risk framework — final review",
    status: "Review",
    ownerId: "marcus",
    priority: "Urgent",
    due: "May 13",
    notes: "Need final sign-off and publish brief.",
  },
  {
    id: "b-07",
    groupId: "g-2",
    name: "AML policy update — incorporate APAC guidance",
    status: "Pending",
    ownerId: "elena",
    priority: "Normal",
    due: "May 25",
    notes: "Pull key deltas. Confirm legal review window.",
  },
  {
    id: "b-08",
    groupId: "g-3",
    name: "Quarterly treasury reconciliation",
    status: "In Progress",
    ownerId: "marcus",
    priority: "High",
    due: "May 15",
    notes: "Variance checks + approvals. Raise exceptions only with memo.",
  },
  {
    id: "b-09",
    groupId: "g-3",
    name: "Update press kit — new portfolio entries",
    status: "Pending",
    ownerId: "adaeze",
    priority: "Low",
    due: "May 30",
    notes: "Add new entries with consistent language and image sizes.",
  },
  {
    id: "b-10",
    groupId: "g-3",
    name: "Onboard new Desk Officer — Infrastructure vertical",
    status: "Done",
    ownerId: "elena",
    priority: "Normal",
    due: "May 8",
    notes: "Provision accounts, grant treasury read access, add to meetings.",
  },
];

function statusTone(s: Status) {
  switch (s) {
    case "Done":
      return "green" as const;
    case "In Progress":
      return "amber" as const;
    case "Blocked":
      return "red" as const;
    case "Review":
      return "blue" as const;
    case "Pending":
    default:
      return "neutral" as const;
  }
}

function priorityTone(p: Priority) {
  switch (p) {
    case "Urgent":
      return "red" as const;
    case "High":
      return "amber" as const;
    case "Normal":
      return "neutral" as const;
    case "Low":
    default:
      return "neutral" as const;
  }
}

type View = "Table" | "Board" | "Timeline";

export default function DeskBoardPage() {
  const [view, setView] = useState<View>("Table");
  const [items, setItems] = useState<BoardItem[]>(initialItems);
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(() => new Set());
  const [dragId, setDragId] = useState<string | null>(null);

  const byGroup = useMemo(() => {
    const map = new Map<string, BoardItem[]>();
    for (const i of items) {
      if (!map.has(i.groupId)) map.set(i.groupId, []);
      map.get(i.groupId)!.push(i);
    }
    return map;
  }, [items]);

  const statusColumns: Status[] = ["Pending", "In Progress", "Review", "Blocked", "Done"];

  function setItemStatus(itemId: string, status: Status) {
    setItems((cur) => cur.map((it) => (it.id === itemId ? { ...it, status } : it)));
  }

  return (
    <div className="px-6 py-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-cormorant text-2xl font-semibold text-cream">DeFi Vertical</div>
          <div className="mt-1 font-robinhood text-[13px] text-silver-dim/50">
            Active workstreams for the DeFi desk
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-lg border border-silver-ghost bg-obsidian p-1">
            {(["Board", "Table", "Timeline"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={clsx(
                  "rounded-md px-3 py-2 font-robinhood text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ease-luxury",
                  view === v ? "bg-charcoal-light text-cream" : "text-silver-dim/40 hover:text-silver"
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <button type="button" className="gold-outline-btn px-5 py-2 font-robinhood text-[11px] uppercase tracking-[0.26em]">
            Filter
          </button>
          <button type="button" className="gold-outline-btn px-5 py-2 font-robinhood text-[11px] uppercase tracking-[0.26em]">
            Sort
          </button>
          <button type="button" className="garnet-btn px-6 py-2.5 font-robinhood text-[11px] uppercase tracking-[0.3em]">
            New Item
          </button>
        </div>
      </div>

      {view === "Table" ? (
        <div className="overflow-hidden rounded-lg border border-white/[0.04]">
          {/* Column headers */}
          <div className="grid grid-cols-[minmax(320px,1fr)_130px_120px_120px_120px_minmax(220px,1fr)] border-b border-white/[0.04] bg-obsidian">
            {["Item", "Status", "Owner", "Priority", "Due Date", "Notes"].map((h) => (
              <div
                key={h}
                className="flex h-9 items-center px-3 font-robinhood text-[11px] uppercase tracking-wider text-silver-dim/40"
              >
                {h}
              </div>
            ))}
          </div>

          {groups.map((g) => {
            const groupItems = byGroup.get(g.id) ?? [];
            const collapsed = collapsedGroups.has(g.id);
            const done = groupItems.filter((i) => i.status === "Done").length;
            const pct = groupItems.length ? Math.round((done / groupItems.length) * 100) : 0;
            return (
              <div key={g.id}>
                <button
                  type="button"
                  onClick={() =>
                    setCollapsedGroups((s) => {
                      const next = new Set(s);
                      if (next.has(g.id)) next.delete(g.id);
                      else next.add(g.id);
                      return next;
                    })
                  }
                  className="flex h-11 w-full items-center gap-3 bg-midnight px-4 text-left transition-colors hover:bg-midnight/80"
                >
                  <span className="text-silver-dim/40">{collapsed ? "▸" : "▾"}</span>
                  <span
                    className={clsx(
                      "h-full w-1",
                      g.accent === "desk-blue"
                        ? "bg-desk-blue"
                        : g.accent === "desk-purple"
                          ? "bg-desk-purple"
                          : "bg-desk-amber"
                    )}
                    aria-hidden
                  />
                  <span className="font-robinhood text-[13px] font-medium text-cream/80">{g.name}</span>
                  <span className="ml-2 font-robinhood text-[11px] text-silver-dim/30">
                    {groupItems.length} items
                  </span>
                  <div className="ml-auto flex items-center gap-3">
                    <div className="h-1 w-20 overflow-hidden rounded-full bg-charcoal-light">
                      <div className="h-full bg-desk-green" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="w-10 text-right font-robinhood text-[11px] text-silver-dim/30">{pct}%</div>
                  </div>
                </button>

                {!collapsed ? (
                  <div>
                    {groupItems.map((it) => {
                      const owner = people.find((p) => p.id === it.ownerId) ?? people[0];
                      return (
                        <div
                          key={it.id}
                          className="grid grid-cols-[minmax(320px,1fr)_130px_120px_120px_120px_minmax(220px,1fr)] border-b border-white/[0.02] bg-void hover:bg-charcoal-light/50"
                        >
                          <div className="flex h-10 items-center px-3 font-robinhood text-[13px] text-cream/80">
                            {it.name}
                          </div>
                          <div className="flex h-10 items-center px-3">
                            <button
                              type="button"
                              className="text-left"
                              onClick={() => {
                                const next = statusColumns[(statusColumns.indexOf(it.status) + 1) % statusColumns.length];
                                setItemStatus(it.id, next);
                              }}
                            >
                              <StatusPill label={it.status} tone={statusTone(it.status)} />
                            </button>
                          </div>
                          <div className="flex h-10 items-center gap-2 px-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-silver-ghost bg-charcoal text-[10px] text-cream/70">
                              {owner.initials}
                            </div>
                            <div className="font-robinhood text-[12px] text-silver-dim/60">{owner.name}</div>
                          </div>
                          <div className="flex h-10 items-center px-3">
                            <StatusPill label={it.priority} tone={priorityTone(it.priority)} />
                          </div>
                          <div className="flex h-10 items-center px-3 font-robinhood text-[12px] text-silver-dim/50">
                            {it.due}
                          </div>
                          <div className="flex h-10 items-center px-3 font-robinhood text-[12px] text-silver-dim/40">
                            <span className="truncate">{it.notes}</span>
                          </div>
                        </div>
                      );
                    })}

                    <button
                      type="button"
                      className="flex h-9 w-full items-center border-b border-dashed border-silver-ghost/30 bg-void px-3 font-robinhood text-[13px] text-silver-dim/20 transition-colors hover:text-silver-dim/50"
                    >
                      + Add item
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}

      {view === "Board" ? (
        <div className="grid gap-4 overflow-x-auto pb-2 [grid-auto-flow:column] [grid-auto-columns:280px]">
          {statusColumns.map((s) => {
            const colItems = items.filter((i) => i.status === s);
            return (
              <div
                key={s}
                className="desk-panel flex min-h-[70vh] flex-col gap-3 border border-white/[0.04] bg-charcoal/30 p-3"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragId) setItemStatus(dragId, s);
                  setDragId(null);
                }}
              >
                <div className="flex items-center justify-between">
                  <StatusPill label={s} tone={statusTone(s)} className="text-[11px]" />
                  <div className="font-robinhood text-[11px] text-silver-dim/35">{colItems.length}</div>
                </div>

                <div className="space-y-2">
                  {colItems.map((it) => {
                    const owner = people.find((p) => p.id === it.ownerId) ?? people[0];
                    return (
                      <div
                        key={it.id}
                        draggable
                        onDragStart={() => setDragId(it.id)}
                        className="glass-panel-dark cursor-grab rounded-lg border border-white/[0.04] p-3 active:cursor-grabbing"
                      >
                        <div className="font-robinhood text-[13px] text-cream/80">{it.name}</div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-silver-ghost bg-charcoal text-[9px] text-cream/70">
                              {owner.initials}
                            </div>
                            <div className="font-robinhood text-[11px] text-silver-dim/45">{it.due}</div>
                          </div>
                          <span className={clsx("h-2 w-2 rounded-full", it.priority === "Urgent" ? "bg-desk-red" : it.priority === "High" ? "bg-desk-amber" : "bg-silver-dim/30")} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {view === "Timeline" ? (
        <div className="glass-panel-dark p-6">
          <div className="font-robinhood text-[13px] text-silver-dim/60">
            Timeline view is a simplified placeholder in this build. Use Table or Board to execute.
          </div>
        </div>
      ) : null}
    </div>
  );
}

