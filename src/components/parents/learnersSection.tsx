import Image from "next/image";
import { MoreVertical } from "lucide-react";

const learners = [
  {
    name: "Jack Patterson",
    age: "7yrs",
    grade: "Grade 7",
    color: "bg-[#6C2BD9]",
    avatar: "/images/avatar-1.png",
  },
  {
    name: "Jack Patterson",
    age: "7yrs",
    grade: "Grade 7",
    color: "bg-[#3461FF]",
    avatar: "/images/avatar-1.png",
  },
  {
    name: "Jack Patterson",
    age: "7yrs",
    grade: "Grade 7",
    color: "bg-[#FFA347]",
    avatar: "/images/avatar-1.png",
  },
  {
    name: "Ethan",
    age: "5yrs",
    grade: "Grade 5",
    color: "bg-[#21AC5E]",
    avatar: "/images/avatar-1.png",
  },
];

export default function LearnersSection() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-6 shadow-md">
      <div className="bg-[#F4F4F4] p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#2c241b]">Learners</h2>
          <button className="text-sm font-medium text-[#031D95] hover:underline">
            + Add another Learner
          </button>
        </div>

        {/* Scrollable Learners Row */}
        <div className="overflow-x-auto">
          <div className="inline-flex gap-4 min-w-full">
            {learners.map((learner, idx) => (
              <div
                key={idx}
                className={`${learner.color} text-white p-4 rounded-xl flex items-center gap-4 w-[300px] relative shrink-0`}
              >
                <Image
                  src={learner.avatar}
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
        </div>
      </div>
    </section>
  );
}
