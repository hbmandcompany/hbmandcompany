import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/seo/site";

export default function SubscriptionContent({ heading = "Subscription" }: { heading?: string }) {
  return (
    <>
      <NavBar />
      <main className="relative min-h-screen min-h-[100dvh] bg-void pb-[max(6rem,env(safe-area-inset-bottom,1.25rem))] pt-[calc(env(safe-area-inset-top,0px)+8rem)] md:pt-32">
        <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-12">
          <p className="font-mono-hbm text-[10px] uppercase tracking-[0.34em] text-gold/55">Membership</p>
          <h1 className="mt-4 font-cormorant text-display-md font-light text-cream">{heading}</h1>
          <p className="mt-6 font-mono-hbm text-body-md leading-relaxed text-silver-dim">
            {SITE_NAME} Subscription is the paid tier for readers who want ad-free editorial, early access to desk
            briefings, and exclusive investigations across finance, crypto, and infrastructure. Our newsroom publishes
            original reporting on markets, on-chain intelligence, Texas business, and protocol governance — Subscription
            members get the full archive and priority delivery when stories break.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.08] bg-obsidian/80 p-6">
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.28em] text-gold/60">Monthly</p>
              <p className="mt-2 font-cormorant text-3xl font-light text-cream">$9.99<span className="text-lg text-silver-dim/50">/mo</span></p>
              <ul className="mt-4 space-y-2 font-mono-hbm text-[12px] text-silver-dim/75">
                <li>Ad-free newspaper and homepage</li>
                <li>Early access to published briefings</li>
                <li>Full editorial archive</li>
              </ul>
            </div>
            <div className="rounded-xl border border-gold/25 bg-obsidian/90 p-6">
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.28em] text-gold/70">Annual</p>
              <p className="mt-2 font-cormorant text-3xl font-light text-cream">$99<span className="text-lg text-silver-dim/50">/yr</span></p>
              <ul className="mt-4 space-y-2 font-mono-hbm text-[12px] text-silver-dim/75">
                <li>Everything in Monthly</li>
                <li>Exclusive research dispatches</li>
                <li>Priority event and desk invites</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 space-y-6 font-mono-hbm text-body-md leading-relaxed text-silver-dim">
            <p>
              Subscription supports independent journalism at the intersection of capital and culture. Members receive
              verified desk coverage — from stablecoin regulation and DeFi treasury flows to film financing on-chain
              and Texas infrastructure — without promotional clutter. Billing and account management will open through
              our membership portal as we complete checkout integration.
            </p>
            <p>
              Ready to join? Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold/75 hover:text-gold underline-offset-4 hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              with the subject line <span className="text-cream/75">Subscription</span>, or return to the{" "}
              <Link href="/newspaper" className="text-gold/75 hover:text-gold underline-offset-4 hover:underline">
                newspaper
              </Link>{" "}
              to read our latest published briefings.
            </p>
            <p>
              <Link href="/" className="text-gold/75 hover:text-gold underline-offset-4 hover:underline">
                ← Back to homepage
              </Link>
            </p>
          </div>
        </div>
      </main>
      <FooterDark typography="luxury" />
    </>
  );
}
