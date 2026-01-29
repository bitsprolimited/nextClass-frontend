import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface AvailabilitySubmissionData {
  availabilities: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    timezone: string;
  }>;
  bankDetails: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
}

export interface AvailabilityResponse {
  status: string;
  message: string;
  data: {
    nylasUrl: {
      status: string;
      message: string;
      data: string;
    };
    availability: Array<{
      dayOfWeek: number;
      startTime: string;
      endTime: string;
      isAvailable: boolean;
      timezone: string;
      _id: string;
    }>;
    bankDetails: {
      accountNumber: string;
      accountName: string;
      bankName: string;
    };
  };
}

export async function submitAvailability(
  data: AvailabilitySubmissionData
): Promise<AvailabilityResponse> {
  const response = await axiosInstance.post<AvailabilityResponse>(
    `/availability`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function updateAvailability(
  data: AvailabilitySubmissionData
): Promise<AvailabilityResponse> {
  const response = await axios.patch<AvailabilityResponse>(
    `/availability`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

// React Query Hooks
export const useSubmitAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitAvailability,
    onSuccess: (data) => {
      // Invalidate and refetch availability data
      queryClient.invalidateQueries({ queryKey: ["availability"] });

      if (data.data.nylasUrl) {
        window.location.href = data.data.nylasUrl.data;
      }
    },
    onError: (error) => {
      console.error("Error submitting availability:", error);
    },
  });
};

export const useUpdateAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvailability,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["availability"] });
      console.log("Availability updated successfully:", data);
    },
    onError: (error) => {
      console.error("Error updating availability:", error);
    },
  });
};
