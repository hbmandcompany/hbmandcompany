"use client";

import { useState, useEffect, useCallback, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import clsx from "clsx";

type Typography = "luxury" | "robinhood";

const defaultSuccess = "You are on the list. Protocol updates will follow by email.";

export default function VotingProtocolSignup({
  typography,
  instanceId = "footer",
  eyebrow,
  heading,
  description,
  descriptionClassName,
  submitLabel,
  successMessage,
  embedded = false,
  fullDiscretion = false,
}: {
  typography: Typography;
  instanceId?: string;
  eyebrow?: string;
  heading?: ReactNode;
  description?: ReactNode;
  /** Overrides default all-caps label styling for the note (e.g. thesis prose). */
  descriptionClassName?: string;
  submitLabel?: string;
  successMessage?: string;
  /** When true, omit card chrome (used inside a shared parent card with editorial). */
  embedded?: boolean;
  /** When true, render the whitepaper link row below the description (default-band layout). */
  fullDiscretion?: boolean;
}) {
  const displayFont = typography === "robinhood" ? "font-robinhood" : "font-cormorant";
  const uiFont = typography === "robinhood" ? "font-robinhood" : "font-mono-hbm";
  const headingId = `${instanceId}-voting-protocol-heading`;
  const triggerId = `${instanceId}-voting-email-trigger`;
  const modalTitleId = `${instanceId}-voting-modal-title`;
  const dialogId = `${instanceId}-voting-dialog`;
  const emailModalId = `${instanceId}-voting-email-modal`;

  const reduceMotion = useReducedMotion() === true;
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setStatus("idle");
    setMessage("");
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, closeModal]);

  useEffect(() => {
    if (!modalOpen) return;
    const id = requestAnimationFrame(() => {
      document.getElementById(emailModalId)?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [modalOpen, emailModalId]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/voting-protocol-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }

      setStatus("success");
      setMessage(successMessage ?? defaultSuccess);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const eyebrowText = eyebrow ?? "Voting protocol";
  const headingNode =
    heading ??
    (
      <>
        Join the <span className="font-semibold italic">governance quorum</span>
      </>
    );
  const descriptionNode =
    description ??
    (
      <>
        Request access to on-chain voting cadence. By submitting, you agree we may contact you about the voting
        protocol and related governance. See our{" "}
        <a href="/privacy" className="text-gold/50 hover:text-gold/70 transition-colors">
          Privacy policy
        </a>
        .
      </>
    );
  const buttonLabel = submitLabel ?? "Request access";

  const defaultNoteTypography = `${uiFont} text-[11px] uppercase tracking-[0.13em] leading-relaxed text-silver-dim/55 md:text-[12.5px]`;
  const embeddedNoteTypography = `${uiFont} text-[11px] uppercase tracking-[0.13em] leading-relaxed text-silver-dim/34 md:text-[12.5px]`;
  const descClass =
    descriptionClassName ?? `${embedded ? embeddedNoteTypography : defaultNoteTypography} mt-2.5`;

  const inputSurfaceBase = `${uiFont} min-h-[46px] w-full rounded-lg border border-white/[0.10] bg-void/70 px-4 text-left text-[13px] tracking-[0.06em] outline-none transition-[border-color,box-shadow] duration-300 focus-visible:border-gold/35 focus-visible:ring-1 focus-visible:ring-gold/25 md:min-h-[50px] md:rounded-xl md:px-[1.125rem] md:text-[14px]`;

  const inputSurfaceClass = `${inputSurfaceBase} text-cream/90`;

  /** Trigger shows silver label (matches “Request Access” row on Qualified access). */
  const inputTriggerClass = `${inputSurfaceBase} text-silver-dim/35`;

  const backdropTransition = reduceMotion ? { duration: 0.18 } : { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const };
  const panelTransition = reduceMotion
    ? { duration: 0.18 }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.88 };

  const modal =
    mounted ? (
      createPortal(
        <AnimatePresence>
          {modalOpen ? (
            <motion.div
              key={`${instanceId}-signup-modal`}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={backdropTransition}
            >
              <button
                type="button"
                aria-label="Close dialog"
                className="absolute inset-0 bg-void/82 backdrop-blur-[6px]"
                onClick={closeModal}
              />
              <motion.div
                id={dialogId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={modalTitleId}
                className="relative z-10 max-h-[min(90dvh,640px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/[0.12] bg-gradient-to-b from-obsidian via-void to-void p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_40px_90px_rgba(0,0,0,0.65)] md:p-8"
                initial={
                  reduceMotion
                    ? { scale: 0.99 }
                    : { scale: 0.94, y: 20, filter: "blur(6px)" }
                }
                animate={
                  reduceMotion
                    ? { scale: 1 }
                    : { scale: 1, y: 0, filter: "blur(0px)" }
                }
                transition={panelTransition}
                onClick={(ev) => ev.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  className={`${uiFont} absolute right-4 top-4 rounded-lg px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-silver-dim/45 outline-none transition-colors hover:text-cream/70 focus-visible:ring-2 focus-visible:ring-gold/35 md:right-5 md:top-5`}
                >
                  Close
                </button>

                <p className={`${uiFont} text-[11px] text-gold/65 uppercase tracking-[0.26em] md:text-[12px] md:tracking-[0.3em]`}>
                  {eyebrowText}
                </p>
                <h2 id={modalTitleId} className={`${displayFont} mt-3 text-xl font-light leading-snug text-cream/88 md:text-2xl`}>
                  {headingNode}
                </h2>
                <div className="mt-4 max-h-[min(36vh,200px)] overflow-y-auto pr-1">
                  <p className={descriptionClassName ?? defaultNoteTypography} role="note">
                    {descriptionNode}
                  </p>
                </div>

                <form onSubmit={onSubmit} className="mt-6 space-y-4 border-t border-white/[0.08] pt-6">
                  <div className="space-y-2">
                    <label htmlFor={emailModalId} className={`${uiFont} block text-label-xs uppercase tracking-[0.16em] text-silver-dim/55`}>
                      Email address
                    </label>
                    <input
                      id={emailModalId}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      disabled={status === "loading"}
                      placeholder="you@domain.com"
                      className={inputSurfaceClass}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={`gold-outline-btn ${uiFont} w-full bg-black px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-cream shadow-[0_0_36px_rgba(0,0,0,0.4)] transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-void disabled:pointer-events-none disabled:opacity-45 md:text-label-xs md:tracking-[0.22em]`}
                  >
                    {status === "loading" ? "Sending…" : buttonLabel}
                  </button>

                  {(status === "success" || status === "error") && message ? (
                    <p
                      className={`${uiFont} text-label-xs uppercase tracking-[0.12em] ${
                        status === "success" ? "text-digital-80s" : "text-cream/55"
                      }`}
                      role="status"
                      aria-live="polite"
                    >
                      {message}
                    </p>
                  ) : null}
                </form>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )
    ) : null;

  const openModal = () => {
    setModalOpen(true);
    setStatus("idle");
    setMessage("");
  };

  const outerClass = embedded
    ? "relative w-full min-w-0"
    : "relative w-full min-w-0 max-w-lg rounded-xl border border-white/[0.09] bg-gradient-to-b from-obsidian/95 via-void/90 to-void/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_64px_rgba(0,0,0,0.55)] md:p-8";

  const innerBlock = (
    <>
      {!embedded ? (
        <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-gold/[0.04] blur-3xl md:h-40 md:w-40" aria-hidden />
      ) : null}

      <div className="relative">
        <p
          className={clsx(
            uiFont,
            "text-[11px] uppercase tracking-[0.26em] md:text-[12px] md:tracking-[0.3em]",
            embedded ? "text-gold/48" : "text-gold/65",
          )}
        >
          {eyebrowText}
        </p>
        <h3
          id={headingId}
          className={clsx(
            displayFont,
            "mt-2.5 text-xl font-light leading-snug md:mt-3 md:text-2xl",
            embedded ? "text-cream/72" : "text-cream/88",
          )}
        >
          {headingNode}
        </h3>
        <p
          className={clsx(descClass, embedded && !descriptionClassName && "[&_a]:text-gold/40 [&_a]:hover:text-gold/55")}
          role="note"
        >
          {descriptionNode}
        </p>

        {fullDiscretion ? (
          <div
            className={clsx(
              uiFont,
              "mt-3 flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-start md:pt-3.5",
              embedded ? "border-white/[0.05]" : "border-white/[0.07]",
            )}
          >
            <Link
              href="/documentation"
              className={clsx(
                "shrink-0 text-[11px] uppercase tracking-[0.2em] underline-offset-4 transition-colors hover:underline md:text-[11.5px]",
                embedded
                  ? "text-silver-dim/34 hover:text-gold/55"
                  : "text-silver-dim/42 hover:text-gold/60",
                "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
              )}
            >
              Whitepaper
            </Link>
          </div>
        ) : null}

        <div className="mt-6 md:mt-7">
          <button
            id={triggerId}
            type="button"
            aria-haspopup="dialog"
            aria-controls={dialogId}
            aria-expanded={modalOpen}
            onClick={openModal}
            className={clsx(
              inputTriggerClass,
              "flex cursor-pointer items-center hover:border-white/[0.14] md:hover:border-white/[0.12]",
            )}
          >
            <span>Request Access</span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {modal}

      {embedded ? (
        <div className={outerClass} aria-labelledby={headingId}>
          {innerBlock}
        </div>
      ) : (
        <aside className={outerClass} aria-labelledby={headingId}>
          {innerBlock}
        </aside>
      )}
    </>
  );
}
