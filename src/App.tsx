import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TrendingArticles from "./components/TrendingArticles";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";

// Best Practice: Komponon utilitas untuk memastikan halaman selalu scroll ke atas saat rute berubah
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

function HomePage() {
  return (
    <>
      <HeroSection />
      <main className="relative z-10">
        <TrendingArticles />
        <FAQSection />
      </main>
    </>
  );
}

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />

      {/* 
        GLASSMORPHISM BACKGROUND UPGRADE 
        Menggunakan gradien lembut sebagai base, bukan putih polos.
      */}
      <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-x-hidden transition-colors duration-300">
        {/* 
          Decorative Background Blobs (Ambient Glow)
          Elemen ini TIDAK BOLEH di-interact (pointer-events-none) agar tidak menghalangi klik.
          Ini adalah "rahasia" agar efek kaca (backdrop-blur) pada komponen lain terlihat jelas.
        */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-200/40 dark:bg-emerald-600/20 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/3 transition-colors duration-300" />
          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-teal-200/40 dark:bg-teal-600/20 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 transition-colors duration-300" />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-green-100/50 dark:bg-green-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300" />
        </div>

        {/* Main Content Wrapper: z-10 agar berada di atas blobs */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Preloader onComplete={() => setIsLoaded(true)} />

          {isLoaded && (
            <>
              <Header />

              {/* flex-grow memastikan Footer terdorong ke bawah jika konten halaman sedikit */}
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/about"
                    element={<ComingSoon pageName="About Us" />}
                  />
                  <Route
                    path="/service"
                    element={<ComingSoon pageName="Our Services" />}
                  />
                  <Route
                    path="/blog"
                    element={<ComingSoon pageName="Blog" />}
                  />
                  {/* Catch-all route untuk 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>

              <Footer />
            </>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
