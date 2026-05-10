"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import SectionReveal from "@/components/SectionReveal";
import AnimatedHeadline from "@/components/AnimatedHeadline";

type Category = "All" | "Protocol" | "DeFi" | "Custody" | "Governance" | "Infrastructure";

const categories: Category[] = ["All", "Protocol", "DeFi", "Custody", "Governance", "Infrastructure"];

const portfolio = [
  {
    title: "Nexus Protocol",
    category: "Protocol",
    description:
      "A zero-knowledge rollup protocol processing 50,000+ transactions per second with sub-cent finality costs. Built for institutional DeFi applications requiring enterprise-grade throughput.",
    stat: "$2.4B TVL",
    year: "2023",
    status: "Live",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    tags: ["ZK Rollup", "L2", "Ethereum"],
  },
  {
    title: "Aurum Vault",
    category: "Custody",
    description:
      "Enterprise multi-party computation custody protocol with regulatory approval across 14 jurisdictions. The gold standard in institutional digital asset security.",
    stat: "$890M Secured",
    year: "2022",
    status: "Live",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200&q=80",
    tags: ["MPC", "Custody", "Compliance"],
  },
  {
    title: "Meridian DAO",
    category: "Governance",
    description:
      "On-chain governance framework managing protocol upgrades and treasury allocation for a top-20 DeFi protocol. Transparent, autonomous, and manipulation-resistant.",
    stat: "340K Holders",
    year: "2023",
    status: "Live",
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1200&q=80",
    tags: ["DAO", "Governance", "DeFi"],
  },
  {
    title: "Obsidian Bridge",
    category: "Infrastructure",
    description:
      "Cross-chain bridge infrastructure supporting atomic swaps across 9 blockchain networks. Battle-tested with zero exploits and $500M+ in cumulative volume.",
    stat: "$1.1B Volume",
    year: "2022",
    status: "Live",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    tags: ["Bridge", "Cross-chain", "Security"],
  },
  {
    title: "Quorum Finance",
    category: "DeFi",
    description:
      "Institutional lending protocol with credit-based lending, undercollateralized positions for vetted counterparties, and automated risk management.",
    stat: "$670M Loans",
    year: "2023",
    status: "Live",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
    tags: ["Lending", "Credit", "Institutional"],
  },
  {
    title: "Strata Consensus",
    category: "Protocol",
    description:
      "Novel proof-of-stake consensus mechanism with 3-second finality, Byzantine fault tolerance, and validator economics optimized for long-term network security.",
    stat: "99.97% Uptime",
    year: "2024",
    status: "Live",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80",
    tags: ["Consensus", "PoS", "L1"],
  },
  {
    title: "Iron Treasury",
    category: "DeFi",
    description:
      "Automated on-chain treasury management protocol. Optimizes yield across money markets, liquidity pools, and structured products without custodial risk.",
    stat: "$340M AUM",
    year: "2024",
    status: "Beta",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80",
    tags: ["Treasury", "Automation", "Yield"],
  },
  {
    title: "Cipher Network",
    category: "Infrastructure",
    description:
      "Privacy-preserving data oracle network enabling confidential smart contracts for enterprise applications without compromising on-chain verifiability.",
    stat: "12 Enterprise Clients",
    year: "2024",
    status: "Beta",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80",
    tags: ["Oracle", "Privacy", "Enterprise"],
  },
  {
    title: "Sovereign Node Network",
    category: "Governance",
    description:
      "Decentralized physical infrastructure network for running validator nodes with hardware attestation, slashing insurance, and automated operator rotation.",
    stat: "47 Active Nodes",
    year: "2024",
    status: "Live",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    tags: ["Validators", "DePIN", "Infrastructure"],
  },
];

const statusColors = {
  Live: "text-gold border-gold/40",
  Beta: "text-silver border-silver/30",
  Building: "text-garnet border-garnet/40",
};

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === activeCategory);

  return (
    <>
      <NavBar />

      {/* ——— HERO ——— */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=90"
            alt="Protocol network"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/60 to-void" />
          <div className="absolute inset-0 hero-glow" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-mono-hbm text-label-sm text-gold uppercase tracking-[0.3em] block mb-6"
          >
            — Portfolio
          </motion.span>
          <h1 className="font-cormorant text-display-xl text-cream font-light leading-none mb-6">
            <AnimatedHeadline text="Built to" delay={0.2} />
            {" "}
            <AnimatedHeadline
              text="Last"
              delay={0.5}
              className="text-gradient-gold font-bold italic"
            />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono-hbm text-body-lg text-silver max-w-lg"
          >
            {portfolio.length} protocols. Three continents. Twelve jurisdictions.
            All operating.
          </motion.p>
        </div>
      </section>

      {/* ——— FILTER + GRID ——— */}
      <section className="relative py-16 md:py-24 bg-midnight">
        <div className="absolute inset-0 city-glow pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Filter tabs */}
          <SectionReveal className="mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-mono-hbm text-label-xs uppercase tracking-[0.2em] px-4 py-2 border transition-all duration-300 ${
                    activeCategory === cat
                      ? "border-gold/50 text-gold bg-gold/[0.06] rounded-xl"
                      : "border-white/[0.06] text-silver-dim/50 hover:border-gold/30 hover:text-cream rounded-xl"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </SectionReveal>

          {/* Portfolio grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative overflow-hidden cursor-pointer h-[380px] md:h-[420px]"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-void/10" />

                  {/* Gold hover overlay */}
                  <div className="absolute inset-0 bg-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top border on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gold/[0.08] group-hover:bg-gold/50 transition-all duration-500" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    {/* Top row */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1.5">
                        <span
                          className={`font-mono-hbm text-label-xs uppercase tracking-[0.2em] border px-2 py-0.5 w-fit ${
                            statusColors[item.status as keyof typeof statusColors]
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="font-mono-hbm text-label-xs text-silver-dim uppercase tracking-[0.15em]">
                          {item.year}
                        </span>
                      </div>
                      <span className="font-cormorant text-display-sm text-gold/80 font-bold">
                        {item.stat}
                      </span>
                    </div>

                    {/* Bottom row */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="glass-panel-dark font-mono-hbm text-[10px] text-silver-dim uppercase tracking-[0.15em] px-2 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-cormorant text-display-sm text-cream font-light mb-2 group-hover:text-gold transition-colors duration-400">
                        {item.title}
                      </h3>
                      <p className="font-mono-hbm text-[12px] text-silver leading-relaxed max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-in-out">
                        {item.description}
                      </p>
                      <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <span className="font-mono-hbm text-label-xs text-gold uppercase tracking-[0.2em]">
                          View Case
                        </span>
                        <div className="w-6 h-px bg-gold" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <section className="relative py-24 md:py-32 bg-obsidian">
        <div className="absolute inset-0 city-glow pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <SectionReveal>
            <h2 className="font-cormorant text-display-lg text-cream font-light mb-6">
              Want to build the{" "}
              <span className="text-gradient-gold italic font-bold">next one?</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="font-mono-hbm text-body-md text-silver-dim mb-10 max-w-md mx-auto">
              We partner with founders and institutions building critical
              infrastructure for decentralized finance.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <Link
              href="/contact"
              className="garnet-btn font-mono-hbm text-label-sm uppercase tracking-[0.25em] text-void px-12 py-5 inline-block"
            >
              Begin Engagement
            </Link>
          </SectionReveal>
        </div>
      </section>

      <FooterDark />
    </>
  );
}


