import { formatCurrency, maskUsername } from "@/lib/format";
import type { LeaderboardEntry, LeaderboardStatus } from "@/lib/getLeaderboard";
import { getLeaderboardPrize } from "@/lib/rewards";

type LeaderboardTableProps = {
  entries: LeaderboardEntry[];
  status: LeaderboardStatus;
  error?: string;
};

export function LeaderboardTable({
  entries,
  status,
  error,
}: LeaderboardTableProps) {
  const displayCount = entries.length >= 25 ? 25 : Math.min(entries.length, 10);
  const visibleEntries = entries.slice(0, displayCount);

  if (status === "error" && entries.length === 0) {
    return (
      <div className="heavy-card rounded-xl p-8 text-center">
        <p className="font-display text-sm uppercase tracking-[0.32em] text-[var(--color-accent)]">
          Leaderboard unavailable
        </p>
        <h3 className="mt-3 font-display text-3xl uppercase text-white">
          We couldn&apos;t load the live standings
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
          {error ??
            "Please check back shortly. The leaderboard feed is temporarily unavailable."}
        </p>
      </div>
    );
  }

  return (
    <div className="heavy-card overflow-hidden rounded-xl">
      <div className="flex flex-col gap-3 border-b border-[rgba(160,255,60,0.12)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.32em] text-[var(--color-accent)]">
            Full board
          </p>
          <h3 className="mt-2 font-display text-3xl uppercase text-white">
            Top {visibleEntries.length} Players
          </h3>
        </div>
        {status === "fallback" ? (
          <div className="rounded-xl border border-[rgba(167,232,63,0.2)] bg-[rgba(167,232,63,0.08)] px-4 py-3 text-sm text-[var(--color-text-muted)]">
            Showing isolated local fallback data because the live API could not
            be reached in development.
          </div>
        ) : null}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-[rgba(10,13,10,0.9)] text-left text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
              <th className="px-5 py-4 font-medium sm:px-6">Rank</th>
              <th className="px-5 py-4 font-medium sm:px-6">User</th>
              <th className="px-5 py-4 font-medium text-right sm:px-6">
                Wagered
              </th>
              <th className="px-5 py-4 font-medium text-right sm:px-6">
                Prize
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleEntries.map((entry) => {
              const prize = getLeaderboardPrize(entry.rank);

              return (
                <tr
                  key={`${entry.rank}-${entry.username}`}
                  className="border-t border-[rgba(160,255,60,0.08)] bg-[rgba(17,20,17,0.65)] transition odd:bg-[rgba(24,28,24,0.82)] hover:bg-[rgba(167,232,63,0.06)]"
                >
                  <td className="px-5 py-4 text-sm text-white sm:px-6 sm:text-base">
                    <span className="inline-flex min-w-10 items-center justify-center rounded-full border border-[rgba(167,232,63,0.18)] bg-[rgba(167,232,63,0.06)] px-3 py-1 font-semibold">
                      #{entry.rank}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-white sm:px-6 sm:text-base">
                    {maskUsername(entry.username)}
                  </td>
                  <td className="px-5 py-4 text-right text-sm font-semibold text-white sm:px-6 sm:text-base">
                    {formatCurrency(entry.wagered)}
                  </td>
                  <td
                    className={`px-5 py-4 text-right text-sm font-semibold sm:px-6 sm:text-base ${
                      prize ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    {prize ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
