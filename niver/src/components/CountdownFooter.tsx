import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function CountdownFooter() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-07-10T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 mb-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass rounded-3xl p-6 sm:p-10 md:p-16 text-center relative overflow-hidden"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] sm:w-[600px] aspect-square rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <Clock className="w-12 h-12 text-blue-400 mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">O grande dia está chegando!</h2>
          <p className="text-gray-400 mb-8 px-2 text-sm md:text-base">
            Contagem regressiva para o meu aniversário em 10 de Julho de 2026. Falta pouco!
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
            {units.map((unit, idx) => (
              <div key={idx} className="flex items-center gap-3 sm:gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center glass rounded-2xl text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                    {String(unit.value).padStart(2, "0")}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">
                    {unit.label}
                  </span>
                </div>
                {idx < units.length - 1 && (
                  <span className="text-xl sm:text-2xl text-gray-600 font-light pb-6">:</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
