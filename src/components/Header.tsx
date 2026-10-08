import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";

type Theme = "light" | "dark" | "system";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  // Theme state
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) || "system",
  );
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle outside click for desktop theme menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(event.target as Node)
      ) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        className="max-w-7xl mx-auto flex items-center justify-between glass-strong rounded-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3"
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
                <path
                  d="M18 4C10.268 4 4 10.268 4 18s6.268 14 14 14c3.5 0 6.7-1.3 9.1-3.4l-2.8-2.8C22.4 27.5 20.3 28.4 18 28.4c-5.7 0-10.4-4.7-10.4-10.4S12.3 7.6 18 7.6c2.8 0 5.3 1.1 7.2 2.9l2.8-2.8C25.4 5.3 21.9 4 18 4z"
                  fill="currentColor"
                  className="text-primary"
                />
                <path
                  d="M18 12c-3.3 0-6 2.7-6 6s2.7 6 6 6c1.7 0 3.2-.7 4.2-1.8V18h-4.2v-2h6.2v6.2c1.3-1.4 2-3.3 2-5.4 0-3.9-3.1-7-7-7h-1.2z"
                  fill="currentColor"
                  className="text-primary-dark"
                />
              </svg>
            </div>
            <span className="text-lg sm:text-2xl font-bold text-primary">
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
                      ? "text-primary"
                      : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
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

        {/* Desktop Contact & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Desktop Contact Button (FIXED: Theme-aware arrow icon) */}
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
            className="group glass-subtle text-primary px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium items-center gap-2 hover:bg-primary hover:text-white transition-all duration-300 shadow-md flex"
          >
            Contact
            <motion.span
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              // PERBAIKAN: Background ikon sekarang adaptif (primary/10 di light, primary/20 di dark, dan putih transparan saat hover)
              className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/10 dark:bg-primary/20 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </motion.span>
          </motion.button>

          {/* Theme Toggle Dropdown (Desktop) */}
          <motion.div
            ref={themeMenuRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative"
          >
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="glass-subtle p-2 sm:p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors shadow-sm flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : theme === "dark" ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              )}
            </button>

            <AnimatePresence>
              {isThemeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-36 glass-strong rounded-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden flex flex-col z-50"
                >
                  {(["light", "dark", "system"] as Theme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTheme(t);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`px-4 py-2.5 text-sm text-left font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/50 ${
                        theme === t
                          ? "text-primary"
                          : "text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-full transition-colors"
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
            className="md:hidden mt-2 glass-strong rounded-2xl p-4 overflow-hidden border border-slate-200/50 dark:border-slate-700/50"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary/10 dark:bg-primary/20 text-primary"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
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
                className="group bg-primary text-white px-5 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 mt-2 hover:bg-primary/90 transition-colors shadow-md"
              >
                Contact
                <motion.span
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </motion.span>
              </motion.button>

              {/* PERBAIKAN: Mobile Theme Toggle Selector */}
              <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-700/50">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3 px-1">
                  Appearance
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(["light", "dark", "system"] as Theme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                        theme === t
                          ? "bg-primary text-white shadow-md scale-[1.02]"
                          : "bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {t === "light" && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="5" />
                          <line x1="12" y1="1" x2="12" y2="3" />
                          <line x1="12" y1="21" x2="12" y2="23" />
                        </svg>
                      )}
                      {t === "dark" && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                      )}
                      {t === "system" && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="3"
                            width="20"
                            height="14"
                            rx="2"
                            ry="2"
                          />
                          <line x1="8" y1="21" x2="16" y2="21" />
                          <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                      )}
                      <span className="capitalize">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
