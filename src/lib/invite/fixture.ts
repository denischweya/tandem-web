/**
 * Mocked invite data.
 *
 * There is no invite API yet (Blueprint §131 only specifies that invite
 * links must be random, unguessable, expirable and revocable; the token
 * service itself is out of scope here). This module stands in for that
 * future endpoint: `getInviteByToken` is `async` and returns `null` for an
 * unrecognised token on purpose, so the page already handles "this link
 * doesn't resolve to anything" (expired, revoked, mistyped) rather than
 * assuming every token that reaches the route is good forever. Swapping the
 * body of `getInviteByToken` for a real `fetch` later should not require any
 * change to the page or components that consume it.
 */

export interface InvitePerson {
  id: string;
  name: string;
}

export interface InvitePlan {
  id: string;
  title: string;
  /** ISO-8601 instant (UTC) the plan starts. */
  startInstant: string;
  /** IANA zone the plan's wall-clock time is expressed in. */
  timeZone: string;
  locationName: string;
  /** Everyone already attending other than the guest viewing this invite. */
  attendees: InvitePerson[];
}

export interface InviteDetails {
  token: string;
  inviter: InvitePerson;
  plan: InvitePlan;
}

const MOCK_INVITE: InviteDetails = {
  token: '7Jm9kP3',
  inviter: { id: 'u_denis', name: 'Denis' },
  plan: {
    id: 'plan_dinner_1',
    title: 'Dinner',
    // 19:00 in Africa/Nairobi (UTC+3, no DST) on Saturday 10 October 2026.
    startInstant: '2026-10-10T16:00:00.000Z',
    timeZone: 'Africa/Nairobi',
    locationName: 'Westlands, Nairobi',
    attendees: [
      { id: 'u_sarah', name: 'Sarah' },
      { id: 'u_james', name: 'James' },
      { id: 'u_denis', name: 'Denis' },
    ],
  },
};

/**
 * Resolves an invite token to its details. `async` on purpose — this is the
 * seam a real `/invites/{token}` call will fill later, and callers already
 * have to handle the `null` (no such invite, or no longer valid) case.
 */
export async function getInviteByToken(token: string): Promise<InviteDetails | null> {
  if (token !== MOCK_INVITE.token) return null;
  return MOCK_INVITE;
}
