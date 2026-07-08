import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import { FONT_SERIF } from '../theme';

const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#777777',
};

const cardStyle = {
  background: '#FFFFFF',
  borderRadius: 4,
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  padding: 16,
};

const numberInputStyle = {
  width: 64,
  height: 40,
  padding: '0 8px',
  border: '1.5px solid #D9D9D9',
  borderRadius: 4,
  fontSize: 15,
  boxSizing: 'border-box',
};

export default function Draft({
  draft,
  isEditingGoal,
  onBack,
  onObjectiveChange,
  onPatchKr,
  onRemoveKr,
  onAddKr,
  onSave,
  onDelete,
}) {
  const d = draft || { objective: '', krs: [] };
  const canAddKr = !!draft && d.krs.length < 3;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <ScreenHeader
        title={isEditingGoal ? 'Ziel bearbeiten' : 'Dein OKR-Entwurf'}
        subtitle="Passe alles an — es ist deins."
        onBack={onBack}
      />
      <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FC971C' }} />
            <span style={labelStyle}>Objective</span>
          </div>
          <textarea
            value={d.objective}
            onChange={(e) => onObjectiveChange(e.target.value)}
            rows={3}
            style={{
              width: '100%',
              boxSizing: 'border-box',
              padding: 12,
              border: '1.5px solid #D9D9D9',
              borderRadius: 4,
              fontFamily: FONT_SERIF,
              fontSize: 17,
              lineHeight: 1.4,
              color: '#1A1A1A',
              resize: 'none',
            }}
          />
        </div>

        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FC971C' }} />
            <span style={labelStyle}>Key Results</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: '#999999' }}>2–3 leitende Metriken</span>
          </div>
          {d.krs.map((kr, i) => (
            <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  value={kr.text}
                  onChange={(e) => onPatchKr(i, { text: e.target.value })}
                  placeholder="Key Result …"
                  style={{
                    flex: 1,
                    height: 42,
                    padding: '0 12px',
                    border: '1.5px solid #D9D9D9',
                    borderRadius: 4,
                    fontSize: 15,
                    fontFamily: "'Source Sans 3',sans-serif",
                    color: '#1A1A1A',
                    boxSizing: 'border-box',
                    minWidth: 0,
                  }}
                />
                {d.krs.length > 2 && (
                  <button
                    onClick={() => onRemoveKr(i)}
                    style={{ width: 42, height: 42, border: 'none', background: 'transparent', color: '#999999', fontSize: 17, cursor: 'pointer', flex: 'none' }}
                  >
                    ✕
                  </button>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <label style={{ fontSize: 11, color: '#999999' }}>Start</label>
                  <input
                    type="number"
                    value={kr.start}
                    onChange={(e) => onPatchKr(i, { start: e.target.value })}
                    style={numberInputStyle}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <label style={{ fontSize: 11, color: '#999999' }}>Ziel</label>
                  <input
                    type="number"
                    value={kr.target}
                    onChange={(e) => onPatchKr(i, { target: e.target.value })}
                    style={numberInputStyle}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, minWidth: 0 }}>
                  <label style={{ fontSize: 11, color: '#999999' }}>Einheit</label>
                  <input
                    value={kr.unit}
                    onChange={(e) => onPatchKr(i, { unit: e.target.value })}
                    placeholder="z. B. x / Woche"
                    style={{ width: '100%', height: 40, padding: '0 10px', border: '1.5px solid #D9D9D9', borderRadius: 4, fontSize: 15, boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>
          ))}
          {canAddKr && (
            <button
              onClick={onAddKr}
              style={{
                marginTop: 10,
                height: 44,
                padding: '0 8px',
                border: 'none',
                background: 'transparent',
                color: '#E07A00',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: "'Source Sans 3',sans-serif",
              }}
            >
              ＋ Key Result hinzufügen
            </button>
          )}
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={onSave}>
          Ziel übernehmen
        </Button>
        {isEditingGoal && (
          <button
            onClick={onDelete}
            style={{ height: 44, border: 'none', background: 'transparent', color: '#C62828', fontSize: 14.5, cursor: 'pointer', fontFamily: "'Source Sans 3',sans-serif" }}
          >
            Ziel löschen
          </button>
        )}
      </div>
    </div>
  );
}
