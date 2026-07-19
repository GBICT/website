import { classes } from '~/utils/style';
import styles from './code-stream.module.css';

// A quiet stream of pseudo code that scrolls upward, like looking under the hood
// of the assistant while it works. Purely atmospheric.
const lines = [
  'load context: policies.pdf, catalogue.csv, orders.db',
  'index 12,480 documents into private store',
  'question: "does our policy cover a damaged delivery?"',
  'embed query -> vector[1536]',
  'search your knowledge ... 8 matches',
  'top match: returns_policy §4.2  score 0.94',
  'retrieve source passages',
  'reason over: §4.2, §4.5, sla_terms',
  'ground answer strictly in your sources',
  'apply brand voice + tone',
  'guardrail: no data leaves this environment  ok',
  'guardrail: cite the source clause  ok',
  'draft reply for the customer',
  'confidence 0.97  ->  respond',
  'log: 1.2s, 0 external calls',
  'ready.',
];

export const CodeStream = ({ className }) => (
  <div className={classes(styles.stream, className)} aria-hidden>
    <div className={styles.col}>
      {[...lines, ...lines].map((line, index) => (
        <span key={index} className={styles.line}>
          {line}
        </span>
      ))}
    </div>
  </div>
);
