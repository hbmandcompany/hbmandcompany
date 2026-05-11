import HomePageClient from "@/components/HomePageClient";
import CryptoPriceMarquee from "@/components/CryptoPriceMarquee";

export default function Page() {
  return <HomePageClient cryptoMarqueeSlot={<CryptoPriceMarquee />} />;
}
