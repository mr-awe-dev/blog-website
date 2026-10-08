export const glassClasses = {
  light: "bg-white/60 backdrop-blur-xl border border-white/50 shadow-lg",
  lightHover: "hover:bg-white/80 hover:shadow-xl transition-all duration-300",
  dark: "bg-gray-900/70 backdrop-blur-xl border border-white/10 shadow-xl",
  input:
    "bg-white/30 backdrop-blur-md border border-white/40 focus:bg-white/50 focus:border-[#7CB342]/50 transition-all duration-300",
  button:
    "bg-white/80 backdrop-blur-md border border-[#7CB342]/30 text-[#7CB342] hover:bg-[#7CB342] hover:text-white transition-all duration-300 shadow-md",
};

// Cara pakai di component:
// className={`${glassClasses.light} ${glassClasses.lightHover} rounded-2xl p-4`}
