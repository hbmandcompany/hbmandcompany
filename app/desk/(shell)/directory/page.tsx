"use client";

import { useMemo } from "react";
import { deskUsers } from "@/components/desk/DeskContext";
import { StatusPill } from "@/components/desk/StatusPill";

export default function DeskDirectoryPage() {
  const users = useMemo(() => deskUsers, []);

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <div className="font-cormorant text-2xl font-semibold text-cream">Directory</div>
        <div className="mt-1 font-robinhood text-[13px] text-silver-dim/50">Team directory and roles.</div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {users.map((u) => (
          <div key={u.id} className="glass-panel-dark p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-silver-ghost bg-charcoal text-[12px] text-cream/70">
                {u.initials}
              </div>
              <div className="min-w-0">
                <div className="truncate font-robinhood text-[14px] text-cream/85">{u.name}</div>
                <div className="truncate font-robinhood text-[11px] text-silver-dim/55">
                  {u.role}
                  {u.station ? ` · ${u.station}` : ""}
                  {u.vertical ? ` · ${u.vertical}` : ""}
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusPill label={u.role} tone="gold" />
              {u.vertical ? <StatusPill label={u.vertical} tone="blue" /> : null}
              {u.station ? <StatusPill label={u.station} tone="purple" /> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

