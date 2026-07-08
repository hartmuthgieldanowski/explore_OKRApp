import { FONT_SERIF, HEADER_PAD_TOP } from '../theme';

export default function ScreenHeader({ title, subtitle, onBack, dark = false }) {
  return (
    <div
      style={{
        padding: `${HEADER_PAD_TOP} 16px 12px`,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: `1px solid ${dark ? '#3A3A3A' : '#EEEEEE'}`,
        background: dark ? 'transparent' : '#FFFFFF',
        flex: 'none',
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          style={{
            width: 44,
            height: 44,
            border: 'none',
            background: 'transparent',
            fontSize: 22,
            color: dark ? '#FFFFFF' : '#1A1A1A',
            cursor: 'pointer',
            borderRadius: 4,
            flex: 'none',
          }}
        >
          ←
        </button>
      )}
      <div>
        <div style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: 20, color: dark ? '#FFFFFF' : '#1A1A1A' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: dark ? '#BBBBBB' : '#777777' }}>{subtitle}</div>}
      </div>
    </div>
  );
}
