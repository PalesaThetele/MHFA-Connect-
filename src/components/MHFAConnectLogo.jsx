export default function MHFAConnectLogo({ light = false }) {
  return (
    <a
      href="#top"
      aria-label="MHFA Connect - back to top"
      className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2"
    >
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-label="MHFA Connect heart and heartbeat logo"
        className="h-10 w-10 shrink-0 sm:h-12 sm:w-12"
      >
        <rect width="64" height="64" rx="19" fill="#E4F4EF" />

        <path
          d="M32 49S10 36 10 22C10 11 24 7 32 19C40 7 54 11 54 22C54 36 32 49 32 49Z"
          fill="#187B70"
        />

        <path
          d="M16 30H25L30 22L36 39L41 30H48"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span
        className={`text-lg font-extrabold tracking-tight sm:text-xl ${
          light ? 'text-white' : 'text-mhfa-primary'
        }`}
      >
        MHFA Connect
      </span>
    </a>
  );
}