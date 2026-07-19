import { useInViewport } from '~/hooks';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './type-once.module.css';

const observerOptions = { rootMargin: '0px 0px -20% 0px' };

// Types a piece of text out once, the first time it scrolls into view, then keeps
// it. Reads like an AI generating its answer.
export const TypeOnce = ({ text, className, speed = 20, delay = 400 }) => {
  const ref = useRef();
  const active = useInViewport(ref, true, observerOptions);
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setShown(text);
      setDone(true);
      return;
    }
    let position = 0;
    let timer;
    const tick = () => {
      position += 1;
      setShown(text.slice(0, position));
      if (position >= text.length) {
        setDone(true);
        return;
      }
      timer = setTimeout(tick, speed);
    };
    timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, [active, reduceMotion, text, speed, delay]);

  return (
    <p ref={ref} className={className}>
      {shown || ' '}
      <span className={styles.cursor} data-done={done} aria-hidden>
        ▍
      </span>
    </p>
  );
};
