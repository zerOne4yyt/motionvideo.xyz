import type { SVGProps } from "react";

import { SITE } from "@/constants/site";
import type { Season } from "@/lib/seasons";

// Independent geometric mark. The upstream MotionVideo mark is not MIT licensed.
export const LOGOMARK_PATH = "M3 3h18v18H3Z M9 7l8 5-8 5Z";
export const Logomark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
    <rect
      x="2"
      y="2"
      width="20"
      height="20"
      rx="5"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path d="M9 7l8 5-8 5Z" fill="currentColor" />
  </svg>
);
interface SeasonProps {
  season?: Season | null;
}
export const AnimatedLogomark = (_props: SeasonProps) => (
  <Logomark className="size-7" />
);
export const Logotype = () => <span>{SITE.NAME}</span>;
export const Logo = (_props: SeasonProps) => (
  <span className="inline-flex items-center gap-2 font-semibold">
    <Logomark className="size-7" />
    <Logotype />
  </span>
);
