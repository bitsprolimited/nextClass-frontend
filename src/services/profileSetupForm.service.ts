import axiosInstance from "@/lib/axios";
import { BioDataFormData, CareerExperienceFormData, IdentityDocumentFormData } from "@/lib/schema";

export const uploadCertificate = async (
  file: File
): Promise<{ fileUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/upload/certificate", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const uploadIdentityDocument = async (
  file: File
): Promise<{ fileUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/upload/identity-document", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const uploadIntroductionVideo = async (
  file: File
): Promise<{ fileUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    "/upload/introduction-video",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};

// Form submission functions
export const submitBioData = async (data: BioDataFormData) => {
  const response = await axiosInstance.patch("/teachers/profile/bio-data", data);
  return response.data;
};

export const submitCareerExperience = async (
  data: CareerExperienceFormData
) => {
  const response = await axiosInstance.patch("/teachers/profile/career-experience", data);
  return response.data;
};

export const submitIdentityDocument = async (
  data: IdentityDocumentFormData
) => {
  const response = await axiosInstance.patch("/teachers/profile/identity-document", data);
  return response.data;
};

export const submitIntroductionVideo = async (data: {
  introductionVideoUrl: string;
}) => {
  const response = await axiosInstance.patch(
    "/teachers/profile/introduction-video",
    data
  );
  return response.data;
};

export interface UserProgress {
  bioDataComplete: boolean;
  careerExperienceComplete: boolean;
  identityDocumentComplete: boolean;
  introductionVideoComplete: boolean;
  completionPercentage: number;
  isComplete: boolean;
}

export const getUserProgress = async (): Promise<UserProgress> => {
  const response = await axiosInstance.get("/teachers/profile/progress");
  return response.data;
};

export interface BioDataFormValues {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  about: string;
}
