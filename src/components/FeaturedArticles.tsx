import { ArrowLeft, Clock, LibraryBig } from "lucide-react";
import { articles, type Article } from "../data/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

interface FeaturedArticlesProps {
  onOpenArticle: (article: Article) => void;
  onOpenArchive: () => void;
}

export function FeaturedArticles({ onOpenArticle, onOpenArchive }: FeaturedArticlesProps) {
  const featured = articles.filter((a) => a.featured);

  return (
    <section id="articles" className="pattern-light relative bg-ivory py-24 lg:py-32" aria-label="المقالات والبحوث">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            numeral="٠٢"
            kicker="كتابات وبحوث"
            title="من المقالات والبحوث"
            description="مختارات من الكتابات البحثية في الدراسات القرآنية والحديث والفكر الإسلامي وقضايا العصر — نصوص نموذجية للعرض التجريبي."
          />
          <Reveal delay={0.15}>
            <button
              onClick={onOpenArchive}
              className="group inline-flex items-center gap-3 border border-forest px-6 py-3 text-sm font-medium text-forest transition-all duration-300 hover:bg-forest hover:text-ivory"
            >
              <LibraryBig className="h-4.5 w-4.5" />
              أرشيف المقالات كاملاً
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
          </Reveal>
        </div>

        {/* فهرس تحريري على نمط المجلّات العلمية */}
        <div className="mt-14 border-t-2 border-forest/80">
          {featured.map((article, i) => (
            <Reveal key={article.id} delay={i * 0.1}>
              <article>
                <button
                  onClick={() => onOpenArticle(article)}
                  className="group grid w-full grid-cols-1 gap-5 border-b border-sage/50 py-9 text-start transition-colors duration-500 hover:bg-sage-pale/30 sm:py-11 lg:grid-cols-12 lg:gap-8 lg:px-4"
                >
                  {/* الرقم */}
                  <span className="flex items-start gap-4 lg:col-span-2">
                    <span className="font-serif-ar text-5xl font-bold leading-none text-gold/80 transition-colors duration-500 group-hover:text-gold-deep lg:text-6xl">
                      {article.numeral}
                    </span>
                    <span className="mt-2 hidden h-px flex-1 bg-sage/60 lg:block" />
                  </span>

                  {/* المحتوى */}
                  <span className="lg:col-span-7">
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8rem]">
                      <span className="border border-gold/70 bg-gold/10 px-2.5 py-0.5 font-semibold text-gold-deep">
                        {article.category}
                      </span>
                      <span className="text-muted">{article.date}</span>
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                    </span>
                    <span className="mt-4 block font-serif-ar text-[1.8rem] font-bold leading-[1.45] text-forest transition-transform duration-500 group-hover:-translate-x-2 sm:text-[2.1rem]">
                      {article.title}
                    </span>
                    <span className="mt-3 block max-w-2xl leading-8 text-ink/80">
                      {article.excerpt}
                    </span>
                  </span>

                  {/* رابط القراءة */}
                  <span className="flex items-end lg:col-span-3 lg:justify-end">
                    <span className="inline-flex items-center gap-2.5 font-medium text-forest">
                      <span className="link-line">اقرأ المقال</span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sage/70 transition-all duration-400 group-hover:border-forest group-hover:bg-forest group-hover:text-ivory">
                        <ArrowLeft className="h-4 w-4" />
                      </span>
                    </span>
                  </span>
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-[0.75rem] text-muted/80">
            * عناوين ونصوص تجريبية أُعدّت لأغراض العرض، وتُستبدل بمنشورات الباحثة الفعلية.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
