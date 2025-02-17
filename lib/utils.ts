import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to combine classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
