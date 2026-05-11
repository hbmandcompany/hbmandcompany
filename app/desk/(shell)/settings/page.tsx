"use client";

import { useDesk } from "@/components/desk/DeskContext";

export default function DeskSettingsPage() {
  const { user, setUserId, allUsers } = useDesk();

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <div className="font-cormorant text-2xl font-semibold text-cream">Settings</div>
        <div className="mt-1 font-robinhood text-[13px] text-silver-dim/50">
          Account, preferences, and dev-only role switcher.
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <section className="glass-panel-dark p-6">
          <div className="mb-4 font-robinhood text-[11px] uppercase tracking-[0.24em] text-silver-dim/40">
            Dev role switcher
          </div>

          <div className="mb-4 font-robinhood text-[13px] text-cream/75">
            Active user: <span className="text-cream/90">{user.name}</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {allUsers.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setUserId(u.id)}
                className={[
                  "flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors duration-300 ease-luxury",
                  u.id === user.id
                    ? "border-gold/25 bg-gold/10"
                    : "border-white/[0.06] bg-charcoal/20 hover:bg-charcoal-light/40",
                ].join(" ")}
              >
                <div>
                  <div className="font-robinhood text-[13px] text-cream/85">{u.name}</div>
                  <div className="mt-1 font-robinhood text-[11px] text-silver-dim/55">
                    {u.role}
                    {u.vertical ? ` · ${u.vertical}` : ""}
                    {u.station ? ` · ${u.station}` : ""}
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-silver-ghost bg-charcoal text-[11px] text-cream/75">
                  {u.initials}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="glass-panel-dark p-6">
          <div className="mb-4 font-robinhood text-[11px] uppercase tracking-[0.24em] text-silver-dim/40">
            Preferences
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border border-white/[0.06] bg-charcoal/20 p-4 font-robinhood text-[13px] text-silver-dim/60">
              Theme: Dark (locked)
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-charcoal/20 p-4 font-robinhood text-[13px] text-silver-dim/60">
              Notifications: Enabled
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-charcoal/20 p-4 font-robinhood text-[13px] text-silver-dim/60">
              Session: Internal (mock)
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

