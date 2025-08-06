import { Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">WanderWorld</h3>
            <p className="text-emerald-100">
              Discover the most beautiful destinations and plan your next
              adventure with our curated travel guides and local insights.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-emerald-100 hover:text-white transition-colors"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-emerald-100 hover:text-white transition-colors"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-emerald-100 hover:text-white transition-colors"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-emerald-100 hover:text-white transition-colors"
              >
                <FaYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-tourist-spots"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  All Tourist Spots
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tourist Spots */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Popular Tourist Spots
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  Santorini, Greece
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  Bali, Indonesia
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  Kyoto, Japan
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  Paris, France
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  New York, USA
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-emerald-300 mt-1 mr-3 flex-shrink-0" />
                <span className="text-emerald-100">
                  123 Travel Street, Wander City, WC 12345
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="h-4 w-4 text-emerald-300 mr-3" />
                <a
                  href="tel:+1234567890"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="h-4 w-4 text-emerald-300 mr-3" />
                <a
                  href="mailto:info@wanderworld.com"
                  className="text-emerald-100 hover:text-white transition-colors"
                >
                  info@wanderworld.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-emerald-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-emerald-100 text-sm">
            &copy; {currentYear} WanderWorld. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="/"
              className="text-emerald-100 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/"
              className="text-emerald-100 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
