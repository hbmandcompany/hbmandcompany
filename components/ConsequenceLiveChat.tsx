"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type ChatMessage = {
  id: string;
  handle: string;
  badge?: string;
  text: string;
  time: string;
  tier?: "vip" | "mod" | "artist";
};

const SEED_MESSAGES: ChatMessage[] = [
  { id: "1", handle: "desk_ops", badge: "MOD", text: "Session lane is live — clock discipline holding.", time: "now", tier: "mod" },
  { id: "2", handle: "goldroom", badge: "VIP", text: "Midnight Ledger on repeat. This is the room.", time: "12s", tier: "vip" },
  { id: "3", handle: "producer.counter", text: "Trade lane listing just cleared — who's bidding?", time: "28s" },
  { id: "4", handle: "hbm_session", badge: "ARTIST", text: "Thank you for riding the rotation with us.", time: "41s", tier: "artist" },
  { id: "5", handle: "treasury_desk", text: "Reserve cadence briefing drops after this set.", time: "55s" },
  { id: "6", handle: "culture_wire", text: "Who owns the sound of a generation — live from the desk.", time: "1m" },
];

const LIVE_ROTATION = [
  "Stem Architecture just charted ▲2",
  "New tip from @goldroom · 240 XLM",
  "Collab lane opened · shared timeline",
  "Rotation Rights holding #4",
];

/** Luxury live chat — TikTok Live meets X/Twitter, Consequence edition. */
export function ConsequenceLiveChat() {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [draft, setDraft] = useState("");
  const [liveIndex, setLiveIndex] = useState(0);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setLiveIndex((i) => (i + 1) % LIVE_ROTATION.length), 4200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), handle: "you", text, time: "now" },
    ]);
    setDraft("");
  }

  return (
    <section className="consequence-live-chat" aria-label="Live desk chat">
      <header className="consequence-live-chat__header">
        <div className="consequence-live-chat__title-row">
          <span className="consequence-live-chat__live-dot" aria-hidden />
          <h3 className="font-robinhood text-sm font-semibold text-white/92">Live Desk</h3>
          <span className="consequence-live-chat__viewers font-mono-hbm">2.4k watching</span>
        </div>
        <p className="consequence-live-chat__ticker font-mono-hbm">{LIVE_ROTATION[liveIndex]}</p>
      </header>

      <div ref={feedRef} className="consequence-live-chat__feed">
        {messages.map((msg) => (
          <article
            key={msg.id}
            className={clsx(
              "consequence-live-chat__message",
              msg.tier === "vip" && "consequence-live-chat__message--vip",
              msg.tier === "artist" && "consequence-live-chat__message--artist",
            )}
          >
            <div className="consequence-live-chat__message-head">
              <span className="consequence-live-chat__handle font-robinhood">@{msg.handle}</span>
              {msg.badge ? (
                <span className="consequence-live-chat__badge font-mono-hbm">{msg.badge}</span>
              ) : null}
              <span className="consequence-live-chat__time font-mono-hbm">{msg.time}</span>
            </div>
            <p className="consequence-live-chat__text font-robinhood">{msg.text}</p>
          </article>
        ))}
      </div>

      <form className="consequence-live-chat__composer" onSubmit={handleSend}>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Join the room…"
          className="consequence-live-chat__input font-robinhood"
          maxLength={280}
          aria-label="Message"
        />
        <button type="submit" className="consequence-live-chat__send font-mono-hbm">
          Send
        </button>
      </form>
    </section>
  );
}
