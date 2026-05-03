import Image from "next/image";

import { formatCurrency, maskUsername } from "@/lib/format";
import type { LeaderboardEntry } from "@/lib/getLeaderboard";
import { podiumPrizes } from "@/lib/rewards";

type TopPodiumProps = {
  entries: LeaderboardEntry[];
};

type PodiumCardProps = {
  entry: LeaderboardEntry;
  prize: string;
  tone: "primary" | "secondary" | "tertiary";
  emblemSrc: string;
  className?: string;
};

function podiumToneStyles(tone: PodiumCardProps["tone"]) {
  switch (tone) {
    case "primary":
      return {
        frame:
          "border-[rgba(167,232,63,0.34)] shadow-[0_20px_55px_rgba(167,232,63,0.18)]",
        label: "text-[var(--color-accent)]",
        payout: "text-[var(--color-accent)]",
      };
    case "secondary":
      return {
        frame:
          "border-[rgba(205,214,229,0.24)] shadow-[0_18px_44px_rgba(0,0,0,0.28)]",
        label: "text-[#DCE3F0]",
        payout: "text-[#DCE3F0]",
      };
    default:
      return {
        frame:
          "border-[rgba(165,150,88,0.28)] shadow-[0_18px_44px_rgba(0,0,0,0.28)]",
        label: "text-[#C7B97B]",
        payout: "text-[#C7B97B]",
      };
  }
}

function rankLabel(rank: number) {
  if (rank === 1) {
    return "First Place";
  }

  if (rank === 2) {
    return "Second Place";
  }

  return "Third Place";
}

function emblemSize(tone: PodiumCardProps["tone"]) {
  if (tone === "primary") {
    return 180;
  }

  if (tone === "secondary") {
    return 136;
  }

  return 132;
}

function PodiumCard({
  entry,
  prize,
  tone,
  emblemSrc,
  className,
}: PodiumCardProps) {
  const styles = podiumToneStyles(tone);
  const size = emblemSize(tone);

  return (
    <article
      className={`heavy-card flex h-full flex-col rounded-xl border p-5 sm:p-6 ${styles.frame} ${className ?? ""}`}
    >
      <div className="flex items-center justify-between gap-4">
        <span
          className={`text-xs font-semibold uppercase tracking-[0.3em] ${styles.label}`}
        >
          {rankLabel(entry.rank)}
        </span>
        <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
          Prize {prize}
        </span>
      </div>

      <div
        className={`mx-auto mt-7 flex items-center justify-center ${
          tone === "primary" ? "min-h-[7.5rem] sm:min-h-[8.5rem]" : "min-h-[6rem] sm:min-h-[6.75rem]"
        }`}
      >
        <Image
          src={emblemSrc}
          alt={`${rankLabel(entry.rank)} podium crest`}
          width={size}
          height={size}
          className={`h-auto object-contain ${
            tone === "primary"
              ? "w-[8rem] sm:w-[9.25rem] lg:w-auto"
              : "w-[6.25rem] sm:w-[7rem] lg:w-auto"
          }`}
          priority={entry.rank === 1}
        />
      </div>

      <div className="mt-3 text-center">
        <p className="font-display text-3xl uppercase text-white sm:text-4xl">
          {maskUsername(entry.username)}
        </p>
        <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
          Wagered
        </p>
        <p className="mt-2 font-display text-4xl uppercase text-white sm:text-5xl">
          {formatCurrency(entry.wagered)}
        </p>
      </div>

      <div className="mt-auto pt-6">
        <div className="rounded-xl border border-white/6 bg-[rgba(10,13,10,0.92)] px-4 py-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
            Payout
          </p>
          <p className={`mt-2 font-display text-3xl uppercase ${styles.payout}`}>
            {prize}
          </p>
        </div>
      </div>
    </article>
  );
}

export function TopPodium({ entries }: TopPodiumProps) {
  const topEntries = entries.slice(0, 3);

  if (topEntries.length === 0) {
    return (
      <div className="heavy-card rounded-xl p-8 text-center">
        <p className="font-display text-sm uppercase tracking-[0.32em] text-[var(--color-accent)]">
          Podium waiting room
        </p>
        <h3 className="mt-3 font-display text-3xl uppercase text-white">
          No leaderboard entries yet
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
          Once the live API returns ranked players, the top three will appear
          here in the featured podium layout.
        </p>
      </div>
    );
  }

  const primary = topEntries[0];
  const secondary = topEntries[1];
  const tertiary = topEntries[2];

  return (
    <div className="grid gap-5 lg:grid-cols-3 lg:items-end">
      {secondary ? (
        <PodiumCard
          entry={secondary}
          prize={podiumPrizes[1]}
          tone="secondary"
          emblemSrc="/assets/art/podium_2.png"
          className="lg:min-h-[17rem] lg:translate-y-5"
        />
      ) : null}
      {primary ? (
        <PodiumCard
          entry={primary}
          prize={podiumPrizes[0]}
          tone="primary"
          emblemSrc="/assets/art/podium_1.png"
          className="accent-ring lg:min-h-[24rem]"
        />
      ) : null}
      {tertiary ? (
        <PodiumCard
          entry={tertiary}
          prize={podiumPrizes[2]}
          tone="tertiary"
          emblemSrc="/assets/art/podium_3.png"
          className="lg:min-h-[16.5rem] lg:translate-y-6"
        />
      ) : null}
    </div>
  );
}
