const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "..", "components", "HomePageClient.tsx");
let s = fs.readFileSync(p, "utf8");

const start = s.indexOf("const whatWeBuildItems");
const end = s.indexOf("const featuredWork:");

if (start >= 0 && end >= 0) {
const insert = `const featuredStories: MagazineStory[] = [
  {
    storyId: "algorithm-drops",
    category: "Music Intelligence",
    headline: "The Algorithm Knows What Drops Next",
    dek: "How on-chain data is predicting breakout artists before the playlists catch up. A new class of tools is giving labels and independents the same edge.",
    dateline: "May 16, 2026 · New York",
    pixelVariant: "lightrain",
  },
  {
    storyId: "film-on-chain",
    category: "Film & Capital",
    headline: "Film Financing Goes On-Chain",
    dek: "Independent studios are bypassing traditional funding by tokenising production rights on Base and Stellar.",
    dateline: "May 14, 2026 · Los Angeles",
    pixelVariant: "moneyba",
  },
  {
    storyId: "culture-tax",
    category: "Culture & Rights",
    headline: "The Culture Tax: Who Owns the Sound of a Generation",
    dek: "As streaming margins compress, a quiet war over IP ownership is reshaping who gets paid — and who disappears.",
    dateline: "May 12, 2026 · London",
    pixelVariant: "black-letter",
  },
];

const goldOutlineCta =
  "gold-outline-btn inline-block px-4 py-1.5 text-label-xs uppercase tracking-[0.2em] sm:px-5 sm:py-2";

`;

s = s.slice(0, start) + insert + s.slice(end);
}

const suiteStart = s.indexOf("const featuredWork:");
const suiteEnd = s.indexOf("const heroEase");
if (suiteStart < 0 || suiteEnd < 0) throw new Error("suite markers not found");
const suiteInsert = `const suiteSections: SuiteStory[] = [
  {
    storyId: "artists-on-chain",
    title: "The 52 Ways Artists Are Earning On-Chain",
    category: "DeFi Yield Discovery",
    description:
      "From streaming residuals to protocol yield, a new ledger of artist income is emerging — mapped chain by chain, venue by venue, and royalty line by royalty line.",
    stat: "Multi-chain",
    pixelVariant: "pickup",
  },
  {
    storyId: "threewisemen-xlm",
    title: "ThreeWiseMen: When XLM Becomes a Love Language",
    category: "On-Chain Gifting",
    description:
      "On Stellar, a gift is never just a transfer — it is a timestamped gesture in a culture that increasingly records affection on-chain.",
    stat: "Stellar / XLM",
    pixelVariant: "spatial",
  },
];

`;
s = s.slice(0, suiteStart) + suiteInsert + s.slice(suiteEnd);

fs.writeFileSync(p, s, "utf8");
console.log("patched featuredStories and suiteSections");
