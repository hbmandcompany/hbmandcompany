import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Near-pure dark foundations
        void:    "#020203",
        obsidian:"#050505",
        midnight:"#09090B",
        abyss:   "#0D0B0A",
        charcoal:"#141210",
        "charcoal-light": "#1C1916",
        velvet:  "#0C0008",

        // Coach-inspired warm cognac replacing yellow/gold
        gold:         "#C4944A",   // warm cognac — main accent
        "gold-dim":   "#8B6832",   // dark cognac
        "gold-pale":  "#DEBA8A",   // light caramel
        amber:        "#A07840",   // mid cognac
        caramel:      "#D4A97A",   // warm tan
        "plaid-tan":  "#C4A882",   // Coach canvas tan
        "plaid-burgundy": "#6B2737",
        "plaid-green":    "#3D5C35",

        // Warm taupe replacing cool silver
        silver:        "#A89880",  // warm taupe
        "silver-dim":  "#6B5E50",  // darker taupe
        "silver-ghost":"#2A2420",  // near-black taupe

        // Richer burgundy replacing garnet
        garnet:        "#6B2737",  // deep burgundy
        "garnet-dark": "#3D1520",  // very dark burgundy
        "garnet-deep": "#200A10",  // near-black burgundy
        crimson:       "#9B2D45",  // mid burgundy-red

        // Warm cream
        cream:       "#F2EAD8",
        "cream-dim": "#C8B9A5",

        ice:          "#0A1530",
        "purple-deep":"#1A0035",
      },

      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem",
      },

      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        raleway:   ["var(--font-raleway)", "Raleway", "sans-serif"],
        /* Robinhood app uses a custom face; DM Sans is the closest open equivalent for KPI / UI */
        robinhood: ["var(--font-robinhood)", "DM Sans", "system-ui", "sans-serif"],
      },

      fontSize: {
        "display-2xl": ["clamp(60px,10vw,140px)", { lineHeight: "0.90", letterSpacing: "-0.03em"  }],
        "display-xl":  ["clamp(48px,8vw,120px)",  { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "display-lg":  ["clamp(36px,6vw,96px)",   { lineHeight: "0.94", letterSpacing: "-0.02em"  }],
        "display-md":  ["clamp(28px,4vw,64px)",   { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        "display-sm":  ["clamp(22px,3vw,48px)",   { lineHeight: "1.02" }],
        "body-lg":     ["18px", { lineHeight: "1.8",  letterSpacing: "0.03em" }],
        "body-md":     ["15px", { lineHeight: "1.75", letterSpacing: "0.03em" }],
        "label-sm":    ["11px", { lineHeight: "1.5",  letterSpacing: "0.22em" }],
        "label-xs":    ["10px", { lineHeight: "1.5",  letterSpacing: "0.26em" }],
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":       "radial-gradient(ellipse 120% 80% at 50% 110%, rgba(196,148,74,0.08) 0%, rgba(107,39,55,0.05) 35%, transparent 65%)",
        "gold-shimmer":    "linear-gradient(135deg, transparent 40%, rgba(196,148,74,0.06) 50%, transparent 60%)",
      },

      boxShadow: {
        "gold-glow":   "0 0 40px rgba(196,148,74,0.12), 0 0 80px rgba(160,120,64,0.05)",
        "gold-border": "0 0 0 1px rgba(196,148,74,0.2), 0 12px 48px rgba(0,0,0,0.85)",
        "card-hover":  "0 0 0 1px rgba(196,148,74,0.28), 0 30px 80px rgba(0,0,0,0.92)",
        "garnet-glow": "0 0 30px rgba(107,39,55,0.45), 0 8px 32px rgba(0,0,0,0.85)",
        "3d-card":     "0 20px 60px rgba(0,0,0,0.92), 0 0 0 1px rgba(255,255,255,0.025), inset 0 1px 0 rgba(255,255,255,0.04)",
        "3d-hover":    "0 40px 100px rgba(0,0,0,0.97), 0 0 0 1px rgba(196,148,74,0.18), inset 0 1px 0 rgba(255,255,255,0.05)",
        deep:          "0 40px 120px rgba(0,0,0,0.98), 0 8px 32px rgba(0,0,0,0.85)",
        glass:         "inset 0 1px 0 rgba(255,255,255,0.035), 0 12px 48px rgba(0,0,0,0.75)",
      },

      backdropBlur: {
        xs:     "2px",
        glass:  "24px",
        heavy:  "40px",
      },

      animation: {
        marquee:           "marquee 55s linear infinite",
        "marquee-reverse": "marquee-reverse 55s linear infinite",
        "fade-up":         "fadeUp 0.8s ease-out forwards",
        "fade-in":         "fadeIn 1.2s ease-out forwards",
        grain:             "grain 8s steps(1) infinite",
        "glow-pulse":      "glowPulse 4s ease-in-out infinite",
        float:             "float 6s ease-in-out infinite",
      },

      keyframes: {
        marquee:           { "0%": { transform: "translateX(0)" },    "100%": { transform: "translateX(-50%)" } },
        "marquee-reverse": { "0%": { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0)" }    },
        fadeUp:    { "0%": { opacity: "0", transform: "translateY(40px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:    { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        grain: {
          "0%,100%": { transform: "translate(0,0)"    },
          "10%":     { transform: "translate(-2%,-3%)" },
          "20%":     { transform: "translate(3%,1%)"   },
          "30%":     { transform: "translate(-1%,4%)"  },
          "40%":     { transform: "translate(2%,-2%)"  },
          "50%":     { transform: "translate(-3%,2%)"  },
          "60%":     { transform: "translate(1%,-4%)"  },
          "70%":     { transform: "translate(-2%,3%)"  },
          "80%":     { transform: "translate(4%,-1%)"  },
          "90%":     { transform: "translate(-1%,2%)"  },
        },
        glowPulse: { "0%,100%": { opacity: "0.5" }, "50%": { opacity: "1" } },
        float:     { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-12px)" } },
      },

      transitionTimingFunction: {
        luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
        drift:  "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
    },
  },
  plugins: [],
};

export default config;
