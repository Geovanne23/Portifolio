import { motion } from "framer-motion";
import { Gift } from "lucide-react";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-6xl mx-auto mt-12 mb-20 px-4"
    >
      <div className="glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
        {/* Background ambient light */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)" }} />
        </div>

        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-400 font-medium text-sm"
          >
            <span role="img" aria-label="party">🎉</span>
            Meus Presentes de Aniversário
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Obrigado por fazer parte <br className="hidden lg:block" />
            desse momento! <span role="img" aria-label="heart">❤️</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-gray-400 text-lg max-w-xl leading-relaxed"
          >
            Se você chegou até aqui, é porque deseja tornar meu dia ainda mais especial! Separei abaixo algumas ideias de mimos que eu adoraria ganhar. Fique à vontade para escolher o que preferir!
          </motion.p>
        </div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="flex flex-col items-center justify-center relative"
        >
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full p-2" style={{ background: "linear-gradient(to top right, #3B82F6, #6366F1)" }}>
            <div className="w-full h-full rounded-full bg-[#080B12] flex items-center justify-center overflow-hidden border-4 border-transparent">
              <div className="w-full h-full flex items-center justify-center bg-[#111827]">
                <Gift className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-blue-500 opacity-50" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full pointer-events-none" style={{ boxShadow: "0 0 40px rgba(59,130,246,0.5)" }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 glass px-6 py-3 rounded-2xl flex items-center gap-3 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
          >
            <Gift className="w-5 h-5 text-blue-400" />
            <span className="font-semibold tracking-wide" style={{ background: "linear-gradient(to right, #3B82F6, #6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Lista de Presentes 2026
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
