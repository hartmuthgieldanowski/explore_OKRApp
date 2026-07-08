import { useCallback, useRef, useState } from 'react';
import { STAGES } from '../theme';
import { complete } from '../api/claude';
import { GREETING, SYSTEM_CHAT, SYSTEM_OPTIONS } from './prompts';

const STORAGE_KEY = 'wwpk-v1';

function uid() {
  return 'x' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  } catch (e) {
    return null;
  }
}

function parseOKR(text) {
  let s = null;
  const m = text.match(/```json([\s\S]*?)```/) || text.match(/```([\s\S]*?)```/);
  if (m) s = m[1];
  if (!s) {
    const i = text.indexOf('{');
    const j = text.lastIndexOf('}');
    if (i > -1 && j > i) s = text.slice(i, j + 1);
  }
  if (!s) return null;
  try {
    const o = JSON.parse(s);
    if (o && o.objective && Array.isArray(o.keyResults) && o.keyResults.length) {
      return {
        objective: String(o.objective),
        krs: o.keyResults.slice(0, 3).map((k) => ({
          text: String(k.text || ''),
          start: Number(k.start) || 0,
          current: Number(k.start) || 0,
          target: Number(k.target) || 1,
          unit: String(k.unit || ''),
        })),
      };
    }
  } catch (e) {
    /* fall through */
  }
  return null;
}

function parseList(text) {
  const i = text.indexOf('[');
  const j = text.lastIndexOf(']');
  if (i < 0 || j <= i) return null;
  try {
    const arr = JSON.parse(text.slice(i, j + 1));
    if (Array.isArray(arr)) return arr.map((x) => String(x)).filter((x) => x.trim());
  } catch (e) {
    /* fall through */
  }
  return null;
}

function krStepFor(kr) {
  const span = Math.abs((Number(kr.target) || 1) - (Number(kr.start) || 0));
  return Math.max(1, Math.round(span / 10));
}

export function pct(kr) {
  const s = Number(kr.start) || 0;
  const t = Number(kr.target) || 1;
  const c = Number(kr.current) || 0;
  if (t === s) return c >= t ? 1 : 0;
  return Math.max(0, Math.min(1, (c - s) / (t - s)));
}

