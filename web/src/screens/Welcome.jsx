import Button from '../components/Button';
import { FONT_SERIF, STAGES, HERO_PAD_TOP } from '../theme';

export default function Welcome({ onStart, onSeedDemo }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#1A1A1A',
        padding: `${HERO_PAD_TOP} 28px 44px`,
        boxSizing: 'border-box',
        overflow: 'auto',
      }}
    >
      <img
        src="/assets/logo-white.png"
        alt="Wertwandler"
        style={{ width: 52, height: 52, objectFit: 'contain', alignSelf: 'flex-start' }}
      />
      <h1
        style={{
          fontFamily: FONT_SERIF,
          fontWeight: 700,
          fontSize: 30,
          lineHeight: 1.15,
          color: '#FFFFFF',
          margin: '26px 0 12px',
        }}
      >
        Kultiviere den Wandel — bei dir selbst.
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.5, color: '#BBBBBB', margin: '0 0 26px' }}>
        Maximal drei persönliche Ziele im OKR-Format. Und ein Kanban-Board für den Weg dorthin.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 'auto' }}>
        {STAGES.map((st) => (
          <div key={st.key} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FC971C', flex: 'none', marginTop: 6 }} />
            <div style={{ fontSize: 14.5, lineHeight: 1.4 }}>
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{st.label}</span>
              <span style={{ color: '#8A8A8A' }}> — {st.sub}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 30 }}>
        <Button variant="primary" size="lg" fullWidth onClick={onStart}>
          Erstes Ziel formulieren
        </Button>
        <Button variant="secondary-dark" size="md" fullWidth onClick={onSeedDemo}>
          Beispiel ansehen
        </Button>
      </div>
    </div>
  );
}
