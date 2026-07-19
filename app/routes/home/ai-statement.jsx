import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { TypeStream } from '~/components/type-stream/type-stream';
import { useInViewport } from '~/hooks';
import { useUi } from '~/i18n';
import { useRef } from 'react';
import styles from './ai-statement.module.css';

export const AiStatement = () => {
  const ref = useRef();
  const visible = useInViewport(ref, true, { rootMargin: '0px 0px -15% 0px' });
  const s = useUi().home.ai;

  return (
    <Section as="section" className={styles.section} aria-labelledby="ai-heading">
      <div className={styles.inner} ref={ref} data-visible={visible}>
        <Text className={styles.kicker} size="s" as="p">
          {s.kicker}
        </Text>
        <Heading id="ai-heading" level={2} as="h2" className={styles.title}>
          <DecoderText text={s.title} start={visible} />
        </Heading>
        <Text size="l" as="p" className={styles.copy}>
          {s.copy}
        </Text>
        <div className={styles.stream}>
          <TypeStream phrases={s.phrases} className={styles.streamText} />
        </div>
        <Link href="/services/ai-assistants" className={styles.link}>
          {s.link}
        </Link>
      </div>
    </Section>
  );
};
