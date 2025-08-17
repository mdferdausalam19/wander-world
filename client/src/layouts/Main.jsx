import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function Main() {
  return (
    <div className="bg-emerald-100">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