export function useAppState() {
  const saved = loadSaved();
  const initialGoals = (saved && saved.goals) || [];
  const initialCards = (saved && saved.cards) || [];

  const [screen, setScreen] = useState(initialGoals.length ? 'board' : 'welcome');
  const [goals, setGoals] = useState(initialGoals);
  const [cards, setCards] = useState(initialCards);
  const [doneCount, setDoneCount] = useState((saved && saved.doneCount) || 0);

  const [chat, setChat] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [thinking, setThinking] = useState(false);

  const [draft, setDraft] = useState(null);
  const [draftGoalId, setDraftGoalId] = useState(null);

  const [selectedCardId, setSelectedCardId] = useState(null);

  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardGoalId, setNewCardGoalId] = useState(null);

  const [celebrateCardId, setCelebrateCardId] = useState(null);
  const [celebrated, setCelebrated] = useState(false);
  const [celebratedMsg, setCelebratedMsg] = useState('');

  const [blockNote, setBlockNote] = useState(null);

  const [kickoffGoalId, setKickoffGoalId] = useState(null);
  const [kickoffSuggestions, setKickoffSuggestions] = useState([]);
  const [kickoffLoading, setKickoffLoading] = useState(false);
  const [kickoffError, setKickoffError] = useState('');
  const [kickoffInput, setKickoffInput] = useState('');

  const chatRef = useRef(null);

  const persist = useCallback((nextGoals, nextCards, nextDoneCount) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ goals: nextGoals, cards: nextCards, doneCount: nextDoneCount })
      );
    } catch (e) {
      /* ignore persistence failures */
    }
  }, []);

  const mutGoals = useCallback(
    (updater) => {
      setGoals((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        persist(next, cards, doneCount);
        return next;
      });
    },
    [cards, doneCount, persist]
  );

  const mutCards = useCallback(
    (updater) => {
      setCards((prev) => {
        const next = typeof updater === 'function' ? updater(prev) : updater;
        persist(goals, next, doneCount);
        return next;
      });
    },
    [goals, doneCount, persist]
  );

  const mutBoth = useCallback(
    (nextGoals, nextCards) => {
      setGoals(nextGoals);
      setCards(nextCards);
      persist(nextGoals, nextCards, doneCount);
    },
    [doneCount, persist]
  );

  // ── navigation ──
  const startBuilder = useCallback(() => {
    setScreen('builder');
    setChat([{ role: 'assistant', text: GREETING }]);
    setChatInput('');
    setThinking(false);
  }, []);

  const goBack = useCallback(() => {
    setScreen(goals.length ? 'goals' : 'welcome');
    setDraft(null);
    setDraftGoalId(null);
  }, [goals.length]);

  const goGoals = useCallback(() => {
    setScreen('goals');
    setSelectedCardId(null);
  }, []);

  const goBoard = useCallback(() => setScreen('board'), []);

  const resetAll = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
    setGoals([]);
    setCards([]);
    setDoneCount(0);
    setScreen('welcome');
    setChat([]);
    setDraft(null);
    setDraftGoalId(null);
    setSelectedCardId(null);
    setCelebrateCardId(null);
    setCelebrated(false);
  }, []);

  // ── demo seed ──
  const seedDemo = useCallback(() => {
    const gid = uid();
    const nextGoals = [
      {
        id: gid,
        objective: 'Ich fühle mich energiegeladen, weil Bewegung ein fester Teil meiner Woche ist.',
        krs: [
          { text: 'Sporteinheiten pro Woche', start: 1, current: 2, target: 3, unit: 'x / Woche' },
          { text: 'Schritte pro Tag im Schnitt', start: 5200, current: 6100, target: 8000, unit: 'Schritte' },
        ],
      },
    ];
    const nextCards = [
      { id: uid(), goalId: gid, title: 'Bouldern ausprobieren', stage: 'options', tries: 0 },
      { id: uid(), goalId: gid, title: 'Mit dem Rad zur Arbeit', stage: 'options', tries: 0 },
      { id: uid(), goalId: gid, title: 'Morgens 10 Minuten dehnen', stage: 'exploring', tries: 2 },
      { id: uid(), goalId: gid, title: 'Mittwochs zum Lauftreff', stage: 'mastering', tries: 3 },
      { id: uid(), goalId: gid, title: 'Treppe statt Lift', stage: 'celebrating', tries: 3 },
    ];
    mutBoth(nextGoals, nextCards);
    setScreen('board');
    setNewCardGoalId(gid);
  }, [mutBoth]);

  // ── AI: chat / prompt OKR builder ──
  const genOptions = useCallback(async (goal) => {
    setKickoffLoading(true);
    setKickoffError('');
    try {
      const content =
        'Objective: ' +
        goal.objective +
        '\nKey Results:\n' +
        goal.krs
          .map((k) => '- ' + k.text + ' (Start ' + k.start + ', Ziel ' + k.target + (k.unit ? ' ' + k.unit : '') + ')')
          .join('\n');
      const res = await complete({ system: SYSTEM_OPTIONS, messages: [{ role: 'user', content }], max_tokens: 600 });
      const arr = parseList(res);
      if (arr && arr.length) {
        setKickoffSuggestions(arr.slice(0, 6).map((t, i) => ({ text: t, selected: i < 3 })));
        setKickoffLoading(false);
      } else {
        setKickoffLoading(false);
        setKickoffError('Das hat nicht geklappt — füg eigene Optionen hinzu oder versuch es nochmal.');
      }
    } catch (e) {
      setKickoffLoading(false);
      setKickoffError('Die KI ist gerade nicht erreichbar — füg eigene Optionen hinzu.');
    }
  }, []);

  const saveDraftGoal = useCallback(() => {
    const d = draft;
    if (!d || !d.objective.trim()) return;
    const krs = d.krs
      .filter((k) => k.text.trim())
      .map((k) => ({
        text: k.text,
        start: Number(k.start) || 0,
        current: draftGoalId ? Number(k.current) || Number(k.start) || 0 : Number(k.start) || 0,
        target: Number(k.target) || 1,
        unit: k.unit,
      }));
    if (!krs.length) return;

    if (draftGoalId) {
      const nextGoals = goals.map((g) => (g.id === draftGoalId ? { id: g.id, objective: d.objective, krs } : g));
      mutGoals(nextGoals);
      setDraft(null);
      setDraftGoalId(null);
      setScreen('goals');
      setChat([]);
    } else {
      if (goals.length >= 3) return;
      const newGoal = { id: uid(), objective: d.objective, krs };
      const nextGoals = goals.concat([newGoal]);
      mutGoals(nextGoals);
      setDraft(null);
      setDraftGoalId(null);
      setChat([]);
      setScreen('kickoff');
      setKickoffGoalId(newGoal.id);
      setKickoffSuggestions([]);
      setKickoffInput('');
      setNewCardGoalId(newGoal.id);
      genOptions(newGoal);
    }
  }, [draft, draftGoalId, goals, mutGoals, genOptions]);

  const doSendChat = useCallback(async () => {
    const text = chatInput.trim();
    if (!text || thinking) return;
    const nextChat = chat.concat([{ role: 'user', text }]);
    setChat(nextChat);
    setChatInput('');
    setThinking(true);
    try {
      const messages = nextChat
        .filter((m, i) => !(i === 0 && m.role === 'assistant'))
        .map((m) => ({ role: m.role, content: m.text }));
      const res = await complete({ system: SYSTEM_CHAT, messages, max_tokens: 1200 });
      const parsedDraft = parseOKR(res);
      if (parsedDraft) {
        setThinking(false);
        setDraft(parsedDraft);
        setDraftGoalId(null);
        setScreen('draft');
      } else {
        setThinking(false);
        setChat(nextChat.concat([{ role: 'assistant', text: res.trim() }]));
      }
    } catch (e) {
      setThinking(false);
      setChat(nextChat.concat([{ role: 'assistant', text: 'Hmm, die KI ist gerade nicht erreichbar. Versuch es gleich nochmal.' }]));
    }
  }, [chat, chatInput, thinking]);

  const addKickoffOption = useCallback(() => {
    const t = kickoffInput.trim();
    if (!t) return;
    setKickoffSuggestions((prev) => prev.concat([{ text: t, selected: true }]));
    setKickoffInput('');
  }, [kickoffInput]);

  const toggleKickoffSuggestion = useCallback((idx) => {
    setKickoffSuggestions((prev) => prev.map((x, j) => (j === idx ? { ...x, selected: !x.selected } : x)));
  }, []);

  const regenOptions = useCallback(() => {
    const goal = goals.find((g) => g.id === kickoffGoalId);
    if (goal) genOptions(goal);
  }, [goals, kickoffGoalId, genOptions]);

  const kickoffToBoard = useCallback(() => {
    const sel = kickoffSuggestions.filter((s) => s.selected);
    const nextCards = cards.concat(
      sel.map((s) => ({ id: uid(), goalId: kickoffGoalId, title: s.text, stage: 'options', tries: 0 }))
    );
    mutCards(nextCards);
    setScreen('board');
    setKickoffGoalId(null);
    setKickoffSuggestions([]);
    setKickoffInput('');
    setKickoffError('');
  }, [cards, kickoffGoalId, kickoffSuggestions, mutCards]);

  const kickoffSkip = useCallback(() => {
    setScreen('board');
    setKickoffGoalId(null);
    setKickoffSuggestions([]);
    setKickoffInput('');
    setKickoffError('');
  }, []);

  // ── draft editing ──
  const patchKr = useCallback((i, patch) => {
    setDraft((d) => (d ? { ...d, krs: d.krs.map((k, j) => (j === i ? { ...k, ...patch } : k)) } : d));
  }, []);

  const addKr = useCallback(() => {
    setDraft((d) => (d ? { ...d, krs: d.krs.concat([{ text: '', start: 0, current: 0, target: 1, unit: '' }]) } : d));
  }, []);

  const removeKr = useCallback((i) => {
    setDraft((d) => (d ? { ...d, krs: d.krs.filter((_, j) => j !== i) } : d));
  }, []);

  const startEditGoal = useCallback((g) => {
    setDraft({ objective: g.objective, krs: g.krs.map((k) => ({ ...k })) });
    setDraftGoalId(g.id);
    setScreen('draft');
  }, []);

  const deleteGoal = useCallback(() => {
    const gid = draftGoalId;
    mutBoth(
      goals.filter((g) => g.id !== gid),
      cards.filter((c) => c.goalId !== gid)
    );
    setDraft(null);
    setDraftGoalId(null);
    setScreen('goals');
  }, [draftGoalId, goals, cards, mutBoth]);

  // ── board ──
  const moveCard = useCallback(
    (id, dir) => {
      const card = cards.find((c) => c.id === id);
      if (!card) return;
      const idx = STAGES.findIndex((s) => s.key === card.stage);
      const ni = idx + dir;
      if (ni < 0 || ni > 3) return;
      const target = STAGES[ni];
      if (dir > 0 && target.limit != null) {
        const n = cards.filter((c) => c.stage === target.key).length;
        if (n >= target.limit) {
          setBlockNote({ id, text: target.label + ' ist voll (' + n + '/' + target.limit + ') — schliess dort zuerst etwas ab.' });
          return;
        }
      }
      const nextCards = cards.map((c) => (c.id === id ? { ...c, stage: target.key } : c));
      mutCards(nextCards);
      setBlockNote(null);
    },
    [cards, mutCards]
  );

  const doAddCard = useCallback(() => {
    const title = newCardTitle.trim();
    if (!title || !goals.length) return;
    const gid = newCardGoalId || goals[0].id;
    mutCards(cards.concat([{ id: uid(), goalId: gid, title, stage: 'options', tries: 0 }]));
    setNewCardTitle('');
  }, [newCardTitle, goals, newCardGoalId, cards, mutCards]);

  const tryCard = useCallback(
    (id) => {
      mutCards(cards.map((c) => (c.id === id ? { ...c, tries: Math.min(3, (c.tries || 0) + 1) } : c)));
    },
    [cards, mutCards]
  );

  const deleteCard = useCallback(
    (id) => {
      mutCards(cards.filter((c) => c.id !== id));
      setSelectedCardId(null);
    },
    [cards, mutCards]
  );

  const startReview = useCallback((id) => {
    setCelebrateCardId(id);
    setScreen('celebrate');
    setSelectedCardId(null);
  }, []);

  // ── celebrate ──
  const stepKr = useCallback(
    (goalId, ki, delta) => {
      const nextGoals = goals.map((g) => {
        if (g.id !== goalId) return g;
        const krs = g.krs.map((k, i) => {
          if (i !== ki) return k;
          const step = krStepFor(k);
          return { ...k, current: Math.max(0, (Number(k.current) || 0) + delta * step) };
        });
        return { ...g, krs };
      });
      mutGoals(nextGoals);
    },
    [goals, mutGoals]
  );

  const backToBoard = useCallback(() => {
    setScreen('board');
    setCelebrateCardId(null);
  }, []);

  const finishCelebrate = useCallback(() => {
    const n = doneCount + 1;
    const nextCards = cards.filter((c) => c.id !== celebrateCardId);
    setCards(nextCards);
    setDoneCount(n);
    persist(goals, nextCards, n);
    setCelebrateCardId(null);
    setCelebrated(true);
    setCelebratedMsg('Erfolg Nr. ' + n + '. Schau auf deine Zahlen — und weiter gehts.');
    setScreen('board');
  }, [doneCount, cards, celebrateCardId, goals, persist]);

  const dismissCelebrated = useCallback(() => setCelebrated(false), []);

  return {
    // raw state
    screen,
    goals,
    cards,
    doneCount,
    chat,
    chatInput,
    thinking,
    draft,
    draftGoalId,
    selectedCardId,
    newCardTitle,
    newCardGoalId,
    celebrateCardId,
    celebrated,
    celebratedMsg,
    blockNote,
    kickoffGoalId,
    kickoffSuggestions,
    kickoffLoading,
    kickoffError,
    kickoffInput,
    chatRef,
    // setters (simple UI state)
    setChatInput,
    setSelectedCardId,
    setNewCardTitle,
    setNewCardGoalId,
    setKickoffInput,
    setBlockNote,
    // actions
    startBuilder,
    goBack,
    goGoals,
    goBoard,
    resetAll,
    seedDemo,
    doSendChat,
    addKickoffOption,
    toggleKickoffSuggestion,
    regenOptions,
    kickoffToBoard,
    kickoffSkip,
    patchKr,
    addKr,
    removeKr,
    startEditGoal,
    deleteGoal,
    saveDraftGoal,
    setDraftObjective: (text) => setDraft((d) => (d ? { ...d, objective: text } : d)),
    moveCard,
    doAddCard,
    tryCard,
    deleteCard,
    startReview,
    stepKr,
    backToBoard,
    finishCelebrate,
    dismissCelebrated,
  };
}
