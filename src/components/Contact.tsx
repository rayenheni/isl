import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Clock3,
  CheckCircle2,
  Loader2,
  PenLine,
} from "lucide-react";
import { site } from "../data/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { socialIconMap } from "./SocialIcons";
import { cn } from "../utils/cn";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "sent";

const subjects = [
  "استفسار علمي",
  "تعاون بحثي",
  "دعوة للمشاركة في ملتقى أو محاضرة",
  "طلب إشراف أو تأطير",
  "موضوع آخر",
];

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "يرجى إدخال الاسم الكامل.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "يرجى إدخال بريد إلكتروني صحيح.";
    if (!form.subject) next.subject = "يرجى اختيار موضوع الرسالة.";
    if (form.message.trim().length < 10)
      next.message = "يرجى كتابة رسالة لا تقلّ عن عشرة أحرف.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    /* محاكاة إرسال — لا توجد خدمة بريد مفعّلة في هذا العرض التجريبي */
    setTimeout(() => setStatus("sent"), 1300);
  };

  const reset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="contact" className="pattern-light relative bg-ivory-deep/50 py-24 lg:py-32" aria-label="التواصل">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:px-10">
        {/* عمود المعلومات */}
        <div className="lg:col-span-5">
          <SectionHeading
            numeral="٠٥"
            kicker="التواصل"
            title="للتواصل والتعاون العلمي"
            description="للاستفسارات العلمية أو فرص التعاون، يمكنكم التواصل عبر النموذج التالي. يسعدني تلقّي رسائلكم ومقترحاتكم، وأحرص على الردّ في أقرب الآجال الممكنة."
          />

          <Reveal delay={0.15}>
            <ul className="mt-10 space-y-5">
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/60 text-gold-deep">
                  <Mail className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[0.78rem] font-semibold tracking-wide text-muted">
                    البريد الإلكتروني
                  </span>
                  <span dir="ltr" className="mt-0.5 block font-latin text-[1.02rem] tracking-wide text-forest">
                    {site.email}
                  </span>
                  <span className="text-[0.72rem] text-muted/80">عنوان بديل — يُستبدل بالبريد الرسمي</span>
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/60 text-gold-deep">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[0.78rem] font-semibold tracking-wide text-muted">
                    الموقع
                  </span>
                  <span className="mt-0.5 block text-forest">{site.location}</span>
                </span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/60 text-gold-deep">
                  <Clock3 className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[0.78rem] font-semibold tracking-wide text-muted">
                    آجال الردّ
                  </span>
                  <span className="mt-0.5 block leading-7 text-forest">
                    خلال أيّام العمل، بحسب طبيعة الطلب
                  </span>
                </span>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.22}>
            <p className="mt-10 text-[0.8rem] font-semibold tracking-wide text-muted">
              تابعني على المنصّات العلمية والاجتماعية
            </p>
            <div className="mt-4 flex items-center gap-3">
              {site.socials.map((social) => {
                const Icon = socialIconMap[social.key];
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    onClick={(e) => e.preventDefault()}
                    aria-label={`${social.label} (رابط بديل)`}
                    title={`${social.label} — يُفعَّل الرابط عند الإطلاق`}
                    className="flex h-11 w-11 items-center justify-center border border-sage/70 text-forest transition-all duration-300 hover:border-forest hover:bg-forest hover:text-ivory"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
            <p className="mt-3 text-[0.72rem] text-muted/80">
              روابط بديلة — تُربط بالحسابات الرسمية عند إطلاق الموقع
            </p>
          </Reveal>
        </div>

        {/* عمود النموذج */}
        <div className="lg:col-span-7">
          <Reveal delay={0.12}>
            <div className="double-frame relative border border-sage/60 bg-[#fffdf7] p-7 shadow-[0_30px_60px_-35px_rgba(24,61,50,0.35)] sm:p-10">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 16 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-sage-pale"
                    >
                      <CheckCircle2 className="h-10 w-10 text-forest" />
                    </motion.span>
                    <h3 className="mt-7 font-serif-ar text-3xl font-bold text-forest">
                      شكراً لتواصلك، {form.name.split(" ")[0]}
                    </h3>
                    <p className="mt-4 max-w-md leading-8 text-ink/85">
                      تمّ استلام رسالتك بنجاح في هذه المعاينة التجريبية. عند إطلاق الموقع
                      رسمياً، ستُرسل الرسائل مباشرةً إلى البريد الإلكتروني للباحثة مع
                      إشعار فوري بالاستلام.
                    </p>
                    <div className="mt-6 w-full max-w-md border border-sage/50 bg-ivory px-5 py-4 text-start text-sm leading-7 text-muted">
                      <p>
                        <span className="font-semibold text-forest">موضوع الرسالة:</span>{" "}
                        {form.subject}
                      </p>
                      <p className="mt-1 line-clamp-2">
                        <span className="font-semibold text-forest">ملخّص:</span>{" "}
                        {form.message}
                      </p>
                    </div>
                    <button
                      onClick={reset}
                      className="mt-8 inline-flex items-center gap-2.5 border border-forest px-6 py-3 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-ivory"
                    >
                      <PenLine className="h-4 w-4" />
                      إرسال رسالة أخرى
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={onSubmit}
                    noValidate
                    aria-label="نموذج التواصل"
                  >
                    <h3 className="font-serif-ar text-2xl font-bold text-forest">
                      أرسل رسالتك
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      جميع الحقول مطلوبة. لا تُحفظ أيّ بيانات في هذه النسخة التجريبية.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-forest">
                          الاسم الكامل <span className="text-gold-deep">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={(e) => update("name", e.target.value)}
                          placeholder="مثال: مريم بن علي"
                          className={cn("field", errors.name && "field-error")}
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "err-name" : undefined}
                          autoComplete="name"
                        />
                        {errors.name && (
                          <p id="err-name" className="mt-2 text-[0.8rem] text-[#a84a36]" role="alert">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-forest">
                          البريد الإلكتروني <span className="text-gold-deep">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          dir="ltr"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="name@example.com"
                          className={cn("field text-left", errors.email && "field-error")}
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "err-email" : undefined}
                          autoComplete="email"
                        />
                        {errors.email && (
                          <p id="err-email" className="mt-2 text-[0.8rem] text-[#a84a36]" role="alert">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="subject" className="mb-2 block text-sm font-medium text-forest">
                        موضوع الرسالة <span className="text-gold-deep">*</span>
                      </label>
                      <select
                        id="subject"
                        value={form.subject}
                        onChange={(e) => update("subject", e.target.value)}
                        className={cn("field appearance-none", errors.subject && "field-error", !form.subject && "text-muted")}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "err-subject" : undefined}
                      >
                        <option value="" disabled>
                          اختر موضوع الرسالة…
                        </option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p id="err-subject" className="mt-2 text-[0.8rem] text-[#a84a36]" role="alert">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div className="mt-6">
                      <label htmlFor="message" className="mb-2 flex items-center justify-between text-sm font-medium text-forest">
                        <span>
                          نصّ الرسالة <span className="text-gold-deep">*</span>
                        </span>
                        <span className="text-[0.72rem] font-normal text-muted">
                          {form.message.trim().length} / ١٠٠٠ حرف
                        </span>
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        maxLength={1000}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="اكتب رسالتك هنا… يسعدني الاطّلاع على استفسارك أو مقترحك العلمي بالتفصيل."
                        className={cn("field resize-y leading-7", errors.message && "field-error")}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "err-message" : undefined}
                      />
                      {errors.message && (
                        <p id="err-message" className="mt-2 text-[0.8rem] text-[#a84a36]" role="alert">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group mt-8 inline-flex w-full items-center justify-center gap-3 border border-forest bg-forest px-8 py-4 font-medium text-ivory transition-all duration-300 hover:bg-forest-deep disabled:cursor-wait disabled:opacity-80 sm:w-auto"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          جارٍ إرسال الرسالة…
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 -scale-x-100 text-gold-light transition-transform duration-300 group-hover:-translate-y-0.5" />
                          إرسال الرسالة
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
