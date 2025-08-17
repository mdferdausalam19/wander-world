import HeroBanner from "../../components/home/HeroBanner";
import PopularDestinations from "../../components/home/PopularDestinations";
import QuickStats from "../../components/home/QuickStats";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <PopularDestinations />
      <QuickStats />
    </div>
  );
}
