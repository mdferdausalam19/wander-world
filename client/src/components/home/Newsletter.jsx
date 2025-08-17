import toast from "react-hot-toast";
import { FaEnvelope } from "react-icons/fa";

export default function Newsletter() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    e.target.reset();
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="border border-emerald-300 rounded-xl bg-gradient-to-br from-emerald-50/10 to-white px-12 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <FaEnvelope className="inline text-emerald-600" />
            <span>Stay Updated</span>
          </h2>
          <p className="text-gray-600">
            Subscribe to our newsletter for the latest travel tips and exclusive
            offers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="flex-grow px-5 py-3 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-emerald-900 placeholder-emerald-400"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
