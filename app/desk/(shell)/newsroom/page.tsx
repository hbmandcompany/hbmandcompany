"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { useDesk } from "@/components/desk/DeskContext";
import { deskPaper } from "@/components/desk/desk-paper";
import { PaperStatusPill } from "@/components/desk/PaperStatusPill";
import type { DeskStatusTone } from "@/components/desk/StatusPill";

type StoryTab = "All" | "Drafts" | "In Review" | "Scheduled" | "Published";

type StoryRow = {
  status: string;
  tone: DeskStatusTone;
  headline: string;
  section: string;
  words: string;
  meta: string;
};

const stories: StoryRow[] = [
  {
    status: "DRAFT",
    tone: "neutral",
    headline: "The Federal Reserve's Digital Dollar and What It Means for Stablecoin Operators",
    section: "Finance",
    words: "1,240 words",
    meta: "Last edited 2 hours ago",
  },
  {
    status: "DRAFT",
    tone: "neutral",
    headline: "Inside the Collapse of a Dallas-Based Crypto Hedge Fund",
    section: "Investigations",
    words: "3,100 words",
    meta: "Last edited yesterday",
  },
  {
    status: "IN REVIEW",
    tone: "amber",
    headline: "Base Layer Infrastructure and the Race to DeFi Dominance",
    section: "Technology",
    words: "2,200 words",
    meta: "Submitted 3 days ago",
  },
  {
    status: "SCHEDULED",
    tone: "blue",
    headline: "The New Oil: How Sovereign Wealth Funds Are Positioning in Tokenized Assets",
    section: "Markets",
    words: "1,800 words",
    meta: "Publishing June 1",
  },
  {
    status: "PUBLISHED",
    tone: "green",
    headline: "Texas Capital Is Moving On-Chain and the State Knows It",
    section: "Texas Business",
    words: "900 words",
    meta: "Published May 12",
  },
  {
    status: "PUBLISHED",
    tone: "green",
    headline: "How Municipal Governments Are Experimenting With Blockchain-Based Toll Systems",
    section: "Infrastructure",
    words: "1,600 words",
    meta: "Published May 3",
  },
];

const chartBars = [
  { day: "Mon", pct: 60 },
  { day: "Tue", pct: 45 },
  { day: "Wed", pct: 80 },
  { day: "Thu", pct: 55 },
  { day: "Fri", pct: 90 },
  { day: "Sat", pct: 40 },
  { day: "Sun", pct: 30 },
];

const editorThreads = [
  {
    initials: "EV",
    name: "Elena Vasquez",
    role: "Editor in Chief",
    message:
      "Good work on the Federal Reserve piece. Please add a pull quote before the third paragraph and tighten the lede. Check sources on paragraph 6.",
    time: "9:41 AM today",
    unread: true,
  },
  {
    initials: "ML",
    name: "Marcus Lin",
    role: "Managing Editor",
    message:
      "The Dallas hedge fund story needs a conflict of interest disclosure added. Legal flagged it.",
    time: "Yesterday",
    unread: true,
  },
  {
    initials: "SM",
    name: "Sophie Maier",
    role: "Copy Desk",
    message: "Base Layer story has two AP Style violations. See tracked changes.",
    time: "2 days ago",
    unread: false,
  },
];

const checklist = [
  { label: "Headline and deck written", done: true },
  { label: "Lede paragraph locked", done: true },
  { label: "All sources attributed", done: true },
  { label: "Pull quote selected", done: false },
  { label: "SEO slug and meta description", done: false },
  { label: "Featured image uploaded", done: false },
  { label: "Editor approval received", done: false },
];

const deadlines = [
  { date: "May 25", title: "The Federal Reserve's Digital Dollar", section: "Finance" },
  { date: "May 28", title: "Dallas Crypto Hedge Fund Collapse", section: "Investigations" },
  { date: "June 1", title: "Sovereign Wealth Funds in Tokenized Assets", section: "Markets" },
  {
    date: "June 8",
    title: "Municipal Blockchain Toll Systems (Revision)",
    section: "Infrastructure",
  },
];

