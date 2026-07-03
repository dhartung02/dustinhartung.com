type PulseLogoProps = {
  className?: string;
};

export default function PulseLogo({ className = "h-6 w-6" }: PulseLogoProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 16h4l2.5-7 4 14 2.5-7H26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
