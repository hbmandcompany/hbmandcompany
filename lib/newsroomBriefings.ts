/** House newsroom — synced with hero carousel and /newsroom. */

export const NEWSROOM_BRIEFINGS = [
  {
    id: "1",
    desk: "On-chain",
    headline:
      "Base L2 reserve flows hold above stress thresholds as institutional participation widens.",
    dek: "Read-only desk telemetry shows sustained custody-aligned activity without velocity spikes in retail channels.",
  },
  {
    id: "2",
    desk: "Archival",
    headline:
      "Filecoin deal renewals lengthen median proof duration as mandates prioritize durable commitment.",
    dek: "Programs that bind economics to the dataset—not a monthly cloud line—continue to draw treasury attention.",
  },
  {
    id: "3",
    desk: "Rails",
    headline:
      "Stellar gifting volume steadies after on-chain ledger rails expand for milestone programs.",
    dek: "Counterparties cite verifiable delivery and disclosure-friendly receipts as the hinge for adoption.",
  },
  {
    id: "4",
    desk: "Governance",
    headline:
      "Major L1 quorums maintain participation through cadence shift as delegation rules tighten.",
    dek: "The house tracks voting surfaces where outcomes remain legible to boards after the headline cycle fades.",
  },
] as const;

export type NewsroomBriefing = (typeof NEWSROOM_BRIEFINGS)[number];

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
