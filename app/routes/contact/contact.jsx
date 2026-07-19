import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { ContactFields } from '~/components/contact-form';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { useUi } from '~/i18n';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import styles from './contact.module.css';
import { json } from '@remix-run/cloudflare';

export const meta = () => {
  return [
    {
      title: 'Contact',
      description:
        'Stuur ons een bericht als je een project wilt bespreken of gewoon even hallo wilt zeggen.',
    },
  ];
};

const MAX_EMAIL_LENGTH = 512;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

const FROM_EMAIL = 'info@gbict.nl';  // Hardcoded FROM_EMAIL address

export async function action({ request, context }) {
  // Never inline this key: the repository is public. It lives as an encrypted
  // secret on the Cloudflare Pages project and is read at request time.
  const brevoApiKey = context.cloudflare.env.BREVO_API_KEY;
  const fromEmail = FROM_EMAIL;

  if (!brevoApiKey || !fromEmail) {
    console.error('Missing Brevo API key or FROM_EMAIL');
    return json({ errors: { credentials: 'Brevo API key or FROM_EMAIL not set correctly.' } }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const isBot = String(formData.get('name'));
    const firstName = String(formData.get('firstName') || '').trim();
    const lastName = String(formData.get('lastName') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const services = formData.getAll('services').map(String);
    const message = String(formData.get('message') || '').trim();
    const errors = {};

    if (isBot) return json({ success: true });

    if (!firstName) errors.firstName = 'Please enter your first name.';
    if (!lastName) errors.lastName = 'Please enter your last name.';
    if (!email || !EMAIL_PATTERN.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(errors).length > 0) {
      return json({ errors }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const emailPayload = {
      sender: { email: fromEmail, name: 'GBICT-website' },
      to: [{ email: 'info@gbict.nl' }],
      replyTo: { email },
      subject: `New enquiry from ${fullName}`,
      textContent:
        `Name: ${fullName}\n` +
        `Email: ${email}\n` +
        `Services: ${services.length ? services.join(', ') : '—'}\n\n` +
        `${message || '(no message)'}`,
    };

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    return json({ success: true });
  } catch (error) {
    console.error('Error in action handler:', error);
    return json({ errors: { server: 'There was an error sending your email. Please try again later.' } }, { status: 500 });
  }
}

export const Contact = () => {
  const initDelay = tokens.base.durationS;
  const actionData = useActionData();
  const { state } = useNavigation();
  const sending = state === 'submitting';
  const t = useUi().contactPage;

  return (
    <Section className={styles.contact}>
      <Transition unmount in={!actionData?.success} timeout={1600}>
        {({ status, nodeRef }) => (
          <Form
            unstable_viewTransition
            className={styles.form}
            method="post"
            ref={nodeRef}
          >
            <Heading
              className={styles.title}
              data-status={status}
              level={3}
              as="h1"
              style={getDelay(tokens.base.durationXS, initDelay, 0.3)}
            >
              <DecoderText text={t.sayHello} start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            <ContactFields data-status={status} errors={actionData?.errors} />
            {(actionData?.errors?.server || actionData?.errors?.credentials) && (
              <div className={styles.formError} role="alert">
                <div className={styles.formErrorContent}>
                  <div className={styles.formErrorMessage}>
                    <Icon className={styles.formErrorIcon} icon="error" />
                    {actionData.errors.server || actionData.errors.credentials}
                  </div>
                </div>
              </div>
            )}
            <Button
              className={styles.button}
              data-status={status}
              type="submit"
              disabled={sending}
              loading={sending}
              loadingText={t.sending}
              icon="send"
            >
              {t.sendMessage}
            </Button>
          </Form>
        )}
      </Transition>
      <Transition unmount in={actionData?.success}>
        {({ status, nodeRef }) => (
          <div className={styles.complete} aria-live="polite" ref={nodeRef}>
            <Heading
              level={3}
              as="h3"
              className={styles.completeTitle}
              data-status={status}
            >
              {t.sentTitle}
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              {t.sentText}
            </Text>
            <Button
              secondary
              iconHoverShift
              className={styles.completeButton}
              data-status={status}
              style={getDelay(tokens.base.durationM)}
              href="/"
              icon="chevron-right"
            >
              {t.backHome}
            </Button>
          </div>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};

function getDelay(delayMs, offset = numToMs(0), multiplier = 1) {
  const numDelay = msToNum(delayMs) * multiplier;
  return cssProps({ delay: numToMs((msToNum(offset) + numDelay).toFixed(0)) });
}
