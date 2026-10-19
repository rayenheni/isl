import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Play,
  X,
  Clock,
  MonitorPlay,
  AudioLines,
  ListVideo,
  Gauge,
  Info,
  CheckCircle2,
} from "lucide-react";
import { lectures, type Lecture } from "../data/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { EightPointStar, OrnDivider } from "./Ornament";
import { cn } from "../utils/cn";

export function Lectures() {
  const [selected, setSelected] = useState<Lecture | null>(null);

  return (
    <section id="lectures" className="pattern-dark relative overflow-hidden bg-forest py-24 lg:py-32" aria-label="الدروس والمحاضرات">
      {/* كلمة زخرفية باهتة */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 end-0 select-none font-serif-ar text-[16rem] font-bold leading-none text-ivory/[0.035] max-lg:hidden"
      >
        دروس
      </span>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            dark
            numeral="٠٣"
            kicker="مواد تعليمية"
            title="الدروس والمحاضرات"
            description="سلاسل ودروس مرئية وصوتية في موضوعات العلوم الإسلامية، أُعدّت لتكون رفيقاً لطالب العلم والقارئ المهتمّ أينما كان."
          />
          <Reveal delay={0.15}>
            <div className="flex items-center gap-6 border border-ivory/15 px-6 py-4 text-center max-sm:w-full max-sm:justify-center">
              <span>
                <span className="block font-serif-ar text-2xl font-bold text-gold-light">٤</span>
                <span className="text-[0.72rem] text-sage-light">سلاسل ومحاضرات</span>
              </span>
              <span className="h-9 w-px bg-ivory/15" />
              <span>
                <span className="block font-serif-ar text-2xl font-bold text-gold-light">مرئي · صوتي</span>
                <span className="text-[0.72rem] text-sage-light">صيغ متاحة للمحتوى</span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* بطاقات الدروس */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
          {lectures.map((lecture, i) => (
            <Reveal key={lecture.id} delay={(i % 2) * 0.12}>
              <article className="group flex h-full flex-col border border-ivory/12 bg-forest-deep/60 transition-all duration-500 hover:border-gold/40 hover:bg-forest-deep">
                {/* المصغّرة */}
                <button
                  onClick={() => setSelected(lecture)}
                  className="relative block overflow-hidden text-start"
                  aria-label={`معاينة درس: ${lecture.title}`}
                >
                  <img
                    src={lecture.image}
                    alt={`صورة تعريفية لدرس ${lecture.title}`}
                    className="aspect-[16/8.5] w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest/10 to-transparent" />
                  {/* زر التشغيل */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/50 bg-forest/55 backdrop-blur-[2px] transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold">
                      <Play className="h-6 w-6 -me-1 fill-ivory text-ivory transition-colors duration-500 group-hover:fill-forest group-hover:text-forest" />
                    </span>
                  </span>
                  {/* شارات */}
                  <span className="absolute start-4 top-4 inline-flex items-center gap-1.5 bg-forest-deep/80 px-2.5 py-1 text-[0.72rem] font-medium text-ivory backdrop-blur-sm">
                    {lecture.format === "مرئي" ? (
                      <MonitorPlay className="h-3.5 w-3.5 text-gold-light" />
                    ) : (
                      <AudioLines className="h-3.5 w-3.5 text-gold-light" />
                    )}
                    {lecture.format}
                  </span>
                  <span className="absolute bottom-4 end-4 inline-flex items-center gap-1.5 bg-forest-deep/80 px-2.5 py-1 text-[0.72rem] text-ivory backdrop-blur-sm">
                    <Clock className="h-3.5 w-3.5 text-gold-light" />
                    <span dir="ltr">{lecture.duration}</span>
                  </span>
                  <span className="absolute bottom-4 start-4 font-serif-ar text-2xl font-bold text-ivory/85">
                    {lecture.numeral}
                  </span>
                </button>

                {/* النص */}
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-serif-ar text-[1.55rem] font-bold leading-[1.5] text-ivory">
                    {lecture.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-8 text-sage-light/90">{lecture.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.78rem] text-sage-light">
                    <span className="inline-flex items-center gap-1.5">
                      <Gauge className="h-3.5 w-3.5 text-gold-light" />
                      {lecture.level}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ListVideo className="h-3.5 w-3.5 text-gold-light" />
                      {lecture.lessonsCount}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelected(lecture)}
                    className="mt-6 inline-flex w-fit items-center gap-2.5 border border-gold/60 px-5 py-2.5 text-sm font-medium text-gold-light transition-all duration-300 hover:bg-gold hover:text-forest"
                  >
                    <Play className="h-4 w-4" />
                    {lecture.format === "مرئي" ? "مشاهدة الدرس" : "الاستماع إلى الدرس"}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-[0.75rem] text-sage-light/70">
            وسائط توضيحية للعرض — تُدمج التسجيلات الفعلية (يوتيوب أو ملفات صوتية) عند إطلاق الموقع
          </p>
        </Reveal>
      </div>

      {/* نافذة معاينة الدرس */}
      <LectureModal lecture={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

/* ————————————————— نافذة المعاينة ————————————————— */
function LectureModal({ lecture, onClose }: { lecture: Lecture | null; onClose: () => void }) {
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    setShowNotice(false);
    if (!lecture) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lecture, onClose]);

  return (
    <AnimatePresence>
      {lecture && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-forest-deep/85 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`معاينة درس ${lecture.title}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto border border-gold/30 bg-ivory shadow-2xl"
          >
            {/* منطقة المشغّل */}
            <div className="relative">
              <img
                src={lecture.image}
                alt=""
                className="aspect-video w-full object-cover"
              />
              <span className="absolute inset-0 bg-forest-deep/45" />
              <button
                onClick={onClose}
                className="absolute end-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-forest-deep/70 text-ivory backdrop-blur-sm transition-colors hover:bg-gold hover:text-forest"
                aria-label="إغلاق المعاينة"
              >
                <X className="h-5 w-5" />
              </button>

              {showNotice ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-x-5 bottom-5 flex items-start gap-3 border border-gold/50 bg-forest-deep/90 p-4 text-ivory backdrop-blur-sm sm:inset-x-8"
                  role="status"
                >
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" />
                  <p className="text-sm leading-7">
                    هذه معاينة تجريبية لتصميم مشغّل الوسائط. عند إطلاق الموقع سيُعرض هنا
                    التسجيل الفعلي للدرس — عبر تضمين يوتيوب أو مشغّل صوتي مدمج — مع إمكانية
                    إضافة الملاحظات والروابط المرافقة.
                  </p>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowNotice(true)}
                  className="group absolute inset-0 flex flex-col items-center justify-center gap-4"
                  aria-label="تشغيل معاينة الدرس"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-ivory/60 bg-gold text-forest shadow-[0_20px_45px_-12px_rgba(183,161,106,0.8)] transition-transform duration-400 group-hover:scale-110">
                    <Play className="h-8 w-8 -me-1 fill-forest" />
                  </span>
                  <span className="text-sm font-medium tracking-wide text-ivory">
                    {lecture.format === "مرئي" ? "مشاهدة الدرس" : "الاستماع إلى الدرس"} ·{" "}
                    <span dir="ltr">{lecture.duration}</span>
                  </span>
                </button>
              )}
            </div>

            {/* تفاصيل الدرس */}
            <div className="p-7 sm:p-9">
              <div className="flex flex-wrap items-center gap-3 text-[0.78rem]">
                <span className="border border-gold/70 bg-gold/10 px-2.5 py-1 font-semibold text-gold-deep">
                  {lecture.format === "مرئي" ? "درس مرئي" : "درس صوتي"}
                </span>
                <span className="text-muted">{lecture.level}</span>
                <span className="text-muted">·</span>
                <span className="text-muted">{lecture.lessonsCount}</span>
              </div>
              <h3 className="mt-4 font-serif-ar text-3xl font-bold leading-[1.45] text-forest">
                {lecture.title}
              </h3>
              <p className="mt-4 leading-8.5 text-ink/85">{lecture.description}</p>

              <OrnDivider className="my-7" />

              <h4 className="flex items-center gap-2.5 font-serif-ar text-xl font-bold text-forest">
                <EightPointStar className="h-4 w-4 text-gold" />
                محاور الدرس
              </h4>
              <ul className="mt-4 space-y-3">
                {lecture.outline.map((item, i) => (
                  <li key={item} className="flex items-start gap-3 leading-7 text-ink/85">
                    <CheckCircle2 className="mt-1.5 h-4.5 w-4.5 shrink-0 text-gold-deep" />
                    <span>
                      <span className="font-serif-ar font-bold text-forest">
                        {["٠١", "٠٢", "٠٣", "٠٤"][i]} —{" "}
                      </span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowNotice(true)}
                  className={cn(
                    "inline-flex items-center gap-2.5 border border-forest bg-forest px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-forest-deep"
                  )}
                >
                  <Play className="h-4 w-4" />
                  {lecture.format === "مرئي" ? "مشاهدة الدرس" : "الاستماع إلى الدرس"}
                </button>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 border border-sage/70 px-6 py-3 text-sm font-medium text-forest transition-colors hover:border-forest"
                >
                  إغلاق المعاينة
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
