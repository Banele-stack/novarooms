import Footer from "./components/footer/Footer";
import Hero from "./components/hero/Hero";
import FeaturedListings from "./components/listings/FeaturedListings";
import Navbar from "./components/navbar/Navbar";


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <Navbar />
      <Hero />
      <FeaturedListings />
      <Footer />
    </main>
  );
}