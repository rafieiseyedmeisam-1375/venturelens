/**
 * Session cookie contract shared by the proxy (edge-safe, no server-only
 * imports) and the auth library. Keep this file free of Node/Prisma imports.
 */

export const SESSION_COOKIE =
  process.env.NODE_ENV === 'production' ? '__Host-venturelens-session' : 'session';

export function sessionCookieOptions(expiresAt: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    expires: expiresAt,
  };
}
