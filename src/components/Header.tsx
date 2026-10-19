import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowDownLeft } from "lucide-react";
import { navLinks, site } from "../data/content";
import { BrandMark, OrnDivider } from "./Ornament";
import { cn } from "../utils/cn";

interface HeaderProps {
  onNavigate: (id: string) => void;
  isHome: boolean;
}

export function Header({ onNavigate, isHome }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  /* ظلّ وخلفية عند التمرير */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* تتبّع القسم الظاهر حالياً لتفعيل الرابط المناسب */
  useEffect(() => {
    if (!isHome) return;
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const handleNav = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-sage/40 bg-ivory/92 shadow-[0_10px_40px_-18px_rgba(24,61,50,0.25)] backdrop-blur-md"
            : "border-b border-transparent bg-ivory/60 backdrop-blur-sm"
        )}
      >
        {/* شريط ذهبي علوي رقيق */}
        <div className="h-[3px] w-full bg-forest">
          <div className="mx-auto h-full max-w-7xl bg-gradient-to-l from-transparent via-gold to-transparent opacity-70" />
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-10">
          {/* الهوية */}
          <button
            onClick={() => handleNav("home")}
            className="group flex items-center gap-3 text-start"
            aria-label="العودة إلى الرئيسية"
          >
            <BrandMark className="h-10 w-10 shrink-0 transition-transform duration-700 group-hover:rotate-45" />
            <span className="leading-tight">
              <span className="block font-serif-ar text-[1.35rem] font-bold text-forest">
                {site.scholarName}
              </span>
              <span className="block text-[0.68rem] tracking-wide text-muted">
                {site.scholarTitle} — {site.location}
              </span>
            </span>
          </button>

          {/* التنقّل — سطح المكتب */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="التنقّل الرئيسي">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={cn(
                  "link-line text-[0.95rem] font-medium transition-colors duration-300",
                  active === link.id && isHome
                    ? "is-active text-forest"
                    : "text-ink hover:text-forest"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav("articles")}
              className="group hidden items-center gap-2 border border-forest bg-forest px-5 py-2.5 text-sm font-medium text-ivory transition-all duration-300 hover:bg-transparent hover:text-forest sm:inline-flex"
            >
              اكتشف أعمالي
              <ArrowDownLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            {/* زر القائمة — الجوّال */}
            <button
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center border border-sage/60 text-forest transition-colors hover:bg-sage-pale lg:hidden"
              aria-label="فتح القائمة"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* قائمة الجوّال — لوحة كاملة أنيقة */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pattern-dark fixed inset-0 z-[60] flex flex-col bg-forest text-ivory lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقّل"
          >
            <div className="flex items-center justify-between px-5 py-5 sm:px-8">
              <span className="flex items-center gap-3">
                <BrandMark className="h-9 w-9 [&>span]:bg-ivory" />
                <span className="font-serif-ar text-xl font-bold">{site.scholarName}</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center border border-ivory/30 transition-colors hover:bg-ivory/10"
                aria-label="إغلاق القائمة"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8" aria-label="قائمة الجوّال">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => handleNav(link.id)}
                  className="group flex items-baseline gap-4 py-2 text-start"
                >
                  <span className="font-serif-ar text-sm text-gold-light">
                    {["٠١", "٠٢", "٠٣", "٠٤", "٠٥"][i]}
                  </span>
                  <span className="font-serif-ar text-3xl font-bold transition-colors group-hover:text-gold-light sm:text-4xl">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="px-8 pb-10">
              <OrnDivider tone="ivory" className="mb-6 opacity-70" />
              <p className="text-center font-serif-ar text-lg text-ivory/85">
                «العلم معرفةٌ تُبنى، وأثرٌ يبقى»
              </p>
              <p className="mt-3 text-center text-xs text-ivory/50">{site.brandLine}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
