export const COLORS = {
  orange: '#FC971C',
  orangeDark: '#E07A00',
  orangeLight: '#FDB950',
  orangeSubtle: '#FFF3E0',
  black: '#1A1A1A',
  gray900: '#2A2A2A',
  gray800: '#3A3A3A',
  gray700: '#4A4A4A',
  gray600: '#595959',
  gray500: '#777777',
  gray400: '#999999',
  gray300: '#BBBBBB',
  gray200: '#D9D9D9',
  gray100: '#EEEEEE',
  gray50: '#F7F7F7',
  white: '#FFFFFF',
  error: '#C62828',
};

export const FONT_SERIF = "'Source Serif 4','Cambria',serif";
export const FONT_SANS = "'Source Sans 3','Calibri',sans-serif";
export const FONT_MONO = "'Fira Code','SF Mono',monospace";

// Real browsers don't need phone-mockup status-bar clearance — but we still
// want breathing room above content and iOS notch/Dynamic Island safety.
export const SAFE_TOP = 'env(safe-area-inset-top, 0px)';
export const HEADER_PAD_TOP = `calc(${SAFE_TOP} + 22px)`;
export const HERO_PAD_TOP = `calc(${SAFE_TOP} + 40px)`;

export const STAGES = [
  { key: 'options', label: 'Options', sub: 'Dinge, die ich in Betracht ziehe', limit: null, empty: 'Sammle hier Ideen. Klein anfangen. Konkret.', fwd: 'Ausprobieren →' },
  { key: 'exploring', label: 'Exploring', sub: 'Meine ersten drei Versuche', limit: 3, empty: 'Noch nichts im Test — zieh eine Option weiter.', fwd: 'Meistern →' },
  { key: 'mastering', label: 'Mastering', sub: 'Dranbleiben & Gewohnheit aufbauen', limit: 2, empty: 'Hier wird aus Versuchen Routine.', fwd: 'Feiern →' },
  { key: 'celebrating', label: 'Celebrating', sub: 'Wirkung anschauen & würdigen', limit: null, empty: 'Noch nichts zu feiern — kommt.', fwd: null },
];
