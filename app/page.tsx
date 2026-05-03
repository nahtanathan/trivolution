import { BottomCTA } from "@/components/BottomCTA";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { TopPodium } from "@/components/TopPodium";
import { WagerMilestones } from "@/components/WagerMilestones";
import { formatEventDateRange } from "@/lib/format";
import { getConfig } from "@/lib/getConfig";
import { getLeaderboard } from "@/lib/getLeaderboard";

const ABOUT_POINTS = [
  {
    title: "Monthly race, real rewards",
    body: "Every wager counts toward your leaderboard position during the active event window. Finish strong and lock in premium cash prizes.",
  },
  {
    title: "Milestones built for grinders",
    body: "Unlock stacked rewards as your volume grows, from quick-hit starter bonuses to high-tier VIP drops and exclusive perks.",
  },
  {
    title: "Community-first competition",
    body: "Watch the standings move live, hang out on stream, and make every session matter with a board built for active players.",
  },
];

const FAQ_ITEMS = [
  {
    question: "How often does the leaderboard update?",
    answer:
      "The leaderboard data is fetched from the live referral leaderboard API and revalidated every 15 minutes for fast, reliable updates in production.",
  },
  {
    question: "How are wagers counted?",
    answer:
      "Wager milestone progress is based on weighted wagering. Full contribution details are outlined in the Terms & Conditions, and leaderboard positions are based on the eligible wager values returned by the live feed.",
  },
  {
    question: "What unlocks after $250,000 in wagers?",
    answer:
      "Once you hit $250,000 in wagers, rewards level up even further with extra bonuses on top of your cash rewards directly from Trivolution Slots.",
  },
  {
    question: "Are milestone rewards monitored?",
    answer:
      "Yes. All wagering is monitored for abuse. Slots and similar games contribute fully toward milestone rewards.",
  },
  {
    question: "Where do I join Trivolution?",
    answer:
      "Use any Join button on the page to head to the official Kick destination and get plugged into the current Trivolution experience.",
  },
  {
    question: "What happens if the API is unavailable?",
    answer:
      "Production shows a clean error state instead of fake standings. During local development only, a clearly labeled isolated fallback can be used to keep the interface testable.",
  },
];

export default async function HomePage() {
  const config = getConfig();
  const leaderboard = await getLeaderboard();
  const eventRange = formatEventDateRange(config.startsAt, config.endsAt);

  return (
    <main className="relative overflow-hidden bg-[var(--color-background)]">
      <Header kickUrl={config.kickUrl} />

      <Hero
        title={config.leaderboardTitle}
        startsAt={config.startsAt}
        endsAt={config.endsAt}
        kickUrl={config.kickUrl}
      />

      <section id="leaderboard" className="shell py-10 sm:py-14">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.35em] text-[var(--color-accent)]">
              Live standings
            </p>
            <h2 className="mt-2 font-display text-4xl uppercase text-white sm:text-5xl">
              {config.leaderboardTitle}
            </h2>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[rgba(17,20,17,0.8)] px-4 py-3 text-sm text-[var(--color-text-muted)] backdrop-blur">
            Event window: <span className="text-white">{eventRange}</span>
          </div>
        </div>

        <TopPodium entries={leaderboard.entries} />
        <div className="mt-8">
          <LeaderboardTable
            entries={leaderboard.entries}
            status={leaderboard.status}
            error={leaderboard.error}
          />
        </div>
      </section>

      <section id="milestones" className="shell py-10 sm:py-14">
        <div className="mb-6 max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Reward tiers
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase text-white sm:text-5xl">
            Wager Milestones
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
            Level up your rewards every month as you climb through wager
            milestones. Unlock everything from instant cash bonuses to
            exclusive perks and VIP treatment along the way.
          </p>
          <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
            Once you hit <span className="text-white">$250,000</span> in
            wagers, rewards level up even further with extra bonuses on top of
            your cash rewards directly from Trivolution Slots.
          </p>
          <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
            The more you play, the more you unlock. Keep climbing and
            experience the full rewards journey.
          </p>
        </div>
        <WagerMilestones />
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="heavy-card rounded-xl p-5 sm:p-6">
            <p className="font-display text-2xl uppercase text-white">
              Claim Your Bonuses
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
              Wager milestone progress is based on weighted wagering. Full
              contribution details are outlined in the Terms &amp; Conditions.
            </p>
          </div>
          <div className="heavy-card rounded-xl p-5 sm:p-6">
            <p className="font-display text-2xl uppercase text-white">
              Fair Play
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
              All wagering is monitored for abuse. Slots and similar games
              contribute fully toward milestone rewards.
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="shell py-10 sm:py-14">
        <div className="mb-6 max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Why Trivolution
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase text-white sm:text-5xl">
            Built for serious players
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {ABOUT_POINTS.map((point) => (
            <article
              key={point.title}
              className="heavy-card rounded-xl p-6 sm:p-7"
            >
              <h3 className="font-display text-2xl uppercase text-white">
                {point.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                {point.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="shell py-10 sm:py-14">
        <div className="mb-6 max-w-3xl">
          <p className="font-display text-sm uppercase tracking-[0.35em] text-[var(--color-accent)]">
            Need to know
          </p>
          <h2 className="mt-2 font-display text-4xl uppercase text-white sm:text-5xl">
            FAQ
          </h2>
        </div>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group heavy-card rounded-xl p-5 sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                <span className="font-display text-2xl uppercase text-white">
                  {item.question}
                </span>
                <span className="text-[var(--color-accent)] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <BottomCTA kickUrl={config.kickUrl} />

      <footer className="border-t border-[var(--color-border)] bg-[rgba(5,7,5,0.92)]">
        <div className="shell flex flex-col gap-2 py-6 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>18+</p>
          <p>Gamble responsibly</p>
          <p>Terms &amp; Conditions Apply</p>
        </div>
      </footer>
    </main>
  );
}
