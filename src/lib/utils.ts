import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MONTHS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Function to calculate age based on birth month and year
export const calculateAge = (birthMonth: string, birthYear: string): number => {
  if (!birthMonth || !birthYear) return 0;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 0-indexed to 1-indexed

  const birthMonthIndex = MONTHS.indexOf(birthMonth) + 1;
  const birthYearNum = parseInt(birthYear);

  let age = currentYear - birthYearNum;

  // If birth month hasn't occurred this year, subtract 1 from age
  if (currentMonth < birthMonthIndex) {
    age--;
  }

  return age;
};

// Function to create date of birth string
export const createDateOfBirth = (
  birthMonth: string,
  birthYear: string
): string => {
  if (!birthMonth || !birthYear) return "";

  const monthIndex = MONTHS.indexOf(birthMonth) + 1;
  const monthStr = monthIndex.toString().padStart(2, "0");
  // Using 15th as default day
  return `${birthYear}-${monthStr}-15`;
};
