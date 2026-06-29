import { motion } from "framer-motion";
import { Package, Gift, Heart, Tags } from "lucide-react";
import { products, categories } from "../lib/products";
import { useWishlist } from "../lib/wishlistContext";

export function Stats() {
  const { receivedIds } = useWishlist();
  const total = products.length;
  const received = receivedIds.length;
  const remaining = total - received;
  const categoryNames = categories.join(", ");

  const stats = [
    {
      label: "Itens na Lista",
      value: String(total),
      icon: Package,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      glow: "59,130,246",
      from: "#3b82f6",
      to: "#06b6d4",
    },
    {
      label: "Já Recebidos",
      value: String(received),
      icon: Gift,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      glow: "16,185,129",
      from: "#10b981",
      to: "#14b8a6",
    },
    {
      label: "Ainda Faltam",
      value: String(remaining),
      icon: Heart,
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      glow: "244,63,94",
      from: "#f43f5e",
      to: "#ec4899",
    },
    {
      label: "Categorias",
      value: String(categories.length),
      desc: categoryNames,
      icon: Tags,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      glow: "168,85,247",
      from: "#a855f7",
      to: "#6366f1",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 mb-20 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="relative group rounded-2xl overflow-hidden glass transition-all duration-300 col-span-1"
          >
            <div className="absolute inset-0 bg-[#111827]/45 backdrop-blur-xl group-hover:bg-[#111827]/75 transition-colors duration-500 -z-10" />

            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, rgba(${stat.glow},0.4), rgba(${stat.glow},0.1))`,
                padding: "1px",
              }}
            />

            <div
              className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 -z-10"
              style={{ background: `radial-gradient(ellipse, rgba(${stat.glow},0.5), transparent 70%)` }}
            />

            <div className="relative z-10 p-5 sm:p-6 flex flex-row sm:flex-col items-center sm:items-start sm:justify-between h-full gap-5 sm:gap-0">
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.from}, ${stat.to}, transparent)` }}
              />

              <div className="mb-0 sm:mb-6 shrink-0 relative">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} border border-white/10 relative overflow-hidden`}>
                  <stat.icon className={`w-7 h-7 ${stat.color} relative z-10`} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-gray-500 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.1em] sm:tracking-[0.15em] mb-1 sm:mb-2 truncate">{stat.label}</p>
                <h3
                  className="text-4xl sm:text-5xl font-black leading-none tracking-tight transition-transform duration-300 group-hover:scale-105 origin-left"
                  style={{
                    background: `linear-gradient(135deg, ${stat.from}, ${stat.to})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </h3>
                {stat.desc && (
                  <p className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-3 leading-relaxed truncate sm:whitespace-normal">{stat.desc}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
