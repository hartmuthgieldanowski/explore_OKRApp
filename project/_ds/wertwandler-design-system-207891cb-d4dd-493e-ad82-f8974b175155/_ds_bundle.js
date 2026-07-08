/* @ds-bundle: {"format":4,"namespace":"WertwandlerDesignSystem_207891","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"8c6108e4dd11","components/core/Button.jsx":"8ea2fb1c4399","components/core/Card.jsx":"8226de917193","components/core/Input.jsx":"74a1c0db4660"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WertwandlerDesignSystem_207891 = window.WertwandlerDesignSystem_207891 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
const React = window.React || require('react');

/**
 * Badge component — small label for status, categories, or counts.
 */
function Badge({
  children,
  variant = 'default',
  size = 'md',
  style,
  ...rest
}) {
  const variants = {
    default: {
      background: 'var(--color-gray-100)',
      color: 'var(--fg-1)'
    },
    orange: {
      background: 'var(--color-orange-subtle)',
      color: 'var(--color-orange-dark)'
    },
    dark: {
      background: 'var(--color-black)',
      color: 'var(--color-white)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--fg-2)',
      border: '1px solid var(--border-default)'
    },
    success: {
      background: '#E8F5E9',
      color: 'var(--color-success)'
    },
    error: {
      background: '#FFEBEE',
      color: 'var(--color-error)'
    }
  };
  const sizes = {
    sm: {
      padding: '2px 8px',
      fontSize: '11px'
    },
    md: {
      padding: '3px 10px',
      fontSize: 'var(--text-xs)'
    },
    lg: {
      padding: '4px 12px',
      fontSize: 'var(--text-sm)'
    }
  };
  const v = variants[variant] || variants.default;
  const s = sizes[size] || sizes.md;
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      lineHeight: 1.4,
      border: 'none',
      ...v,
      ...s,
      ...style
    },
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const React = window.React || require('react');

/**
 * Button component for the Wertwandler design system.
 * Supports primary (orange), secondary (outline), and ghost variants.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  href,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '6px 14px',
      fontSize: 'var(--text-sm)',
      gap: '6px'
    },
    md: {
      padding: '10px 20px',
      fontSize: 'var(--text-base)',
      gap: '8px'
    },
    lg: {
      padding: '14px 28px',
      fontSize: 'var(--text-lg)',
      gap: '10px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--color-orange)',
      color: 'var(--color-white)',
      border: 'none'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--fg-1)',
      border: '1.5px solid var(--border-default)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--fg-1)',
      border: '1.5px solid transparent'
    },
    'primary-dark': {
      background: 'var(--color-orange)',
      color: 'var(--color-white)',
      border: 'none'
    },
    'secondary-dark': {
      background: 'transparent',
      color: 'var(--color-white)',
      border: '1.5px solid var(--color-gray-600)'
    },
    'ghost-dark': {
      background: 'transparent',
      color: 'var(--color-white)',
      border: '1.5px solid transparent'
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    lineHeight: 1.2,
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background var(--duration-fast) var(--ease-default), opacity var(--duration-fast) var(--ease-default), border-color var(--duration-fast) var(--ease-default)',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    ...v,
    ...style
  };
  const handleMouseEnter = e => {
    if (disabled) return;
    if (variant === 'primary' || variant === 'primary-dark') {
      e.currentTarget.style.background = 'var(--color-orange-dark)';
    } else {
      e.currentTarget.style.opacity = '0.7';
    }
  };
  const handleMouseLeave = e => {
    if (disabled) return;
    e.currentTarget.style.background = v.background;
    e.currentTarget.style.opacity = '1';
  };
  const Tag = href ? 'a' : 'button';
  const extraProps = href ? {
    href
  } : {
    type: 'button',
    disabled
  };
  return React.createElement(Tag, {
    style: baseStyle,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...extraProps,
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
const React = window.React || require('react');

/**
 * Card component — content container with optional dark mode.
 */
function Card({
  children,
  variant = 'light',
  padding = 'md',
  shadow = true,
  style,
  onClick,
  ...rest
}) {
  const variants = {
    light: {
      background: 'var(--surface-card)',
      color: 'var(--fg-1)',
      border: shadow ? 'none' : '1px solid var(--border-light)'
    },
    dark: {
      background: 'var(--surface-card-dark)',
      color: 'var(--fg-on-dark)',
      border: '1px solid var(--color-gray-800)'
    },
    subtle: {
      background: 'var(--bg-subtle)',
      color: 'var(--fg-1)',
      border: 'none'
    },
    outline: {
      background: 'transparent',
      color: 'var(--fg-1)',
      border: '1px solid var(--border-light)'
    }
  };
  const paddings = {
    none: '0',
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  };
  const v = variants[variant] || variants.light;
  return React.createElement('div', {
    style: {
      borderRadius: 'var(--radius-md)',
      padding: paddings[padding] || paddings.md,
      boxShadow: shadow && variant === 'light' ? 'var(--shadow-md)' : 'none',
      fontFamily: 'var(--font-sans)',
      transition: 'box-shadow var(--duration-fast) var(--ease-default)',
      cursor: onClick ? 'pointer' : 'default',
      ...v,
      ...style
    },
    onClick,
    ...rest
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
const React = window.React || require('react');

/**
 * Input — text input field for forms.
 */
function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  error,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    fontFamily: 'var(--font-sans)',
    ...style
  };
  const labelStyle = {
    fontSize: 'var(--text-sm)',
    fontWeight: 600,
    color: 'var(--fg-1)'
  };
  const inputStyle = {
    padding: '10px 12px',
    fontSize: 'var(--text-base)',
    fontFamily: 'var(--font-sans)',
    color: 'var(--fg-1)',
    background: 'var(--color-white)',
    border: error ? '1.5px solid var(--color-error)' : focused ? '1.5px solid var(--color-orange)' : '1.5px solid var(--border-default)',
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    transition: 'border-color var(--duration-fast) var(--ease-default)',
    opacity: disabled ? 0.4 : 1,
    width: '100%',
    boxSizing: 'border-box'
  };
  const errorStyle = {
    fontSize: 'var(--text-xs)',
    color: 'var(--color-error)'
  };
  return React.createElement('div', {
    style: containerStyle
  }, label && React.createElement('label', {
    style: labelStyle
  }, label), React.createElement('input', {
    type,
    placeholder,
    value,
    onChange,
    disabled,
    style: inputStyle,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    ...rest
  }), error && React.createElement('span', {
    style: errorStyle
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

})();
