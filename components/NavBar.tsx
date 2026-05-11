"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const navLinks = [
  { label: "Michelangelo", href: "/work"    },
  { label: "Vanity",      href: "/about"   },
  { label: "Kiss",        href: "/work"    },
];

export default function NavBar() {
  const [scrolled, setScrolled]   = useState(false);
  const [hidden,   setHidden]     = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const lastScrollY               = useRef(0);
  const pathname                  = usePathname();
  const isHome                    = pathname === "/";

  /* Smart scroll — hide on down, reveal on up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (y < 80) {
        setScrolled(false);
        setHidden(false);
      } else {
        setScrolled(true);
        // hide only if we've scrolled down more than 6px from last position
        if (y > lastScrollY.current + 6)  setHidden(true);
        if (y < lastScrollY.current - 2)  setHidden(false);
      }
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50",
          scrolled ? "pt-3 px-4 md:px-6" : "pt-0 px-0"
        )}
      >
        <div
          className={clsx(
            "max-w-[1440px] mx-auto flex items-center justify-between transition-all duration-600",
            scrolled
              ? "h-14 px-6 md:px-8 rounded-2xl bg-obsidian/96 backdrop-blur-heavy border border-white/[0.035] shadow-deep"
              : "h-20 md:h-24 px-6 md:px-12"
          )}
        >
          {/* ── Wordmark ── */}
          <Link href="/" className="flex items-center group">
            <div className="flex flex-col leading-none">
              <span
                className="inline-flex items-baseline font-cormorant font-light uppercase text-cream/75 group-hover:text-cream/90 transition-colors duration-300"
                style={{ fontSize: scrolled ? "15px" : "19px" }}
              >
                <span className="inline-flex items-baseline gap-x-0.5 md:gap-x-1">
                  <span className="tracking-[0.22em]">HBM</span>
                  <span className="shrink-0 tracking-tight text-gold/65 group-hover:text-gold transition-colors duration-300">
                    &
                  </span>
                </span>
                <span className="tracking-[0.22em] pl-1.5 md:pl-2">Company</span>
              </span>
            </div>
          </Link>

          {/* ── Desktop nav (homepage only) ── */}
          {isHome ? (
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={clsx(
                  "font-mono-hbm text-[11px] uppercase tracking-[0.25em] transition-all duration-300 relative group",
                  pathname === link.href
                    ? "text-gold"
                    : "text-silver-dim/65 hover:text-cream/85"
                )}
              >
                {link.label}
                <span className={clsx(
                  "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
            <Link
              href="/shop"
              className="garnet-btn font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void px-5 py-1.5"
            >
              Shop
            </Link>
          </div>
          ) : null}

          {/* ── Mobile hamburger (homepage only — menu matches desktop) ── */}
          {isHome ? (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2 z-50"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 }   : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-px bg-cream/70"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-3 h-px bg-gold/60"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-px bg-cream/70"
            />
          </button>
          ) : null}
        </div>
      </motion.nav>

      {/* ── Mobile full-screen overlay menu (homepage only) ── */}
      <AnimatePresence>
        {menuOpen && isHome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-void/98 backdrop-blur-heavy flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 purple-bloom pointer-events-none" />
            <div className="absolute inset-0 garnet-bloom-top pointer-events-none" />
            <div className="plaid-rule w-1/3 absolute top-0" />

            {/* Wordmark in menu */}
            <div className="absolute top-7 left-8 opacity-50">
              <span
                className="inline-flex items-baseline font-cormorant text-[15px] font-light uppercase tracking-normal text-silver-dim/70"
              >
                <span className="inline-flex items-baseline gap-x-0.5 md:gap-x-1">
                  <span className="tracking-[0.2em]">HBM</span>
                  <span className="shrink-0 tracking-tight text-gold/55">&</span>
                </span>
                <span className="tracking-[0.2em] pl-1.5 md:pl-2">Company</span>
              </span>
            </div>

            <nav className="relative z-10 flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.07 + i * 0.08, duration: 0.5, ease: [0.16,1,0.3,1] }}
                >
                  <Link
                    href={link.href}
                    className="font-cormorant text-display-md font-light text-silver-dim/72 hover:text-gold transition-colors duration-300 italic"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0  }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-4"
              >
                <Link
                  href="/shop"
                  className="garnet-btn font-mono-hbm text-[11px] uppercase tracking-[0.22em] text-void px-8 py-2 inline-block"
                >
                  Shop
                </Link>
              </motion.div>
            </nav>

            <div className="absolute bottom-8 flex flex-col items-center gap-2">
              <div className="garnet-rule w-16" />
              <p className="font-mono-hbm text-[9px] text-silver-dim/35 uppercase tracking-[0.3em] mt-2">
                HBM & Company — Est. 2024
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
