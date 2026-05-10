import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-void pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="font-cormorant text-display-md text-cream font-light mb-8">
            Privacy Policy
          </h1>
          <p className="font-mono-hbm text-body-md text-silver-dim leading-relaxed">
            HBM & Company respects the privacy of all individuals who
            interact with our digital properties. This policy is a placeholder
            and will be updated with full terms prior to public launch.
          </p>
        </div>
      </main>
      <FooterDark />
    </>
  );
}
