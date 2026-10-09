import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'chip';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  /**
   * For a toggle-like button (one of the RSVP choices): sets both the
   * selected visual treatment and `aria-pressed`, so the selection is
   * conveyed to assistive tech the same way it is conveyed visually.
   */
  pressed?: boolean;
}

/**
 * A real `<button>` for every pill in the design system this page uses
 * (`.pbtn` / `.sbtn` / `.chip`) — never a styled `<div>` or `<span>`, so
 * every choice is reachable and operable by keyboard without extra markup.
 */
export function Button({ variant, pressed, className, type = 'button', ...rest }: ButtonProps) {
  const variantClass = styles[variant];
  const classes = [styles.button, variantClass, pressed ? styles.pressed : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={classes}
      aria-pressed={pressed === undefined ? undefined : pressed}
      {...rest}
    />
  );
}
