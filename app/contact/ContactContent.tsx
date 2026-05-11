"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import GoldDivider from "@/components/GoldDivider";
import SectionReveal from "@/components/SectionReveal";
import AnimatedHeadline from "@/components/AnimatedHeadline";

const inquiryTypes = [
  "Protocol Partnership",
  "Institutional Investment",
  "Strategic Collaboration",
  "Custody Infrastructure",
  "Advisory Engagement",
  "Other",
];

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    organization: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <NavBar />

      {/* ——— HERO ——— */}
      <section className="relative flex min-h-[55vh] items-end overflow-hidden pb-20 pt-[calc(env(safe-area-inset-top,0px)+5rem)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=90"
            alt="Office interior"
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
            — Engage
          </motion.span>
          <h1 className="font-cormorant text-display-xl text-cream font-light leading-none mb-6">
            <AnimatedHeadline text="Let's" delay={0.2} />
            {" "}
            <AnimatedHeadline
              text="Talk."
              delay={0.5}
              className="text-gradient-gold font-bold italic"
            />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-mono-hbm text-body-lg text-silver max-w-lg"
          >
            We engage selectively. Introductions preferred. If you&apos;re building
            something that matters, we want to hear about it.
          </motion.p>
        </div>
      </section>

      {/* ——— CONTACT FORM ——— */}
      <section className="relative py-20 md:py-32 bg-midnight">
        <div className="absolute inset-0 city-glow pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Contact Info */}
            <div>
              <SectionReveal>
                <h2 className="font-cormorant text-display-md text-cream font-light mb-8">
                  Direct <span className="text-gradient-gold italic font-bold">Access</span>
                </h2>
              </SectionReveal>

              <div className="flex flex-col gap-8">
                <SectionReveal delay={0.1}>
                  <div>
                    <span className="font-mono-hbm text-label-xs text-gold uppercase tracking-[0.25em] block mb-2">
                      General Inquiries
                    </span>
                    <a
                      href="mailto:hbmandcompany@gmail.com"
                      className="font-cormorant text-display-sm text-cream font-light hover:text-gold transition-colors duration-300"
                    >
                      hbmandcompany@gmail.com
                    </a>
                  </div>
                </SectionReveal>

                <GoldDivider width="half" />

                <SectionReveal delay={0.15}>
                  <div>
                    <span className="font-mono-hbm text-label-xs text-gold uppercase tracking-[0.25em] block mb-2">
                      Institutional
                    </span>
                    <a
                      href="mailto:institutional@hbmandcompany.com"
                      className="font-cormorant text-display-sm text-cream font-light hover:text-gold transition-colors duration-300"
                    >
                      institutional@hbmandcompany.com
                    </a>
                  </div>
                </SectionReveal>

                <GoldDivider width="half" />

                <SectionReveal delay={0.2}>
                  <div>
                    <span className="font-mono-hbm text-label-xs text-gold uppercase tracking-[0.25em] block mb-3">
                      Notice
                    </span>
                    <p className="font-mono-hbm text-body-md text-silver-dim leading-relaxed">
                      HBM & Company does not respond to unsolicited pitches,
                      cold outreach, or partnership requests from unverified
                      parties. All engagements require mutual agreement on
                      confidentiality prior to substantive discussion.
                    </p>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.25}>
                  <div className="glass-panel-dark p-6 mt-4">
                    <span className="font-mono-hbm text-label-xs text-gold uppercase tracking-[0.25em] block mb-3">
                      Offices
                    </span>
                    <div className="flex flex-col gap-3">
                      {[
                        { city: "Dallas", region: "Primary" },
                        { city: "London", region: "EMEA" },
                        { city: "Singapore", region: "APAC" },
                      ].map((office) => (
                        <div key={office.city} className="flex items-center justify-between">
                          <span className="font-mono-hbm text-body-md text-silver">{office.city}</span>
                          <span className="font-mono-hbm text-label-xs text-silver-dim uppercase tracking-[0.2em]">
                            {office.region}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center py-20"
                >
                  <div className="w-16 h-16 border border-gold/40 rotate-45 flex items-center justify-center mb-8">
                    <div className="w-4 h-4 bg-gold/60 rotate-0" />
                  </div>
                  <h3 className="font-cormorant text-display-md text-cream font-light mb-4">
                    Received.
                  </h3>
                  <p className="font-mono-hbm text-body-md text-silver-dim max-w-sm">
                    We review inquiries carefully. If your submission aligns with
                    our current focus, we&apos;ll be in touch within 72 hours.
                  </p>
                </motion.div>
              ) : (
                <SectionReveal direction="right">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Inquiry type selector */}
                    <div>
                      <label className="font-mono-hbm text-label-xs text-gold uppercase tracking-[0.25em] block mb-3">
                        Nature of Inquiry
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSelectedType(type)}
                            className={`font-mono-hbm text-label-xs uppercase tracking-[0.15em] px-3 py-2 border transition-all duration-300 ${
                              selectedType === type
                                ? "border-gold/50 text-gold bg-gold/[0.06] rounded-full"
                                : "border-white/[0.05] text-silver-dim/50 hover:border-gold/30 hover:text-cream rounded-full"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <GoldDivider />

                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="input-dark w-full font-mono-hbm text-body-md text-cream"
                      />
                    </div>

                    {/* Organization */}
                    <div>
                      <input
                        type="text"
                        placeholder="Organization / Protocol"
                        value={formState.organization}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            organization: e.target.value,
                          })
                        }
                        className="input-dark w-full font-mono-hbm text-body-md text-cream"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="input-dark w-full font-mono-hbm text-body-md text-cream"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <textarea
                        placeholder="Tell us about your project or inquiry"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        className="input-dark w-full font-mono-hbm text-body-md text-cream resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="garnet-btn font-mono-hbm text-label-sm uppercase tracking-[0.25em] text-void px-10 py-4 w-full md:w-auto text-center"
                    >
                      Submit Inquiry
                    </button>

                    <p className="font-mono-hbm text-label-xs text-silver-dim/50 uppercase tracking-[0.15em]">
                      All submissions are confidential and reviewed by the
                      partnership team directly.
                    </p>
                  </form>
                </SectionReveal>
              )}
            </div>
          </div>
        </div>
      </section>

      <FooterDark />
    </>
  );
}


