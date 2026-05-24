/** Routes that use the editorial newsroom shell (paper theme + top bar label). */
export function isWriterShellPath(pathname: string) {
  return (
    pathname.startsWith("/desk/newsroom") ||
    pathname === "/desk/mailbox" ||
    pathname === "/desk/meetings" ||
    pathname === "/desk/wallet" ||
    pathname === "/desk/settings"
  );
}
