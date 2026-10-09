'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './SignupPrompt.module.css';

const PROVIDERS = ['Apple', 'Google', 'Email'] as const;

const HEADING_ID = 'signup-heading';

/**
 * "Keep your plans in one place" — the optional account step, shown after
 * the RSVP choices rather than gating them. No account system exists yet,
 * so each provider is a real, focusable button that is honest about not
 * being wired up, instead of a fake OAuth flow or a dead-looking chip.
 */
export function SignupPrompt() {
  const [clicked, setClicked] = useState<(typeof PROVIDERS)[number] | null>(null);

  return (
    <section className={styles.card} aria-labelledby={HEADING_ID}>
      <h2 id={HEADING_ID} className={styles.title}>
        Keep your plans in one place
      </h2>
      <p className={styles.sub}>Optional. Your reply counts either way.</p>
      <div className={styles.chips} role="group" aria-label="Continue with">
        {PROVIDERS.map((provider) => (
          <Button
            key={provider}
            variant="chip"
            style={{ background: 'var(--color-bg)' }}
            onClick={() => setClicked(provider)}
            data-testid={`signup-${provider.toLowerCase()}`}
          >
            {provider}
          </Button>
        ))}
      </div>
      <p role="status" aria-live="polite" className={styles.note} data-testid="signup-note">
        {clicked
          ? `Sign-up with ${clicked} isn't available yet — your response above is already saved.`
          : ''}
      </p>
    </section>
  );
}
