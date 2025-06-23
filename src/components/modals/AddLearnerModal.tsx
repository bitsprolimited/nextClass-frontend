// components/modals/AddLearnerModal.tsx
"use client";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";

export default function AddLearnerModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center px-30"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <Dialog.Panel className="relative bg-white rounded-xl py-14 px-24 w-full max-w-xl z-50">
        <div className="absolute top-4 right-4">
          <button onClick={() => setIsOpen(false)}>
            <IoMdClose className="text-2xl text-gray-600 hover:text-red-600" />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-[#031D95] mb-2">
          Add Learner’s Details
        </h2>
        <p className="text-gray-600 mb-6">
          Add the details of your child/ward who is to partake of these lessons
        </p>

        <form className="space-y-4 border p-4">
          <input
            type="text"
            placeholder="Enter Learner’s Name"
            className="w-full border rounded-md px-4 py-3 outline-none"
          />
          <input
            type="email"
            placeholder="Enter Learner’s Email (optional)"
            className="w-full border rounded-md px-4 py-3 outline-none"
          />
          <div className="flex gap-4">
            <select className="w-1/2 border rounded-md px-4 py-3 text-gray-600">
              <option>Select Birth month</option>
              <option>January</option>
              <option>February</option>
              {/* Add more months */}
            </select>
            <select className="w-1/2 border rounded-md px-4 py-3 text-gray-600">
              <option>Select Birth year</option>
              <option>2015</option>
              <option>2016</option>
              {/* Add more years */}
            </select>
          </div>

          <input
            type="text"
            placeholder="Select or type in the subjects to learn"
            className="w-full border rounded-md px-4 py-3 outline-none"
          />

          <div className="flex flex-wrap gap-2">
            {[
              "English",
              "Math",
              "Science",
              "Fine Arts",
              "Coding & Tech",
              "Music",
            ].map((subject, i) => (
              <span
                key={i}
                className="border border-[#031D95] text-[#031D95] px-3 py-1 text-sm rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFA300] hover:to-blue-600 text-white py-4 mt-6 rounded-full"
          >
            Add New Learner
          </Button>
        </form>
      </Dialog.Panel>
    </Dialog>
  );
}
