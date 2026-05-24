export type DeskInboxCategory = "Editor" | "Stories" | "Wallet" | "Meetings";

export type DeskInboxItem = {
  id: string;
  category: DeskInboxCategory;
  source: string;
  subject: string;
  preview: string;
  body: string;
  tsLabel: string;
  unread: boolean;
  starred?: boolean;
  priority?: "Urgent" | "High" | "Normal" | "Low";
};

export const deskInboxItems: DeskInboxItem[] = [
  {
    id: "i-01",
    category: "Editor",
    source: "Elena Vasquez",
    subject: "Returned for edits — Base Layer Infrastructure",
    preview: "Strong opening. Tighten the Base vs Arbitrum comparison in section three and add a source on throughput claims.",
    body: "Strong opening. Tighten the Base vs Arbitrum comparison in section three and add a source on throughput claims.\n\nPlease resubmit by end of day Friday. Notes are inline in the editor.",
    tsLabel: "09:12",
    unread: true,
    priority: "High",
    starred: true,
  },
  {
    id: "i-02",
    category: "Stories",
    source: "Desk",
    subject: "Filing due tomorrow — Dallas hedge fund investigation",
    preview: "Draft is at 3,100 words. Editor review slot reserved for 2:00 PM if submitted on time.",
    body: "Draft is at 3,100 words. Editor review slot reserved for 2:00 PM if submitted on time.\n\nTarget length: 3,200 words. Section: Investigations.",
    tsLabel: "08:44",
    unread: true,
    priority: "Urgent",
  },
  {
    id: "i-03",
    category: "Wallet",
    source: "Editorial Payroll",
    subject: "Payout posted — Texas Capital Is Moving On-Chain",
    preview: "$810.00 deposited to your contributor wallet. Base rate $720 + $90 view bonus.",
    body: "$810.00 deposited to your contributor wallet.\n\nBase rate: $720\nView bonus: $90\nTotal: $810\n\nFunds typically post to your linked bank account on Fridays.",
    tsLabel: "Yesterday",
    unread: true,
    priority: "Normal",
  },
  {
    id: "i-04",
    category: "Meetings",
    source: "Calendar",
    subject: "Editorial standup — today at 11:00 AM",
    preview: "Newsroom · Room A. Agenda: weekly filings, pitch queue, and publish schedule.",
    body: "Editorial standup — newsroom\n\nWhen: Today, 11:00 AM · 30 min\nWhere: Newsroom · Room A\n\nAgenda:\n· Weekly filings status\n· Pitch queue review\n· Publish schedule for next week",
    tsLabel: "Yesterday",
    unread: false,
  },
  {
    id: "i-05",
    category: "Editor",
    source: "Elena Vasquez",
    subject: "Approved — Sovereign Wealth Funds in Tokenized Assets",
    preview: "Clears for scheduling. Publish date set to June 1. No further edits required.",
    body: "Clears for scheduling. Publish date set to June 1. No further edits required.\n\nNice work on the sovereign fund sourcing — that section reads cleanly.",
    tsLabel: "Mon",
    unread: false,
  },
  {
    id: "i-06",
    category: "Stories",
    source: "Desk",
    subject: "Scheduled publish — June 1",
    preview: "The New Oil: How Sovereign Wealth Funds Are Positioning in Tokenized Assets is queued for publication.",
    body: "The New Oil: How Sovereign Wealth Funds Are Positioning in Tokenized Assets is queued for publication on June 1 at 6:00 AM CT.\n\nYou will receive a confirmation when the story goes live.",
    tsLabel: "Mon",
    unread: true,
  },
  {
    id: "i-07",
    category: "Wallet",
    source: "Editorial Payroll",
    subject: "Payment in review — Federal Reserve digital dollar draft",
    preview: "Article payout of $850 pending editor approval. Expected within 48 hours of publish.",
    body: "Article payout of $850 is pending editor approval for your Federal Reserve digital dollar draft.\n\nExpected processing within 48 hours of final publish confirmation.",
    tsLabel: "Sun",
    unread: false,
  },
  {
    id: "i-08",
    category: "Editor",
    source: "Sophie Maier",
    subject: "Notes on Federal Reserve digital dollar draft",
    preview: "Add one paragraph on stablecoin operator licensing implications. Otherwise on track for review.",
    body: "Add one paragraph on stablecoin operator licensing implications. Otherwise on track for review.\n\nHappy to discuss on tomorrow's pitch review if helpful.",
    tsLabel: "Sun",
    unread: true,
    priority: "Normal",
  },
];

export function mailboxUnreadCount(items: DeskInboxItem[] = deskInboxItems) {
  return items.filter((i) => i.unread).length;
}
