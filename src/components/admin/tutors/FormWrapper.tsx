"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function FormWrapper({
  title,
  steps,
  onClose,
}: {
  title: string;
  steps: React.ReactNode[];
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const isLast = index === steps.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500">
              {index + 1}/{steps.length}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 px-2 py-1 rounded"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </header>

        <main className="p-6 min-h-[220px]">
          <div>{steps[index]}</div>
        </main>

        <footer className="flex items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500">
            Step {index + 1} of {steps.length}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
            >
              Previous
            </Button>

            {!isLast && (
              <Button
                onClick={() =>
                  setIndex((i) => Math.min(steps.length - 1, i + 1))
                }
              >
                Continue
              </Button>
            )}

            {isLast && (
              <Button
                onClick={async () => {
                  onClose();
                }}
              >
                Save Changes
              </Button>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
