import { ArrowLeft, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface StepFourProps {
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepFour({ onBack, onSubmit }: StepFourProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center text-sm text-muted-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Identity Verification
      </button>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-foreground">
        <span className="font-semibold text-foreground">Introduction </span>
        <span className="text-[#fca311] font-bold">Video</span>
      </h2>

      {/* Upload/Record */}
      <div className="text-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-blue-700 font-semibold underline"
        >
          Tap To Record Or Upload Video
        </button>
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
        {selectedFile && (
          <p className="mt-2 text-sm text-muted-foreground">
            Selected: {selectedFile.name}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        onClick={onSubmit}
        className="bg-[#fca311] hover:bg-[#fca311]/90 w-full h-12 rounded-full text-white text-base font-medium"
      >
        Submit All Details
      </Button>

      {/* Tips */}
      <ul className="text-sm text-muted-foreground space-y-1 mt-4 list-disc list-inside">
        <li>Recommended length: 30-90 seconds</li>
        <li>
          Follow the{" "}
          <a href="#" className="underline text-blue-700">
            guidelines
          </a>
        </li>
        <li>Watch your video to make sure it looks and sounds good!</li>
      </ul>
    </div>
  );
}