const tabs: StoryTab[] = ["All", "Drafts", "In Review", "Scheduled", "Published"];

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={clsx("shrink-0 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
        {title}
      </span>
      <div className="h-px flex-1 bg-[#bca882]/45" />
    </div>
  );
}

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={clsx(
        "rounded-md p-2 transition-colors",
        deskPaper.inkMeta,
        deskPaper.cardHover,
        "hover:text-[#20160d]"
      )}
    >
      {children}
    </button>
  );
}

function PencilIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4A7C59" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function EmptyCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9a8262" strokeWidth="1.4">
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  );
}

function WriterStat({
  label,
  value,
  subtext,
  accent,
}: {
  label: string;
  value: string;
  subtext: string;
  accent: string;
}) {
  return (
    <div className={clsx("rounded-md px-4 py-4", deskPaper.card)}>
      <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
        {label}
      </div>
      <div className={clsx("mt-2 font-robinhood text-2xl font-semibold", accent)}>{value}</div>
      <div className={clsx("mt-1 font-robinhood text-[11px]", deskPaper.inkMeta)}>{subtext}</div>
    </div>
  );
}

function PaperPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={clsx("rounded-md p-5", deskPaper.card)}>
      <div className={clsx("mb-4 font-robinhood text-[11px] uppercase tracking-[0.24em]", deskPaper.inkLabel)}>
        {title}
      </div>
      {children}
    </section>
  );
}

