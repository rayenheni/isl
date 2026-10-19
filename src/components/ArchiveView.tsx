import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Search, FileSearch } from "lucide-react";
import { articles, articleCategories, type Article } from "../data/content";
import { EightPointStar } from "./Ornament";
import { cn } from "../utils/cn";

interface ArchiveViewProps {
  initialCategory: string;
  onOpenArticle: (article: Article) => void;
  onBackHome: () => void;
}

export function ArchiveView({ initialCategory, onOpenArticle, onBackHome }: ArchiveViewProps) {
  const [category, setCategory] = useState(initialCategory || "الكلّ");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    return articles.filter((a) => {
      const inCategory = category === "الكلّ" || a.category === category;
      const inQuery =
        query.trim() === "" ||
        a.title.includes(query.trim()) ||
        a.excerpt.includes(query.trim());
      return inCategory && inQuery;
    });
  }, [category, query]);

  return (
    <main className="pattern-light min-h-screen bg-ivory pb-28 pt-32 lg:pt-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ترويسة الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
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
              المكتبة المقالية
            </span>
          </div>
          <h1 className="mt-5 font-serif-ar text-4xl font-bold leading-[1.35] text-forest sm:text-5xl">
            أرشيف المقالات والبحوث
          </h1>
          <p className="mt-5 max-w-2xl leading-8 text-muted">
            جميع الكتابات مرتّبة بحسب مجالاتها البحثية. نصوص نموذجية توضّح كيفية
            تنظيم المحتوى العلمي وعرضه على الموقع.
          </p>
        </motion.div>

        {/* أدوات التصفية والبحث */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col gap-6 border-y border-sage/50 py-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-wrap items-center gap-2.5" role="tablist" aria-label="تصفية بحسب المجال">
            {articleCategories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={category === cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "border px-4 py-2 text-sm transition-all duration-300",
                  category === cat
                    ? "border-forest bg-forest text-ivory"
                    : "border-sage/60 bg-transparent text-ink hover:border-forest hover:text-forest"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="relative block w-full max-w-xs">
            <Search className="pointer-events-none absolute start-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث في العناوين…"
              className="field py-2.5! ps-11!"
              aria-label="البحث في المقالات"
            />
          </label>
        </motion.div>

        <p className="mt-6 text-sm text-muted" aria-live="polite">
          {results.length === 0
            ? "لا توجد نتائج مطابقة"
            : `عرض ${results.length} من المقالات والبحوث`}
        </p>

        {/* شبكة المقالات */}
        {results.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-px border border-sage/50 bg-sage/50 md:grid-cols-2 xl:grid-cols-3">
            {results.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="bg-ivory"
              >
                <button
                  onClick={() => onOpenArticle(article)}
                  className="group flex h-full w-full flex-col p-8 text-start transition-colors duration-500 hover:bg-[#fffdf7]"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-serif-ar text-3xl font-bold text-gold/70">
                      {article.numeral}
                    </span>
                    <span className="border border-gold/60 bg-gold/10 px-2.5 py-0.5 text-[0.72rem] font-semibold text-gold-deep">
                      {article.category}
                    </span>
                  </span>
                  <h2 className="mt-5 font-serif-ar text-[1.5rem] font-bold leading-[1.5] text-forest transition-transform duration-500 group-hover:-translate-x-1">
                    {article.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-[0.95rem] leading-7.5 text-ink/75">
                    {article.excerpt}
                  </p>
                  <span className="mt-6 flex items-center justify-between border-t border-sage/40 pt-4 text-[0.8rem] text-muted">
                    <span>{article.date}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium text-forest">
                      اقرأ المقال
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                    </span>
                  </span>
                </button>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center border border-dashed border-sage/70 px-6 py-20 text-center">
            <FileSearch className="h-10 w-10 text-sage" />
            <p className="mt-5 font-serif-ar text-2xl font-bold text-forest">
              لا توجد مقالات مطابقة لبحثك
            </p>
            <p className="mt-2 max-w-md leading-7 text-muted">
              جرّب كلمة بحث مختلفة أو اختر مجالاً بحثياً آخر من قائمة التصفية أعلاه.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setCategory("الكلّ");
              }}
              className="mt-6 border border-forest px-6 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-ivory"
            >
              إعادة تعيين التصفية
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
