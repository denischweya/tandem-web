function readApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8000/api/v1';
  return raw.replace(/\/+$/, '');
}

export const apiBaseUrl: string = readApiBaseUrl();
