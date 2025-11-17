"use client";

import { Card } from "@/components/ui/card";
import { Learner } from "@/lib/constants";

export default function TutorSidebarCard({}: { learners?: Learner[] }) {
  return (
    <Card className="p-6 h-[400px] overflow-y-auto">
      <h2 className="text-lg mb-4 font-semibold text-gray-800">Learners</h2>

      <div className="space-y-4 text-sm">
        {[
          { name: "Jamie Sanders", age: 6 },
          { name: "Lydia Sanders", age: 7 },
          { name: "Aram Sanders", age: 9 },
        ].map((learner, idx) => (
          <div
            key={idx}
            className="flex flex-col border-b pb-3 last:border-b-0"
          >
            <p className="font-semibold text-gray-800">
              {learner.name} - {learner.age}yrs
            </p>
            <p className="text-gray-500 text-sm">
              Grade 1 • Mathematics, English
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
