export const DESK_ROLE_COOKIE = "desk-role";

export type DeskRoleCookie = "writer" | "principal";

export function setDeskRoleCookie(role: DeskRoleCookie) {
  document.cookie = `${DESK_ROLE_COOKIE}=${role}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearDeskRoleCookie() {
  document.cookie = `${DESK_ROLE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function readDeskRoleCookie(): DeskRoleCookie | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${DESK_ROLE_COOKIE}=([^;]*)`));
  const value = match?.[1];
  if (value === "writer" || value === "principal") return value;
  return null;
}
