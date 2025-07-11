"use client";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { Child } from "@/types";
import AddLearnerModal from "../modals/AddLearnerModal";
import { useState } from "react";
import { Button } from "../ui/button";

export default function LearnersSection({ learners }: { learners?: Child[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="w-full max-w-6xl mx-auto mt-6 shadow-md">
      <div className="bg-[#F4F4F4] p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#2c241b]">Learners</h2>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="link"
            className="text-sm font-medium text-[#031D95] hover:underline"
          >
            + Add another Learner
          </Button>
        </div>

        {/* Scrollable Learners Row */}
        <div className="overflow-x-auto">
          {Array.isArray(learners) && learners?.length > 0 && (
            <div className="inline-flex gap-4 min-w-full">
              {learners.map((learner, idx) => (
                <div
                  key={idx}
                  className={`odd:bg-[#031D95] even:bg-[#FFA300] text-white p-4 rounded-xl flex items-center gap-4 w-[300px] relative shrink-0`}
                >
                  <Image
                    src={"/images/avatar-1.png"}
                    alt={learner.name}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{learner.name}</p>
                    <span className="text-xs">{`${learner.age}, ${learner.grade}`}</span>
                  </div>
                  <MoreVertical className="absolute top-2 right-2 w-4 h-4 text-white" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AddLearnerModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </section>
  );
}
