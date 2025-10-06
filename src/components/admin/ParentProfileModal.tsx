import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";

export default function ParentProfileModal({
  open,
  onClose,
  parent,
}: {
  open: boolean;
  onClose: () => void;
  parent: any; // Replace with your Parent type/interface when available
}) {
  if (!parent) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[650px] rounded-xl p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-2 border-b">
          <DialogTitle className="text-2xl font-bold">
            Parent Profile
          </DialogTitle>
          <DialogClose asChild>
            <button type="button">
              <X size={28} />
            </button>
          </DialogClose>
        </DialogHeader>
        <div className="px-8 py-8 overflow-y-auto h-[calc(650px-80px)]">
          {/* Profile Image and Details */}
          <div className="flex items-center gap-6 mb-8">
            <Image
              src={parent.avatar}
              alt={parent.name}
              width={70}
              height={70}
              className="rounded-full object-cover"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-2 w-full">
              <div>
                <div className="text-xs text-gray-400">Name</div>
                <div className="font-bold">{parent.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Email</div>
                <div className="font-bold">{parent.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Phone Number</div>
                <div className="font-bold">
                  {parent.phone || "johndoe@xyz.com"}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Gender</div>
                <div className="font-bold">{parent.gender || "Male"}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Address</div>
                <div className="font-bold">
                  {parent.address || "1234, Street Name, Area."}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">City/State</div>
                <div className="font-bold">
                  {parent.cityState || "Houston/Texas"}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Country</div>
                <div className="flex items-center gap-2 font-bold">
                  <Image
                    src={parent.country.flag}
                    alt={parent.country.code}
                    width={24}
                    height={16}
                  />
                  {parent.country.code}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">Status</div>
                <span
                  className={`bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold`}
                >
                  {parent.status}
                </span>
              </div>
            </div>
          </div>
          {/* Learners */}
          <hr className="my-4" />
          <div>
            <div className="text-xs text-gray-400 mb-2">Learners</div>
            <div className="flex flex-wrap gap-8">
              {(parent.learnersFull || []).map((learner: any, idx: number) => (
                <div key={idx} className="min-w-[180px]">
                  <div className="font-bold">
                    {learner.name} -{" "}
                    <span className="font-normal text-gray-500">
                      {learner.age}yrs
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Grade {learner.grade} &nbsp;•&nbsp;{" "}
                    {learner.subjects?.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer Buttons */}
        <div className="flex justify-center gap-4 bg-[#F5F4F8] py-6 px-8 border-t">
          <Button variant="outline" className="rounded-full w-40">
            Close
          </Button>
          <Button className="bg-secondary text-white rounded-full w-40">
            Edit Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
