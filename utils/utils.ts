import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string | null | undefined) {
  if (!str) return undefined;
  return str.charAt(0).toUpperCase() + str.slice(1);
}