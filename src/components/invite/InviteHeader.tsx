import { Avatar } from '@/components/ui/Avatar';
import styles from './InviteHeader.module.css';

export interface InviteHeaderProps {
  inviterName: string;
}

/** "Denis invited you to a plan", with Denis's initial avatar. */
export function InviteHeader({ inviterName }: InviteHeaderProps) {
  return (
    <div className={styles.header}>
      <Avatar initial={inviterName} tone="inverse" size={40} />
      <p className={styles.text}>
        <strong>{inviterName}</strong> invited you to a plan
      </p>
    </div>
  );
}
