import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface TimeSlot {
  startTime: string;
  endTime: string;
}

export interface DayAvailability {
  dayOfWeek: number;
  slots: TimeSlot[];
  isAvailable: boolean;
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface AvailabilityFormData {
  availabilities: DayAvailability[];
  bankDetails: BankDetails;
  timezone: string;
  pricing: {
    ratePerSession: number;
  };
}

interface AvailabilityStore {
  formData: AvailabilityFormData;
  currentStep: number;
  daySelection: "everyday" | "weekdays" | "weekend" | "custom" | undefined;


  // Actions
  setCurrentStep: (step: number) => void;
  setDaySelection: (selection: "everyday" | "weekdays" | "weekend" | "custom") => void;
  updateAvailabilities: (availabilities: DayAvailability[]) => void;
  updateBankDetails: (bankDetails: BankDetails) => void;
  updatePricing: (pricing: { ratePerSession: number }) => void;
  updateTimezone: (timezone: string) => void;
  resetForm: () => void;

  // Getters
  getFormattedSubmissionData: () => {
    availabilities: Array<{
      dayOfWeek: number;
      startTime: string;
      endTime: string;
      isAvailable: boolean;
      timezone: string;
    }>;
    bankDetails: BankDetails;
  };
}


const initialFormData: AvailabilityFormData = {
  availabilities: [
    { dayOfWeek: 0, slots: [{ startTime: "09:00", endTime: "17:00" }], isAvailable: false }, // Sunday
    { dayOfWeek: 1, slots: [{ startTime: "09:00", endTime: "17:00" }], isAvailable: false }, // Monday
    { dayOfWeek: 2, slots: [{ startTime: "09:00", endTime: "17:00" }], isAvailable: false }, // Tuesday
    { dayOfWeek: 3, slots: [{ startTime: "09:00", endTime: "17:00" }], isAvailable: false }, // Wednesday
    { dayOfWeek: 4, slots: [{ startTime: "09:00", endTime: "17:00" }], isAvailable: false }, // Thursday
    { dayOfWeek: 5, slots: [{ startTime: "09:00", endTime: "17:00" }], isAvailable: false }, // Friday
    { dayOfWeek: 6, slots: [{ startTime: "09:00", endTime: "17:00" }], isAvailable: false }, // Saturday
  ],
  bankDetails: {
    bankName: "",
    accountNumber: "",
    accountName: "",
  },
  timezone: "",
  pricing: {
    ratePerSession: 0,
  },
};

export const useAvailabilityStore = create<AvailabilityStore>()(
  devtools(
    (set, get) => ({
      formData: initialFormData,
      currentStep: 1,
      daySelection: "everyday",

      setCurrentStep: (step) => set({ currentStep: step }),

      setDaySelection: (selection) => set({ daySelection: selection }),

      updateTimezone: (timezone) =>
        set((state) => ({
          formData: {
            ...state.formData,
            timezone,
          },
        })),

      updateAvailabilities: (availabilities) =>
        set((state) => ({
          formData: {
            ...state.formData,
            availabilities,
          },
        })),

      updateBankDetails: (bankDetails) =>
        set((state) => ({
          formData: {
            ...state.formData,
            bankDetails,
          },
        })),

      updatePricing: (pricing) =>
        set((state) => ({
          formData: {
            ...state.formData,
            pricing,
          },
        })),

      resetForm: () =>
        set({
          formData: initialFormData,
          currentStep: 1,
        }),

      getFormattedSubmissionData: () => {
        const { formData } = get();

        // Format availabilities to match the new backend structure
        const availabilities = formData.availabilities.map((day) => {
          // For available days, pass the slots array directly.
          // Also, filter out any incomplete slots as a safety measure.
          if (day.isAvailable && day.slots.length > 0) {
            return {
              dayOfWeek: day.dayOfWeek,
              isAvailable: true,
              slots: day.slots.filter((slot) => slot.startTime && slot.endTime),
            };
          }

          return {
            dayOfWeek: day.dayOfWeek,
            isAvailable: false,
            slots: [],
          };
        });

        return {
          timezone: formData.timezone,
          availabilities,
          bankDetails: formData.bankDetails,
        };
      },
    }),
    {
      name: "availability-store",
    }
  )
);
