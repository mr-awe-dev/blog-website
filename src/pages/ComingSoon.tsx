import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface ComingSoonProps {
  pageName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageName }) => {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl glass-strong shadow-sm rounded-3xl p-8 sm:p-12 relative overflow-hidden"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          🚀
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          {pageName}
        </h1>
        <p className="text-slate-600 mb-8 text-lg">
          Halaman ini sedang dalam proses pembuatan. Kami sedang memprogramnya
          dengan kode terbaik!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 glass border border-primary/30 text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
