import { useEffect, useState } from 'react';
import { useUi } from '~/i18n';
import styles from './cookie-consent.module.css';

const STORAGE_KEY = 'gbict-consent';

// Update Google Consent Mode after a choice. Uses its own gtag shim so it does
// not depend on the head script's function being on window.
function updateConsent(granted) {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  const value = granted ? 'granted' : 'denied';
  gtag('consent', 'update', {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const t = useUi().cookie;

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch (error) {
      setVisible(true);
    }
  }, []);

  const choose = granted => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied');
    } catch (error) {
      // ignore storage errors, still update consent for this page view
    }
    updateConsent(granted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Cookie consent" aria-live="polite">
      <div className={styles.inner}>
        <p className={styles.text}>{t.text}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.decline} onClick={() => choose(false)}>
            {t.decline}
          </button>
          <button type="button" className={styles.accept} onClick={() => choose(true)}>
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
};
