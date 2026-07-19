import { useInViewport } from '~/hooks';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const DURATION = 1600;
const options = { rootMargin: '0px 0px -10% 0px' };

// A number that counts up from zero to its target the first time it scrolls into
// view. Used for headline figures.
export const CountUp = ({ to, prefix = '', suffix = '', className }) => {
  const ref = useRef();
  const active = useInViewport(ref, true, options);
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }
    let frame = 0;
    let start = null;
    const tick = now => {
      if (start === null) start = now;
      const progress = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, to]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
};
