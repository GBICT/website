import { useFetcher } from '@remix-run/react';
import { useLocale } from '~/i18n';
import { classes } from '~/utils/style';
import styles from './lang-toggle.module.css';

export const LangToggle = ({ isMobile, className, ...rest }) => {
  const fetcher = useFetcher();
  let locale = useLocale();

  if (fetcher.formData?.has('locale')) {
    locale = fetcher.formData.get('locale');
  }

  const setLocale = next => {
    if (next === locale) return;
    fetcher.submit({ locale: next }, { action: '/api/set-locale', method: 'post' });
  };

  return (
    <div
      className={classes(styles.toggle, className)}
      data-mobile={isMobile}
      role="group"
      aria-label="Language"
      {...rest}
    >
      <button
        type="button"
        className={styles.option}
        data-active={locale === 'nl'}
        aria-pressed={locale === 'nl'}
        onClick={() => setLocale('nl')}
      >
        NL
      </button>
      <span className={styles.sep} aria-hidden>
        /
      </span>
      <button
        type="button"
        className={styles.option}
        data-active={locale === 'en'}
        aria-pressed={locale === 'en'}
        onClick={() => setLocale('en')}
      >
        EN
      </button>
    </div>
  );
};
