import { useEffect, useRef } from "react";

/**
 * Invisible helper: tapping/clicking the ".logo" element 5 times within
 * 1.8s opens the owner login modal, matching the original prototype's
 * hidden-entry-point behavior. Renders nothing itself.
 */
export default function Logo5Tap({ onUnlock }) {
  const tapsRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const el = document.querySelector(".logo");
    if (!el) return;
    const handler = () => {
      tapsRef.current += 1;
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => (tapsRef.current = 0), 1800);
      if (tapsRef.current >= 5) {
        tapsRef.current = 0;
        onUnlock();
      }
    };
    el.style.cursor = "pointer";
    el.addEventListener("click", handler);
    return () => el.removeEventListener("click", handler);
  }, [onUnlock]);

  return null;
}
