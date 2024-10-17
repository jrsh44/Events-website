import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | undefined): string | undefined => {
  if (!date) return undefined;
  date.setHours(12, 0, 0, 0);
  return date.toISOString().split("T")[0];
};
