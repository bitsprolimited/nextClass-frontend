"use client";

import { Teacher } from "@/types";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function MyQualificationsSection({ tutor }: { tutor: Teacher }) {
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

        <div className="inline-flex flex-col items-center gap-8 w-full">
          <div className="flex flex-wrap self-stretch items-start w-full relative">
            {tutor?.qualifications?.map((qualification, index) => (
              <Card key={index} className="w-full max-w-[600px] px-8 py-6">
                <CardContent className="inline-flex flex-col gap-4 relative p-0 w-full capitalize">
                  <div className="flex justify-between gap-4">
                    <div className="inline-flex gap-1.5 flex-col items-start">
                      <h3 className="font-light font-montserrat italic text-[#ffa300]">
                        {qualification.type}
                      </h3>
                      <p className="text-[#031d95] font-semibold text-2xl">
                        {qualification.courseName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[#003B95]">
                      <button>
                        <Pencil size={16} />
                      </button>
                      <button>
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-end justify-between relative w-full">
                    <span className="font-montserrat text-[#757575]">
                      {qualification.issuingInstitution}
                    </span>
                    <span className="text-[#031d9559] font-montserrat flex items-center gap-2">
                      <span>Exp</span>
                      {qualification.expiryDate
                        ? format(
                            new Date(qualification.expiryDate),
                            "dd.MM.yyyy"
                          )
                        : "—"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
