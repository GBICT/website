import { Button } from '~/components/button';
import { ContactFields } from '~/components/contact-form';
import { DecoderText } from '~/components/decoder-text';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { useFetcher } from '@remix-run/react';
import { useUi } from '~/i18n';
import styles from './contact-cta.module.css';

export const ContactCta = ({ id, visible, sectionRef }) => {
  const fetcher = useFetcher();
  const sending = fetcher.state === 'submitting';
  const data = fetcher.data;
  const titleId = `${id}-title`;
  const t = useUi().home.contact;

  return (
    <Section
      as="section"
      id={id}
      ref={sectionRef}
      className={styles.contact}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0}>
        {({ visible: shown, nodeRef }) => (
          <div className={styles.content} ref={nodeRef} data-visible={shown}>
            {data?.success ? (
              <div className={styles.complete} aria-live="polite">
                <Heading level={3} as="h2" className={styles.title}>
                  {t.sentTitle}
                </Heading>
                <Text size="l" as="p" className={styles.intro}>
                  {t.sentIntro}
                </Text>
              </div>
            ) : (
              <>
                <Heading id={titleId} level={3} as="h2" className={styles.title}>
                  <DecoderText text={t.title} start={shown} delay={300} />
                </Heading>
                <Text size="l" as="p" className={styles.intro}>
                  {t.intro}
                </Text>
                <fetcher.Form method="post" action="/contact" className={styles.form}>
                  <ContactFields errors={data?.errors} />
                  {(data?.errors?.server || data?.errors?.credentials) && (
                    <div className={styles.formError} role="alert">
                      <Icon className={styles.formErrorIcon} icon="error" />
                      {data.errors.server || data.errors.credentials}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className={styles.button}
                    disabled={sending}
                    loading={sending}
                    loadingText={t.sending}
                    icon="send"
                  >
                    {t.send}
                  </Button>
                </fetcher.Form>
              </>
            )}
          </div>
        )}
      </Transition>
    </Section>
  );
};
