import { toZonedParts } from '@tandem/shared';
import { apiBaseUrl } from '@/lib/env';

export default function Home() {
  const parts = toZonedParts(new Date(), 'Africa/Nairobi');
  const hhmm = `${String(parts.hour).padStart(2, '0')}:${String(parts.minute).padStart(2, '0')}`;

  return (
    <main style={{ padding: '3rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Tandem</h1>
      <p data-testid="api-base-url">API: {apiBaseUrl}</p>
      <p data-testid="nairobi-time">{hhmm}</p>
    </main>
  );
}
