import { useEffect, useRef } from 'react';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function GoogleSignInButton({ onCredential, size = 'medium' }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!CLIENT_ID) return;

    let cancelled = false;
    let attempts = 0;

    const tryInit = () => {
      if (cancelled) return;
      const gsi = window.google?.accounts?.id;
      if (!gsi) {
        attempts += 1;
        if (attempts < 100) setTimeout(tryInit, 100);
        return;
      }
      gsi.initialize({
        client_id: CLIENT_ID,
        callback: (response) => onCredential(response.credential),
      });
      if (buttonRef.current) {
        gsi.renderButton(buttonRef.current, {
          type: 'standard',
          theme: 'outline',
          size,
          text: 'signin_with',
          shape: 'pill',
        });
      }
    };
    tryInit();

    return () => {
      cancelled = true;
    };
  }, [onCredential, size]);

  if (!CLIENT_ID) return null;

  return <div ref={buttonRef} />;
}
