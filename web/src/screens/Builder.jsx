import { useEffect } from 'react';
import ScreenHeader from '../components/ScreenHeader';

export default function Builder({ chat, chatInput, thinking, chatRef, onBack, onChatInput, onSendChat }) {
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat, thinking, chatRef]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') onSendChat();
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: '#FFFFFF' }}>
      <ScreenHeader title="Neues Ziel" subtitle="Die KI hilft dir beim Formulieren" onBack={onBack} />
      <div ref={chatRef} style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {chat.map((m, i) => (
          <div
            key={i}
            style={
              m.role === 'user'
                ? {
                    alignSelf: 'flex-end',
                    maxWidth: '82%',
                    background: '#1A1A1A',
                    color: '#FFFFFF',
                    padding: '11px 14px',
                    borderRadius: '8px 8px 2px 8px',
                    fontSize: 15,
                    lineHeight: 1.45,
                    whiteSpace: 'pre-wrap',
                  }
                : {
                    alignSelf: 'flex-start',
                    maxWidth: '86%',
                    background: '#F7F7F7',
                    border: '1px solid #EEEEEE',
                    color: '#1A1A1A',
                    padding: '11px 14px',
                    borderRadius: '8px 8px 8px 2px',
                    fontSize: 15,
                    lineHeight: 1.45,
                    whiteSpace: 'pre-wrap',
                  }
            }
          >
            {m.text}
          </div>
        ))}
        {thinking && (
          <div
            style={{
              alignSelf: 'flex-start',
              padding: '12px 16px',
              background: '#F7F7F7',
              border: '1px solid #EEEEEE',
              borderRadius: 8,
              color: '#777777',
              fontSize: 18,
              display: 'flex',
              gap: 3,
              lineHeight: 1,
            }}
          >
            <span style={{ animation: 'wwblink 1.2s infinite' }}>·</span>
            <span style={{ animation: 'wwblink 1.2s .2s infinite' }}>·</span>
            <span style={{ animation: 'wwblink 1.2s .4s infinite' }}>·</span>
          </div>
        )}
      </div>
      <div style={{ padding: '10px 12px 38px', borderTop: '1px solid #EEEEEE', display: 'flex', gap: 8, background: '#FFFFFF', flex: 'none' }}>
        <input
          value={chatInput}
          onChange={(e) => onChatInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Deine Antwort …"
          style={{
            flex: 1,
            height: 46,
            padding: '0 14px',
            border: '1.5px solid #D9D9D9',
            borderRadius: 4,
            fontSize: 16,
            fontFamily: "'Source Sans 3',sans-serif",
            color: '#1A1A1A',
            background: '#FFFFFF',
            boxSizing: 'border-box',
            minWidth: 0,
          }}
        />
        <button
          onClick={onSendChat}
          style={{
            width: 46,
            height: 46,
            border: 'none',
            background: '#FC971C',
            color: '#FFFFFF',
            fontSize: 20,
            borderRadius: 4,
            cursor: 'pointer',
            flex: 'none',
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}
