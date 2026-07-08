function tabStyle(active) {
  return {
    flex: 1,
    minHeight: 52,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    color: active ? '#FC971C' : '#999999',
    fontFamily: "'Source Sans 3',sans-serif",
  };
}

export default function TabBar({ active, onGoals, onBoard }) {
  return (
    <div
      style={{
        display: 'flex',
        borderTop: '1px solid #EEEEEE',
        background: '#FFFFFF',
        padding: '6px 0 calc(env(safe-area-inset-bottom, 0px) + 10px)',
        flex: 'none',
      }}
    >
      <button onClick={onGoals} style={tabStyle(active === 'goals')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 600 }}>Ziele</span>
      </button>
      <button onClick={onBoard} style={tabStyle(active === 'board')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="5" height="13" rx="1" />
          <rect x="10" y="4" width="5" height="9" rx="1" />
          <rect x="17" y="4" width="5" height="16" rx="1" />
        </svg>
        <span style={{ fontSize: 12, fontWeight: 600 }}>Board</span>
      </button>
    </div>
  );
}
