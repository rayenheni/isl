import { ArrowLeft, GraduationCap, ImagePlus } from "lucide-react";
import { biography, researchAreas, site } from "../data/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { EightPointStar } from "./Ornament";

interface BiographyProps {
  onShowFullBio: () => void;
  onSelectCategory: (category: string) => void;
}

export function Biography({ onShowFullBio, onSelectCategory }: BiographyProps) {
  return (
    <section id="bio" className="relative overflow-hidden bg-ivory py-24 lg:py-32" aria-label="السيرة العلمية">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-10">
        {/* عمود الصورة */}
        <div className="lg:col-span-5">
          <Reveal className="relative mx-auto max-w-md lg:sticky lg:top-32">
            <div aria-hidden="true" className="arch-frame absolute -inset-0 -translate-x-4 translate-y-4 border border-gold/60" />
            <figure className="arch relative overflow-hidden border-[5px] border-ivory-deep shadow-[0_30px_60px_-25px_rgba(24,61,50,0.4)]">
              <img
                src="/images/still-life.jpg"
                alt="مشهد رمزي لطاولة عمل باحثة: مخطوط عربي مذهّب وكتب جلدية قديمة وفانوس نحاسي وأقلام خطّ على طاولة خشبية منحوتة"
                className="aspect-[4/4.7] w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/45 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-5 text-ivory">
                <span className="font-serif-ar text-2xl font-bold">{site.scholarName}</span>
                <span className="mt-0.5 block text-[0.78rem] text-ivory/85">
                  {site.scholarTitle} — {site.location}
                </span>
              </figcaption>
            </figure>
            <p className="mt-5 flex items-center justify-center gap-2 text-[0.75rem] text-muted">
              <ImagePlus className="h-4 w-4 text-gold-deep" />
              صورة توضيحية رمزية — تُستبدل بالصورة الشخصية للباحثة
            </p>
          </Reveal>
        </div>

        {/* عمود المحتوى */}
        <div className="lg:col-span-7">
          <SectionHeading
            numeral="٠٤"
            kicker="السيرة العلمية"
            title="عن المسيرة العلمية"
          />
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-2xl font-serif-ar text-[1.3rem] leading-[1.95] text-ink">
              {biography.lead}
            </p>
          </Reveal>

          {/* محطات مختصرة */}
          <Reveal delay={0.18}>
            <h3 className="mt-11 flex items-center gap-3 font-serif-ar text-[1.35rem] font-bold text-forest">
              <GraduationCap className="h-6 w-6 text-gold-deep" />
              محطات في المسار الأكاديمي
            </h3>
          </Reveal>
          <div className="mt-5">
            {biography.timeline.slice(0, 4).map((item, i) => (
              <Reveal key={item.stage} delay={0.08 * i}>
                <div className="group flex flex-wrap items-baseline gap-x-5 gap-y-1 border-t border-sage/50 py-4 last:border-b">
                  <span className="flex items-center gap-3">
                    <EightPointStar className="h-3 w-3 text-gold transition-transform duration-500 group-hover:rotate-45" />
                    <span className="min-w-36 font-serif-ar text-lg font-bold text-forest">
                      {item.stage}
                    </span>
                  </span>
                  <span className="text-[0.95rem] italic text-muted">{item.detail}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* الاهتمامات */}
          <Reveal delay={0.15}>
            <h3 className="mt-10 font-serif-ar text-[1.35rem] font-bold text-forest">
              الاهتمامات البحثية
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {researchAreas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => onSelectCategory(area.title)}
                  className="border border-sage/70 px-4 py-2 text-sm text-ink transition-all duration-300 hover:border-forest hover:bg-forest hover:text-ivory"
                >
                  {area.title}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <button
              onClick={onShowFullBio}
              className="group mt-11 inline-flex items-center gap-3 border border-forest bg-forest px-7 py-3.5 font-medium text-ivory transition-all duration-300 hover:bg-transparent hover:text-forest"
            >
              اقرأ السيرة الكاملة
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
