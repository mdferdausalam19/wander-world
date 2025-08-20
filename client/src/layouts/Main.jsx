import { Outlet, useLocation } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { useEffect } from "react";

export default function Main() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <div className="bg-emerald-100">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
