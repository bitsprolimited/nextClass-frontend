import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MONTHS } from "./constants";
import { Availability } from "@/types";

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

export const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

export function getScheduleString(availability: Availability[]): string | string[] {
  const schedule: string[] = [];

  for (const day of availability) {
    if (day.isAvailable) {
      const dayOfWeek = getDayOfWeek(day.dayOfWeek);
      schedule.push(dayOfWeek);
    }
  }

  if (schedule.length === 0) {
    return "Not available";
  } else if (schedule.length === 7) {
    return "Mon - Sun";
  } else {
    const ranges: string[] = [];
    let currentRange: string[] = [schedule[0]];

    for (let i = 1; i < schedule.length; i++) {
      if (schedule[i] === getNextDay(schedule[i - 1])) {
        currentRange.push(schedule[i]);
      } else {
        ranges.push(formatRange(currentRange));
        currentRange = [schedule[i]];
      }
    }

    ranges.push(formatRange(currentRange));

    return ranges.join(", ");
  }
}
function getDayOfWeek(day: number): string {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[day];
}

function getNextDay(day: string): string {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const index = days.indexOf(day);
  return days[(index + 1) % 7];
}

function formatRange(days: string[]): string {
  if (days.length === 1) {
    return days[0];
  } else {
    return `${days[0]} - ${days[days.length - 1]}`;
  }
}
