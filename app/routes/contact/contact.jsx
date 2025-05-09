import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Icon } from '~/components/icon';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { useFormInput } from '~/hooks';
import { useRef } from 'react';
import { cssProps, msToNum, numToMs } from '~/utils/style';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import styles from './contact.module.css';
import { json } from '@remix-run/cloudflare';

export const meta = () => {
  return [
    {
      title: 'Contact',
      description: 'Send us a message if you’re interested in discussing a project or if you just want to say hi',
    }
  ];
};

const MAX_EMAIL_LENGTH = 512;
const EMAIL_PATTERN = /(.+)@(.+){2,}\.(.+){2,}/;

const FROM_EMAIL = 'info@gbict.nl';  // Hardcoded FROM_EMAIL address

export async function action({ request }) {
  const brevoApiKey = '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';  // Use environment variable from Cloudflare
  const fromEmail = FROM_EMAIL;

  if (!brevoApiKey || !fromEmail) {
    console.error('Missing Brevo API key or FROM_EMAIL');
    return json({ errors: { credentials: 'Brevo API key or FROM_EMAIL not set correctly.' } }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const isBot = String(formData.get('name'));
    const email = String(formData.get('email'));
    const message = String(formData.get('message'));
    const errors = {};

    if (isBot) return json({ success: true });

    if (!email || !EMAIL_PATTERN.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (Object.keys(errors).length > 0) {
      return json({ errors }, { status: 400 });
    }

    const emailPayload = {
      sender: { email: fromEmail, name: 'GBICT-website' },
      to: [{ email: 'info@gbict.nl' }],
      replyTo: { email: email },
      subject: `A message from ${email}`,
      textContent: `From: ${email}\n\n${message}`,
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
  const errorRef = useRef();
  const email = useFormInput('');
  const message = useFormInput('');
  const initDelay = tokens.base.durationS;
  const actionData = useActionData();
  const { state } = useNavigation();
  const sending = state === 'submitting';

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
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider
              className={styles.divider}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay, 0.4)}
            />
            <Input
              className={styles.botkiller}
              label="Name"
              name="name"
              maxLength={MAX_EMAIL_LENGTH}
            />
            <Input
              required
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationXS, initDelay)}
              autoComplete="email"
              label="Your email"
              type="email"
              name="email"
              maxLength={MAX_EMAIL_LENGTH}
              {...email}
            />
            <Input
              required
              multiline
              className={styles.input}
              data-status={status}
              style={getDelay(tokens.base.durationS, initDelay)}
              autoComplete="off"
              label="Message"
              name="message"
              maxLength={MAX_EMAIL_LENGTH}
              {...message}
            />
            <Transition
              unmount
              in={!sending && actionData?.errors?.email}
              timeout={msToNum(tokens.base.durationM)}
            >
              {({ status: errorStatus, nodeRef }) => (
                <div
                  className={styles.formError}
                  ref={nodeRef}
                  data-status={errorStatus}
                  style={cssProps({
                    height: errorStatus ? errorRef.current?.offsetHeight : 0,
                  })}
                >
                  <div className={styles.formErrorContent} ref={errorRef}>
                    <div className={styles.formErrorMessage}>
                      <Icon className={styles.formErrorIcon} icon="error" />
                      {actionData?.errors?.email}
                    </div>
                  </div>
                </div>
              )}
            </Transition>
            <Button
              className={styles.button}
              data-status={status}
              icon="send"
              onClick={() => {
                const emailValue = email.value.trim();
                const messageValue = message.value.trim();
                
                if (!emailValue || !messageValue) {
                  alert("Please fill in both your email and message.");
                  return;
                }

                const mailtoLink = `mailto:info@gbict.nl?subject=Business Inquiry&body=${encodeURIComponent(messageValue)}`;
                window.location.href = mailtoLink;
              }}
            >
              Send message
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
              Message Sent
            </Heading>
            <Text
              size="l"
              as="p"
              className={styles.completeText}
              data-status={status}
              style={getDelay(tokens.base.durationXS)}
            >
              We’ll get back to you within a couple of days, sit tight.
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
              Back to homepage
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
