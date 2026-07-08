import { STAGES } from '../theme';

const fwdBtnStyle = {
  height: 40,
  padding: '0 14px',
  border: 'none',
  background: '#FC971C',
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: 600,
  borderRadius: 4,
  cursor: 'pointer',
  fontFamily: "'Source Sans 3',sans-serif",
};

export default function BoardCard({ card, goalTag, expanded, note, onTap, onBack, onFwd, onTry, onReview, onDelete }) {
  const si = STAGES.findIndex((s) => s.key === card.stage);
  const stage = STAGES[si];
  const showTries = card.stage === 'exploring';
  const tries = card.tries || 0;
  const canBack = si > 0;
  const canTry = card.stage === 'exploring' && tries < 3;
  const canFwd = si < 3;
  const isCelebrating = card.stage === 'celebrating';
  const canDelete = card.stage === 'options';

  return (
    <div onClick={onTap} style={{ background: '#FFFFFF', borderRadius: 4, boxShadow: '0 1px 2px rgba(0,0,0,0.06)', padding: 14, cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.35, minWidth: 0 }}>{card.title}</div>
        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 6px', background: '#FFF3E0', color: '#E07A00', borderRadius: 2, flex: 'none' }}>
          {goalTag}
        </span>
      </div>
      {showTries && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: i < tries ? '#FC971C' : 'transparent',
                border: '1.5px solid ' + (i < tries ? '#FC971C' : '#BBBBBB'),
                boxSizing: 'border-box',
              }}
            />
          ))}
          <span style={{ fontSize: 12, color: '#777777', marginLeft: 4 }}>{tries}/3 Versuche</span>
        </div>
      )}
      {expanded && (
        <>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid #EEEEEE' }}>
            {canBack && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onBack();
                }}
                style={{ height: 40, padding: '0 12px', border: '1.5px solid #D9D9D9', background: 'transparent', color: '#595959', fontSize: 14, fontWeight: 600, borderRadius: 4, cursor: 'pointer', fontFamily: "'Source Sans 3',sans-serif" }}
              >
                ←
              </button>
            )}
            {canTry && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTry();
                }}
                style={{ height: 40, padding: '0 14px', border: '1.5px solid #D9D9D9', background: 'transparent', color: '#1A1A1A', fontSize: 14, fontWeight: 600, borderRadius: 4, cursor: 'pointer', fontFamily: "'Source Sans 3',sans-serif" }}
              >
                ＋ Versuch
              </button>
            )}
            {canFwd && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFwd();
                }}
                style={fwdBtnStyle}
              >
                {stage.fwd}
              </button>
            )}
            {isCelebrating && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReview();
                }}
                style={{ height: 40, padding: '0 14px', border: 'none', background: '#FC971C', color: '#FFFFFF', fontSize: 14, fontWeight: 600, borderRadius: 4, cursor: 'pointer', fontFamily: "'Source Sans 3',sans-serif" }}
              >
                Review starten
              </button>
            )}
            {canDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                style={{ height: 40, padding: '0 10px', border: 'none', background: 'transparent', color: '#999999', fontSize: 13.5, cursor: 'pointer', fontFamily: "'Source Sans 3',sans-serif" }}
              >
                Entfernen
              </button>
            )}
          </div>
          {note && <div style={{ marginTop: 8, fontSize: 12.5, color: '#E07A00' }}>{note}</div>}
        </>
      )}
    </div>
  );
}
