import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const glyphs = 'アイウエオカキクケコサシスセソタチツテトナニヌネ0123456789#%@&/\\|';

// Cycles through phrases, scrambling from one to the next like a model generating
// its next tokens. The resolved phrase holds, then it morphs to the following one.
export const MorphText = ({ phrases, className, hold = 1900 }) => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(phrases[0]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const target = phrases[index];

    if (reduceMotion) {
      setDisplay(target);
      const timer = setTimeout(
        () => setIndex(current => (current + 1) % phrases.length),
        hold + 800
      );
      return () => clearTimeout(timer);
    }

    let frame;
    let holdTimer;
    let progress = 0;

    const step = () => {
      progress += 0.5;
      const resolved = Math.floor(progress);
      let out = '';
      for (let i = 0; i < target.length; i += 1) {
        if (i < resolved || target[i] === ' ') {
          out += target[i];
        } else {
          out += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }
      setDisplay(out);

      if (resolved < target.length) {
        frame = requestAnimationFrame(step);
      } else {
        setDisplay(target);
        holdTimer = setTimeout(
          () => setIndex(current => (current + 1) % phrases.length),
          hold
        );
      }
    };

    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(holdTimer);
    };
  }, [index, phrases, hold, reduceMotion]);

  return (
    <span className={className} aria-label={phrases[index]}>
      {display}
    </span>
  );
};
