import { classes } from '~/utils/style';
import styles from './waveform.module.css';

// A row of bars that pulse like a voice waveform. Purely decorative, CSS driven.
export const Waveform = ({ bars = 11, className }) => (
  <span className={classes(styles.wave, className)} aria-hidden>
    {Array.from({ length: bars }).map((_, index) => (
      <span key={index} className={styles.bar} style={{ '--i': index }} />
    ))}
  </span>
);
