import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

function createIcon(path: React.ReactNode) {
  const IconComponent = (props: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {path}
    </svg>
  );
  return IconComponent;
}

export const Check = createIcon(<path d="M20 6 9 17l-5-5" />);
export const X = createIcon(<path d="M18 6 6 18M6 6l12 12" />);
export const ChevronDown = createIcon(<path d="m6 9 6 6 6-6" />);
export const ChevronUp = createIcon(<path d="m18 15-6-6-6 6" />);
export const ChevronRight = createIcon(<path d="m9 18 6-6-6-6" />);
export const Loader = createIcon(<path d="M21 12a9 9 0 1 1-6.219-8.56" />);
