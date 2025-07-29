import HeroBanner from "../../components/home/HeroBanner";
import PopularDestinations from "../../components/home/PopularDestinations";

export default function Home() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <HeroBanner />
      <PopularDestinations />
    </div>
  );
}
