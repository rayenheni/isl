import { ArrowLeft } from "lucide-react";
import { Reveal } from "./Reveal";
import { CornerMotif } from "./Ornament";
import { site } from "../data/content";

interface IntroProps {
  onShowBio: () => void;
  onGoTo: (id: string) => void;
}

export function Intro({ onShowBio, onGoTo }: IntroProps) {
  const links = [
    {
      numeral: "٠١",
      title: "السيرة والمسيرة العلمية",
      desc: "المسار الأكاديمي والتكوين والإسهامات",
      action: onShowBio,
    },
    {
      numeral: "٠٢",
      title: "المقالات والبحوث",
      desc: "كتابات في الدراسات القرآنية والفكر الإسلامي",
      action: () => onGoTo("articles"),
    },
    {
      numeral: "٠٣",
      title: "الدروس والمحاضرات",
      desc: "مواد تعليمية مرئية وصوتية للمهتمّين",
      action: () => onGoTo("lectures"),
    },
  ];

  return (
    <section className="relative bg-ivory py-24 lg:py-32" aria-label="تقديم">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-10">
        {/* النص التقديمي */}
        <div className="relative lg:col-span-7">
          <CornerMotif className="absolute -top-8 start-0 h-14 w-14 -scale-x-100 text-gold/70 max-lg:hidden" />
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.18em] text-gold-deep">تقديم</p>
            <h2 className="mt-4 font-serif-ar text-4xl font-bold leading-[1.4] text-forest sm:text-[2.9rem]">
              مرحباً بك في فضائي العلمي
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-2xl text-[1.12rem] leading-[2.1] text-ink">
              أؤمن بأهمية البحث العلمي والحوار المعرفي في فهم التراث الإسلامي
              واستكشاف قضاياه. أشارك هنا جانباً من اهتماماتي العلمية، وأعمالي
              المكتوبة، والمواد التعليمية التي أضعها بين أيدي القرّاء والمهتمّين.
            </p>
            <p className="mt-5 max-w-2xl leading-[2.1] text-muted">
              من تونس، حيث تمتزج عراقة الزيتونة بروح الأسئلة المعاصرة، أكتب وأدرّس
              وأبحث، سعياً إلى معرفةٍ رصينة تُنير العقل وتُثري الوجدان، وتصل الماضي
              بالحاضر وصلاً واعياً مثمراً.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-10 flex items-center gap-4">
              <span className="h-px w-14 bg-gold" />
              <span className="font-serif-ar text-2xl italic text-forest">
                {site.scholarName}
              </span>
              <span className="text-sm text-muted">{site.scholarTitle}</span>
            </p>
          </Reveal>
        </div>

        {/* روابط تحريرية */}
        <div className="lg:col-span-5">
          <Reveal delay={0.15}>
            <p className="mb-2 text-[0.8rem] font-medium tracking-wide text-muted">
              من أين تبدأ رحلتك في هذا الفضاء؟
            </p>
          </Reveal>
          <div>
            {links.map((link, i) => (
              <Reveal key={link.title} delay={0.12 * i + 0.15}>
                <button
                  onClick={link.action}
                  className="group flex w-full items-center gap-5 border-t border-sage/50 py-6 text-start transition-colors duration-300 last:border-b hover:bg-sage-pale/40"
                >
                  <span className="font-serif-ar text-lg font-bold text-gold-deep">
                    {link.numeral}
                  </span>
                  <span className="flex-1">
                    <span className="block font-serif-ar text-[1.4rem] font-bold leading-snug text-forest transition-transform duration-300 group-hover:-translate-x-1.5">
                      {link.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{link.desc}</span>
                  </span>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sage/60 text-forest transition-all duration-300 group-hover:border-forest group-hover:bg-forest group-hover:text-ivory">
                    <ArrowLeft className="h-4.5 w-4.5" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
