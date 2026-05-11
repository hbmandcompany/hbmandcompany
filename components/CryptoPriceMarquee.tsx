import MarqueeStrip from "@/components/MarqueeStrip";

/** CoinGecko ids → short ticker labels for the marquee */
const ASSETS = [
  { id: "bitcoin", label: "BTC" },
  { id: "ethereum", label: "ETH" },
  { id: "solana", label: "SOL" },
  { id: "avalanche-2", label: "AVAX" },
  { id: "matic-network", label: "MATIC" },
  { id: "arbitrum", label: "ARB" },
  { id: "optimism", label: "OP" },
  { id: "cosmos", label: "ATOM" },
  { id: "polkadot", label: "DOT" },
  { id: "near-protocol", label: "NEAR" },
  { id: "sui", label: "SUI" },
  { id: "aptos", label: "APT" },
] as const;

function fallbackItems(): string[] {
  return ASSETS.map(({ label }) => `${label} · …`);
}

async function getPriceItems(): Promise<string[]> {
  try {
    const ids = ASSETS.map((a) => a.id).join(",");
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return fallbackItems();

    const data = (await res.json()) as Record<string, { usd?: number } | undefined>;

    const fmt = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

    return ASSETS.map(({ id, label }) => {
      const usd = data[id]?.usd;
      if (typeof usd !== "number" || Number.isNaN(usd)) {
        return `${label} · …`;
      }
      return `${label} ${fmt.format(usd)}`;
    });
  } catch {
    return fallbackItems();
  }
}

interface CryptoPriceMarqueeProps {
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
}

export default async function CryptoPriceMarquee({
  reverse = false,
  speed = "slow",
}: CryptoPriceMarqueeProps) {
  const items = await getPriceItems();
  return <MarqueeStrip items={items} reverse={reverse} speed={speed} />;
}
