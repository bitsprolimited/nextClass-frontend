import {
  getUserProgress,
  submitBioData,
  submitCareerExperience,
  submitIdentityDocument,
  submitIntroductionVideo,
  uploadCertificate,
  uploadIdentityDocument,
  uploadIntroductionVideo,
} from "@/services/profileSetupForm.service";
import { UserProgress } from "@/store/useProfileSetupForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadCertificate = () => {
  return useMutation({
    mutationFn: uploadCertificate,
    onSuccess: () => {
      // toast.success("Certificate uploaded successfully");
    },
    onError: (error) => {
      toast.error("Failed to upload certificate");
      console.error("Upload error:", error);
    },
  });
};

export const useUploadIdentityDocument = () => {
  return useMutation({
    mutationFn: uploadIdentityDocument,
    onSuccess: () => {
      // toast.success("Identity document uploaded successfully");
    },
    onError: (error) => {
      toast.error("Failed to upload identity document");
      console.error("Upload error:", error);
    },
  });
};

export const useUploadIntroductionVideo = () => {
  return useMutation({
    mutationFn: uploadIntroductionVideo,
    onSuccess: () => {
      // toast.success("Introduction video uploaded successfully");
    },
    onError: (error) => {
      toast.error("Failed to upload introduction video");
      console.error("Upload error:", error);
    },
  });
};

export const useSubmitBioData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitBioData,
    onSuccess: () => {
      toast.success("Bio data saved successfully");
      // Invalidate progress to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["user", "progress"] });
      queryClient.invalidateQueries({ queryKey: ["user", "bio-data"] });
    },
    onError: (error) => {
      toast.error("Failed to save bio data");
      console.error("Submit error:", error);
    },
  });
};

export const useSubmitCareerExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitCareerExperience,
    onSuccess: () => {
      toast.success("Career experience saved successfully");
      // Invalidate progress to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["user", "progress"] });
      queryClient.invalidateQueries({
        queryKey: ["user", "career-experience"],
      });
    },
    onError: (error) => {
      toast.error("Failed to save career experience");
      console.error("Submit error:", error);
    },
  });
};

export const useSubmitIdentityDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitIdentityDocument,
    onSuccess: () => {
      toast.success("Identity document saved successfully");
      // Invalidate progress to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["user", "progress"] });
      queryClient.invalidateQueries({
        queryKey: ["user", "identity-document"],
      });
    },
    onError: (error) => {
      toast.error("Failed to save identity document");
      console.error("Submit error:", error);
    },
  });
};

export const useSubmitIntroductionVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitIntroductionVideo,
    onSuccess: () => {
      toast.success("Introduction video saved successfully");
      // Invalidate progress to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["user", "progress"] });
      queryClient.invalidateQueries({
        queryKey: ["user", "introduction-video"],
      });
    },
    onError: (error) => {
      toast.error("Failed to save introduction video");
      console.error("Submit error:", error);
    },
  });
};

export const useUserProgress = () => {
  return useQuery<UserProgress>({
    queryKey: ["user", "progress"],
    queryFn: getUserProgress,
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
};

// Hook to determine current step based on progress
export const useCurrentStepFromProgress = (
  progress: UserProgress | undefined
) => {
  if (!progress) return 0;

  // Determine the current step based on what's completed
  if (!progress.bioDataComplete) return 0;
  if (!progress.careerExperienceComplete) return 1;
  if (!progress.identityDocumentComplete) return 2;
  if (!progress.introductionVideoComplete) return 3;

  // All completed
  return 4;
};
