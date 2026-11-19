const fmt = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

export const inr = (n: number) => `₹${fmt.format(n)}`;
