"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  startsAt: string;
  endsAt: string;
};

type CountdownState = {
  label: string;
  ended: boolean;
  segments: Array<{
    label: string;
    value: string;
  }>;
};

function buildCountdownState(startsAt: string, endsAt: string): CountdownState {
  const now = Date.now();
  const startTime = new Date(startsAt).getTime();
  const endTime = new Date(endsAt).getTime();

  const targetTime = now < startTime ? startTime : endTime;
  const ended = now >= endTime;
  const label = ended ? "Event ended" : now < startTime ? "Starts in" : "Ends in";
  const remainingMs = ended ? 0 : Math.max(targetTime - now, 0);

  const totalSeconds = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    label,
    ended,
    segments: [
      { label: "Days", value: String(days).padStart(2, "0") },
      { label: "Hours", value: String(hours).padStart(2, "0") },
      { label: "Minutes", value: String(minutes).padStart(2, "0") },
      { label: "Seconds", value: String(seconds).padStart(2, "0") },
    ],
  };
}

export function Countdown({ startsAt, endsAt }: CountdownProps) {
  const [state, setState] = useState<CountdownState>(() =>
    buildCountdownState(startsAt, endsAt),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setState(buildCountdownState(startsAt, endsAt));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [startsAt, endsAt]);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[rgba(17,20,17,0.9)] p-4 shadow-[var(--shadow-soft)] backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-4">
        <p className="font-display text-base uppercase tracking-[0.28em] text-[var(--color-accent)]">
          {state.label}
        </p>
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${
            state.ended
              ? "border border-white/15 bg-white/5 text-[var(--color-text-muted)]"
              : "border border-[rgba(167,232,63,0.28)] bg-[rgba(167,232,63,0.12)] text-[var(--color-accent)]"
          }`}
        >
          {state.ended ? "Closed" : "Live"}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {state.segments.map((segment) => (
          <div
            key={segment.label}
            className="rounded-xl border border-white/6 bg-[var(--color-card-inner)] px-3 py-4 text-center"
          >
            <div className="font-display text-3xl uppercase text-white sm:text-4xl">
              {segment.value}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted)] sm:text-xs">
              {segment.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
