import { BookOpen, ScrollText, Landmark, Compass, ArrowUpLeft } from "lucide-react";
import { researchAreas } from "../data/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const iconMap: Record<string, typeof BookOpen> = {
  "book-open": BookOpen,
  "scroll-text": ScrollText,
  landmark: Landmark,
  compass: Compass,
};

interface ResearchAreasProps {
  onSelectCategory: (category: string) => void;
}

export function ResearchAreas({ onSelectCategory }: ResearchAreasProps) {
  return (
    <section id="research" className="relative bg-ivory-deep/60 py-24 lg:py-32" aria-label="مجالات الاهتمام">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            numeral="٠١"
            kicker="الاهتمامات البحثية"
            title="مجالات الاهتمام"
            description="تتوزّع اهتماماتي البحثية على أربعة مجالات رئيسية، تتكامل فيما بينها لرسم صورة شاملة للدرس الإسلامي بين التراث والمعاصرة."
          />
          <Reveal delay={0.15}>
            <p className="max-w-[16rem] border-s-2 border-gold ps-4 text-sm leading-7 text-muted max-lg:hidden">
              اضغط على أيّ مجال لاستعراض المقالات والبحوث المندرجة ضمنه.
            </p>
          </Reveal>
        </div>

        {/* شبكة تحريرية بخطوط فاصلة رقيقة */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-sage/50 bg-sage/50 sm:grid-cols-2">
          {researchAreas.map((area, i) => {
            const Icon = iconMap[area.icon] ?? BookOpen;
            return (
              <Reveal key={area.id} delay={i * 0.08} className="h-full">
                <button
                  onClick={() => onSelectCategory(area.title)}
                  className="group relative flex h-full w-full flex-col bg-ivory p-8 text-start transition-colors duration-500 hover:bg-[#fffdf7] sm:p-10"
                >
                  {/* رقم خلفي شفاف */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute end-6 top-4 font-serif-ar text-[5.5rem] font-bold leading-none text-forest/[0.05] transition-colors duration-500 group-hover:text-gold/15"
                  >
                    {area.numeral}
                  </span>

                  <span className="relative flex h-14 w-14 items-center justify-center">
                    <span className="absolute inset-0 rotate-45 border border-gold/60 transition-all duration-500 group-hover:rotate-[135deg] group-hover:bg-forest" />
                    <Icon className="relative h-6 w-6 text-forest transition-colors duration-500 group-hover:text-gold-light" />
                  </span>

                  <h3 className="relative mt-7 font-serif-ar text-[1.65rem] font-bold text-forest">
                    {area.title}
                  </h3>
                  <p className="relative mt-3 flex-1 leading-8 text-ink/85">
                    {area.description}
                  </p>

                  <span className="relative mt-6 flex flex-wrap items-center gap-2">
                    {area.topics.map((topic) => (
                      <span
                        key={topic}
                        className="border border-sage/60 px-3 py-1 text-[0.75rem] text-muted transition-colors duration-300 group-hover:border-gold/60 group-hover:text-gold-deep"
                      >
                        {topic}
                      </span>
                    ))}
                  </span>

                  <span className="relative mt-7 inline-flex items-center gap-2 text-sm font-medium text-forest opacity-0 transition-all duration-400 group-hover:opacity-100">
                    استعراض مقالات المجال
                    <ArrowUpLeft className="h-4 w-4 text-gold-deep" />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-[0.75rem] text-muted/80">
            مجالات توضيحية للعرض — تُستبدل بتخصّصات الباحثة الفعلية عند اعتماد الموقع
          </p>
        </Reveal>
      </div>
    </section>
  );
}
