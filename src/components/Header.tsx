import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Tutup mobile menu saat route berubah
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/service" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header className="w-full px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6 pb-2">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-7xl mx-auto flex items-center justify-between border border-gray-200 rounded-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
          <motion.div
            className="flex items-center gap-1.5 sm:gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="relative w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 36 36" fill="none">
                <defs>
                  <linearGradient
                    id="gGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#C5E17A" />
                    <stop offset="100%" stopColor="#7CB342" />
                  </linearGradient>
                </defs>
                <path
                  d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14c3.5 0 6.7-1.3 9.1-3.4l-2.8-2.8C22.4 27.5 20.3 28.4 18 28.4c-5.7 0-10.4-4.7-10.4-10.4S12.3 7.6 18 7.6c2.8 0 5.3 1.1 7.2 2.9l2.8-2.8C25.4 5.3 21.9 4 18 4z"
                  fill="url(#gGradient)"
                />
                <path
                  d="M18 12c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.7 0 3.2-.7 4.2-1.8V18h-4.2v-2h6.2v6.2c1.3-1.4 2-3.3 2-5.4 0-3.9-3.1-7-7-7h-1.2z"
                  fill="url(#gGradient)"
                />
              </svg>
            </div>
            <span className="text-lg sm:text-2xl font-bold text-[#7CB342]">
              Agrob
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.1 + idx * 0.08,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <Link
                  to={item.path}
                  className={`text-xs sm:text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-[#7CB342]"
                      : "text-gray-600 hover:text-[#7CB342]"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#7CB342] rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Desktop Contact Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.4,
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex bg-[#8BC34A] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium items-center gap-2 hover:bg-[#7CB342] transition-colors"
        >
          Contact
          <motion.span
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7CB342"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </motion.span>
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-600"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </>
            )}
          </svg>
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden mt-2 bg-white border border-gray-200 rounded-2xl p-4 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium py-2 transition-colors ${
                      isActive
                        ? "text-[#7CB342]"
                        : "text-gray-600 hover:text-[#7CB342]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#8BC34A] text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 mt-2"
              >
                Contact
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
