// components/MyQualificationsSection.tsx
"use client";

import QualificationCard from "./QualificationCard";
import { useState } from "react";

const dummyData = [
  {
    id: "1",
    title: "Fundamentals of Web Design",
    type: "Diploma",
    fileName: "IMGVV001",
    fileSize: "8mb",
    fileFormat: "PNG",
    institution: "BITSPRO ACADEMY",
    expiry: "26.07.2030",
  },
  {
    id: "2",
    title: "Fundamentals of Web Design",
    type: "Diploma",
    fileName: "IMGVV001",
    fileSize: "8mb",
    fileFormat: "PNG",
    institution: "BITSPRO ACADEMY",
    expiry: "26.07.2030",
  },
];

export default function MyQualificationsSection() {
  const [qualifications, setQualifications] = useState(dummyData);

  const handleRemove = (id: string) => {
    setQualifications((prev) => prev.filter((q) => q.id !== id));
  };

  const handleEdit = (id: string) => {
    console.log("Edit qualification with ID:", id);
    // Implement edit logic or modal
  };

  const handleAdd = () => {
    // Trigger modal or new form
    console.log("Add qualification");
  };

  return (
    <section className="w-full max-w-6xl mx-auto py-10">
      <h2 className="text-2xl font-semibold text-[#2C241B] mb-4">
        My Qualifications
      </h2>

      <div className="bg-[#f5f6fc] p-6 rounded-2xl">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAdd}
            className="text-[#003B95] text-sm font-medium hover:underline"
          >
            + Add Another Qualification
          </button>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          {qualifications.map((q) => (
            <QualificationCard
              key={q.id}
              qualification={q}
              onRemove={handleRemove}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
