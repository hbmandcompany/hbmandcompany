export type DeskInboxCategory = "Tasks" | "Governance" | "Wallet" | "Calendar" | "Submissions" | "Board";

export type DeskInboxItem = {
  id: string;
  category: DeskInboxCategory;
  source: string;
  subject: string;
  preview: string;
  tsLabel: string;
  unread: boolean;
  starred?: boolean;
  priority?: "Urgent" | "High" | "Normal" | "Low";
};

export const deskInboxItems: DeskInboxItem[] = [
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
];
