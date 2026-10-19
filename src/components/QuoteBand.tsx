import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quotes } from "../data/content";
import { EightPointStar } from "./Ornament";
import { cn } from "../utils/cn";

/* شريط مأثورات متناوب على خلفية خضراء عميقة */
export function QuoteBand() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % quotes.length), 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const quote = quotes[index];

  return (
    <section
      className="pattern-dark relative overflow-hidden bg-forest py-16 lg:py-20"
      aria-label="مأثورات في طلب العلم"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* توهّج ذهبي خفيف */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <EightPointStar className="mx-auto h-6 w-6 text-gold-light" />
        <div className="mt-6 flex min-h-[9.5rem] items-center justify-center sm:min-h-[10.5rem]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* وسم نوع المقتبس: آية / حديث / حكمة */}
              <span className="inline-block border border-gold-light/50 px-3 py-0.5 text-[0.72rem] font-semibold tracking-[0.12em] text-gold-light">
                {quote.label}
              </span>

              {/* القوسان المزهّران ﴿ ﴾ للقرآن الكريم حصراً */}
              <p
                className={cn(
                  "mt-4 font-serif-ar font-bold leading-[1.75] text-ivory",
                  quote.kind === "quran" ? "text-3xl sm:text-4xl" : "text-[1.6rem] sm:text-[2.1rem]"
                )}
              >
                {quote.kind === "quran" ? `﴿ ${quote.text} ﴾` : `« ${quote.text} »`}
              </p>

              <cite className="mt-4 block text-sm not-italic tracking-wide text-gold-light">
                {quote.source}
              </cite>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2.5" role="tablist" aria-label="اختيار المأثورة">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`المأثورة ${i + 1}`}
              className={cn(
                "h-2 rotate-45 transition-all duration-400",
                i === index ? "w-6 bg-gold-light" : "w-2 bg-ivory/30 hover:bg-ivory/60"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
