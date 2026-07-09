import Button from '../components/Button';
import { FONT_SERIF, HEADER_PAD_TOP } from '../theme';
import { pct } from '../store/useAppState';

export default function Goals({ goals, onEdit, onAddGoal, onReset, user, onSignOut }) {
  const hasNoGoals = goals.length === 0;
  const canAddGoal = goals.length < 3;
  const atGoalLimit = goals.length >= 3;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: `${HEADER_PAD_TOP} 20px 14px`, display: 'flex', alignItems: 'center', gap: 10, background: '#F7F7F7', flex: 'none' }}>
        <img src="/assets/LogoWW_006.png" alt="" style={{ width: 26, height: 26, objectFit: 'contain' }} />
        <div style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: 22, color: '#1A1A1A' }}>Meine Ziele</div>
        <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, padding: '3px 10px', background: '#EEEEEE', color: '#1A1A1A', borderRadius: 2 }}>
          {goals.length} / 3
        </span>
      </div>
      {user && (
        <div style={{ padding: '0 20px 12px', display: 'flex', alignItems: 'center', gap: 8, background: '#F7F7F7', flex: 'none' }}>
          {user.picture && (
            <img src={user.picture} alt="" style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }} />
          )}
          <span style={{ fontSize: 13, color: '#595959' }}>{user.name || user.email}</span>
          <button
            onClick={onSignOut}
            style={{ marginLeft: 'auto', border: 'none', background: 'transparent', color: '#999999', fontSize: 12.5, cursor: 'pointer', fontFamily: "'Source Sans 3',sans-serif", textDecoration: 'underline' }}
          >
            Abmelden
          </button>
        </div>
      )}
      <div style={{ flex: 1, overflow: 'auto', padding: '6px 16px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {goals.map((g, gi) => (
          <div key={g.id} style={{ background: '#FFFFFF', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '18px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FC971C' }} />
              <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777777' }}>
                Ziel {gi + 1} von 3
              </span>
              <button
                onClick={() => onEdit(g)}
                style={{
                  marginLeft: 'auto',
                  height: 34,
                  padding: '0 12px',
                  border: '1.5px solid #D9D9D9',
                  background: 'transparent',
                  color: '#1A1A1A',
                  fontSize: 13,
                  fontWeight: 600,
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontFamily: "'Source Sans 3',sans-serif",
                }}
              >
                Bearbeiten
              </button>
            </div>
            <div style={{ fontFamily: FONT_SERIF, fontSize: 19, fontWeight: 600, lineHeight: 1.3, color: '#1A1A1A', marginBottom: 16 }}>
              {g.objective}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {g.krs.map((kr, ki) => (
                <div key={ki}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 14, color: '#1A1A1A' }}>
                    <span style={{ minWidth: 0 }}>{kr.text}</span>
                    <span style={{ color: '#777777', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', flex: 'none' }}>
                      {Number(kr.current) || 0} / {Number(kr.target) || 0}
                      {kr.unit ? ' ' + kr.unit : ''}
                    </span>
                  </div>
                  <div style={{ height: 6, background: '#EEEEEE', borderRadius: 2, marginTop: 6, overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: Math.round(pct(kr) * 100) + '%',
                        background: '#FC971C',
                        borderRadius: 2,
                        transition: 'width .3s ease-out',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {hasNoGoals && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#777777', fontSize: 15, lineHeight: 1.5 }}>
            Noch kein Ziel. Die KI hilft dir, dein erstes OKR-Set zu formulieren.
          </div>
        )}
        {canAddGoal && (
          <Button variant="secondary" size="md" fullWidth onClick={onAddGoal}>
            ＋ Neues Ziel mit KI formulieren
          </Button>
        )}
        {atGoalLimit && (
          <div style={{ fontSize: 13, color: '#999999', textAlign: 'center' }}>Maximal drei Ziele — Fokus schlägt Fülle.</div>
        )}
        <button
          onClick={onReset}
          style={{ marginTop: 14, height: 40, border: 'none', background: 'transparent', color: '#BBBBBB', fontSize: 12.5, cursor: 'pointer', fontFamily: "'Source Sans 3',sans-serif" }}
        >
          Prototyp zurücksetzen
        </button>
      </div>
    </div>
  );
}
