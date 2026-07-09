import { useState } from 'react';
import Button from '../components/Button';
import BoardCard from '../components/BoardCard';
import { FONT_SERIF, STAGES, HEADER_PAD_TOP } from '../theme';

export default function Board({
  goals,
  cards,
  doneCount,
  selectedCardId,
  newCardTitle,
  newCardGoalId,
  blockNote,
  onStartBuilder,
  onSelectCard,
  onMoveCard,
  onTryCard,
  onReviewCard,
  onDeleteCard,
  onNewCardTitleChange,
  onAddCard,
  onSelectNewCardGoal,
  onClearBlockNote,
}) {
  const [boardTab, setBoardTab] = useState(STAGES[0].key);

  const boardNoGoals = goals.length === 0;
  const boardHasGoals = goals.length > 0;
  const hasDone = doneCount > 0;
  const manyGoals = goals.length > 1;

  const selectTab = (key) => {
    setBoardTab(key);
    onSelectCard(null);
    onClearBlockNote();
  };

  const goalIndex = {};
  goals.forEach((g, i) => {
    goalIndex[g.id] = i + 1;
  });

  const activeGoalId = newCardGoalId || (goals[0] && goals[0].id);

  const onNewCardKey = (e) => {
    if (e.key === 'Enter') onAddCard();
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: `${HEADER_PAD_TOP} 20px 12px`, display: 'flex', alignItems: 'center', gap: 10, background: '#F7F7F7', flex: 'none' }}>
        <img src="/assets/LogoWW_006.png" alt="" style={{ width: 26, height: 26, objectFit: 'contain' }} />
        <div style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: 22, color: '#1A1A1A' }}>Personal Kanban</div>
        {hasDone && (
          <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, padding: '3px 10px', background: '#FFF3E0', color: '#E07A00', borderRadius: 2 }}>
            {doneCount} gefeiert
          </span>
        )}
      </div>

      {boardNoGoals && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16, textAlign: 'center' }}>
          <div style={{ color: '#777777', fontSize: 15, lineHeight: 1.5 }}>Dein Board braucht zuerst ein Ziel.</div>
          <Button variant="primary" size="md" onClick={onStartBuilder}>
            Erstes Ziel formulieren
          </Button>
        </div>
      )}

      {boardHasGoals && (
        <div style={{ display: 'flex', gap: 4, padding: '6px 16px 10px', flex: 'none' }}>
          {STAGES.map((s) => {
            const active = boardTab === s.key;
            return (
              <button
                key={s.key}
                onClick={() => selectTab(s.key)}
                style={{
                  flex: 1,
                  height: 40,
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontFamily: "'Source Sans 3',sans-serif",
                  fontSize: 11.5,
                  fontWeight: 600,
                  background: active ? '#1A1A1A' : '#EEEEEE',
                  color: active ? '#FFFFFF' : '#595959',
                  transition: 'background .15s',
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      )}

      {boardHasGoals && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '2px 16px 24px' }}>
          {STAGES.filter((s) => s.key === boardTab).map((s) => {
            const cardsIn = cards.filter((c) => c.stage === s.key);
            const atLimit = s.limit != null && cardsIn.length >= s.limit;
            const isEmpty = cardsIn.length === 0 && s.key !== 'options';
            const isOptions = s.key === 'options';
            return (
              <div key={s.key} style={{ padding: '4px 2px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FC971C', flex: 'none', alignSelf: 'center' }} />
                  <span style={{ fontFamily: FONT_SERIF, fontWeight: 700, fontSize: 17, color: '#1A1A1A' }}>{s.label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: atLimit ? '#E07A00' : '#999999' }}>
                    {s.limit != null ? cardsIn.length + '/' + s.limit : String(cardsIn.length)}
                  </span>
                </div>
                <div style={{ fontSize: 12.5, color: '#777777', margin: '2px 0 12px 17px' }}>{s.sub}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {cardsIn.map((card) => (
                    <BoardCard
                      key={card.id}
                      card={card}
                      goalTag={'Z' + (goalIndex[card.goalId] || '?')}
                      expanded={selectedCardId === card.id}
                      note={blockNote && blockNote.id === card.id ? blockNote.text : ''}
                      onTap={() => onSelectCard(selectedCardId === card.id ? null : card.id)}
                      onBack={() => onMoveCard(card.id, -1)}
                      onFwd={() => onMoveCard(card.id, 1)}
                      onTry={() => onTryCard(card.id)}
                      onReview={() => onReviewCard(card.id)}
                      onDelete={() => onDeleteCard(card.id)}
                    />
                  ))}
                  {isEmpty && (
                    <div style={{ border: '1.5px dashed #D9D9D9', borderRadius: 4, padding: '18px 12px', fontSize: 13, color: '#999999', textAlign: 'center', lineHeight: 1.4 }}>
                      {s.empty}
                    </div>
                  )}
                  {isOptions && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <input
                          value={newCardTitle}
                          onChange={(e) => onNewCardTitleChange(e.target.value)}
                          onKeyDown={onNewCardKey}
                          placeholder="Neue Option …"
                          style={{
                            flex: 1,
                            height: 44,
                            padding: '0 12px',
                            border: '1.5px solid #D9D9D9',
                            borderRadius: 4,
                            fontSize: 15,
                            fontFamily: "'Source Sans 3',sans-serif",
                            color: '#1A1A1A',
                            background: '#FFFFFF',
                            boxSizing: 'border-box',
                            minWidth: 0,
                          }}
                        />
                        <button
                          onClick={onAddCard}
                          style={{ width: 44, height: 44, border: 'none', background: '#FC971C', color: '#FFFFFF', fontSize: 20, borderRadius: 4, cursor: 'pointer', flex: 'none' }}
                        >
                          ＋
                        </button>
                      </div>
                      {manyGoals && (
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <span style={{ fontSize: 12, color: '#999999' }}>Für Ziel:</span>
                          {goals.map((g, i) => {
                            const active = activeGoalId === g.id;
                            return (
                              <button
                                key={g.id}
                                onClick={() => onSelectNewCardGoal(g.id)}
                                style={{
                                  height: 32,
                                  padding: '0 12px',
                                  borderRadius: 2,
                                  cursor: 'pointer',
                                  fontFamily: "'Source Sans 3',sans-serif",
                                  fontSize: 12.5,
                                  fontWeight: 600,
                                  border: '1.5px solid ' + (active ? '#FC971C' : '#D9D9D9'),
                                  background: active ? '#FFF3E0' : 'transparent',
                                  color: active ? '#E07A00' : '#595959',
                                }}
                              >
                                {'Z' + (i + 1)}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
