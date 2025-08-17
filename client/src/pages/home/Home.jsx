import HeroBanner from "../../components/home/HeroBanner";
import PopularDestinations from "../../components/home/PopularDestinations";
import Newsletter from "../../components/home/Newsletter";
import QuickStats from "../../components/home/QuickStats";
import FAQ from "../../components/home/FAQ";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <PopularDestinations />
      <Newsletter />
      <QuickStats />
      <FAQ />
    </div>
  );
}
