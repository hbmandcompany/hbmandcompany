"use client";

import { useState } from "react";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import SectionReveal from "@/components/SectionReveal";
import { ShopComingSoonModal } from "@/components/shop/ShopComingSoonModal";

type Category = "all" | "apparel" | "tech" | "accessories";

interface Product {
  id: number;
  category: "apparel" | "tech" | "accessories";
  name: string;
  price: string;
  tag: string;
  desc: string;
  image: string;
  sold: boolean;
}

const products: Product[] = [
  /* ── APPAREL ── */
  {
    id: 1,
    category: "apparel",
    name: "HBM Monogram Hoodie",
    price: "$285",
    tag: "New Drop",
    desc: "400gsm heavyweight French terry. Embroidered HBM monogram at chest and back yoke.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    sold: false,
  },
  {
    id: 2,
    category: "apparel",
    name: "The Firm Crewneck",
    price: "$195",
    tag: "Limited",
    desc: "Relaxed oversized fit. Woven label. Garment-dyed obsidian.",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    sold: false,
  },
  {
    id: 3,
    category: "apparel",
    name: "Protocol Tee",
    price: "$95",
    tag: "",
    desc: "230gsm ring-spun cotton. Boxy cut. HBM wordmark back print.",
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80",
    sold: false,
  },
  {
    id: 4,
    category: "apparel",
    name: "Holdings Cargo",
    price: "$345",
    tag: "New Drop",
    desc: "Technical ripstop. 8 pockets. Adjustable hem. HBM hardware.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4545?w=800&q=80",
    sold: true,
  },
  {
    id: 5,
    category: "apparel",
    name: "Private Equity Coach Jacket",
    price: "$495",
    tag: "Limited",
    desc: "Satin shell. Quilted lining. HBM embroidered crest at chest.",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    sold: false,
  },
  {
    id: 6,
    category: "apparel",
    name: "Venture Track Pant",
    price: "$185",
    tag: "",
    desc: "Technical twill. Tapered silhouette. Side zip ankles. Tonal HBM woven.",
    image: "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80",
    sold: false,
  },
  /* ── TECH ── */
  {
    id: 7,
    category: "tech",
    name: "Terminal Desk Mat",
    price: "$165",
    tag: "",
    desc: "Full-grain vegetable-tanned leather. 90×45cm. HBM debossed logo.",
    image: "https://images.unsplash.com/photo-1593152167544-085d3b9c4938?w=800&q=80",
    sold: false,
  },
  {
    id: 8,
    category: "tech",
    name: "Signal AirPods Case",
    price: "$85",
    tag: "New Drop",
    desc: "AirPods Pro 2. CNC-milled anodized aluminum. Laser-etched monogram.",
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=800&q=80",
    sold: false,
  },
  {
    id: 9,
    category: "tech",
    name: "HBM Digital Key",
    price: "$395",
    tag: "Limited",
    desc: "Cold-storage hardware wallet. Custom firmware. Titanium finish. Numbered.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    sold: false,
  },
  {
    id: 10,
    category: "tech",
    name: "Protocol Notebook",
    price: "$55",
    tag: "",
    desc: "A5 lay-flat. 120gsm cream pages. Debossed HBM cover. Thread-bound.",
    image: "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=800&q=80",
    sold: false,
  },
  /* ── ACCESSORIES ── */
  {
    id: 11,
    category: "accessories",
    name: "Monogram 6-Panel",
    price: "$125",
    tag: "New Drop",
    desc: "Structured wool-blend. Leather strap. Embroidered HBM crest.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    sold: false,
  },
  {
    id: 12,
    category: "accessories",
    name: "The Firm Tote",
    price: "$285",
    tag: "",
    desc: "600D canvas. Full-grain leather handles and base. 30L.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    sold: false,
  },
  {
    id: 13,
    category: "accessories",
    name: "Holdings Wallet",
    price: "$195",
    tag: "Limited",
    desc: "Full-grain vegetable-tanned leather. 8 card slots. RFID block.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
    sold: true,
  },
  {
    id: 14,
    category: "accessories",
    name: "HBM Dog Tag",
    price: "$65",
    tag: "",
    desc: "316L surgical steel. HBM & Co. precision-engraved. Ball chain included.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
    sold: false,
  },
  {
    id: 15,
    category: "accessories",
    name: "Executive Card Case",
    price: "$145",
    tag: "New Drop",
    desc: "Slim profile. Full-grain leather. Magnetic closure. Up to 12 cards.",
    image: "https://images.unsplash.com/photo-1624811533744-f85d5325d49c?w=800&q=80",
    sold: false,
  },
];

