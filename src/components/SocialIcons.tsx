interface IconProps {
  className?: string;
}

/* أيقونات منصّات اجتماعية مرسومة بصيغة SVG */
export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.28 5 12 5 12 5s-6.28 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.72 19 12 19 12 19s6.28 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M10 15.2V8.8L15.5 12 10 15.2Z" fill="currentColor" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.9 3H21l-6.78 7.74L22.2 21h-6.24l-4.89-6.4L5.47 21H2.34l7.25-8.28L2.1 3h6.4l4.42 5.85L17.9 3Zm-1.1 16.13h1.73L7.7 4.77H5.85L16.8 19.13Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M15.5 3.5h-2.75a4 4 0 0 0-4 4v2.25H6.5v3.5h2.25v7.25h3.5v-7.25h2.5l.5-3.5h-3v-2a.75.75 0 0 1 .75-.75h2.5v-3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 10.5V17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="8" cy="7.2" r="1.15" fill="currentColor" />
      <path
        d="M12 17v-3.6c0-1.1.9-2 2-2s2 .9 2 2V17"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export const socialIconMap: Record<string, ({ className }: IconProps) => React.ReactNode> = {
  youtube: YoutubeIcon,
  twitter: XIcon,
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
};
