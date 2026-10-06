import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { Link, useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Floating leaves data
  const leaves = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 7,
    size: 12 + Math.random() * 18,
    rotation: Math.random() * 360,
  }));

  const suggestedPages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Service", path: "/service" },
    { name: "Blog", path: "/blog" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Simulasi pencarian - di real app bisa ke search page
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 relative overflow-hidden flex items-center justify-center px-4"
    >
      {/* Animated Background Gradient Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-green-200/40 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-lime-200/40 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Leaves */}
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute pointer-events-none"
          style={{ left: `${leaf.startX}%` }}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{
            y: ["-10vh", "110vh"],
            opacity: [0, 1, 1, 0],
            rotate: [0, leaf.rotation, leaf.rotation * 2],
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 24 24"
            fill="none"
            className="text-green-400/60"
          >
            <path
              d="M12 2C7 2 3 6 3 11c0 3 2 5 4 6-1-2-1-4 0-6 1-2 3-3 5-3s4 1 5 3c1 2 1 4 0 6 2-1 4-3 4-6 0-5-4-9-9-9z"
              fill="currentColor"
            />
            <path
              d="M12 2v20"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}

      {/* Main Content with 3D Parallax */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 max-w-4xl w-full text-center"
      >
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mb-6"
        >
          <div className="relative inline-block">
            {/* Shadow/Outline Layer */}
            <motion.h1
              className="text-[180px] sm:text-[220px] lg:text-[280px] font-black leading-none select-none"
              style={{
                background:
                  "linear-gradient(135deg, #7CB342 0%, #C5E17A 50%, #7CB342 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              404
            </motion.h1>

            {/* Wilted Plant Illustration */}
            <motion.div
              className="absolute -top-4 -right-4 sm:top-0 sm:right-0"
              initial={{ rotate: 0, scale: 0 }}
              animate={{ rotate: -15, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
                {/* Stem - wilted */}
                <motion.path
                  d="M30 75 Q35 50 25 30 Q20 20 25 10"
                  stroke="#7CB342"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                />
                {/* Wilted leaves */}
                <motion.path
                  d="M25 30 Q15 25 10 30 Q15 35 25 30"
                  fill="#C5E17A"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                />
                <motion.path
                  d="M27 20 Q37 15 42 20 Q37 25 27 20"
                  fill="#AED581"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7, duration: 0.5 }}
                />
                {/* Drooping flower */}
                <motion.circle
                  cx="25"
                  cy="10"
                  r="6"
                  fill="#F4A460"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            Oops! Halaman ini{" "}
            <motion.span
              className="inline-block"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              layu
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={mounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            Sepertinya halaman yang Anda cari belum tumbuh di kebun kami. Mari
            kembali ke beranda atau jelajahi halaman lain yang masih segar!
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari halaman..."
              className="w-full px-6 py-4 pr-14 rounded-full bg-white border-2 border-green-200 focus:border-green-400 focus:outline-none shadow-lg text-gray-700 placeholder-gray-400 transition-colors"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white shadow-md"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </motion.button>
          </div>
        </motion.form>

        {/* Suggested Pages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          className="mb-8"
        >
          <p className="text-sm text-gray-500 mb-3">Atau kunjungi halaman:</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {suggestedPages.map((page, idx) => (
              <motion.div
                key={page.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={mounted ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1.2 + idx * 0.1 }}
              >
                <Link
                  to={page.path}
                  className="inline-block px-5 py-2.5 bg-white border border-green-200 rounded-full text-sm font-medium text-gray-700 hover:border-primary hover:text-primary hover:shadow-md transition-all"
                >
                  {page.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-shadow"
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ x: [-3, 0, -3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </motion.svg>
            Kembali ke Beranda
          </motion.button>
        </motion.div>

        {/* Fun Fact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 2 }}
          className="mt-8 text-xs text-gray-400 italic"
        >
          💡 Fun fact: Tanaman yang layu bisa segar kembali dengan disiram.
          Halaman ini butuh "disiram" oleh developer kami!
        </motion.p>
      </motion.div>

      {/* Decorative Corner Elements */}
      <motion.div
        className="absolute top-10 left-10 hidden lg:block"
        initial={{ opacity: 0, rotate: -20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 1.8 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle
            cx="40"
            cy="40"
            r="35"
            stroke="#7CB342"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <circle cx="40" cy="40" r="20" fill="#C5E17A" opacity="0.3" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-10 right-10 hidden lg:block"
        initial={{ opacity: 0, rotate: 20 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 1.8 }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect
            x="10"
            y="10"
            width="60"
            height="60"
            rx="15"
            stroke="#7CB342"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <rect
            x="25"
            y="25"
            width="30"
            height="30"
            rx="8"
            fill="#C5E17A"
            opacity="0.3"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default NotFound;
