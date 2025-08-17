import HeroBanner from "../../components/home/HeroBanner";
import PopularDestinations from "../../components/home/PopularDestinations";
import Newsletter from "../../components/home/Newsletter";
import QuickStats from "../../components/home/QuickStats";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <PopularDestinations />
      <Newsletter />
      <QuickStats />
    </div>
  );
}
