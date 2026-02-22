// components/QualificationCard.tsx
import { Pencil, Trash2 } from "lucide-react";

type Qualification = {
  id: string;
  title: string;
  type: string;
  fileName: string;
  fileSize: string;
  fileFormat: string;
  institution: string;
  expiry: string;
};

export default function QualificationCard({
  qualification,
  onRemove,
  onEdit,
}: {
  qualification: Qualification;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-xs relative w-full max-w-[500px]">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-sm italic text-[#F4B400]">Diploma in</p>
          <h3 className="text-2xl font-bold text-[#003B95] leading-tight">
            {qualification.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-[#003B95]">
          <button onClick={() => onEdit(qualification.id)}>
            <Pencil size={16} />
          </button>
          <button onClick={() => onRemove(qualification.id)}>
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* File display */}
      <div className="flex items-start gap-3 bg-[#f4f4f6] p-3 rounded-lg mb-3">
        <div className="bg-[#003B95] text-white text-xs px-2 py-1 rounded-md">
          PNG
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm">{qualification.fileName}</p>
          <p className="text-xs text-gray-500">
            {qualification.fileSize} ・ {qualification.fileFormat}
          </p>
          <button
            onClick={() => onRemove(qualification.id)}
            className="text-xs text-red-500 mt-1 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-600">
        <p className="font-medium">{qualification.institution}</p>
        <p className="text-[#A1A1A1]">exp. {qualification.expiry}</p>
      </div>
    </div>
  );
}
