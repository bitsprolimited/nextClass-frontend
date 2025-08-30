import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormStore } from "@/store/useProfileSetupForm";
import { useSubmitIntroductionVideo, useUploadIntroductionVideo } from "@/hooks/useProfileFormSubmission";
import { IntroductionVideoFormData, introductionVideoSchema } from "@/lib/schema";
import VideoModal from "./VideoModal";

interface StepFourProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepFour({ onBack, onSubmit }: StepFourProps) {
  const { introductionVideo, updateIntroductionVideo } = useFormStore();
  const submitIntroductionVideo = useSubmitIntroductionVideo();
  const uploadIntroductionVideoMutation = useUploadIntroductionVideo();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<IntroductionVideoFormData>({
    resolver: zodResolver(introductionVideoSchema),
    defaultValues: {
      videoFile: introductionVideo.videoFile,
    },
  });

  const handleVideoSelect = (file: File) => {
    setSelectedFile(file);
    form.setValue("videoFile", file);
  };

  console.log(form.formState.errors);
  

  const handleSubmit = async (data: IntroductionVideoFormData) => {
    const formData = {
      ...data,
      videoFile: selectedFile || data.videoFile,
    };

    updateIntroductionVideo(formData);

    try {
      // Upload video file first
      let videoUrl = "";
      if (selectedFile) {
        const result = await uploadIntroductionVideoMutation.mutateAsync(
          selectedFile
        );
        videoUrl = result.fileUrl;
      }

      // Submit form data with video URL
      await submitIntroductionVideo.mutateAsync({
        introductionVideoUrl: videoUrl,
      });

      onSubmit();
    } catch (error) {
      console.error("Failed to submit introduction video:", error);
    }
  };

  const isSubmitting =
    submitIntroductionVideo.isPending ||
    uploadIntroductionVideoMutation.isPending;

  return (
    <div className="space-y-4">
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center text-sm text-muted-foreground"
      >
        <ChevronLeft size={20} className="text-secondary" />
        Back to Identity Verification
      </button>

      {/* Heading */}
      <h2 className="text-3xl font-playfair-display font-semibold text-foreground">
        <span className="font-semibold text-foreground">Introduction </span>
        <span className="text-[#fca311] font-bold">Video</span>
      </h2>

      <Form {...form}>
        <div className="py-10">
          {/* Upload/Record Section */}
          <div className="text-center space-y-4">
            <Button
              type="button"
              onClick={() => setIsModalOpen(true)}
              variant="link"
              className="text-sm font-semibold text-primary underline"
            >
              Tap to Record or Upload Video
            </Button>

            {selectedFile && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Selected Video:</p>
                <p className="text-sm text-gray-700">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>

                {/* Video preview */}
                <div className="mt-3">
                  <video
                    src={URL.createObjectURL(selectedFile)}
                    controls
                    className="w-full max-h-48 rounded-lg"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  className="mt-2"
                >
                  Change Video
                </Button>
              </div>
            )}

            <FormField
              control={form.control}
              name="videoFile"
              render={() => (
                <FormItem>
                  <FormControl>
                    <input type="hidden" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="button"
            onClick={form.handleSubmit(handleSubmit)}
            disabled={isSubmitting || !selectedFile}
            className="w-full bg-secondary h-auto p-4 text-white mt-6 rounded-full"
          >
            {isSubmitting ? "Submitting..." : "Submit All Details"}
          </Button>

          {/* Tips */}
          <div className="space-y-4 mt-10">
            <h3 className="text-lg font-medium text-gray-700">
              Video Guidelines:
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>Recommended length: 30-90 seconds</li>
              <li>
                Follow the{" "}
                <a href="#" className="underline text-blue-700">
                  detailed guidelines
                </a>
              </li>
              <li>Ensure good lighting and clear audio</li>
              <li>Introduce yourself and explain why you want to teach</li>
              <li>Speak clearly and maintain eye contact with the camera</li>
              <li>Watch your video to make sure it looks and sounds good!</li>
            </ul>
          </div>
        </div>
      </Form>

      {/* Video Modal */}
      <VideoModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onVideoSelect={handleVideoSelect}
      />
    </div>
  );
}
