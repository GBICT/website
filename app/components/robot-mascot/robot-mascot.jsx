import { classes } from '~/utils/style';
import styles from './robot-mascot.module.css';

// A friendly robot, built in SVG and animated with CSS. It floats, blinks and
// its antennae and core pulse. Coloured from the gbict.nl accent.
export const RobotMascot = ({ className }) => (
  <svg
    className={classes(styles.robot, className)}
    viewBox="0 0 200 232"
    fill="none"
    role="img"
    aria-label="A friendly GBICT robot"
  >
    <ellipse cx="100" cy="214" rx="54" ry="9" className={styles.glow} />

    <g className={styles.float}>
      {/* antennae */}
      <line x1="79" y1="40" x2="71" y2="17" className={styles.wire} />
      <line x1="121" y1="40" x2="129" y2="17" className={styles.wire} />
      <circle cx="71" cy="14" r="6" className={styles.tip} />
      <circle cx="129" cy="14" r="6" className={styles.tipB} />

      {/* ear pods */}
      <rect x="33" y="70" width="18" height="44" rx="9" className={styles.dark} />
      <rect x="149" y="70" width="18" height="44" rx="9" className={styles.dark} />
      <circle cx="42" cy="92" r="4" className={styles.accent} />
      <circle cx="158" cy="92" r="4" className={styles.accent} />

      {/* head */}
      <rect x="48" y="38" width="104" height="92" rx="34" className={styles.shell} />
      {/* face screen */}
      <rect x="62" y="56" width="76" height="56" rx="24" className={styles.screen} />
      {/* eyes */}
      <ellipse cx="86" cy="82" rx="7" ry="11" className={styles.eye} />
      <ellipse cx="114" cy="82" rx="7" ry="11" className={styles.eye} />
      {/* smile */}
      <path d="M87 97 q13 9 26 0" className={styles.smile} />

      {/* body */}
      <rect x="61" y="133" width="78" height="62" rx="28" className={styles.shell} />
      <circle cx="100" cy="164" r="11" className={styles.core} />
      <circle cx="100" cy="164" r="4" className={styles.dark} />

      {/* arms */}
      <rect x="43" y="141" width="14" height="42" rx="7" className={styles.shell} />
      <rect x="143" y="141" width="14" height="42" rx="7" className={styles.shell} />
    </g>
  </svg>
);
