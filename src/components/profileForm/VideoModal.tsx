import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatTime } from "@/lib/utils";
import { RotateCcw, Square, Upload, Video } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface VideoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVideoSelect: (file: File) => void;
}

export default function VideoModal({
  open,
  onOpenChange,
  onVideoSelect,
}: VideoModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopPreview = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    // Clear timer interval
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  }, []);

  const startPreview = useCallback(async () => {
    try {
      if (streamRef.current) return;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }, []);

  const handleTabChange = useCallback(
    async (value: string) => {
      if (value === "record") {
        await startPreview();
      } else {
        stopPreview();
      }
    },
    [startPreview, stopPreview]
  );

  const startRecording = useCallback(async () => {
    if (!streamRef.current) {
      await startPreview();
      console.log("Starting preview...");

      if (!streamRef.current) return;
      console.log("Starting recording...");
    }

    const stream = streamRef.current;
    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    recorder.onstop = () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedVideoUrl(url);
      setRecordedChunks(chunks);

      stopPreview();
    };

    // Reset and start timer
    setTimer(0);
    timerIntervalRef.current = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  }, [startPreview, stopPreview]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);

      // Clear timer interval
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  }, [mediaRecorder, isRecording]);

  const useRecordedVideo = useCallback(() => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const file = new File([blob], "recorded-video.webm", {
        type: "video/webm",
      });
      onVideoSelect(file);
      onOpenChange(false);
    }
  }, [recordedChunks, onVideoSelect, onOpenChange]);

  const resetRecording = useCallback(() => {
    setRecordedVideoUrl(null);
    setRecordedChunks([]);
    setTimer(0);

    // Important: clear any previous srcObject
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    startPreview(); // reattach the camera stream
  }, [startPreview]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const useUploadedVideo = () => {
    if (selectedFile) {
      onVideoSelect(selectedFile);
      onOpenChange(false);
    }
  };

  useEffect(() => {
    return () => {
      stopPreview();
    };
  }, [open, stopPreview]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Introduction Video</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="upload"
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Video</TabsTrigger>
            <TabsTrigger value="record">Record Video</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <div className="text-center space-y-4">
              <div className="border-2 h-64 border-dashed border-gray-300 rounded-lg p-8">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-2"
                  >
                    Select Video File
                  </Button>
                  <p className="text-sm text-gray-500">
                    Supported formats: MP4, WebM, MOV (Max 50MB)
                  </p>
                </div>
              </div>

              {selectedFile && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium">
                    Selected: {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <Button onClick={useUploadedVideo} className="mt-2 w-full">
                    Use This Video
                  </Button>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </TabsContent>

          <TabsContent value="record" className="space-y-4">
            <div className="space-y-4 relative max-w-[312px] mx-auto">
              <div className="bg-black rounded-lg overflow-hidden relative">
                {recordedVideoUrl ? (
                  // Playback mode
                  <video
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-[426px] object-cover"
                    src={recordedVideoUrl}
                  />
                ) : (
                  // Preview mode
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-[426px] object-cover scale-x-[-1]"
                  />
                )}

                {/* Enhanced Timer Display */}
                {isRecording && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="font-mono text-sm font-bold">
                      {formatTime(timer)}
                    </span>
                  </div>
                )}

                <div className="flex justify-center space-x-4 absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  {!isRecording && !recordedVideoUrl && (
                    <Button
                      onClick={startRecording}
                      className="flex items-center gap-2 bg-[#4969FF] rounded-full"
                    >
                      <Video className="h-4 w-4" />
                      Start Recording
                    </Button>
                  )}

                  {isRecording && (
                    <Button
                      onClick={stopRecording}
                      variant="destructive"
                      className="flex items-center gap-2 rounded-full"
                    >
                      <Square className="h-4 w-4" />
                      Stop Recording
                      <span>{formatTime(timer)}</span>
                    </Button>
                  )}

                  {recordedVideoUrl && (
                    <div className="flex flex-col gap-2 w-full">
                      <Button
                        onClick={resetRecording}
                        variant="outline"
                        className="flex items-center gap-2 rounded-full max-w-[160px] h-10 bg-[#00000099] hover:bg-[#000000b3] text-white text-xs hover:text-white"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Record Again
                      </Button>
                      <Button
                        onClick={useRecordedVideo}
                        className="flex items-center gap-2 rounded-full bg-[#FFA300] hover:bg-[#FFA300] hover px-10"
                      >
                        Submit Introductory Video
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
