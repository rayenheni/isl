import { ArrowUp, Mail, MapPin } from "lucide-react";
import { navLinks, researchAreas, site } from "../data/content";
import { BrandMark, EightPointStar } from "./Ornament";
import { socialIconMap } from "./SocialIcons";

interface FooterProps {
  onNavigate: (id: string) => void;
  onSelectCategory: (category: string) => void;
}

export function Footer({ onNavigate, onSelectCategory }: FooterProps) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="pattern-dark relative overflow-hidden bg-forest text-ivory" aria-label="تذييل الموقع">
      {/* شريط ذهبي علوي */}
      <div className="h-px w-full bg-gradient-to-l from-transparent via-gold/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:px-10 lg:pt-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* الهوية */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3.5">
              <BrandMark className="h-12 w-12 [&>span]:bg-ivory" />
              <div className="leading-tight">
                <p className="font-serif-ar text-[1.55rem] font-bold">{site.scholarName}</p>
                <p className="text-[0.75rem] tracking-wide text-sage-light">
                  {site.scholarTitle}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm leading-8 text-sage-light/90">
              فضاءٌ علميٌّ شخصي يجمع المقالات والبحوث والدروس في العلوم الإسلامية،
              سعياً إلى نشر معرفة رصينة تُعين على الفهم وتبني الوعي.
            </p>
            <p className="mt-6 font-serif-ar text-xl italic leading-relaxed text-gold-light">
              «العلم معرفةٌ تُبنى، وأثرٌ يبقى»
            </p>
          </div>

          {/* روابط سريعة */}
          <nav className="lg:col-span-2" aria-label="روابط سريعة">
            <h3 className="flex items-center gap-2.5 font-serif-ar text-lg font-bold">
              <EightPointStar className="h-3.5 w-3.5 text-gold-light" />
              تصفّح الموقع
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="link-line text-[0.95rem] text-sage-light transition-colors hover:text-ivory"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* المجالات البحثية */}
          <nav className="lg:col-span-2" aria-label="المجالات البحثية">
            <h3 className="flex items-center gap-2.5 font-serif-ar text-lg font-bold">
              <EightPointStar className="h-3.5 w-3.5 text-gold-light" />
              مجالات الاهتمام
            </h3>
            <ul className="mt-5 space-y-3">
              {researchAreas.map((area) => (
                <li key={area.id}>
                  <button
                    onClick={() => onSelectCategory(area.title)}
                    className="link-line text-[0.95rem] text-sage-light transition-colors hover:text-ivory"
                  >
                    {area.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* التواصل */}
          <div className="lg:col-span-3">
            <h3 className="flex items-center gap-2.5 font-serif-ar text-lg font-bold">
              <EightPointStar className="h-3.5 w-3.5 text-gold-light" />
              التواصل
            </h3>
            <ul className="mt-5 space-y-3.5 text-[0.95rem] text-sage-light">
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 shrink-0 text-gold-light" />
                <span dir="ltr" className="font-latin tracking-wide">{site.email}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4.5 w-4.5 shrink-0 text-gold-light" />
                {site.location}
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-2.5">
              {site.socials.map((social) => {
                const Icon = socialIconMap[social.key];
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    onClick={(e) => e.preventDefault()}
                    aria-label={`${social.label} (رابط بديل)`}
                    title={`${social.label} — يُفعَّل عند الإطلاق`}
                    className="flex h-10 w-10 items-center justify-center border border-ivory/25 text-sage-light transition-all duration-300 hover:border-gold hover:bg-gold hover:text-forest"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* الشريط السفلي */}
        <div className="mt-14 flex flex-col items-center gap-5 border-t border-ivory/12 pt-8 lg:flex-row lg:justify-between">
          <p className="text-center text-[0.83rem] leading-6 text-sage-light/85">
            © {new Date().getFullYear()} {site.scholarName} — {site.scholarTitle}.
            جميع الحقوق محفوظة.
          </p>
          <p className="flex items-center gap-2 text-center text-[0.83rem] text-sage-light/85">
            تصميم وتطوير
            <span dir="ltr" className="font-latin text-[0.95rem] tracking-wide text-gold-light">
              Waqeel Studio
            </span>
            <span className="text-gold-light">|</span>
            <span className="font-serif-ar text-base font-bold text-gold-light">وكيل</span>
          </p>
          <button
            onClick={scrollTop}
            className="group inline-flex items-center gap-2 border border-ivory/25 px-4 py-2 text-[0.8rem] text-sage-light transition-all duration-300 hover:border-gold hover:text-gold-light"
            aria-label="العودة إلى أعلى الصفحة"
          >
            العودة إلى الأعلى
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <p className="mt-6 text-center text-[0.7rem] leading-5 text-sage-light/50">
          نسخة عرض تجريبية — جميع البيانات الشخصية والمحتوى العلمي عناصر بديلة تُستكمل بمعطيات الباحثة الحقيقية عند اعتماد المشروع.
        </p>
      </div>
    </footer>
  );
}
