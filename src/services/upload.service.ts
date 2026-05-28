import axios from "axios";
import axiosInstance from "@/lib/axios";

export type UploadFolder =
  | "certificates"
  | "identity-documents"
  | "introduction-videos"
  | "profile-photos";

type PresignedUploadResponse = {
  uploadUrl: string;
  fileUrl: string;
  key: string;
  expiresIn: number;
  headers: Record<string, string>;
};

export const uploadFileToS3 = async (
  file: File,
  folder: UploadFolder
): Promise<{ fileUrl: string; key: string }> => {
  const presignedResponse = await axiosInstance.post<PresignedUploadResponse>(
    "/upload/presigned-url",
    {
      fileName: file.name,
      contentType: file.type,
      fileSize: file.size,
      folder,
    }
  );

  const { uploadUrl, fileUrl, key, headers } = presignedResponse.data;

  await axios.put(uploadUrl, file, {
    headers,
    withCredentials: false,
  });

  return { fileUrl, key };
};
