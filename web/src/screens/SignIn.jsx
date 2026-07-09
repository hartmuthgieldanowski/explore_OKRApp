import { useEffect, useRef } from 'react';
import { FONT_SERIF, HERO_PAD_TOP } from '../theme';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function SignIn({ onCredential, error }) {
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
          theme: 'filled_black',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          width: 280,
        });
      }
    };
    tryInit();

    return () => {
      cancelled = true;
    };
  }, [onCredential]);

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1A1A1A',
        padding: `${HERO_PAD_TOP} 28px 44px`,
        boxSizing: 'border-box',
        textAlign: 'center',
      }}
    >
      <img
        src="/assets/logo-white.png"
        alt="Wertwandler"
        style={{ width: 52, height: 52, objectFit: 'contain', marginBottom: 26 }}
      />
      <h1
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 700,
          fontSize: 26,
          lineHeight: 1.2,
          color: '#FFFFFF',
          margin: '0 0 12px',
        }}
      >
        Melde dich an, um weiterzumachen.
      </h1>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: '#BBBBBB', margin: '0 0 34px', maxWidth: 320 }}>
        Deine Ziele und dein Board bleiben auf diesem Gerät — die Anmeldung sorgt nur dafür, dass
        niemand sonst darauf zugreift.
      </p>
      <div ref={buttonRef} />
      {!CLIENT_ID && (
        <p style={{ fontSize: 13, color: '#C62828', marginTop: 20, maxWidth: 320 }}>
          VITE_GOOGLE_CLIENT_ID ist nicht gesetzt.
        </p>
      )}
      {error && (
        <p style={{ fontSize: 13, color: '#C62828', marginTop: 20, maxWidth: 320 }}>{error}</p>
      )}
    </div>
  );
}
