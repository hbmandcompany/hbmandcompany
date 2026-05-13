/** Snapshot of the current Vanity.company library + governance surface for HBM review pages. */

export const VANITY_FEED_UPDATED_AT = "2026-05-13";

export const VANITY_LIBRARY_ENTRIES = [
  {
    id: "clinical-safety-publication-standard",
    section: "Governance theory / Clinical interfaces",
    title: "Clinical safety as a publication standard: review gates tied to on-chain execution",
    author: "Protocol Editorial Board",
    publishedAt: "May 2026",
    excerpt:
      "This paper specifies how peer deliberation, mandatory disclosure of conflicts, and post-execution audit trails interlock when funded interventions touch patient populations.",
    href: "https://vanity.company/library/clinical-safety-publication-standard",
  },
  {
    id: "conflict-of-interest-registries",
    section: "Policy · Disclosure",
    title: "On the limits of conflict-of-interest registries in donor-directed health research",
    author: "K. Levin, MD, MSc",
    publishedAt: "April 2026",
    excerpt:
      "Registries that record affiliations without incentives produce an audit surface that is legible but not informative. Vanity proposes an instrument that records both against the protocol primary key.",
    href: "https://vanity.company",
  },
  {
    id: "longitudinal-cohort-notes",
    section: "Field reports · Methods",
    title: "Notes from the longitudinal cohort: instrumentation, attrition, and the cost of clean data",
    author: "Vanity Field Methods Group",
    publishedAt: "March 2026",
    excerpt:
      "Field reports from year zero of the cohort study, with attention to how instrumentation choices made under budgetary pressure produce downstream costs in inference.",
    href: "https://vanity.company",
  },
] as const;

export const VANITY_GOVERNANCE_ITEMS = [
  {
    title: "Allocate reserve flow to longitudinal cohort instrumentation (Year 1)",
    category: "Treasury · Field methods",
    closes: "18 May 2026",
    stage: "Second reading",
    href: "https://vanity.company/governance/proposals/longitudinal-cohort-y1",
  },
  {
    title: "Amend disclosure thresholds for donor-directed research sponsorship",
    category: "Policy · Transparency",
    closes: "22 May 2026",
    stage: "Deliberation",
    href: "https://vanity.company/governance/proposals/disclosure-thresholds",
  },
  {
    title: "Establish cold standby for oracle failover under emergency governance",
    category: "Governance · Infrastructure",
    closes: "29 May 2026",
    stage: "Review",
    href: "https://vanity.company/governance/proposals/oracle-failover",
  },
] as const;

export const VANITY_ARCHIVE_ITEMS = [
  {
    index: "§ 01",
    title: "Operating Agreement — Hated By Many LLC",
    meta: "Foundational instrument · 2026 · En vigueur",
    href: "https://vanity.company/archive/operating-agreement",
  },
  {
    index: "§ 02",
    title: "Protocol Whitepaper",
    meta: "Technical · 2026 · Rév. 3",
    href: "https://vanity.company/archive/whitepaper",
  },
  {
    index: "§ 03",
    title: "Clinical Safety Review Standards",
    meta: "Standards · 2026 · En vigueur",
    href: "https://vanity.company/archive/clinical-safety-standards",
  },
  {
    index: "§ 04",
    title: "Q1 Treasury Audit",
    meta: "Audit report · 2026 · Déposé",
    href: "https://vanity.company/archive/q1-audit-2026",
  },
] as const;

export const VANITY_EDITOR_NOTE =
  "Vanity positions itself as a health research library and governance protocol: scholarly apparatus first, chain-native operations second. The HBM research page below presents that feed as an editorial review surface rather than a dashboard.";
