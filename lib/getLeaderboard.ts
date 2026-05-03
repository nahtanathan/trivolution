import { cache } from "react";

export type LeaderboardEntry = {
  rank: number;
  username: string;
  wagered: number;
};

export type LeaderboardStatus = "ok" | "fallback" | "error";

export type LeaderboardResult = {
  entries: LeaderboardEntry[];
  status: LeaderboardStatus;
  error?: string;
};

type UnknownRecord = Record<string, unknown>;

const COLLECTION_KEYS = ["data", "leaderboard", "results", "entries", "items"];
const USERNAME_KEYS = ["username", "user", "name", "displayName", "nickname"];
const RANK_KEYS = ["rank", "position", "place"];
const WAGER_KEYS = [
  "wagered",
  "wager",
  "weightedWager",
  "wagerAmount",
  "amount",
  "score",
  "total",
];
const PREFERRED_WAGER_KEYS = [
  "this_month",
  "thisMonth",
  "month",
  "monthly",
  "current",
  "current_period",
  "amount",
  "value",
  "all_time",
  "allTime",
  "total",
  "this_week",
  "thisWeek",
  "today",
];

const DEV_FALLBACK_ENTRIES: LeaderboardEntry[] = [
  { rank: 1, username: "FallbackAlpha", wagered: 1000000 },
  { rank: 2, username: "FallbackBravo", wagered: 500000 },
  { rank: 3, username: "FallbackCharlie", wagered: 250000 },
  { rank: 4, username: "FallbackDelta", wagered: 125000 },
  { rank: 5, username: "FallbackEcho", wagered: 100000 },
  { rank: 6, username: "FallbackFoxtrot", wagered: 75000 },
  { rank: 7, username: "FallbackGolf", wagered: 50000 },
  { rank: 8, username: "FallbackHotel", wagered: 25000 },
  { rank: 9, username: "FallbackIndia", wagered: 15000 },
  { rank: 10, username: "FallbackJuliet", wagered: 10000 },
];

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const normalized = Number(value.replace(/[^0-9.-]/g, ""));

    if (Number.isFinite(normalized)) {
      return normalized;
    }
  }

  return null;
}

function findString(record: UnknownRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function findNumber(record: UnknownRecord, keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    const parsed = extractWager(value);

    if (parsed !== null) {
      return parsed;
    }
  }

  return null;
}

function extractWager(value: unknown): number | null {
  const directNumber = toNumber(value);

  if (directNumber !== null) {
    return directNumber;
  }

  if (!isRecord(value)) {
    return null;
  }

  for (const key of PREFERRED_WAGER_KEYS) {
    const parsed = toNumber(value[key]);

    if (parsed !== null) {
      return parsed;
    }
  }

  for (const nestedValue of Object.values(value)) {
    const parsed = toNumber(nestedValue);

    if (parsed !== null) {
      return parsed;
    }
  }

  return null;
}

function extractCollection(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!isRecord(payload)) {
    return [];
  }

  const queue: unknown[] = [payload];
  const visited = new Set<unknown>();
  let fallbackArray: unknown[] = [];

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current || visited.has(current)) {
      continue;
    }

    visited.add(current);

    if (Array.isArray(current)) {
      if (current.length > 0) {
        return current;
      }

      if (fallbackArray.length === 0) {
        fallbackArray = current;
      }

      continue;
    }

    if (!isRecord(current)) {
      continue;
    }

    for (const key of COLLECTION_KEYS) {
      const candidate = current[key];

      if (Array.isArray(candidate)) {
        return candidate;
      }

      if (isRecord(candidate)) {
        queue.push(candidate);
      }
    }

    for (const value of Object.values(current)) {
      if (Array.isArray(value) && fallbackArray.length === 0) {
        fallbackArray = value;
      } else if (isRecord(value)) {
        queue.push(value);
      }
    }
  }

  return fallbackArray;
}

function normalizeEntry(value: unknown, index: number): LeaderboardEntry | null {
  if (!isRecord(value)) {
    return null;
  }

  const username =
    findString(value, USERNAME_KEYS) ??
    (typeof value.uid === "string" ? value.uid : null);

  if (!username) {
    return null;
  }

  let wagered = findNumber(value, WAGER_KEYS);

  if (wagered === null) {
    for (const nestedValue of Object.values(value)) {
      if (isRecord(nestedValue)) {
        wagered = findNumber(nestedValue, WAGER_KEYS);

        if (wagered !== null) {
          break;
        }
      }
    }
  }

  const rank = findNumber(value, RANK_KEYS) ?? index + 1;

  return {
    rank: Math.max(1, Math.round(rank)),
    username,
    wagered: Math.max(0, wagered ?? 0),
  };
}

function normalizeEntries(payload: unknown) {
  const sourceEntries = extractCollection(payload);

  return sourceEntries
    .map((entry, index) => normalizeEntry(entry, index))
    .filter((entry): entry is LeaderboardEntry => entry !== null)
    .sort((left, right) => {
      if (right.wagered !== left.wagered) {
        return right.wagered - left.wagered;
      }

      if (left.rank !== right.rank) {
        return left.rank - right.rank;
      }

      return left.username.localeCompare(right.username);
    })
    .map((entry, index) => ({
      rank: index + 1,
      username: entry.username,
      wagered: entry.wagered,
    }));
}

export const getLeaderboard = cache(async (): Promise<LeaderboardResult> => {
  const apiUrl = process.env.LEADERBOARD_API_URL;

  if (!apiUrl) {
    throw new Error("Missing required environment variable: LEADERBOARD_API_URL");
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 900,
      },
    });

    if (!response.ok) {
      throw new Error(`Leaderboard API responded with ${response.status}`);
    }

    const payload = (await response.json()) as unknown;
    const entries = normalizeEntries(payload);

    if (entries.length === 0) {
      throw new Error("Leaderboard API returned no usable entries");
    }

    return {
      entries,
      status: "ok",
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error while loading leaderboard";

    if (process.env.NODE_ENV === "development") {
      return {
        entries: DEV_FALLBACK_ENTRIES,
        status: "fallback",
        error: message,
      };
    }

    return {
      entries: [],
      status: "error",
      error: message,
    };
  }
});
