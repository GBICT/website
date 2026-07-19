import { useInViewport } from '~/hooks';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './type-stream.module.css';

const observerOptions = { rootMargin: '0px 0px -10% 0px' };

// A line that types itself out, holds, deletes and moves to the next phrase, on a
// loop. A small, self contained animation, on brand for software.
export const TypeStream = ({ phrases, className }) => {
  const ref = useRef();
  const active = useInViewport(ref, false, observerOptions);
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(phrases[0]);

  useEffect(() => {
    if (!active || reduceMotion) {
      setDisplay(phrases[0]);
      return;
    }

    let phraseIndex = 0;
    let position = 0;
    let deleting = false;
    let timer;

    const tick = () => {
      const full = phrases[phraseIndex];

      if (!deleting) {
        position += 1;
        setDisplay(full.slice(0, position));
        if (position >= full.length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
          return;
        }
        timer = setTimeout(tick, 55);
      } else {
        position -= 1;
        setDisplay(full.slice(0, position));
        if (position <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timer = setTimeout(tick, 320);
          return;
        }
        timer = setTimeout(tick, 26);
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [active, reduceMotion, phrases]);

  return (
    <p ref={ref} className={className} aria-hidden>
      <span>{display}</span>
      <span className={styles.cursor}>▍</span>
    </p>
  );
};
