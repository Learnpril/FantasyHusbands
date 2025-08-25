/**
 * Utility functions for Fantasy Hearts
 * Provides Tailwind CSS class merging and localStorage helpers
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely get data from localStorage with fallback
 */
const getLocalStorage = (key: string): any =>
  JSON.parse(window.localStorage.getItem(key) || "null");

/**
 * Safely set data to localStorage with error handling
 */
const setLocalStorage = (key: string, value: any): void =>
  window.localStorage.setItem(key, JSON.stringify(value));

export { getLocalStorage, setLocalStorage };
