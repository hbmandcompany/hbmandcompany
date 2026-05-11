import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function BaseIcon({ title, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </BaseIcon>
  );
}

export function IconStar(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 2.8 2.9 6 6.6.9-4.8 4.5 1.2 6.5L12 17.9 6.1 20.7l1.2-6.5-4.8-4.5 6.6-.9z" />
    </BaseIcon>
  );
}

export function IconLayoutGrid(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 4h7v7H4z" />
      <path d="M13 4h7v7h-7z" />
      <path d="M4 13h7v7H4z" />
      <path d="M13 13h7v7h-7z" />
    </BaseIcon>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 9h18" />
    </BaseIcon>
  );
}

export function IconVideo(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
      <path d="m16 10 5-2v8l-5-2z" />
    </BaseIcon>
  );
}

export function IconScrollText(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 4h10a2 2 0 0 1 2 2v11a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6a2 2 0 0 1 2-2z" />
      <path d="M9 8h8M9 12h8M9 16h6" />
    </BaseIcon>
  );
}

export function IconVote(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 20h16" />
      <path d="M7 17V9" />
      <path d="M12 17V7" />
      <path d="M17 17v-6" />
      <path d="M6 9h2M11 7h2M16 11h2" />
    </BaseIcon>
  );
}

export function IconWallet(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 7h18v12H3z" />
      <path d="M3 9h14a2 2 0 0 0 2-2V5H7a4 4 0 0 0-4 4z" />
      <path d="M16 13h3" />
    </BaseIcon>
  );
}

export function IconLandmark(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 20h18" />
      <path d="M4 20V9" />
      <path d="M8 20V9" />
      <path d="M12 20V9" />
      <path d="M16 20V9" />
      <path d="M20 20V9" />
      <path d="m3 9 9-6 9 6" />
    </BaseIcon>
  );
}

export function IconFileText(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" />
    </BaseIcon>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </BaseIcon>
  );
}

export function IconSend(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M22 2 11 13" />
      <path d="m22 2-7 20-4-9-9-4z" />
    </BaseIcon>
  );
}

export function IconFiles(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 7h10v14H7z" />
      <path d="M9 3h10v14" />
    </BaseIcon>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M17 21a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4" />
      <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path d="M22 21a3.2 3.2 0 0 0-2.3-3.1" />
      <path d="M18.8 7.4a3.2 3.2 0 0 1 0 6.2" />
    </BaseIcon>
  );
}

export function IconBell(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </BaseIcon>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </BaseIcon>
  );
}

export function IconGear(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
      <path d="M19.4 15a8 8 0 0 0 .1-2l2-1.2-2-3.4-2.3.6a7.7 7.7 0 0 0-1.7-1L15 5h-6l-.5 2.9a7.7 7.7 0 0 0-1.7 1l-2.3-.6-2 3.4 2 1.2a8 8 0 0 0 .1 2l-2 1.2 2 3.4 2.3-.6c.5.4 1.1.7 1.7 1L9 22h6l.5-2.9c.6-.3 1.2-.6 1.7-1l2.3.6 2-3.4z" />
    </BaseIcon>
  );
}

export function IconCollapse(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 6H5v4" />
      <path d="M5 6l6 6" />
      <path d="M15 18h4v-4" />
      <path d="m19 18-6-6" />
    </BaseIcon>
  );
}

