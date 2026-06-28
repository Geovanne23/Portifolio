import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { products } from "../lib/products";
import { useWishlist } from "../lib/wishlistContext";

export function Wishlist() {
  const { receivedIds, toggleReceived } = useWishlist();

  return (
    <section className="w-full max-w-6xl mx-auto px-4 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center md:text-left"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Minha Lista de Presentes</h2>
        <p className="text-gray-400">Aqui estão os itens que escolhi com carinho.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, idx) => {
          const isReceived = receivedIds.includes(product.id);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className={`group glass rounded-2xl overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300 relative border ${
                isReceived
                  ? "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                  : "border-transparent hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              }`}
            >
              {isReceived && (
                <div className="absolute top-3 right-3 z-30 flex items-center gap-1 bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                  <CheckCircle2 className="w-3 h-3" />
                  Recebido!
                </div>
              )}

              {/* Image */}
              <a href={product.link} target="_blank" rel="noopener noreferrer" className="block">
                <div
                  className={`h-48 w-full bg-[#080B12] relative overflow-hidden flex items-center justify-center border-b border-white/5 transition-all duration-500 ${
                    isReceived ? "opacity-60" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] to-transparent opacity-40 z-10 pointer-events-none" />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span
                    className={`absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border border-white/10 ${product.color}`}
                  >
                    {product.category}
                  </span>
                </div>
              </a>

              <div className="p-5 flex flex-col flex-grow bg-[#111827]/50">
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <h3
                    className={`text-base font-bold mb-1 transition-colors ${
                      isReceived ? "text-emerald-400" : "text-white group-hover:text-blue-400"
                    }`}
                  >
                    {product.name}
                  </h3>
                </a>
                <p className="text-sm text-gray-400 mb-4 flex-grow">{product.desc}</p>

                <div className="flex items-center justify-between mt-auto gap-2">
                  <span className="text-white font-medium text-sm">{product.price}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => toggleReceived(product.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                        isReceived
                          ? "bg-emerald-500/20 text-emerald-400 hover:bg-red-500/20 hover:text-red-400"
                          : "bg-[#1F2937] text-gray-400 hover:bg-emerald-500/20 hover:text-emerald-400"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {isReceived ? "Desfazer" : "Recebi!"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom glow line */}
              <div
                className={`absolute bottom-0 left-0 w-full h-1 transition-transform duration-500 origin-left ${
                  isReceived ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
                style={{
                  background: isReceived
                    ? "#10b981"
                    : "linear-gradient(to right, #3B82F6, #6366F1)",
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
