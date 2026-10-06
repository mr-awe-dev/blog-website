import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface ComingSoonProps {
  pageName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageName }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          🌱
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          {pageName}
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          Halaman ini sedang dalam proses pertumbuhan. Kami sedang menyiraminya
          dengan kode terbaik!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
