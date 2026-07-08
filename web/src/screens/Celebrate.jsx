import ScreenHeader from '../components/ScreenHeader';
import Button from '../components/Button';
import { FONT_SERIF, FONT_MONO } from '../theme';

export default function Celebrate({ card, goal, onBack, onStepKr, onFinish }) {
  const krs = goal ? goal.krs : [];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#1A1A1A' }}>
      <ScreenHeader title="Feiern" subtitle="Schau hin, was sich bewegt hat." onBack={onBack} dark />
      <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: '#2A2A2A', border: '1px solid #3A3A3A', borderRadius: 4, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777777', marginBottom: 8 }}>
            Geschafft
          </div>
          <div style={{ fontFamily: FONT_SERIF, fontSize: 20, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.3 }}>{card ? card.title : ''}</div>
          <div style={{ fontSize: 14, color: '#BBBBBB', marginTop: 10, lineHeight: 1.45 }}>{goal ? goal.objective : ''}</div>
        </div>
        <div style={{ background: '#2A2A2A', border: '1px solid #3A3A3A', borderRadius: 4, padding: '4px 16px 12px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#777777', padding: '14px 0 2px' }}>
            Deine Key Results heute
          </div>
          {krs.map((kr, i) => {
            const delta = (Number(kr.current) || 0) - (Number(kr.start) || 0);
            const improved = delta > 0;
            return (
              <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid #3A3A3A' }}>
                <div style={{ fontSize: 15, color: '#FFFFFF' }}>{kr.text}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                  <button
                    onClick={() => onStepKr(i, -1)}
                    style={{ width: 44, height: 44, border: '1.5px solid #595959', background: 'transparent', color: '#FFFFFF', fontSize: 20, borderRadius: 4, cursor: 'pointer', flex: 'none' }}
                  >
                    −
                  </button>
                  <div style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ fontFamily: FONT_MONO, fontSize: 24, fontWeight: 500, color: '#FFFFFF' }}>{String(Number(kr.current) || 0)}</div>
                    <div style={{ fontSize: 12, color: '#777777', marginTop: 2 }}>
                      Start {Number(kr.start) || 0} · Ziel {Number(kr.target) || 0}
                      {kr.unit ? ' ' + kr.unit : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => onStepKr(i, 1)}
                    style={{ width: 44, height: 44, border: '1.5px solid #595959', background: 'transparent', color: '#FFFFFF', fontSize: 20, borderRadius: 4, cursor: 'pointer', flex: 'none' }}
                  >
                    ＋
                  </button>
                </div>
                {improved && (
                  <div style={{ color: '#FC971C', fontSize: 13, fontWeight: 600, marginTop: 8, textAlign: 'center' }}>+{delta} seit Start</div>
                )}
              </div>
            );
          })}
        </div>
        <Button variant="primary" size="lg" fullWidth onClick={onFinish}>
          Abschliessen &amp; feiern
        </Button>
      </div>
    </div>
  );
}
