import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.4, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
