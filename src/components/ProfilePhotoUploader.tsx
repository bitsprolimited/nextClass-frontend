"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateProfilePicture } from "@/services/profile.service";
import { uploadFileToS3 } from "@/services/upload.service";
import type { User } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera, Loader2 } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { toast } from "sonner";

type ProfilePhotoUploaderProps = {
  user: User;
  avatarClassName: string;
  fallbackClassName?: string;
  showTextAction?: boolean;
};

const MAX_PROFILE_PHOTO_SIZE = 5 * 1024 * 1024;
const PROFILE_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export default function ProfilePhotoUploader({
  user,
  avatarClassName,
  fallbackClassName,
  showTextAction = false,
}: ProfilePhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const { fileUrl } = await uploadFileToS3(file, "profile-photos");
      await updateProfilePicture(fileUrl);
      return fileUrl;
    },
    onSuccess: (fileUrl) => {
      queryClient.setQueryData<{ user: User }>(["profile"], (current) =>
        current
          ? { user: { ...current.user, profilePicture: fileUrl } }
          : current
      );
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile photo updated");
    },
    onError: (error) => {
      console.error("Profile photo upload error:", error);
      toast.error("Failed to update profile photo");
    },
  });

  const isUploading = uploadMutation.isPending;

  const openFilePicker = () => {
    if (!isUploading) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!PROFILE_PHOTO_TYPES.includes(file.type)) {
      toast.error("Please select a JPG, PNG, WEBP, or GIF image");
      return;
    }

    if (file.size > MAX_PROFILE_PHOTO_SIZE) {
      toast.error("Profile photo must be 5MB or smaller");
      return;
    }

    uploadMutation.mutate(file);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        className="group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#031D95] focus-visible:ring-offset-2"
        onClick={openFilePicker}
        disabled={isUploading}
        aria-label="Change profile photo"
      >
        <Avatar className={avatarClassName}>
          <AvatarImage src={user.profilePicture ?? ""} />
          <AvatarFallback className={fallbackClassName}>
            {user.fullName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-white transition group-hover:bg-black/35 group-focus-visible:bg-black/35">
          {isUploading ? (
            <Loader2 className="h-7 w-7 animate-spin opacity-100" />
          ) : (
            <Camera className="h-7 w-7 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100" />
          )}
        </span>
      </button>
      {showTextAction ? (
        <button
          type="button"
          className="text-sm font-medium text-[#031D95] hover:underline mt-2 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={openFilePicker}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Change Image"}
        </button>
      ) : null}
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={PROFILE_PHOTO_TYPES.join(",")}
        onChange={handleFileChange}
      />
    </div>
  );
}
