import { Reveal } from "./Reveal";
import { EightPointStar } from "./Ornament";
import { cn } from "../utils/cn";

interface SectionHeadingProps {
  numeral: string;
  kicker: string;
  title: string;
  description?: string;
  dark?: boolean;
  align?: "start" | "center";
}

/* عنوان قسم تحريري: رقم + وسم + عنوان بخط أميري */
export function SectionHeading({
  numeral,
  kicker,
  title,
  description,
  dark = false,
  align = "start",
}: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === "center" && "text-center")}>
      <div
        className={cn(
          "flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className={cn("h-px w-10", dark ? "bg-gold-light/70" : "bg-gold")} />
        <EightPointStar className={cn("h-3.5 w-3.5", dark ? "text-gold-light" : "text-gold")} />
        <span
          className={cn(
            "text-[0.8rem] font-semibold tracking-[0.18em]",
            dark ? "text-gold-light" : "text-gold-deep"
          )}
        >
          {kicker} &nbsp;·&nbsp; {numeral}
        </span>
      </div>
      <h2
        className={cn(
          "mt-5 font-serif-ar text-4xl font-bold leading-[1.35] sm:text-5xl",
          dark ? "text-ivory" : "text-forest"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[1.05rem] leading-8",
            dark ? "text-sage-light" : "text-muted",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
