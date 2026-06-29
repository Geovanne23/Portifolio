import { motion } from "framer-motion";

export function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base dark bg */}
      <div className="absolute inset-0 bg-[#080B12]" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial fade over grid */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, #080B12 100%)",
        }}
      />

      {/* Aurora orb — top left (blue) */}
      <motion.div
        className="absolute -top-32 -left-32 w-[150vw] sm:w-[600px] aspect-square rounded-full will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 60%)" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora orb — top right (purple) */}
      <motion.div
        className="absolute -top-32 -right-32 w-[120vw] sm:w-[500px] aspect-square rounded-full will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 60%)" }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Aurora orb — center */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[150vw] sm:w-[800px] h-[50vw] sm:h-[400px] rounded-full will-change-transform"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)" }}
        animate={{ scaleX: [1, 1.1, 1], scaleY: [1, 0.9, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Aurora orb — bottom right (indigo) */}
      <motion.div
        className="absolute bottom-0 right-0 w-[140vw] sm:w-[550px] aspect-square rounded-full will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 60%)" }}
        animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Aurora orb — bottom left (teal) */}
      <motion.div
        className="absolute bottom-0 -left-24 w-[110vw] sm:w-[400px] aspect-square rounded-full will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 60%)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
    </div>
  );
}
