import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TrendingArticles from "./components/TrendingArticles";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";

function HomePage() {
  return (
    <>
      <HeroSection />
      <main>
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
      <div className="min-h-screen bg-white">
        <Preloader onComplete={() => setIsLoaded(true)} />
        {isLoaded && (
          <>
            <Header />
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
              <Route path="/blog" element={<ComingSoon pageName="Blog" />} />
              {/* Catch-all route untuk 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