const categories: { id: Category; label: string }[] = [
  { id: "all",         label: "All"         },
  { id: "apparel",     label: "Apparel"     },
  { id: "tech",        label: "Tech"        },
  { id: "accessories", label: "Accessories" },
];

const pillars = [
  {
    title: "Materials",
    body: "Every fabric and material is sourced from vetted mills and tanneries. No shortcuts. No compromises.",
  },
  {
    title: "Production",
    body: "Limited runs only. Each piece is numbered. Made to outlast the trend cycle and hold its value.",
  },
  {
    title: "Access",
    body: "HBM Goods drops are exclusive. Cardholders get 72-hour early access before any public release.",
  },
];

export default function ShopPage() {
  const [active, setActive] = useState<Category>("all");

  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <ShopComingSoonModal />
      <NavBar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative flex min-h-screen min-h-[100dvh] flex-col justify-end pb-[max(4rem,env(safe-area-inset-bottom,1rem))] pt-[calc(env(safe-area-inset-top,0px)+7rem)]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=90"
            alt="HBM Goods — The Collection"
            fill
            className="object-cover object-top grayscale"
            priority
            unoptimized
          />
          <div className="grain-overlay-hero" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-void/65 via-void/50 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/30 to-void/60" />
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(2,2,5,0.65) 100%)" }} />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="mb-6">
            <span className="font-mono-hbm text-[10px] uppercase tracking-[0.35em] text-gold/50 border border-gold/20 px-3 py-1.5 inline-block">
              SS26 — Drop 001
            </span>
          </div>

          <h1 className="tracking-tight mb-8 leading-none">
            <div className="font-cormorant text-[clamp(4rem,12vw,10rem)] text-cream/95 font-light leading-[0.9]">
              HBM
            </div>
            <div className="font-cormorant text-[clamp(4rem,12vw,10rem)] leading-[0.9] font-semibold italic text-gradient-gold">
              Goods
            </div>
          </h1>

          <p className="font-mono-hbm text-[11px] uppercase tracking-[0.3em] text-silver/45 max-w-xs">
            Apparel · Tech · Accessories — The Private Collection
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2 z-10">
          <span className="font-mono-hbm text-[9px] uppercase tracking-[0.3em] text-silver-dim/35">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold/30 to-transparent" />
        </div>
      </section>

      {/* ═══════════════ MARQUEE STRIP ═══════════════ */}
      <div className="border-y border-white/[0.04] bg-charcoal/40 overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {Array(6).fill(0).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-8 px-8">
              <span className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/50">New Drop</span>
              <span className="w-px h-3 bg-gold/20 inline-block" />
              <span className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-silver-dim/40">SS26</span>
              <span className="w-px h-3 bg-gold/20 inline-block" />
              <span className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/50">Limited Release</span>
              <span className="w-px h-3 bg-gold/20 inline-block" />
              <span className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-silver-dim/40">HBM Goods</span>
              <span className="w-px h-3 bg-gold/20 inline-block" />
              <span className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/50">Private Collection</span>
              <span className="w-px h-3 bg-gold/20 inline-block" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════ FEATURED EDITORIAL ═══════════════ */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-12 py-16">
        <SectionReveal>
          <div className="relative h-[62vh] md:h-[75vh] overflow-hidden rounded-2xl group cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1800&q=90"
              alt="HBM Monogram Hoodie — Featured Drop"
              fill
              className="object-cover object-center transition-all duration-700 scale-100 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/40 to-void/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 md:p-14">
              <span className="inline-block font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold border border-gold/30 px-2.5 py-1 mb-6">
                Featured Drop — SS26
              </span>
              <h2 className="font-cormorant text-[clamp(2.2rem,5vw,4.5rem)] font-light text-cream leading-[0.95] mb-4">
                HBM Monogram<br />
                <span className="italic font-semibold text-gradient-gold">Hoodie</span>
              </h2>
              <p className="font-mono-hbm text-[11px] text-silver/50 mb-8 max-w-sm tracking-wide leading-relaxed uppercase">
                400gsm heavyweight French terry. Embroidered HBM monogram at chest and back yoke.
              </p>
              <div className="flex items-center gap-5">
                <span className="font-cormorant text-2xl text-cream/80 font-light">$285</span>
                <button className="garnet-btn font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void px-8 py-3.5">
                  Add to Bag
                </button>
                <button className="gold-outline-btn font-mono-hbm text-[10px] uppercase tracking-[0.22em] px-8 py-3.5">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ═══════════════ CATEGORY FILTER STRIP ═══════════════ */}
      <div className="sticky top-16 z-30 bg-void/97 backdrop-blur-heavy border-b border-white/[0.04]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`font-mono-hbm text-[10px] uppercase tracking-[0.28em] px-6 py-5 transition-all duration-300 whitespace-nowrap border-b-2 -mb-px ${
                  active === cat.id
                    ? "text-cream border-gold"
                    : "text-silver-dim/45 border-transparent hover:text-cream/70 hover:border-white/10"
                }`}
              >
                {cat.label}
                {cat.id !== "all" && (
                  <span className="ml-2 text-[8px] opacity-40">
                    ({products.filter((p) => p.category === cat.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>
          <span className="hidden md:block font-mono-hbm text-[9px] uppercase tracking-[0.28em] text-silver-dim/30">
            {filtered.length} items
          </span>
        </div>
      </div>

      {/* ═══════════════ PRODUCT GRID ═══════════════ */}
      <section className="mx-auto max-w-[1440px] px-6 md:px-12 pt-10 pb-28">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {filtered.map((product, i) => (
            <SectionReveal key={product.id} delay={i * 0.04}>
              <div className="group cursor-pointer">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-charcoal rounded-lg mb-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-cover object-center transition-all duration-500 group-hover:scale-105 ${
                      product.sold ? "opacity-45" : ""
                    }`}
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-void/0 group-hover:bg-void/15 transition-all duration-500" />

                  {/* Tag badge */}
                  {product.tag && (
                    <div className="absolute top-3 left-3">
                      <span
                        className={`font-mono-hbm text-[8px] uppercase tracking-[0.25em] px-2 py-1 ${
                          product.tag === "Limited"
                            ? "bg-gold text-void"
                            : "bg-garnet text-void"
                        }`}
                      >
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Sold out */}
                  {product.sold && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono-hbm text-[10px] uppercase tracking-[0.3em] text-silver/50 border border-silver/20 px-3 py-1.5 bg-void/70">
                        Sold Out
                      </span>
                    </div>
                  )}

                  {/* Quick add — slides up on hover */}
                  {!product.sold && (
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button className="w-full bg-cream text-void font-mono-hbm text-[9px] uppercase tracking-[0.25em] py-4 hover:bg-gold-pale transition-colors duration-200">
                        Add to Bag
                      </button>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="px-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-cormorant text-cream/75 text-[1.05rem] leading-tight group-hover:text-cream transition-colors duration-300">
                        {product.name}
                      </p>
                      <p className="font-mono-hbm text-[8px] uppercase tracking-[0.22em] text-silver-dim/35 mt-0.5 capitalize">
                        {product.category}
                      </p>
                    </div>
                    <span className="font-cormorant text-cream/55 text-[1.05rem] whitespace-nowrap">
                      {product.price}
                    </span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ═══════════════ BENTO — TWO LARGE EDITORIAL TILES ═══════════════ */}
      {active === "all" && (
        <section className="mx-auto max-w-[1440px] px-6 md:px-12 pb-24">
          <SectionReveal>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Left tile */}
              <div className="relative h-[55vh] overflow-hidden rounded-2xl group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&q=85"
                  alt="The Firm Tote"
                  fill
                  className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="font-mono-hbm text-[9px] uppercase tracking-[0.3em] text-gold/60 mb-2">Accessories</p>
                  <h3 className="font-cormorant text-2xl md:text-3xl text-cream font-light">
                    The Firm <span className="italic font-semibold">Tote</span>
                  </h3>
                  <p className="font-cormorant text-cream/50 text-lg mt-1">$285</p>
                </div>
              </div>

              {/* Right tile */}
              <div className="relative h-[55vh] overflow-hidden rounded-2xl group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1593152167544-085d3b9c4938?w=1000&q=85"
                  alt="Terminal Desk Mat"
                  fill
                  className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <p className="font-mono-hbm text-[9px] uppercase tracking-[0.3em] text-gold/60 mb-2">Tech</p>
                  <h3 className="font-cormorant text-2xl md:text-3xl text-cream font-light">
                    Terminal <span className="italic font-semibold">Desk Mat</span>
                  </h3>
                  <p className="font-cormorant text-cream/50 text-lg mt-1">$165</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </section>
      )}

      {/* ═══════════════ NEXT DROP WAITLIST ═══════════════ */}
      <section className="section-dark py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <div className="grid md:grid-cols-2 gap-14 md:gap-24 items-center">
              <div>
                <span className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/45 mb-7 block">
                  Coming Soon — SS26 Drop 002
                </span>
                <h2 className="font-cormorant text-[clamp(2.5rem,5vw,4.5rem)] font-light text-cream leading-[0.95] mb-6">
                  The Firm<br />
                  <span className="italic font-semibold text-gradient-gold">Capsule</span>
                </h2>
                <p className="font-mono-hbm text-[10px] text-silver/45 leading-relaxed tracking-[0.12em] uppercase max-w-sm mb-10">
                  A curated twelve-piece collection. Outerwear, accessories, and hardware.
                  Available exclusively to HBM cardholders and waitlist members.
                </p>
                <div className="flex items-stretch gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-dark flex-1"
                  />
                  <button className="garnet-btn font-mono-hbm text-[9px] uppercase tracking-[0.2em] text-void px-6 whitespace-nowrap">
                    Notify Me
                  </button>
                </div>
                <p className="font-mono-hbm text-[8px] text-silver-dim/30 uppercase tracking-[0.2em] mt-3">
                  No spam. Early access only.
                </p>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=900&q=90"
                  alt="The Firm Capsule — Coming Soon"
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/60 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="font-mono-hbm text-[8px] uppercase tracking-[0.3em] text-gold/60 border border-gold/20 px-2.5 py-1 bg-void/50 backdrop-blur-sm">
                    Registered Waitlist Only
                  </span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ THE STANDARD ═══════════════ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <div className="text-center mb-16">
              <span className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/40 mb-4 block">
                The Standard
              </span>
              <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-light text-cream leading-[1.05]">
                Built for those who operate
                <br />
                <span className="italic font-semibold text-gradient-gold">at the frontier.</span>
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pillars.map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.1}>
                <div className="border border-white/[0.04] p-9 rounded-xl hover:border-gold/20 transition-all duration-500 group">
                  <div className="w-8 h-px bg-gold/40 mb-7 group-hover:w-14 transition-all duration-500" />
                  <h3 className="font-cormorant text-xl text-cream/80 font-light mb-4">
                    {item.title}
                  </h3>
                  <p className="font-mono-hbm text-[9px] text-silver-dim/45 leading-relaxed tracking-[0.15em] uppercase">
                    {item.body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FULL-BLEED CLOSING IMAGE ═══════════════ */}
      <section className="relative h-[50vh] md:h-[65vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85"
          alt="HBM Goods — The Collection"
          fill
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-void/20 to-void" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <span className="font-mono-hbm text-[9px] uppercase tracking-[0.4em] text-gold/50 mb-5">
            HBM & Company
          </span>
          <p className="font-cormorant text-[clamp(1.8rem,4vw,3.2rem)] text-cream/80 font-light leading-[1.1] max-w-2xl">
            Every piece tells the story of a firm
            <br />
            <span className="italic font-semibold text-gradient-gold">built to last.</span>
          </p>
        </div>
      </section>

      <FooterDark />
    </>
  );
}
