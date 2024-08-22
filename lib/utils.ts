import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export function formatNumber(value: number) {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(1) + 'b';
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1) + 'm';
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + 'k';
  } else {
    return value.toString();
  }
};
