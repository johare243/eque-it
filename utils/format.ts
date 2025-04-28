/** Format a Date (or ISO string) as “Apr 28 2025” */
export const fmtDate = (d: Date | string) =>
  new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(d));

/** Format cents as USD “$1,234.56” */
export const fmtMoney = (cents: number) =>
  `$${(cents / 100).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
