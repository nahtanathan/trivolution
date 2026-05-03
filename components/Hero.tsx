import { Countdown } from "@/components/Countdown";

type HeroProps = {
  title: string;
  startsAt: string;
  endsAt: string;
  kickUrl: string;
};

export function Hero({ title, startsAt, endsAt, kickUrl }: HeroProps) {
  return (
    <section className="shell pb-12 pt-10 sm:pb-16 sm:pt-16">
      <div className="hero-glow section-panel relative overflow-hidden rounded-[14px] px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(167,232,63,0.18),transparent_55%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:items-end">
          <div className="max-w-4xl">
            <p className="font-display text-sm uppercase tracking-[0.4em] text-[var(--color-accent)]">
              Premium event
            </p>
            <h1 className="mt-4 font-display text-6xl uppercase leading-[0.88] text-white sm:text-7xl lg:text-[7.5rem]">
              Trivolution
              <span className="block text-[var(--color-accent)]">Leaderboard</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)] sm:text-xl">
              Wager more. Earn more. Climb to the top.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={kickUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)] px-6 text-sm font-semibold uppercase tracking-[0.24em] text-[#091005] transition hover:brightness-110"
              >
                Sign-up on Goated
              </a>
              <a
                href="#leaderboard"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[rgba(17,20,17,0.8)] px-6 text-sm font-semibold uppercase tracking-[0.24em] text-white transition hover:border-[rgba(167,232,63,0.4)] hover:text-[var(--color-accent)]"
              >
                View Leaderboard
              </a>
            </div>
            <div className="mt-8 inline-flex rounded-full border border-[rgba(167,232,63,0.18)] bg-[rgba(17,20,17,0.68)] px-4 py-2 text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)] backdrop-blur">
              {title}
            </div>
          </div>

          <Countdown startsAt={startsAt} endsAt={endsAt} />
        </div>
      </div>
    </section>
  );
}
