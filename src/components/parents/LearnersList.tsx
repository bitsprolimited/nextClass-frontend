import React, { useState } from "react";
import AddLearnerModal from "../modals/AddLearnerModal";
import { Child } from "@/types";

interface LearnersListProps {
  learners?: Child[];
}

export default function LearnersList({ learners }: LearnersListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="w-full rounded-2xl shadow-md p-6 bg-[#f8f6f4]  lg:max-w-[360px] flex flex-col justify-between">
      <div className="space-y-4">
        {learners && learners.map((student, i) => (
          <div
            key={i}
            className={`text-white p-4 rounded-xl flex items-center justify-between odd:bg-[#031D95] even:bg-[#FFA300]`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm">
                👧
              </div>
              <div>
                <p className="font-semibold text-base leading-tight">
                  {student.name}
                </p>
                <p className="text-sm">
                  {student.age} years, {student.grade}
                </p>
              </div>
            </div>
            <button className="text-white text-xl font-bold leading-none">
              ⋮
            </button>
          </div>
        ))}
      </div>

      {/* Add Learner Section */}
      <div className="mt-10">
        <h3 className="text-[#FFA300] text-xl font-semibold leading-tight">
          Add another <br /> Learner today
        </h3>
        <p className="text-sm text-black mt-2">What are you learning today?</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 w-full border border-[#031D95] text-[#031D95] rounded-full px-4 py-3 text-sm font-medium hover:bg-[#031D95] hover:text-white transition"
        >
          Add a Learner +
        </button>
      </div>
      {/* Modal component at the bottom of the page */}
      <AddLearnerModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}
