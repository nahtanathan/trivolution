const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const eventDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatCurrency(value: number) {
  const safeValue = Number.isFinite(value) ? Math.round(value) : 0;
  return currencyFormatter.format(safeValue);
}

export function maskUsername(username: string) {
  const normalized = username.trim();

  if (!normalized) {
    return "Player***";
  }

  return `${normalized.slice(0, 6)}***`;
}

export function formatEventDateRange(startsAt: string, endsAt: string) {
  return `${eventDateFormatter.format(new Date(startsAt))} - ${eventDateFormatter.format(new Date(endsAt))} UTC`;
}
