import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BioDataFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
  address: string;
  bio: string;
}

export interface CareerExperienceFormData {
  subjects: string[];
  grades: string[];
  experience: string;
  qualifications: QualificationData[];
}

export interface QualificationData {
  type: string;
  courseName: string;
  issuingInstitution: string;
  expiryDate?: string;
  // certificateFile?: File;
  certificateUrl?: string;
}

export interface IdentityDocumentFormData {
  idType: string;
  issuingAuthority: string;
  issueDate?: Date;
  expiryDate?: Date;
  documentFile?: File;
  documentUrl?: string;
}

export interface IntroductionVideoFormData {
  videoFile?: File;
}

export interface UserProgress {
  bioData: BioDataFormData;
  careerExperience: CareerExperienceFormData;
  identityDocument: IdentityDocumentFormData;
  introductionVideo: IntroductionVideoFormData;
  bioDataComplete: boolean;
  careerExperienceComplete: boolean;
  identityDocumentComplete: boolean;
  introductionVideoComplete: boolean;
  completionPercentage: number;
  isComplete: boolean;
}

interface FormState {
  currentStep: number;
  progress: UserProgress | null;
  bioData: Partial<BioDataFormData>;
  careerExperience: Partial<CareerExperienceFormData>;
  identityDocument: Partial<IdentityDocumentFormData>;
  introductionVideo: Partial<IntroductionVideoFormData>;

  // Actions
  setCurrentStep: (step: number) => void;
  setProgress: (progress: UserProgress) => void;
  syncStepWithProgress: () => void;
  updateBioData: (data: Partial<BioDataFormData>) => void;
  updateCareerExperience: (data: Partial<CareerExperienceFormData>) => void;
  updateIdentityDocument: (data: Partial<IdentityDocumentFormData>) => void;
  updateIntroductionVideo: (data: Partial<IntroductionVideoFormData>) => void;
  addQualification: (qualification: QualificationData) => void;
  removeQualification: (index: number) => void;
  updateQualification: (
    index: number,
    qualification: Partial<QualificationData>
  ) => void;
  resetForm: () => void;
}

const initialState = {
  currentStep: 0,
  progress: null,
  bioData: {},
  careerExperience: {
    qualifications: [],
  },
  identityDocument: {},
  introductionVideo: {},
};

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      setProgress: (progress) => set({ progress }),

      syncStepWithProgress: () => {
        const { progress } = get();
        if (!progress) return;

        // Determine the current step based on what's completed
        let currentStep = 0;
        if (!progress.bioDataComplete) currentStep = 0;
        else if (!progress.careerExperienceComplete) currentStep = 1;
        else if (!progress.identityDocumentComplete) currentStep = 2;
        else if (!progress.introductionVideoComplete) currentStep = 3;
        else currentStep = 4; // All completed

        set({ currentStep });
      },

      updateBioData: (data) =>
        set((state) => ({
          bioData: { ...state.bioData, ...data },
        })),

      updateCareerExperience: (data) =>
        set((state) => ({
          careerExperience: { ...state.careerExperience, ...data },
        })),

      updateIdentityDocument: (data) =>
        set((state) => ({
          identityDocument: { ...state.identityDocument, ...data },
        })),

      updateIntroductionVideo: (data) =>
        set((state) => ({
          introductionVideo: { ...state.introductionVideo, ...data },
        })),

      addQualification: (qualification) =>
        set((state) => ({
          careerExperience: {
            ...state.careerExperience,
            qualifications: [
              ...(state.careerExperience.qualifications || []),
              qualification,
            ],
          },
        })),

      removeQualification: (index) =>
        set((state) => ({
          careerExperience: {
            ...state.careerExperience,
            qualifications:
              state.careerExperience.qualifications?.filter(
                (_, i) => i !== index
              ) || [],
          },
        })),

      updateQualification: (index, qualification) =>
        set((state) => ({
          careerExperience: {
            ...state.careerExperience,
            qualifications:
              state.careerExperience.qualifications?.map((q, i) =>
                i === index ? { ...q, ...qualification } : q
              ) || [],
          },
        })),

      resetForm: () => set(initialState),
    }),
    {
      name: "form-storage",
      partialize: (state) => ({
        currentStep: state.currentStep,
        bioData: state.bioData,
        careerExperience: state.careerExperience,
        identityDocument: state.identityDocument,
        introductionVideo: state.introductionVideo,
      }),
    }
  )
);
