import Button from '../components/Button';
import { FONT_SERIF, HERO_PAD_TOP } from '../theme';

export default function Kickoff({
  objective,
  suggestions,
  loading,
  error,
  input,
  canRegen,
  cta,
  onInputChange,
  onAddOwn,
  onToggle,
  onRegen,
  onToBoard,
  onSkip,
}) {
  const onKeyDown = (e) => {
    if (e.key === 'Enter') onAddOwn();
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#1A1A1A' }}>
      <div style={{ padding: `${HERO_PAD_TOP} 24px 0` }}>
        <img src="/assets/logo-white.png" alt="" style={{ width: 44, height: 44, objectFit: 'contain', animation: 'wwpop 0.5s ease-out' }} />
        <div style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: 26, color: '#FFFFFF', marginTop: 16, lineHeight: 1.15 }}>
          Stark. Dein Ziel steht.
        </div>
        <div style={{ fontSize: 14.5, color: '#BBBBBB', marginTop: 8, lineHeight: 1.5 }}>{objective}</div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '22px 24px 30px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FC971C' }} />
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777777' }}>Erste Optionen</span>
        </div>
        <div style={{ fontSize: 14, color: '#BBBBBB', lineHeight: 1.45, marginBottom: 4 }}>
          Aus deinen Key Results abgeleitet — wähl aus, was aufs Board soll. Klein anfangen. Konkret.
        </div>
        {loading && (
          <div style={{ fontSize: 14, color: '#777777', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#FC971C', animation: 'wwblink 1.2s infinite' }} />
            Die KI leitet Optionen aus deinen Key Results ab …
          </div>
        )}
        {error && <div style={{ fontSize: 14, color: '#FDB950' }}>{error}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => onToggle(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                textAlign: 'left',
                width: '100%',
                minHeight: 48,
                padding: '12px 14px',
                boxSizing: 'border-box',
                borderRadius: 4,
                cursor: 'pointer',
                background: '#2A2A2A',
                border: '1.5px solid ' + (s.selected ? '#FC971C' : '#3A3A3A'),
                color: '#FFFFFF',
                fontSize: 15,
                fontFamily: "'Source Sans 3',sans-serif",
                lineHeight: 1.35,
                transition: 'border-color .15s',
              }}
            >
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  flex: 'none',
                  boxSizing: 'border-box',
                  background: s.selected ? '#FC971C' : 'transparent',
                  border: '1.5px solid ' + (s.selected ? '#FC971C' : '#777777'),
                }}
              />
              <span style={{ minWidth: 0 }}>{s.text}</span>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
          <input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Eigene Option …"
            style={{
              flex: 1,
              height: 46,
              padding: '0 14px',
              border: '1.5px solid #3A3A3A',
              borderRadius: 4,
              fontSize: 15,
              fontFamily: "'Source Sans 3',sans-serif",
              color: '#FFFFFF',
              background: '#2A2A2A',
              boxSizing: 'border-box',
              minWidth: 0,
            }}
          />
          <button
            onClick={onAddOwn}
            style={{ width: 46, height: 46, border: 'none', background: '#FC971C', color: '#FFFFFF', fontSize: 20, borderRadius: 4, cursor: 'pointer', flex: 'none' }}
          >
            ＋
          </button>
        </div>
        {canRegen && (
          <button
            onClick={onRegen}
            style={{
              alignSelf: 'flex-start',
              height: 40,
              padding: '0 4px',
              border: 'none',
              background: 'transparent',
              color: '#BBBBBB',
              fontSize: 13.5,
              cursor: 'pointer',
              fontFamily: "'Source Sans 3',sans-serif",
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            Andere Vorschläge
          </button>
        )}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 18 }}>
          <Button variant="primary" size="lg" fullWidth onClick={onToBoard}>
            {cta}
          </Button>
          <button
            onClick={onSkip}
            style={{ height: 44, border: 'none', background: 'transparent', color: '#777777', fontSize: 14, cursor: 'pointer', fontFamily: "'Source Sans 3',sans-serif" }}
          >
            Später — direkt zum Board
          </button>
        </div>
      </div>
    </div>
  );
}
