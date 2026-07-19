import { classes } from '~/utils/style';
import styles from './service-glyph.module.css';

// Bespoke line-art motifs, one per service. Abstract, on-brand (accent-coloured),
// animated with CSS on mount. Deliberately not stock imagery or icons — each is a
// small conceptual diagram of what the service does.
const glyphs = {
  'custom-software': (
    <>
      <rect className={styles.draw} x="18" y="26" width="84" height="68" rx="8" />
      <line className={styles.draw} x1="18" y1="42" x2="102" y2="42" />
      <circle className={styles.node} cx="27" cy="34" r="2.4" />
      <circle className={styles.node} cx="35" cy="34" r="2.4" />
      <rect className={`${styles.draw} ${styles.block}`} x="28" y="52" width="30" height="8" rx="4" />
      <rect className={`${styles.draw} ${styles.block}`} x="28" y="66" width="46" height="8" rx="4" />
      <rect className={`${styles.draw} ${styles.block}`} x="28" y="80" width="22" height="8" rx="4" />
    </>
  ),
  'ux-ui-web-design': (
    <>
      <rect className={styles.draw} x="22" y="28" width="52" height="42" rx="6" />
      <rect className={`${styles.draw} ${styles.block}`} x="46" y="50" width="52" height="42" rx="6" />
      <line className={styles.draw} x1="46" y1="62" x2="98" y2="62" />
      <circle className={`${styles.node} ${styles.pulse}`} cx="60" cy="78" r="3.4" />
      <circle className={`${styles.node} ${styles.pulse2}`} cx="72" cy="78" r="3.4" />
    </>
  ),
  'business-automation': (
    <>
      <path
        className={`${styles.draw} ${styles.spin}`}
        d="M60 24a36 36 0 1 1-30 16"
      />
      <path className={styles.draw} d="M30 40l1 12 11-4" />
      <circle className={`${styles.node} ${styles.pulse}`} cx="60" cy="60" r="6" />
    </>
  ),
  'rpa-and-bots': (
    <>
      <line className={styles.track} x1="20" y1="42" x2="100" y2="42" />
      <line className={styles.track} x1="20" y1="60" x2="100" y2="60" />
      <line className={styles.track} x1="20" y1="78" x2="100" y2="78" />
      <circle className={`${styles.node} ${styles.march}`} cx="20" cy="42" r="3.4" />
      <circle className={`${styles.node} ${styles.march2}`} cx="20" cy="60" r="3.4" />
      <circle className={`${styles.node} ${styles.march3}`} cx="20" cy="78" r="3.4" />
    </>
  ),
  'crm-and-business-systems': (
    <>
      <line className={styles.draw} x1="60" y1="60" x2="30" y2="34" />
      <line className={styles.draw} x1="60" y1="60" x2="94" y2="36" />
      <line className={styles.draw} x1="60" y1="60" x2="28" y2="86" />
      <line className={styles.draw} x1="60" y1="60" x2="92" y2="84" />
      <circle className={`${styles.node} ${styles.pulse}`} cx="30" cy="34" r="4" />
      <circle className={`${styles.node} ${styles.pulse2}`} cx="94" cy="36" r="4" />
      <circle className={`${styles.node} ${styles.pulse3}`} cx="28" cy="86" r="4" />
      <circle className={`${styles.node} ${styles.pulse2}`} cx="92" cy="84" r="4" />
      <circle className={styles.hub} cx="60" cy="60" r="8" />
    </>
  ),
  'ai-assistants': (
    <>
      <circle className={`${styles.ring} ${styles.ring1}`} cx="60" cy="60" r="14" />
      <circle className={`${styles.ring} ${styles.ring2}`} cx="60" cy="60" r="26" />
      <circle className={`${styles.ring} ${styles.ring3}`} cx="60" cy="60" r="38" />
      <circle className={`${styles.hub} ${styles.pulse}`} cx="60" cy="60" r="6" />
    </>
  ),
  'modernising-systems': (
    <>
      <line className={styles.baseline} x1="22" y1="92" x2="98" y2="92" />
      <rect className={`${styles.draw} ${styles.bar} ${styles.bar1}`} x="26" y="72" width="12" height="20" rx="3" />
      <rect className={`${styles.draw} ${styles.bar} ${styles.bar2}`} x="46" y="58" width="12" height="34" rx="3" />
      <rect className={`${styles.draw} ${styles.bar} ${styles.bar3}`} x="66" y="44" width="12" height="48" rx="3" />
      <rect className={`${styles.draw} ${styles.bar} ${styles.bar4}`} x="86" y="30" width="12" height="62" rx="3" />
      <path className={`${styles.draw} ${styles.arrow}`} d="M28 66l64-30M84 34l8 2 -2 8" />
    </>
  ),
  'system-integration': (
    <>
      <circle className={styles.node} cx="30" cy="42" r="3.4" />
      <circle className={styles.node} cx="30" cy="78" r="3.4" />
      <circle className={styles.node} cx="90" cy="42" r="3.4" />
      <circle className={styles.node} cx="90" cy="78" r="3.4" />
      <path className={styles.draw} d="M33 42h18M33 78h18M69 42h18M69 78h18" />
      <path className={`${styles.draw} ${styles.bridge}`} d="M52 42q8 18 0 36M68 42q-8 18 0 36" />
      <circle className={`${styles.node} ${styles.pulse}`} cx="60" cy="60" r="5" />
    </>
  ),
};

export const ServiceGlyph = ({ slug, className, ...rest }) => {
  const glyph = glyphs[slug];
  if (!glyph) return null;

  return (
    <svg
      className={classes(styles.glyph, className)}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
      {...rest}
    >
      {glyph}
    </svg>
  );
};
