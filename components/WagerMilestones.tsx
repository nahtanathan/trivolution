import Image from "next/image";

import { rewardMilestones } from "@/lib/rewards";

const DISCORD_CLAIM_URL = "https://discord.gg/c7EFDEp36R";

export function WagerMilestones() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {rewardMilestones.map((milestone) => {
        return (
          <article
            key={milestone.wager}
            className={`heavy-card flex flex-col overflow-hidden rounded-xl ${
              milestone.highlighted
                ? "border-[rgba(167,232,63,0.34)] shadow-[0_20px_55px_rgba(167,232,63,0.14)]"
                : ""
            }`}
          >
            <div className="border-b border-[rgba(160,255,60,0.12)] bg-[rgba(10,13,10,0.88)] px-5 py-4">
              <p className="font-display text-xl uppercase text-white">
                Wager - {milestone.wager}
              </p>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 text-center">
              <div className="flex min-h-28 items-center justify-center">
                <Image
                  src={milestone.imageSrc}
                  alt={`${milestone.wager} milestone badge`}
                  width={112}
                  height={112}
                  className={`h-auto object-contain ${
                    milestone.highlighted
                      ? "w-28 drop-shadow-[0_10px_24px_rgba(167,232,63,0.18)]"
                      : "w-24 drop-shadow-[0_8px_22px_rgba(0,0,0,0.34)] sm:w-[6.5rem]"
                  }`}
                />
              </div>

              <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                Reward
              </p>
              <p className="mt-2 font-display text-4xl uppercase text-white">
                {milestone.reward}
              </p>
            </div>

            <div className="px-5 pb-5">
              <a
                href={DISCORD_CLAIM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-12 w-full items-center justify-center rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-[#091005] transition hover:brightness-110"
              >
                Make a ticket in Discord to claim
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
