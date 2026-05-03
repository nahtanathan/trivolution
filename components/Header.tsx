type HeaderProps = {
  kickUrl: string;
};

const NAV_ITEMS = [
  { label: "Leaderboard", href: "#leaderboard" },
  { label: "Milestones", href: "#milestones" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

const SOCIALS_URL = "https://trivolutionslots.com";

function IconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[rgba(17,20,17,0.76)] text-[var(--color-text-muted)] transition hover:border-[rgba(167,232,63,0.4)] hover:text-white"
    >
      {children}
    </a>
  );
}

export function Header({ kickUrl }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(160,255,60,0.12)] bg-[rgba(5,7,5,0.74)] backdrop-blur-xl">
      <div className="shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <a href="#" className="w-fit">
          <span className="font-display text-2xl uppercase tracking-[0.28em] text-white sm:text-3xl">
            Trivolution Slots
          </span>
        </a>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <nav className="flex flex-wrap items-center gap-4 text-sm uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <IconButton href={kickUrl} label="Kick">
              <span className="font-display text-xl uppercase text-[var(--color-accent)]">
                K
              </span>
            </IconButton>
            <IconButton href={SOCIALS_URL} label="Discord">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M18.94 5.34A16.1 16.1 0 0 0 14.94 4l-.2.41a13.6 13.6 0 0 1 3.8 1.42 12.2 12.2 0 0 0-3.68-1.18 19.8 19.8 0 0 0-5.72 0 12.17 12.17 0 0 0-3.68 1.18 13.76 13.76 0 0 1 3.8-1.42L9.06 4a16.08 16.08 0 0 0-4 1.34C2.52 9.03 1.82 12.6 2.17 16.13A16.27 16.27 0 0 0 7.08 18.6l.98-1.6a10.54 10.54 0 0 1-1.56-.76l.38-.3a11.57 11.57 0 0 0 10.24 0l.38.3c-.5.3-1.03.55-1.56.76l.98 1.6a16.3 16.3 0 0 0 4.91-2.47c.44-4.08-.74-7.61-2.89-10.79ZM9.54 13.96c-.99 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm4.92 0c-.99 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
              </svg>
            </IconButton>
            <IconButton href={SOCIALS_URL} label="X">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current"
              >
                <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.26l-4.9-7.48L5.5 22H2.4l7.24-8.28L1.8 2h6.42l4.42 6.77L18.9 2Zm-1.1 18h1.73L7.26 3.9H5.4L17.8 20Z" />
              </svg>
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}
