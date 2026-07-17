import { Input } from '~/components/input';
import { useFormInput } from '~/hooks';
import styles from './contact-form.module.css';

export const SERVICE_OPTIONS = [
  'AI',
  'App development',
  'Webbots',
  'Business automation',
];

// The shared field set for both contact forms (the homepage section and the
// /contact page), so they can never drift apart. The <Form> wrapper, submit
// button and success state stay with the caller.
export const ContactFields = ({ errors }) => {
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const email = useFormInput('');
  const message = useFormInput('');

  return (
    <div className={styles.fields}>
      {/* Honeypot: bots fill this in, people never see it. The action treats a
          filled value as a bot and silently drops the submission. */}
      <div className={styles.botField} aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="name" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.row}>
        <Input
          required
          className={styles.field}
          label="First name"
          name="firstName"
          maxLength={100}
          error={errors?.firstName}
          {...firstName}
        />
        <Input
          required
          className={styles.field}
          label="Last name"
          name="lastName"
          maxLength={100}
          error={errors?.lastName}
          {...lastName}
        />
      </div>

      <Input
        required
        className={styles.field}
        type="email"
        label="Email"
        name="email"
        autoComplete="email"
        maxLength={512}
        error={errors?.email}
        {...email}
      />

      <fieldset className={styles.services}>
        <legend className={styles.servicesLegend}>What can we help you with?</legend>
        <div className={styles.serviceOptions}>
          {SERVICE_OPTIONS.map(option => (
            <label key={option} className={styles.serviceOption}>
              <input
                type="checkbox"
                name="services"
                value={option}
                className={styles.serviceCheckbox}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Input
        multiline
        className={styles.field}
        label="Message (optional)"
        name="message"
        maxLength={4096}
        {...message}
      />
    </div>
  );
};
