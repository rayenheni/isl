import { motion } from "framer-motion";
import { ArrowLeft, MousePointer2, BookOpenText, GraduationCap } from "lucide-react";
import { stats, site } from "../data/content";
import { EightPointStar, StarOutline } from "./Ornament";

interface HeroProps {
  onBrowseArticles: () => void;
  onShowBio: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ onBrowseArticles, onShowBio }: HeroProps) {
  return (
    <section id="home" className="pattern-light relative overflow-hidden bg-ivory">
      {/* كلمة زخرفية ضخمة باهتة في الخلفية */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 start-[42%] select-none font-serif-ar text-[22rem] font-bold leading-none text-forest/[0.045] max-lg:hidden"
      >
        عِلم
      </span>
      {/* نجمة دوّارة خفيفة */}
      <StarOutline
        className="animate-spin-slow pointer-events-none absolute -start-24 top-1/3 h-72 w-72 text-sage/25 max-lg:hidden"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:pb-28 lg:pt-44">
        {/* ————— النصّ (الجهة اليمنى في RTL) ————— */}
        <div className="lg:col-span-7 xl:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-12 bg-gold" />
            <EightPointStar className="h-4 w-4 text-gold" />
            <span className="text-sm font-semibold tracking-[0.14em] text-gold-deep">
              {site.scholarTitle} · {site.location}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
            className="mt-7 font-serif-ar text-[2.9rem] font-bold leading-[1.35] text-forest sm:text-6xl sm:leading-[1.3] lg:text-[4.4rem] lg:leading-[1.28]"
          >
            العلمُ معرفةٌ تُبنى،
            <br />
            <span className="relative inline-block text-gold-deep">
              وأثرٌ يبقى
              <svg
                viewBox="0 0 220 12"
                className="absolute -bottom-2 start-0 w-full text-gold/60"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path d="M2 9 C 60 2, 160 2, 218 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.24, ease }}
            className="mt-7 max-w-xl text-lg leading-9 text-ink/90"
          >
            مساحة علمية أشارك من خلالها اهتماماتي في العلوم الإسلامية، وكتاباتي
            البحثية، والدروس والمحاضرات التي تسعى إلى نشر المعرفة وتعميق الفهم.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.36, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={onBrowseArticles}
              className="group inline-flex items-center gap-3 border border-forest bg-forest px-7 py-3.5 font-medium text-ivory shadow-[0_18px_35px_-16px_rgba(24,61,50,0.55)] transition-all duration-300 hover:bg-forest-deep hover:shadow-[0_22px_40px_-14px_rgba(24,61,50,0.6)]"
            >
              <BookOpenText className="h-5 w-5 text-gold-light" />
              تصفّح المقالات
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <button
              onClick={onShowBio}
              className="group inline-flex items-center gap-3 border border-forest/35 bg-transparent px-7 py-3.5 font-medium text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-ivory"
            >
              <GraduationCap className="h-5 w-5" />
              تعرّف على مسيرتي العلمية
            </button>
          </motion.div>

          {/* أرقام تعريفية */}
          <motion.dl
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-14 flex max-w-xl items-stretch gap-0 border-t border-sage/50 pt-7"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={
                  "flex flex-1 flex-col px-4 first:ps-0 " +
                  (i > 0 ? "border-s border-sage/40" : "")
                }
              >
                <dd className="order-1 font-serif-ar text-3xl font-bold text-forest">
                  {s.value}
                </dd>
                <dt className="order-2 mt-1 text-[0.8rem] leading-5 text-muted">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.65 }}
            className="mt-3 text-[0.7rem] text-muted/70"
          >
            * أرقام توضيحية تُحدَّث بمنجزات الباحثة الفعلية
          </motion.p>
        </div>

        {/* ————— التركيب البصري (الجهة اليسرى في RTL) ————— */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
            className="relative mx-auto max-w-md lg:max-w-none"
          >
            {/* الإطار الذهبي الخلفي */}
            <div
              aria-hidden="true"
              className="arch-frame absolute -inset-0 translate-x-5 translate-y-5 border border-gold/70"
            />
            <div
              aria-hidden="true"
              className="arch-frame absolute -inset-0 translate-x-10 translate-y-10 border border-sage/40 max-sm:hidden"
            />

            {/* الصورة داخل قوس معماري */}
            <figure className="arch relative overflow-hidden border-[6px] border-ivory shadow-[0_35px_70px_-25px_rgba(24,61,50,0.45)]">
              <motion.img
                src="/images/hero.jpg"
                alt="تفصيل معماري تونسي تقليدي: قوس منحوت وباب أخضر مزيّن بالزليج"
                className="aspect-[4/5.1] w-full object-cover"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.6, ease }}
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/35 via-transparent to-transparent" />
              <figcaption className="absolute bottom-0 inset-x-0 flex items-center justify-between px-6 pb-5 text-ivory">
                <span className="text-[0.72rem] tracking-wide text-ivory/85">
                  من عمارة المدينة العتيقة — تونس
                </span>
                <EightPointStar className="h-4 w-4 text-gold-light" />
              </figcaption>
            </figure>

            {/* بطاقة الآية العائمة */}
            <motion.blockquote
              initial={{ opacity: 0, y: 24, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease }}
              className="double-frame absolute -bottom-8 -start-4 border border-gold/50 bg-ivory px-7 py-5 shadow-[0_25px_50px_-20px_rgba(24,61,50,0.4)] sm:-start-10"
            >
              <p className="font-serif-ar text-[1.45rem] font-bold leading-snug text-forest">
                ﴿وَقُلْ رَبِّ زِدْنِي عِلْمًا﴾
              </p>
              <cite className="mt-1 block text-[0.72rem] not-italic tracking-wide text-gold-deep">
                سورة طه · الآية ١١٤
              </cite>
            </motion.blockquote>

            {/* نجمة زخرفية أعلى القوس */}
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.95, ease }}
              className="absolute -top-5 end-8 flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-ivory shadow-lg"
              aria-hidden="true"
            >
              <EightPointStar className="h-7 w-7 text-gold-deep" />
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* مؤشّر التمرير */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative mx-auto flex max-w-7xl items-center gap-3 px-5 pb-10 sm:px-8 lg:px-10"
        aria-hidden="true"
      >
        <MousePointer2 className="h-4 w-4 rotate-180 text-gold-deep" />
        <span className="text-xs tracking-[0.2em] text-muted">اكتشف المزيد بالتمرير</span>
        <span className="h-px flex-1 bg-gradient-to-l from-sage/60 to-transparent" />
      </motion.div>
    </section>
  );
}
