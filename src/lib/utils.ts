export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPricePkr(amount: number): string {
  return `PKR ${amount.toLocaleString()}`;
}

export function formatPriceUsd(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
