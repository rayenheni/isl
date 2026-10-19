import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Award,
  BookMarked,
  Mail,
  Info,
  ImagePlus,
} from "lucide-react";
import { biography, researchAreas, site } from "../data/content";
import { EightPointStar, OrnDivider } from "./Ornament";
import { Reveal } from "./Reveal";

interface BioViewProps {
  onBackHome: () => void;
  onSelectCategory: (category: string) => void;
  onGoContact: () => void;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function BioView({ onBackHome, onSelectCategory, onGoContact }: BioViewProps) {
  return (
    <main className="min-h-screen bg-ivory pb-28 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ترويسة */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <button
            onClick={onBackHome}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-forest"
          >
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            العودة إلى الرئيسية
          </button>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <EightPointStar className="h-3.5 w-3.5 text-gold" />
            <span className="text-[0.8rem] font-semibold tracking-[0.18em] text-gold-deep">
              الملفّ الأكاديمي
            </span>
          </div>
          <h1 className="mt-5 font-serif-ar text-4xl font-bold leading-[1.35] text-forest sm:text-5xl">
            السيرة العلمية الكاملة
          </h1>
        </motion.div>

        {/* تنبيه تحريري */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-9 flex items-start gap-3.5 border border-gold/50 bg-gold/[0.07] p-5"
          role="note"
        >
          <Info className="mt-1 h-5 w-5 shrink-0 text-gold-deep" />
          <p className="leading-8 text-ink/85">
            هذه الصفحة نموذج هيكلي لعرض السيرة العلمية؛ فقد صُمّمت أقسامها وخاناتها
            لتُستكمل ببيانات الباحثة الفعلية — الاسم والشهادات والمنشورات والمشاركات —
            فور اعتماد المشروع، دون أيّ بيانات مُختلقة.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          {/* البطاقة الجانبية */}
          <aside className="lg:col-span-4">
            <Reveal className="lg:sticky lg:top-32">
              <div className="relative mx-auto max-w-sm">
                <div aria-hidden="true" className="arch-frame absolute -inset-0 -translate-x-3.5 translate-y-3.5 border border-gold/60" />
                <figure className="arch relative overflow-hidden border-[5px] border-ivory-deep shadow-[0_28px_55px_-24px_rgba(24,61,50,0.4)]">
                  <img
                    src="/images/still-life.jpg"
                    alt="مشهد رمزي لأدوات الباحثة: مخطوط مذهّب وأقلام خطّ وفانوس نحاسي — صورة بديلة بانتظار الصورة الشخصية"
                    className="aspect-[4/4.4] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </div>
              <div className="mt-8 text-center">
                <p className="font-serif-ar text-3xl font-bold text-forest">{site.scholarName}</p>
                <p className="mt-1.5 text-sm text-muted">
                  {site.scholarTitle} · {site.location}
                </p>
                <p className="mt-3 flex items-center justify-center gap-2 text-[0.74rem] text-muted/80">
                  <ImagePlus className="h-3.5 w-3.5 text-gold-deep" />
                  موضع مخصّص للصورة الشخصية الرسمية
                </p>
              </div>

              <div className="double-frame mt-9 border border-gold/50 bg-[#fffdf7] px-7 py-6 text-center">
                <EightPointStar className="mx-auto h-5 w-5 text-gold" />
                <p className="mt-4 font-serif-ar text-[1.3rem] font-bold leading-[1.8] text-forest">
                  «العلم معرفةٌ تُبنى على مهل،
                  <br />
                  وأثرٌ يبقى بعد رحيل الأصوات»
                </p>
                <p className="mt-3 text-[0.75rem] text-muted">شعار يلخّص رؤية الباحثة لرسالة المعرفة</p>
              </div>

              <button
                onClick={onGoContact}
                className="mt-8 flex w-full items-center justify-center gap-2.5 border border-forest bg-forest px-6 py-3.5 font-medium text-ivory transition-colors hover:bg-forest-deep"
              >
                <Mail className="h-4.5 w-4.5" />
                التواصل للتعاون العلمي
              </button>
            </Reveal>
          </aside>

          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-8">
            {/* نبذة تعريفية */}
            <Reveal>
              <h2 className="flex items-center gap-3 font-serif-ar text-3xl font-bold text-forest">
                <BookMarked className="h-7 w-7 text-gold-deep" />
                نبذة تعريفية
              </h2>
              <p className="mt-6 font-serif-ar text-[1.28rem] leading-[1.95] text-ink">
                {biography.lead}
              </p>
              {biography.paragraphs.map((p, i) => (
                <p key={i} className="mt-5 leading-[2.05] text-ink/85">
                  {p}
                </p>
              ))}
            </Reveal>

            <OrnDivider className="my-12" />

            {/* الخط الزمني الأكاديمي */}
            <Reveal>
              <h2 className="flex items-center gap-3 font-serif-ar text-3xl font-bold text-forest">
                <GraduationCap className="h-7 w-7 text-gold-deep" />
                المسار العلمي والأكاديمي
              </h2>
            </Reveal>
            <div className="relative mt-9 border-s border-sage/60 ps-0">
              {biography.timeline.map((item, i) => (
                <Reveal key={item.stage} delay={i * 0.06}>
                  <div className="relative pb-9 pe-2 ps-10 last:pb-2">
                    <span className="absolute -start-[13px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-gold/70 bg-ivory">
                      <EightPointStar className="h-3 w-3 text-gold-deep" />
                    </span>
                    <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <span className="font-serif-ar text-[1.4rem] font-bold text-forest">
                        {item.stage}
                      </span>
                      <span className="text-[0.72rem] font-medium tracking-wide text-gold-deep">
                        {item.note}
                      </span>
                    </p>
                    <p className="mt-1.5 italic leading-7 text-muted">{item.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <OrnDivider className="my-12" />

            {/* الإسهامات */}
            <Reveal>
              <h2 className="flex items-center gap-3 font-serif-ar text-3xl font-bold text-forest">
                <Award className="h-7 w-7 text-gold-deep" />
                الإسهامات والأنشطة العلمية
              </h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-px border border-sage/50 bg-sage/50 sm:grid-cols-2">
              {biography.contributions.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.07} className="h-full">
                  <div className="group h-full bg-ivory p-7 transition-colors duration-400 hover:bg-[#fffdf7]">
                    <span className="font-serif-ar text-2xl font-bold text-gold/70">
                      {["٠١", "٠٢", "٠٣", "٠٤"][i]}
                    </span>
                    <h3 className="mt-3 font-serif-ar text-[1.3rem] font-bold text-forest">{c.title}</h3>
                    <p className="mt-2 italic leading-7 text-muted">{c.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* الاهتمامات البحثية */}
            <Reveal>
              <h2 className="mt-12 font-serif-ar text-3xl font-bold text-forest">
                الاهتمامات البحثية
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-muted">
                تتوزّع أعمال الباحثة على المجالات التالية — اختر مجالاً لاستعراض
                المقالات والبحوث المرتبطة به:
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {researchAreas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => onSelectCategory(area.title)}
                    className="group inline-flex items-center gap-2.5 border border-sage/70 px-5 py-2.5 text-sm text-ink transition-all duration-300 hover:border-forest hover:bg-forest hover:text-ivory"
                  >
                    {area.title}
                    <ArrowLeft className="h-3.5 w-3.5 text-gold-deep transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-gold-light" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}
