import { cn } from "../utils/cn";

/* نجمة ثمانية — عنصر زخرفي أساسي في الهوية */
export function EightPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path
        d="M50 2 61 34 95 22 73 48 98 62 66 62 80 94 50 72 20 94 34 62 2 62 27 48 5 22 39 34Z"
        fill="currentColor"
        opacity="0.9"
      />
      <circle cx="50" cy="50" r="8" fill="var(--color-ivory)" />
    </svg>
  );
}

/* نجمة مفرّغة بإطار */
export function StarOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <path
        d="M50 4 60 34 92 23 71 48 96 61 65 61 78 92 50 71 22 92 35 61 4 61 29 48 8 23 40 34Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="50" cy="50" r="7" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

/* فاصل تحريري: خط — نجمة — خط */
export function OrnDivider({ className, tone = "gold" }: { className?: string; tone?: "gold" | "ivory" }) {
  const line = tone === "gold" ? "bg-gold/50" : "bg-ivory/30";
  const star = tone === "gold" ? "text-gold" : "text-ivory/70";
  return (
    <div className={cn("flex items-center gap-4", className)} aria-hidden="true">
      <span className={cn("h-px flex-1", line)} />
      <EightPointStar className={cn("h-4 w-4 shrink-0", star)} />
      <span className={cn("h-px flex-1", line)} />
    </div>
  );
}

/* زخرفة زاوية على النمط الأندلسي المغاربي */
export function CornerMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path d="M2 58 V18 Q2 2 18 2 H58" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 58 V24 Q10 10 24 10 H58" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <path d="M2 18 L10 10 M18 2 L10 10" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="10" cy="10" r="2" fill="currentColor" />
    </svg>
  );
}

/* شعار نصّي مدمج: نجمة + الاسم */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      <StarOutline className="h-full w-full text-gold" />
      <span className="absolute h-[30%] w-[30%] rotate-45 bg-forest" />
    </span>
  );
}
