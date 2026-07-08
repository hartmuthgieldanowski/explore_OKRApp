import { FONT_SANS } from '../theme';

const SIZES = {
  sm: { padding: '6px 14px', fontSize: 14, gap: 6 },
  md: { padding: '10px 20px', fontSize: 16, gap: 8 },
  lg: { padding: '14px 28px', fontSize: 18, gap: 10 },
};

const VARIANTS = {
  primary: { background: '#FC971C', color: '#FFFFFF', border: 'none' },
  secondary: { background: 'transparent', color: '#1A1A1A', border: '1.5px solid #BBBBBB' },
  ghost: { background: 'transparent', color: '#1A1A1A', border: '1.5px solid transparent' },
  'secondary-dark': { background: 'transparent', color: '#FFFFFF', border: '1.5px solid #595959' },
  'ghost-dark': { background: 'transparent', color: '#FFFFFF', border: '1.5px solid transparent' },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  fullWidth = false,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: FONT_SANS,
    fontWeight: 600,
    lineHeight: 1.2,
    borderRadius: 4,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    width: fullWidth ? '100%' : undefined,
    transition: 'background 150ms cubic-bezier(0.4,0,0.2,1), opacity 150ms cubic-bezier(0.4,0,0.2,1), border-color 150ms cubic-bezier(0.4,0,0.2,1)',
    ...v,
    ...style,
  };

  const handleMouseEnter = (e) => {
    if (disabled) return;
    if (variant === 'primary' || variant === 'primary-dark') {
      e.currentTarget.style.background = '#E07A00';
    } else {
      e.currentTarget.style.opacity = '0.7';
    }
  };
  const handleMouseLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.background = v.background;
    e.currentTarget.style.opacity = '1';
  };

  return (
    <button
      type="button"
      style={baseStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
