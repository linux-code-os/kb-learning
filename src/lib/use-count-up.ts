"use client";

import * as React from "react";

/**
 * Анимированный счётчик от 0 до `target` при попадании в зону видимости.
 * Надёжно работает даже для компонентов, монтируемых после async-fetch:
 * на mount проверяет, виден ли элемент уже, и запускает анимацию сразу.
 */
export function useCountUp(target: number, duration = 1600) {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLElement>(null);
  const started = React.useRef(false);

  const animate = React.useCallback(
    (to: number) => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutExpo — приятное замедление в конце
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setValue(Math.round(eased * to));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    [duration],
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setValue(target);
      started.current = true;
      return;
    }

    // Fallback: если элемент уже в viewport на mount — стартуем сразу
    const rect = el.getBoundingClientRect();
    const inView =
      rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0;
    if (inView) {
      animate(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animate(target);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, animate]);

  return { value, ref };
}
