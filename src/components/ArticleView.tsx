import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CalendarDays,
  Link2,
  Check,
  Share2,
  ALargeSmall,
  Quote,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { articles, site, type Article } from "../data/content";
import { OrnDivider, BrandMark, EightPointStar } from "./Ornament";
import { cn } from "../utils/cn";

interface ArticleViewProps {
  article: Article;
  onOpenArticle: (article: Article) => void;
  onBackArchive: () => void;
  onShowBio: () => void;
}

const fontSizes = [
  { label: "حجم النص: عادي", className: "text-[1.05rem]" },
  { label: "حجم النص: كبير", className: "text-[1.18rem]" },
  { label: "حجم النص: أكبر", className: "text-[1.32rem]" },
];

export function ArticleView({ article, onOpenArticle, onBackArchive, onShowBio }: ArticleViewProps) {
  const [copied, setCopied] = useState(false);
  const [fontIdx, setFontIdx] = useState(0);

  /* شريط تقدّم القراءة */
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  useEffect(() => {
    document.title = `${article.title} — ${site.scholarTitle}`;
    return () => {
      document.title = "الباحثة في العلوم الإسلامية — موقع شخصي أكاديمي";
    };
  }, [article]);

  const index = articles.findIndex((a) => a.id === article.id);
  const prev = index > 0 ? articles[index - 1] : null;
  const next = index < articles.length - 1 ? articles[index + 1] : null;
  const related = articles.filter((a) => a.id !== article.id).slice(0, 3);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${article.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${article.id}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, text: article.excerpt, url });
      } catch {
        /* ألغى المستخدم المشاركة */
      }
    } else {
      copyLink();
    }
  };

  return (
    <main className="min-h-screen bg-ivory pb-24 pt-32 lg:pt-40">
      {/* شريط تقدّم القراءة الذهبي */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[55] h-[3px] origin-right bg-gold"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* مسار التنقّل */}
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-2 text-[0.82rem] text-muted"
          aria-label="مسار التنقّل"
        >
          <button onClick={onBackArchive} className="transition-colors hover:text-forest">
            المقالات والبحوث
          </button>
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="text-gold-deep">{article.category}</span>
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="max-w-[16rem] truncate text-forest">{article.title}</span>
        </motion.nav>

        {/* ترويسة المقال */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <span className="inline-block border border-gold/70 bg-gold/10 px-3 py-1 text-[0.78rem] font-semibold text-gold-deep">
            {article.category}
          </span>
          <h1 className="mt-6 font-serif-ar text-4xl font-bold leading-[1.45] text-forest sm:text-[3.2rem] sm:leading-[1.4]">
            {article.title}
          </h1>
          <p className="mt-6 border-s-2 border-gold ps-5 font-serif-ar text-[1.25rem] leading-[1.9] text-ink/85">
            {article.excerpt}
          </p>

          {/* بيانات النشر وأدوات القراءة */}
          <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-y border-sage/50 py-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.85rem] text-muted">
              <span className="inline-flex items-center gap-2">
                <BrandMark className="h-7 w-7" />
                <span className="font-medium text-forest">{site.scholarName}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontIdx((i) => (i + 1) % fontSizes.length)}
                className="inline-flex h-10 w-10 items-center justify-center border border-sage/60 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory"
                aria-label={fontSizes[fontIdx].label}
                title="ضبط حجم النص"
              >
                <ALargeSmall className="h-4.5 w-4.5" />
              </button>
              <button
                onClick={copyLink}
                className="inline-flex h-10 w-10 items-center justify-center border border-sage/60 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory"
                aria-label="نسخ رابط المقال"
                title="نسخ الرابط"
              >
                {copied ? <Check className="h-4.5 w-4.5 text-green-700" /> : <Link2 className="h-4.5 w-4.5" />}
              </button>
              <button
                onClick={share}
                className="inline-flex h-10 w-10 items-center justify-center border border-sage/60 text-forest transition-colors hover:border-forest hover:bg-forest hover:text-ivory"
                aria-label="مشاركة المقال"
                title="مشاركة"
              >
                <Share2 className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
          {copied && (
            <p className="mt-3 text-[0.8rem] text-green-800" role="status">
              تمّ نسخ رابط المقال بنجاح.
            </p>
          )}
        </motion.header>

        {/* متن المقال */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={cn("article-body mt-10", fontSizes[fontIdx].className)}
        >
          {article.body.map((block, i) => {
            if (block.type === "h") return <h3 key={i}>{block.text}</h3>;
            if (block.type === "quote") {
              const isQuran = block.kind === "quran";
              const isHadith = block.kind === "hadith";
              return (
                <blockquote
                  key={i}
                  className={cn(
                    "relative my-10 border px-8 py-8 sm:px-12",
                    isQuran
                      ? "border-gold/60 bg-gold/[0.07]"
                      : "border-gold/40 bg-ivory-deep/50"
                  )}
                >
                  {isQuran ? (
                    <EightPointStar className="absolute -top-4 start-8 h-8 w-8 rounded-full bg-ivory p-1.5 text-gold-deep" />
                  ) : (
                    <Quote className="absolute -top-4 start-8 h-8 w-8 rounded-full bg-ivory p-1.5 text-gold-deep" />
                  )}

                  {(isQuran || isHadith) && (
                    <span className="mb-3 block text-[0.68em] font-semibold tracking-[0.12em] text-gold-deep">
                      {isQuran ? "آية كريمة" : "حديث شريف"}
                    </span>
                  )}

                  {/* ﴿ ﴾ لا تُستعمل إلّا مع القرآن الكريم */}
                  <p className="font-serif-ar text-[1.45em] font-bold leading-[1.8]">
                    {isQuran ? `﴿ ${block.text} ﴾` : block.text}
                  </p>

                  {block.source && (
                    <cite className="mt-3 block text-[0.78em] not-italic text-gold-deep">
                      — {block.source}
                    </cite>
                  )}
                </blockquote>
              );
            }
            return (
              <p key={i} className={i === 0 ? "drop-cap" : undefined}>
                {block.text}
              </p>
            );
          })}
        </motion.div>

        <OrnDivider className="my-12" />

        <p className="text-center text-[0.78rem] leading-6 text-muted/85">
          نصّ تجريبي أُعدّ لأغراض عرض تصميم الموقع وإمكاناته التحريرية،
          ويُستبدل بمنشورات الباحثة الفعلية عند إطلاق الموقع.
        </p>

        {/* بطاقة الكاتبة */}
        <div className="mt-12 flex flex-col items-start gap-5 border border-sage/60 bg-[#fffdf7] p-7 sm:flex-row sm:items-center sm:p-8">
          <span className="arch flex h-24 w-20 shrink-0 items-center justify-center border border-gold/50 bg-sage-pale">
            <BrandMark className="h-10 w-10" />
          </span>
          <div className="flex-1">
            <p className="text-[0.75rem] font-semibold tracking-wide text-gold-deep">بقلم</p>
            <p className="mt-1 font-serif-ar text-2xl font-bold text-forest">{site.scholarName}</p>
            <p className="mt-2 leading-7 text-ink/80">
              {site.scholarTitle} من {site.location}، تهتمّ بالدراسات القرآنية والفكر
              الإسلامي وقضاياه المعاصرة، وتشارك كتاباتها ودروسها عبر هذا الفضاء العلمي.
            </p>
          </div>
          <button
            onClick={onShowBio}
            className="group inline-flex shrink-0 items-center gap-2 border border-forest px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-ivory"
          >
            السيرة العلمية
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
        </div>

        {/* السابق / التالي */}
        <nav className="mt-12 grid grid-cols-1 gap-px border border-sage/50 bg-sage/50 sm:grid-cols-2" aria-label="التنقّل بين المقالات">
          {prev ? (
            <button onClick={() => onOpenArticle(prev)} className="group bg-ivory p-6 text-start transition-colors hover:bg-sage-pale/40">
              <span className="inline-flex items-center gap-2 text-[0.78rem] text-muted">
                <ChevronRight className="h-4 w-4" />
                المقال السابق
              </span>
              <span className="mt-2 block font-serif-ar text-xl font-bold leading-snug text-forest">
                {prev.title}
              </span>
            </button>
          ) : (
            <span className="bg-ivory p-6 max-sm:hidden" />
          )}
          {next ? (
            <button onClick={() => onOpenArticle(next)} className="group bg-ivory p-6 text-end transition-colors hover:bg-sage-pale/40">
              <span className="inline-flex items-center gap-2 text-[0.78rem] text-muted">
                المقال التالي
                <ChevronLeft className="h-4 w-4" />
              </span>
              <span className="mt-2 block font-serif-ar text-xl font-bold leading-snug text-forest">
                {next.title}
              </span>
            </button>
          ) : (
            <span className="bg-ivory p-6 max-sm:hidden" />
          )}
        </nav>
      </div>

      {/* مقالات ذات صلة */}
      <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-serif-ar text-3xl font-bold text-forest">قراءات أخرى قد تهمّك</h2>
          <button onClick={onBackArchive} className="group hidden items-center gap-2 text-sm font-medium text-forest sm:inline-flex">
            <span className="link-line">جميع المقالات</span>
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-px border border-sage/50 bg-sage/50 md:grid-cols-3">
          {related.map((rel) => (
            <article key={rel.id} className="bg-ivory">
              <button
                onClick={() => onOpenArticle(rel)}
                className="group flex h-full w-full flex-col p-7 text-start transition-colors duration-500 hover:bg-[#fffdf7]"
              >
                <span className="text-[0.75rem] font-semibold text-gold-deep">{rel.category}</span>
                <h3 className="mt-3 flex-1 font-serif-ar text-[1.35rem] font-bold leading-[1.55] text-forest">
                  {rel.title}
                </h3>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-forest">
                  اقرأ المقال
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                </span>
              </button>
            </article>
          ))}
        </div>

        <button
          onClick={onBackArchive}
          className="group mx-auto mt-12 flex items-center gap-2 border border-forest px-7 py-3 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-ivory"
        >
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          العودة إلى أرشيف المقالات
        </button>
      </div>
    </main>
  );
}
