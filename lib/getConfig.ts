import { cache } from "react";

export type SiteConfig = {
  leaderboardTitle: string;
  startsAt: string;
  endsAt: string;
  kickUrl: string;
};

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function assertIsoDate(name: string, value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error(`Environment variable ${name} must be a valid ISO date`);
  }

  return value;
}

function assertUrl(name: string, value: string) {
  try {
    return new URL(value).toString();
  } catch {
    throw new Error(`Environment variable ${name} must be a valid URL`);
  }
}

export const getConfig = cache((): SiteConfig => {
  const startsAt = assertIsoDate("STARTS_AT", requireEnv("STARTS_AT"));
  const endsAt = assertIsoDate("ENDS_AT", requireEnv("ENDS_AT"));

  if (new Date(endsAt).getTime() <= new Date(startsAt).getTime()) {
    throw new Error("ENDS_AT must be later than STARTS_AT");
  }

  return {
    leaderboardTitle: requireEnv("LEADERBOARD_TITLE"),
    startsAt,
    endsAt,
    kickUrl: assertUrl("KICK_URL", requireEnv("KICK_URL")),
  };
});
