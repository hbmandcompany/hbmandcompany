"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { useDesk } from "@/components/desk/DeskContext";
import { deskPaper } from "@/components/desk/desk-paper";
import { PaperStatusPill } from "@/components/desk/PaperStatusPill";

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>{title}</div>
      {description ? <p className={clsx("mt-1 font-robinhood text-[12px]", deskPaper.inkMeta)}>{description}</p> : null}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className={clsx("mb-1.5 block font-robinhood text-[10px] uppercase tracking-[0.16em]", deskPaper.inkLabel)}>
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={clsx(
        "h-9 w-full rounded-md border px-3 font-robinhood text-[13px] outline-none transition-colors",
        deskPaper.input
      )}
    />
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className={clsx("flex items-center justify-between gap-4 rounded-md border px-4 py-3", deskPaper.border, "bg-[#f2e6d1]")}>
      <div className="min-w-0 flex-1">
        <div className={clsx("font-robinhood text-[13px]", deskPaper.inkHeading)}>{label}</div>
        <div className={clsx("mt-0.5 font-robinhood text-[11px]", deskPaper.inkMeta)}>{description}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border p-0.5 transition-colors duration-200",
          checked ? "border-[#6a5843] bg-[#8d6f4d]" : clsx(deskPaper.border, "bg-[#dcd0b8]")
        )}
      >
        <span
          aria-hidden
          className={clsx(
            "pointer-events-none block h-5 w-5 rounded-full bg-[#f2e6d1] shadow-sm transition-transform duration-200 ease-in-out",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}

export default function DeskSettingsPage() {
  const { user } = useDesk();
  const firstName = user.name.split(" ")[0] ?? user.name;

  const [byline, setByline] = useState(user.name);
  const [email, setEmail] = useState(`${firstName.toLowerCase()}@hbmand.co`);
  const [bio, setBio] = useState("Finance and markets correspondent covering stablecoins, regional banking, and Texas capital flows.");

  const [notifyEditorFeedback, setNotifyEditorFeedback] = useState(true);
  const [notifyPublish, setNotifyPublish] = useState(true);
  const [notifyPayments, setNotifyPayments] = useState(true);
  const [notifyDeadlines, setNotifyDeadlines] = useState(true);
  const [digestWeekly, setDigestWeekly] = useState(false);

  return (
    <div className="min-h-[calc(100dvh-56px)] px-6 py-8">
      <div className="mb-8">
        <h1 className={clsx("font-cormorant text-4xl", deskPaper.inkHeading)}>Settings</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-6">
          {/* Profile */}
          <section className={clsx("rounded-md p-5", deskPaper.card)}>
            <SectionHeading title="Profile & byline" description="How you appear on published pieces and in the desk directory." />

            <div className="mb-5 flex items-center gap-4">
              <div
                className={clsx(
                  "flex h-14 w-14 items-center justify-center rounded-full border font-robinhood text-lg",
                  deskPaper.avatar
                )}
              >
                {user.initials}
              </div>
              <div>
                <div className={clsx("font-robinhood text-[15px] font-medium", deskPaper.inkHeading)}>{user.name}</div>
                <div className="mt-1 flex items-center gap-2">
                  <PaperStatusPill label="Contributor" tone="green" className="scale-90" />
                  <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>Editorial Newsroom</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Byline</FieldLabel>
                <TextInput value={byline} onChange={setByline} placeholder="Display name on articles" />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <TextInput type="email" value={email} onChange={setEmail} placeholder="you@hbmand.co" />
              </div>
              <div className="sm:col-span-2">
                <FieldLabel>Bio</FieldLabel>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className={clsx(
                    "w-full resize-none rounded-md border px-3 py-2 font-robinhood text-[13px] outline-none transition-colors",
                    deskPaper.input
                  )}
                />
              </div>
            </div>
          </section>

          {/* Account */}
          <section className={clsx("rounded-md p-5", deskPaper.card)}>
            <SectionHeading title="Account" description="Security and session for your contributor login." />

            <div className={clsx("space-y-3 rounded-md border p-4", deskPaper.border, "bg-[#f2e6d1]")}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className={clsx("font-robinhood text-[13px]", deskPaper.inkHeading)}>Password</div>
                  <div className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>Last changed 42 days ago</div>
                </div>
                <button
                  type="button"
                  className={clsx(
                    "rounded border px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                    deskPaper.border,
                    deskPaper.inkMeta,
                    deskPaper.hover
                  )}
                >
                  Update
                </button>
              </div>
              <div className={clsx("h-px", deskPaper.divider)} />
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className={clsx("font-robinhood text-[13px]", deskPaper.inkHeading)}>Active session</div>
                  <div className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>This device · Dallas, TX</div>
                </div>
                <button
                  type="button"
                  className={clsx(
                    "rounded border px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                    deskPaper.border,
                    deskPaper.inkMeta,
                    deskPaper.hover
                  )}
                >
                  Sign out
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <section className={clsx("rounded-md p-5", deskPaper.card)}>
            <SectionHeading title="Notifications" description="Choose what reaches your inbox and desk alerts." />

            <div className="space-y-2">
              <ToggleRow
                label="Editor feedback"
                description="Notes, returns, and approval on submissions."
                checked={notifyEditorFeedback}
                onChange={setNotifyEditorFeedback}
              />
              <ToggleRow
                label="Publish confirmations"
                description="When a story goes live under your byline."
                checked={notifyPublish}
                onChange={setNotifyPublish}
              />
              <ToggleRow
                label="Payment alerts"
                description="Payout posted to your contributor wallet."
                checked={notifyPayments}
                onChange={setNotifyPayments}
              />
              <ToggleRow
                label="Deadline reminders"
                description="24-hour notice before filing is due."
                checked={notifyDeadlines}
                onChange={setNotifyDeadlines}
              />
              <ToggleRow
                label="Weekly performance digest"
                description="Sunday summary of views and engagement."
                checked={digestWeekly}
                onChange={setDigestWeekly}
              />
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="button"
              className={clsx(
                "rounded-md border px-5 py-2.5 font-robinhood text-[11px] uppercase tracking-[0.2em] transition-colors",
                "border-[#6a5843] bg-[#8d6f4d] text-[#f2e6d1] hover:bg-[#6a5843]"
              )}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
