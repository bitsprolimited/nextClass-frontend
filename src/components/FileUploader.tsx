"use client";

import {
  AlertCircleIcon,
  PaperclipIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileWithPreview, formatBytes } from "@/hooks/use-file-upload";

interface FileUploaderProps {
  files: FileWithPreview[];
  isDragging: boolean;
  errors: string[];
  handleDragEnter: (e: React.DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLElement>) => void;
  openFileDialog: () => void;
  removeFile: (id: string) => void;
  getInputProps: (
    props?: React.InputHTMLAttributes<HTMLInputElement> | undefined
  ) => React.InputHTMLAttributes<HTMLInputElement> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: any;
  };
  maxSize: number;
  disabled?: boolean;
}

export default function FileUploader({
  files,
  isDragging,
  errors,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  openFileDialog,
  removeFile,
  getInputProps,
  maxSize,
  disabled = false,
}: FileUploaderProps) {
  const file = files[0];
  const isDisabled = disabled || Boolean(file);

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        role="button"
        onClick={isDisabled ? undefined : openFileDialog}
        onDragEnter={isDisabled ? undefined : handleDragEnter}
        onDragLeave={isDisabled ? undefined : handleDragLeave}
        onDragOver={isDisabled ? undefined : handleDragOver}
        onDrop={isDisabled ? undefined : handleDrop}
        data-dragging={isDragging || undefined}
        className={`flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors ${
          isDisabled
            ? "pointer-events-none opacity-50 border-gray-200"
            : "border-input hover:bg-accent/50 cursor-pointer"
        } ${
          isDragging ? "bg-accent/50 border-primary" : ""
        } has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50`}
      >
        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload file"
          disabled={isDisabled}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div
            className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
            aria-hidden="true"
          >
            <UploadIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium">Upload certificate</p>
          <p className="text-xs text-muted-foreground">
            Drag & drop or click to browse (max. {formatBytes(maxSize)})
          </p>
        </div>
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div
          className="flex items-center gap-1 text-xs text-destructive"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* File preview */}
      {file && (
        <div className="space-y-2">
          <div
            key={file.id}
            className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2 bg-[#4255AF0f]"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <PaperclipIcon
                className="size-4 shrink-0 opacity-60"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium">
                  {file.file.name}
                </p>
                {file.file.size > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.file.size)}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
              onClick={() => removeFile(file.id)}
              aria-label="Remove file"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
