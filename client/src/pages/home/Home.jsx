import HeroBanner from "../../components/home/HeroBanner";
import PopularDestinations from "../../components/home/PopularDestinations";
import QuickStats from "../../components/home/QuickStats";

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <HeroBanner />
      <PopularDestinations />
      <QuickStats />
    </div>
  );
}
