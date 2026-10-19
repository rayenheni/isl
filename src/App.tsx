import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, X, Sparkles } from "lucide-react";
import { articles, type Article } from "./data/content";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { QuoteBand } from "./components/QuoteBand";
import { ResearchAreas } from "./components/ResearchAreas";
import { FeaturedArticles } from "./components/FeaturedArticles";
import { Lectures } from "./components/Lectures";
import { Biography } from "./components/Biography";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ArchiveView } from "./components/ArchiveView";
import { ArticleView } from "./components/ArticleView";
import { BioView } from "./components/BioView";
import { cn } from "./utils/cn";

type View = "home" | "archive" | "article" | "bio";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [archiveCategory, setArchiveCategory] = useState("الكلّ");
  const [showTop, setShowTop] = useState(false);
  const [demoVisible, setDemoVisible] = useState(false);

  /* إظهار زر الصعود + شارة العرض التجريبي */
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setTimeout(() => setDemoVisible(true), 1400);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  /* دعم روابط المقالات المشارَكة (#معرّف-المقال) عند فتح الصفحة */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const match = articles.find((a) => a.id === hash);
    if (match) {
      setCurrentArticle(match);
      setView("article");
    }
  }, []);

  const scrollToSection = useCallback((id: string) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (id === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    });
  }, []);

  /* التنقّل الرئيسي: العودة للرئيسية عند الحاجة ثم التمرير */
  const goToSection = useCallback(
    (id: string) => {
      if (view !== "home") setView("home");
      scrollToSection(id);
    },
    [view, scrollToSection]
  );

  const openArticle = useCallback((article: Article) => {
    setCurrentArticle(article);
    setView("article");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    window.history.replaceState(null, "", `#${article.id}`);
  }, []);

  const openArchive = useCallback((category = "الكلّ") => {
    setArchiveCategory(category);
    setView("archive");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const openBio = useCallback(() => {
    setView("bio");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const backHome = useCallback(() => {
    setView("home");
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-ivory font-sans-ar text-charcoal">
      <Header onNavigate={goToSection} isHome={view === "home"} />

      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Hero
              onBrowseArticles={() => goToSection("articles")}
              onShowBio={openBio}
            />
            <Intro onShowBio={openBio} onGoTo={goToSection} />
            <QuoteBand />
            <ResearchAreas onSelectCategory={openArchive} />
            <FeaturedArticles
              onOpenArticle={openArticle}
              onOpenArchive={() => openArchive("الكلّ")}
            />
            <Lectures />
            <Biography onShowFullBio={openBio} onSelectCategory={openArchive} />
            <Contact />
          </motion.main>
        )}

        {view === "archive" && (
          <motion.div
            key="archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ArchiveView
              initialCategory={archiveCategory}
              onOpenArticle={openArticle}
              onBackHome={backHome}
            />
          </motion.div>
        )}

        {view === "article" && currentArticle && (
          <motion.div
            key={`article-${currentArticle.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ArticleView
              article={currentArticle}
              onOpenArticle={openArticle}
              onBackArchive={() => openArchive(currentArticle.category)}
              onShowBio={openBio}
            />
          </motion.div>
        )}

        {view === "bio" && (
          <motion.div
            key="bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <BioView
              onBackHome={backHome}
              onSelectCategory={openArchive}
              onGoContact={() => goToSection("contact")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onNavigate={goToSection} onSelectCategory={openArchive} />

      {/* زر الصعود إلى الأعلى */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 end-6 z-50 flex h-12 w-12 items-center justify-center border border-gold/60 bg-forest text-ivory shadow-[0_16px_35px_-12px_rgba(24,61,50,0.6)] transition-colors hover:bg-gold hover:text-forest"
            aria-label="العودة إلى أعلى الصفحة"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* شارة العرض التجريبي القابلة للإغلاق */}
      <AnimatePresence>
        {demoVisible && (
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed bottom-6 start-6 z-50 flex max-w-[19rem] items-start gap-3 border border-gold/50 bg-forest/95 p-4 text-ivory shadow-[0_20px_45px_-15px_rgba(16,43,34,0.7)] backdrop-blur-sm",
              "max-sm:start-4 max-sm:bottom-4 max-sm:max-w-[16.5rem]"
            )}
            role="note"
            aria-label="تنبيه: نسخة تجريبية"
          >
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-light" />
            <div>
              <p className="text-[0.82rem] font-semibold leading-6">
                معاينة تجريبية من{" "}
                <span dir="ltr" className="font-latin tracking-wide text-gold-light">
                  Waqeel Studio
                </span>
              </p>
              <p className="mt-1 text-[0.72rem] leading-5.5 text-sage-light">
                جميع النصوص والبيانات توضيحية وقابلة للتخصيص الكامل بمحتوى الباحثة
                الحقيقي عند اعتماد المشروع.
              </p>
            </div>
            <button
              onClick={() => setDemoVisible(false)}
              className="shrink-0 text-sage-light transition-colors hover:text-ivory"
              aria-label="إغلاق التنبيه"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
