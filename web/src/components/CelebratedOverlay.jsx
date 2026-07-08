import { FONT_SERIF } from '../theme';

export default function CelebratedOverlay({ message, onDismiss }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 80,
        background: 'rgba(26,26,26,0.97)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        textAlign: 'center',
        animation: 'wwfade 0.3s ease-out',
      }}
    >
      <img src="/assets/logo-white.png" alt="" style={{ width: 64, height: 64, objectFit: 'contain', animation: 'wwpop 0.5s ease-out' }} />
      <div style={{ fontFamily: FONT_SERIF, fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginTop: 22 }}>Gefeiert.</div>
      <div style={{ fontSize: 15, color: '#BBBBBB', marginTop: 8, lineHeight: 1.5 }}>{message}</div>
      <button
        onClick={onDismiss}
        style={{
          marginTop: 30,
          height: 48,
          padding: '0 28px',
          border: 'none',
          background: '#FC971C',
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: 600,
          borderRadius: 4,
          cursor: 'pointer',
          fontFamily: "'Source Sans 3',sans-serif",
        }}
      >
        Weiter gehts
      </button>
    </div>
  );
}
