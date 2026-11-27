type P = { size?: number; stroke?: string; className?: string };
const base = (size: number, stroke: string) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export const PhoneIcon = ({ size = 18, stroke = "currentColor" }: P) => (
  <svg {...base(size, stroke)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
export const HomeIcon = ({ size = 24, stroke = "#0F6F9E" }: P) => (
  <svg {...base(size, stroke)}><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" /></svg>
);
export const BathIcon = ({ size = 24, stroke = "#0F6F9E" }: P) => (
  <svg {...base(size, stroke)}><path d="M4 12h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3zM6 12V5a2 2 0 0 1 4 0" /></svg>
);
export const ChatIcon = ({ size = 24, stroke = "#0F6F9E" }: P) => (
  <svg {...base(size, stroke)}><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
);
export const PinIcon = ({ size = 24, stroke = "#0F6F9E" }: P) => (
  <svg {...base(size, stroke)}><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
);
export const ClockIcon = ({ size = 24, stroke = "#0F6F9E" }: P) => (
  <svg {...base(size, stroke)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
export const CashIcon = ({ size = 20, stroke = "#0F6F9E" }: P) => (
  <svg {...base(size, stroke)}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /></svg>
);
export const CloseIcon = ({ size = 22, stroke = "currentColor" }: P) => (
  <svg {...base(size, stroke)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const ArrowIcon = ({ size = 18, stroke = "currentColor" }: P) => (
  <svg {...base(size, stroke)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export const spaceIcons = { home: HomeIcon, bath: BathIcon, chat: ChatIcon };
