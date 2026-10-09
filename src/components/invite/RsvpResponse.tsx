'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import styles from './RsvpResponse.module.css';

export type RsvpChoice = 'in' | 'maybe' | 'out';

export interface RsvpResponseProps {
  hostName: string;
}

const HEADING_ID = 'rsvp-heading';

/**
 * The "Are you in?" choices. A real response for a guest who has never
 * signed in or installed anything: picking one records the RSVP on the
 * spot, client-side — signing up (see `SignupPrompt`) is a separate,
 * optional step that comes after, never a prerequisite for replying.
 *
 * There is no invite API yet, so the choice only updates local state and a
 * screen-reader-announced confirmation; nothing here pretends to call a
 * backend that does not exist.
 */
export function RsvpResponse({ hostName }: RsvpResponseProps) {
  const [choice, setChoice] = useState<RsvpChoice | null>(null);
  const [timeNoteOpen, setTimeNoteOpen] = useState(false);

  const confirmations: Record<RsvpChoice, string> = {
    in: `You're in — ${hostName} will see your reply.`,
    maybe: `Got it — we'll let ${hostName} know you might make it.`,
    out: `Thanks — we'll let ${hostName} know you can't make it.`,
  };

  return (
    <section className={styles.section} aria-labelledby={HEADING_ID}>
      <h2 id={HEADING_ID} className={styles.heading}>
        Are you in?
      </h2>

      <div className={styles.choices} role="group" aria-labelledby={HEADING_ID}>
        <Button
          variant="primary"
          pressed={choice === 'in'}
          onClick={() => setChoice('in')}
          data-testid="rsvp-in"
        >
          {"I'm in"}
        </Button>
        <div className={styles.row}>
          <Button
            variant="secondary"
            pressed={choice === 'maybe'}
            onClick={() => setChoice('maybe')}
            data-testid="rsvp-maybe"
          >
            Maybe
          </Button>
          <Button
            variant="secondary"
            pressed={choice === 'out'}
            onClick={() => setChoice('out')}
            data-testid="rsvp-out"
          >
            {"Can't make it"}
          </Button>
        </div>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={styles.confirmation}
        data-testid="rsvp-confirmation"
      >
        {choice ? confirmations[choice] : ''}
      </p>

      <p className={styles.timeNote}>
        Different time works better?{' '}
        <button type="button" className={styles.timeLink} onClick={() => setTimeNoteOpen(true)}>
          Share when you&apos;re free
        </button>
      </p>
      {timeNoteOpen && (
        <p role="status" className={styles.timeNoteDetail}>
          Not available yet — for now, pick the closest answer above and message {hostName} directly
          about timing.
        </p>
      )}
    </section>
  );
}