export default function NewsroomPage() {
  const { user } = useDesk();
  const [tab, setTab] = useState<StoryTab>("All");

  const today = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }, []);

  const filteredStories = useMemo(() => {
    if (tab === "All") return stories;
    if (tab === "Drafts") return stories.filter((s) => s.status === "DRAFT");
    if (tab === "In Review") return stories.filter((s) => s.status === "IN REVIEW");
    if (tab === "Scheduled") return stories.filter((s) => s.status === "SCHEDULED");
    return stories.filter((s) => s.status === "PUBLISHED");
  }, [tab]);

  const firstName = user.name.split(" ")[0] ?? user.name;

  return (
    <div className="flex min-h-[calc(100dvh-56px)] gap-6 px-6 py-6">
      <div className="min-w-0 flex-[0.65] space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <span className={clsx("font-cormorant text-sm uppercase tracking-[0.18em]", deskPaper.inkHeading)}>
              HBM &amp; Company — Editorial Newsroom
            </span>
            <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>{today}</span>
          </div>
          <div className="mt-3 h-px w-full bg-[#bca882]/45" />
        </div>

        <div>
          <h1 className={clsx("font-cormorant text-[28px]", deskPaper.inkHeading)}>
            Good morning, {firstName}.
          </h1>
          <p className={clsx("mt-2 font-robinhood text-xs", deskPaper.inkBody)}>
            Your editorial desk is ready. 3 stories awaiting review. 1 submitted to editor.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <WriterStat label="MY STORIES" value="12" subtext="3 in progress" accent="text-desk-blue" />
          <WriterStat label="SUBMITTED" value="4" subtext="awaiting editor review" accent="text-desk-amber" />
          <WriterStat label="PUBLISHED" value="7" subtext="last 30 days" accent="text-desk-green" />
          <WriterStat label="VIEWS TODAY" value="14.2K" subtext="across all bylines" accent="text-[#8d6f4d]" />
        </div>

        <section>
          <SectionHeading title="STORY QUEUE" />
          <div className="mb-4 flex gap-4">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={clsx(
                  "border-b-2 pb-2 font-robinhood text-[11px] uppercase tracking-[0.22em] transition-colors",
                  tab === t
                    ? clsx(deskPaper.accentBorder, deskPaper.inkHeading)
                    : clsx("border-transparent", deskPaper.inkMeta, "hover:text-[#20160d]")
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-0">
            {filteredStories.map((story) => (
              <div
                key={story.headline}
                className={clsx(
                  "flex items-start gap-4 rounded-md border-b px-2 py-4 transition-colors",
                  deskPaper.border,
                  deskPaper.cardHover
                )}
              >
                <PaperStatusPill label={story.status} tone={story.tone} className="mt-1 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className={clsx("truncate font-cormorant text-[17px]", deskPaper.inkHeading)}>
                    {story.headline}
                  </div>
                  <div className={clsx("mt-1 font-robinhood text-[10px] uppercase tracking-[0.18em]", deskPaper.inkBody)}>
                    {story.section} · {story.words}
                  </div>
                  <div className={clsx("mt-1 font-robinhood text-[11px]", deskPaper.inkMeta)}>{story.meta}</div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <IconButton label="Edit story">
                    <PencilIcon />
                  </IconButton>
                  <IconButton label="Submit story">
                    <SendIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className={clsx("flex items-center justify-between rounded-md p-5", deskPaper.card)}>
          <div className="flex items-center gap-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={deskPaper.accent}>
              <path d="M12 5v14M5 12h14" strokeWidth="1.6" />
            </svg>
            <div>
              <div className={clsx("font-cormorant text-xl", deskPaper.inkHeading)}>New Story</div>
              <div className={clsx("mt-1 font-robinhood text-xs", deskPaper.inkBody)}>
                Start a new article, feature, or investigation
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Article", "Feature", "Investigation"].map((type) => (
              <button
                key={type}
                type="button"
                className={clsx(
                  "rounded border px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-[0.18em] transition-colors",
                  deskPaper.border,
                  deskPaper.inkBody,
                  "hover:border-[#8d6f4d] hover:text-[#20160d]"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      <aside className="min-w-0 flex-[0.35] space-y-8">
        <PaperPanel title="ENGAGEMENT">
          <div className="mb-4 flex items-baseline gap-4">
            <span className={clsx("font-robinhood text-xs", deskPaper.inkHeading)}>Total Views: 14.2K</span>
            <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>Avg Read Time: 4m 12s</span>
          </div>
          <div className="flex h-28 items-end justify-between gap-2">
            {chartBars.map((bar) => (
              <div key={bar.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-24 w-full flex-col justify-end overflow-hidden rounded-sm bg-[#dcd0b8]">
                  <div className="w-full bg-[#8d6f4d]" style={{ height: `${bar.pct}%` }} />
                </div>
                <span className={clsx("font-robinhood text-[10px]", deskPaper.inkMeta)}>{bar.day}</span>
              </div>
            ))}
          </div>
        </PaperPanel>

        <section>
          <SectionHeading title="FROM THE EDITOR" />
          <div className="space-y-1">
            {editorThreads.map((thread) => (
              <div
                key={thread.name}
                className={clsx("flex cursor-pointer gap-3 rounded-md px-3 py-3 transition-colors", deskPaper.cardHover)}
              >
                {thread.unread ? (
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8d6f4d]" />
                ) : (
                  <span className="mt-2 h-1.5 w-1.5 shrink-0" />
                )}
                <div
                  className={clsx(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-robinhood text-[10px]",
                    deskPaper.border,
                    deskPaper.pageAlt,
                    deskPaper.inkHeading
                  )}
                >
                  {thread.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={clsx("font-robinhood text-[13px] font-medium", deskPaper.inkHeading)}>
                      {thread.name}
                    </span>
                    <span className={clsx("shrink-0 font-robinhood text-[10px]", deskPaper.inkMeta)}>
                      {thread.time}
                    </span>
                  </div>
                  <div className={clsx("font-robinhood text-[10px] uppercase tracking-wider", deskPaper.accent)}>
                    {thread.role}
                  </div>
                  <p className={clsx("mt-1 line-clamp-2 font-robinhood text-[12px]", deskPaper.inkBody)}>
                    {thread.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title="PRE-SUBMISSION" />
          <ul className="space-y-2">
            {checklist.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                {item.done ? <CheckIcon /> : <EmptyCheckIcon />}
                <span
                  className={clsx(
                    "font-robinhood text-[13px]",
                    item.done ? clsx(deskPaper.inkLabel, "line-through") : deskPaper.inkHeading
                  )}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading title="DEADLINES" />
          <div className="flex flex-col gap-3">
            {deadlines.map((d) => (
              <div
                key={d.title}
                className={clsx("flex gap-4 rounded px-2 py-2 transition-colors", deskPaper.cardHover)}
              >
                <div className={clsx("w-16 shrink-0 font-cormorant text-[15px]", deskPaper.accent)}>{d.date}</div>
                <div>
                  <div className={clsx("font-cormorant text-base", deskPaper.inkHeading)}>{d.title}</div>
                  <div className={clsx("font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkMeta)}>
                    {d.section}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
