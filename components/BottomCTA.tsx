type BottomCTAProps = {
  kickUrl: string;
};

export function BottomCTA({ kickUrl }: BottomCTAProps) {
  return (
    <section className="shell py-10 sm:py-14">
      <div className="section-panel relative overflow-hidden rounded-xl px-6 py-8 sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(167,232,63,0.18),transparent_52%)] lg:block" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-display text-sm uppercase tracking-[0.35em] text-[var(--color-accent)]">
              Next step
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase text-white sm:text-5xl">
              Looking for better rewards?
            </h2>
            <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
              Sign-up on Goated and start unlocking exclusive bonuses, cash
              rewards, and VIP perks.
            </p>
          </div>
          <a
            href={kickUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 text-sm font-semibold uppercase tracking-[0.24em] text-[#091005] transition hover:brightness-110"
          >
            Sign-up on Goated
          </a>
        </div>
      </div>
    </section>
  );
}
