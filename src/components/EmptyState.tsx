import { Users } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

function EmptyState({
  title = "No tutors found",
  description = "We couldn't find any tutors at the moment. Please check back later.",
  icon = <Users className="w-12 h-12 text-gray-400" />,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-primary hover:bg-secondary px-6 py-2 rounded-full"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
