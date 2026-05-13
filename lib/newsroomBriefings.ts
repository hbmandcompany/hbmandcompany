/** Shared newspaper stories for the hero carousel and editorial pages. */

export type NewsroomBriefing = {
  id: string;
  desk: string;
  section: string;
  headline: string;
  dek: string;
  byline: string;
  publishedAt: string;
  lede: string;
  body: readonly string[];
  metrics: readonly { label: string; value: string }[];
  related: readonly string[];
};

export const NEWSROOM_BRIEFINGS: readonly NewsroomBriefing[] = [
  {
    id: "1",
    desk: "On-chain",
    section: "Markets",
    headline:
      "Base L2 reserve flows hold above stress thresholds as institutional participation widens.",
    dek: "Read-only desk telemetry shows sustained custody-aligned activity without velocity spikes in retail channels.",
    byline: "HBM Markets Desk",
    publishedAt: "May 12, 2026",
    lede:
      "Reserve movement on Base has stayed inside institutional tolerance bands even as participation broadened, a pattern the house reads as coordinated treasury behavior rather than speculative spillover.",
    body: [
      "Across the session, monitored reserve wallets widened participation without reproducing the retail velocity spikes that usually destabilize settlement assumptions. The feed shows larger pools changing hands deliberately, with fewer signatures clustering around reflexive rotations.",
      "That matters because institutional mandates still price execution quality through resilience under scrutiny, not through raw throughput. A reserve environment that stays legible under pressure is easier to write into board materials and easier to defend in a diligence room.",
      "The desk's current read is that Base remains attractive when operators want verifiable activity with fewer narrative distortions. Capital may still move quickly, but the signal that survives review is the signal that arrived with discipline.",
    ],
    metrics: [
      { label: "Reserve breadth", value: "+18%" },
      { label: "Stress threshold", value: "Held" },
      { label: "Retail velocity", value: "Muted" },
    ],
    related: [
      "Treasury operators continue to prefer environments where reserve behavior reads cleanly under audit.",
      "Observed wallet clustering suggests planned deployment windows rather than reactive retail flows.",
      "Board-facing reporting quality remains a stronger adoption hinge than daily headline volume.",
    ],
  },
  {
    id: "2",
    desk: "Archival",
    section: "Infrastructure",
    headline:
      "Filecoin deal renewals lengthen median proof duration as mandates prioritize durable commitment.",
    dek: "Programs that bind economics to the dataset—not a monthly cloud line—continue to draw treasury attention.",
    byline: "HBM Infrastructure Desk",
    publishedAt: "May 12, 2026",
    lede:
      "Renewal behavior in Filecoin storage programs points toward a sharper preference for duration, replication, and proof surfaces that can be defended as institutional obligations rather than convenience purchases.",
    body: [
      "The most notable movement is not simply more storage, but longer proof duration attached to renewals. That changes the conversation from cost management to commitment design, which is exactly where treasury-minded buyers prefer to underwrite.",
      "Storage that encodes obligation to the dataset behaves differently from disposable cloud spend. The house continues to see interest where line items must map to durable records, controllable terms, and a custody story that does not vanish when vendors rotate.",
      "What looks quiet in the headline cycle often reads louder in diligence. When duration lengthens without marketing noise, the desk treats that as evidence that programs are being written for committees, not campaigns.",
    ],
    metrics: [
      { label: "Median renewal", value: "+23%" },
      { label: "Proof duration", value: "Longer" },
      { label: "Mandate bias", value: "Durability" },
    ],
    related: [
      "Institutional buyers still reward storage structures that read as commitments rather than subscriptions.",
      "Replication and renewal terms continue to matter more than short-lived cost optics.",
      "Archival programs with explicit proof surfaces remain easier to socialize up the chain of approval.",
    ],
  },
  {
    id: "3",
    desk: "Rails",
    section: "Adoption",
    headline:
      "Stellar gifting volume steadies after on-chain ledger rails expand for milestone programs.",
    dek: "Counterparties cite verifiable delivery and disclosure-friendly receipts as the hinge for adoption.",
    byline: "HBM Rails Desk",
    publishedAt: "May 11, 2026",
    lede:
      "Milestone-oriented gifting flows on Stellar are settling into a steadier rhythm as counterparties respond to receipt quality, permanent records, and interfaces that make ceremonial transfers feel institutionally usable.",
    body: [
      "The notable shift is not speculation around gifting mechanics, but the reduction in friction once ledger receipts become easy to archive and disclose. Programs tied to birthdays, recognition, and donor-facing milestones want warmth on the surface and certainty underneath.",
      "Counterparties continue to describe the same adoption hinge: can a transfer be proven, filed, and revisited without resorting to a custom reconciliation exercise? When the answer is yes, the rail becomes viable beyond novelty.",
      "For the desk, this is a reminder that consumer posture and institutional suitability are not opposites. When the record is permanent and the receipt is legible, softer use cases can still satisfy a rigorous operator.",
    ],
    metrics: [
      { label: "Volume", value: "Steady" },
      { label: "Receipt quality", value: "Improving" },
      { label: "Program fit", value: "Milestones" },
    ],
    related: [
      "Disclosure-friendly receipts remain central to broader program adoption.",
      "Counterparties value permanent records when ceremonial transfers must still satisfy controls.",
      "Ledger-native gifting gains traction when the interface softens without sacrificing proof.",
    ],
  },
  {
    id: "4",
    desk: "Governance",
    section: "Policy",
    headline:
      "Major L1 quorums maintain participation through cadence shift as delegation rules tighten.",
    dek: "The house tracks voting surfaces where outcomes remain legible to boards after the headline cycle fades.",
    byline: "HBM Governance Desk",
    publishedAt: "May 10, 2026",
    lede:
      "Participation stayed intact through a voting cadence shift this week, suggesting the strongest governance surfaces are the ones that preserve readability even as procedures become more exacting.",
    body: [
      "Delegation rules tightened without collapsing participation, a small but meaningful sign that process quality did not come at the expense of turnout. That balance is difficult to sustain, and boards notice when it holds.",
      "The house continues to watch governance venues where a vote can still be explained months later in ordinary language. Procedures may be technical, but the outcome must remain defensible to committees, auditors, and counterparties who arrive after the drama has passed.",
      "In practice, that means governance quality is measured less by spectacle and more by whether the full record can survive archival review. Cadence changes matter; archival legibility matters more.",
    ],
    metrics: [
      { label: "Participation", value: "Held" },
      { label: "Rule set", value: "Tighter" },
      { label: "Board legibility", value: "High" },
    ],
    related: [
      "Governance remains strongest where archival review is treated as a first-order requirement.",
      "Delegation discipline can coexist with participation when the rules are explicit and portable.",
      "The desk prioritizes voting surfaces that remain understandable after the narrative cycle ends.",
    ],
  },
];

/** ISO calendar date (YYYY-MM-DD). Bump when briefings change. */
export const BRIEFING_UPDATED_AT = "2026-05-12";

export function formatBriefingDateLongLocal(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getBriefingUpdatedLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return formatBriefingDateLongLocal(iso);
  const updatedStart = new Date(y, m - 1, d);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const u = new Date(updatedStart.getFullYear(), updatedStart.getMonth(), updatedStart.getDate()).getTime();
  if (u === todayStart.getTime()) return "Today";
  if (u === yesterdayStart.getTime()) return "Yesterday";
  return formatBriefingDateLongLocal(iso);
}

export function getBriefingById(id: string): NewsroomBriefing | undefined {
  return NEWSROOM_BRIEFINGS.find((b) => b.id === id);
}
