import { useModalStore } from "@/store/useModal";
import { Child } from "@/types";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface LearnersListProps {
  learners?: Child[];
}

export default function LearnersList({ learners }: LearnersListProps) {
  const { openModal } = useModalStore();
  return (
    <div className="w-full lg:rounded-2xl shadow-md p-5 bg-[#f8f6f4] lg:max-w-[360px] flex flex-col justify-between gap-4">
      <h3 className="text-[#FFA300] whitespace-nowrap font-medium font-aero-trial leading-tight lg:hidden">
        Add another Learner?
      </h3>
      <div className="flex gap-2">
        <ScrollArea className="whitespace-nowrap w-full">
          <div className="flex lg:flex-col gap-2 lg:gap-4 w-max lg:w-full">
            {learners &&
              learners.map((student, i) => (
                <div
                  key={i}
                  className={`text-white gap-2 px-2 py-4 lg:p-4 rounded-xl flex items-center justify-between odd:bg-[#031D95] even:bg-[#FFA300]`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black font-bold text-sm">
                      👧
                    </div>
                    <div>
                      <p className="font-semibold text-base leading-tight">
                        {student.name}
                      </p>
                      <p className="text-xs">
                        {student.age} years, {student.grade}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      openModal("editLearner", { learner: student })
                    }
                    className="text-white text-xl font-bold leading-none"
                  >
                    ⋮
                  </button>
                </div>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Button
          className="bg-primary focus:bg-secondary h-auto shrink-0 px-1.5 py-3 rounded-lg lg:hidden"
          onClick={() => openModal("addLearner", {})}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Add Learner Section */}
      <div className="mt-10 hidden lg:block">
        <h3 className="text-[#FFA300] text-xl font-semibold leading-tight">
          Add another <br /> Learner today
        </h3>
        <p className="text-sm text-black mt-2">What are you learning today?</p>
        <button
          onClick={() => openModal("addLearner", {})}
          className="mt-4 w-full border border-[#031D95] text-[#031D95] rounded-full px-4 py-3 text-sm font-medium hover:bg-[#031D95] hover:text-white transition"
        >
          Add a Learner +
        </button>
      </div>
    </div>
  );
}
