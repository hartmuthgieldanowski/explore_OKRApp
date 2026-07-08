import { useAppState } from './store/useAppState';
import Welcome from './screens/Welcome';
import Builder from './screens/Builder';
import Draft from './screens/Draft';
import Kickoff from './screens/Kickoff';
import Goals from './screens/Goals';
import Board from './screens/Board';
import Celebrate from './screens/Celebrate';
import TabBar from './components/TabBar';
import CelebratedOverlay from './components/CelebratedOverlay';

export default function App() {
  const s = useAppState();

  const isWelcome = s.screen === 'welcome';
  const isBuilder = s.screen === 'builder';
  const isDraft = s.screen === 'draft';
  const isGoals = s.screen === 'goals';
  const isBoard = s.screen === 'board';
  const isCelebrate = s.screen === 'celebrate';
  const isKickoff = s.screen === 'kickoff';
  const showTabs = isGoals || isBoard;

  const kickoffGoal = s.goals.find((g) => g.id === s.kickoffGoalId);
  const nKickoffSel = s.kickoffSuggestions.filter((sg) => sg.selected).length;
  const kickoffCta = nKickoffSel > 0 ? nKickoffSel + ' aufs Board übernehmen' : 'Ohne Optionen weiter';

  const celCard = s.cards.find((c) => c.id === s.celebrateCardId);
  const celGoal = celCard ? s.goals.find((g) => g.id === celCard.goalId) : null;

  return (
    <div className="ww-app-shell">
      {isWelcome && <Welcome onStart={s.startBuilder} onSeedDemo={s.seedDemo} />}

      {isBuilder && (
        <Builder
          chat={s.chat}
          chatInput={s.chatInput}
          thinking={s.thinking}
          chatRef={s.chatRef}
          onBack={s.goBack}
          onChatInput={s.setChatInput}
          onSendChat={s.doSendChat}
        />
      )}

      {isDraft && (
        <Draft
          draft={s.draft}
          isEditingGoal={!!s.draftGoalId}
          onBack={s.goBack}
          onObjectiveChange={s.setDraftObjective}
          onPatchKr={s.patchKr}
          onRemoveKr={s.removeKr}
          onAddKr={s.addKr}
          onSave={s.saveDraftGoal}
          onDelete={s.deleteGoal}
        />
      )}

      {isKickoff && (
        <Kickoff
          objective={kickoffGoal ? kickoffGoal.objective : ''}
          suggestions={s.kickoffSuggestions}
          loading={s.kickoffLoading}
          error={s.kickoffError}
          input={s.kickoffInput}
          canRegen={!s.kickoffLoading && !!kickoffGoal}
          cta={kickoffCta}
          onInputChange={s.setKickoffInput}
          onAddOwn={s.addKickoffOption}
          onToggle={s.toggleKickoffSuggestion}
          onRegen={s.regenOptions}
          onToBoard={s.kickoffToBoard}
          onSkip={s.kickoffSkip}
        />
      )}

      {isGoals && (
        <Goals goals={s.goals} onEdit={s.startEditGoal} onAddGoal={s.startBuilder} onReset={s.resetAll} />
      )}

      {isBoard && (
        <Board
          goals={s.goals}
          cards={s.cards}
          doneCount={s.doneCount}
          selectedCardId={s.selectedCardId}
          newCardTitle={s.newCardTitle}
          newCardGoalId={s.newCardGoalId}
          blockNote={s.blockNote}
          onStartBuilder={s.startBuilder}
          onSelectCard={s.setSelectedCardId}
          onMoveCard={s.moveCard}
          onTryCard={s.tryCard}
          onReviewCard={s.startReview}
          onDeleteCard={s.deleteCard}
          onNewCardTitleChange={s.setNewCardTitle}
          onAddCard={s.doAddCard}
          onSelectNewCardGoal={s.setNewCardGoalId}
        />
      )}

      {isCelebrate && (
        <Celebrate
          card={celCard}
          goal={celGoal}
          onBack={s.backToBoard}
          onStepKr={(ki, delta) => celGoal && s.stepKr(celGoal.id, ki, delta)}
          onFinish={s.finishCelebrate}
        />
      )}

      {showTabs && <TabBar active={isGoals ? 'goals' : 'board'} onGoals={s.goGoals} onBoard={s.goBoard} />}

      {s.celebrated && <CelebratedOverlay message={s.celebratedMsg} onDismiss={s.dismissCelebrated} />}
    </div>
  );
}
