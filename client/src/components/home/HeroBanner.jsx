import SearchBar from "./SearchBar";
import bannerImage from "../../assets/banner-image.jpg";

export default function HeroBanner() {
  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden flex items-center justify-center pt-24 pb-12 md:pt-0 md:pb-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 via-emerald-500/30 to-emerald-400/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-2 sm:px-6 lg:px-8 text-center overflow-visible">
        <div className="mb-4 flex items-center justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight drop-shadow-2xl">
            Wander<span className="text-emerald-400">World</span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="mb-6 space-y-4">
          <p className="text-2xl md:text-3xl font-light text-emerald-100 mb-3 drop-shadow-lg">
            Discover • Share • Explore
          </p>
          <p className="text-base md:text-lg text-white/90 max-w-2xl md:max-w-4xl mx-auto drop-shadow px-2 font-light mt-6">
            Your gateway to the world's most incredible destinations. Join our
            global community of travelers and discover hidden gems, share your
            adventures, and plan your next unforgettable journey.
          </p>
        </div>

        {/* SearchBar */}
        <div className="mt-6 mb-12">
          <SearchBar />
        </div>

        {/* Call to Action */}
        <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center w-full">
          <button className="w-full sm:w-auto bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Start Exploring
          </button>
          <button className="w-full sm:w-auto border border-white/50 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Destination
          </button>
        </div>

        {/* Down Arrow Scroll Indicator */}
        <div
          className="flex flex-col items-center mt-16 animate-bounce cursor-pointer"
          aria-label="Scroll Down"
        >
          <span className="text-white text-xs mb-1 opacity-80">
            Scroll Down
          </span>
          <svg
            className="w-8 h-8 text-white drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
