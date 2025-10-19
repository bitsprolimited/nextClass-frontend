import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import QualificationCard from "../tutors/QualificationCard";

// Define interfaces
interface Qualification {
  title: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  institution?: string;
  expDate?: string;
}

interface Tutor {
  id: number;
  name: string;
  avatar: string;
  email: string;
  phone?: string;
  gender?: string;
  address?: string;
  cityState?: string;
  country: { code: string; flag: string };
  status: string;
  grades?: string;
  subjects?: string;
  experience?: string;
  description?: string;
  qualification?: Qualification[];
  introVideo?: string;
}

// Use the interface in props
export default function TutorVerificationModal({
  open,
  onClose,
  tutor,
}: {
  open: boolean;
  onClose: () => void;
  tutor: Tutor | null;
}) {
  if (!tutor) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[800px] rounded-xl p-0 overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-2 border-b">
          <DialogTitle className="text-2xl font-bold">
            Verification Approval
          </DialogTitle>
          <DialogClose asChild>
            <button onClick={onClose}>
              <X size={28} />
            </button>
          </DialogClose>
        </DialogHeader>
        {/* Scrollable content */}
        <div className="px-8 py-8 overflow-y-auto h-[calc(800px-80px)]">
          {/* Profile Image */}
          <div className="flex items-center gap-4 mb-8">
            <Image
              src={tutor.avatar}
              alt={tutor.name}
              width={70}
              height={70}
              className="rounded-full object-cover"
            />
          </div>
          {/* Profile Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 mb-8">
            <div>
              <div className="text-xs text-gray-400">Name</div>
              <div className="font-semibold">{tutor.name}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Email</div>
              <div className="font-semibold">{tutor.email}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Phone Number</div>
              <div className="font-semibold">{tutor.phone}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Gender</div>
              <div className="font-semibold">{tutor.gender || "Male"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Address</div>
              <div className="font-semibold">
                {tutor.address || "1234, Street Name, Area."}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">City/State</div>
              <div className="font-semibold">
                {tutor.cityState || "Houston/Texas"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Country</div>
              <div className="flex items-center gap-2 font-semibold">
                <Image
                  src={tutor.country.flag}
                  alt={tutor.country.code}
                  width={24}
                  height={16}
                />
                {tutor.country.code}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Status</div>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                {tutor.status}
              </span>
            </div>
            <div>
              <div className="text-xs text-gray-400">Grades</div>
              <div className="font-semibold">
                {tutor.grades || "Grade 1, 2, 3, 4, 5."}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Subjects</div>
              <div className="font-semibold whitespace-pre-line">
                {tutor.subjects ||
                  "Mathematics\nEnglish\nPhysics\nBasic Sciences"}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Experience</div>
              <div className="font-semibold">{tutor.experience || "5yrs"}</div>
            </div>
          </div>
          {/* Description */}
          <div className="mb-8">
            <div className="text-xs text-gray-400 mb-1">Description</div>
            <div className="bg-[#F5F4F8] rounded-lg p-4 text-sm">
              {tutor.description ||
                "My philosophy is that all students can and will learn. Each student is unique and learn their own way. My enthusiasm, lifelong passion for education and many years of experience are all qualities I bring to the table."}
            </div>
          </div>
          {/* ID Verification */}
          <div className="mb-8">
            <div className="text-xs text-gray-400 mb-2">ID Verification</div>
            <QualificationCard
              qualification={{
                id: "",
                title: "",
                type: "",
                fileName: "",
                fileSize: "",
                fileFormat: "",
                institution: "",
                expiry: "",
              }}
              onRemove={function (): void {
                throw new Error("Function not implemented.");
              }}
              onEdit={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>

          {/* Qualifications */}
          <div className="mb-8">
            <div className="text-xs text-gray-400 mb-2">Qualifications</div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tutor.qualification?.map((_q, _idx) => (
                <QualificationCard
                  qualification={{
                    id: "",
                    title: "",
                    type: "",
                    fileName: "",
                    fileSize: "",
                    fileFormat: "",
                    institution: "",
                    expiry: "",
                  }}
                  onRemove={function (_id: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  onEdit={function (_id: string): void {
                    throw new Error("Function not implemented.");
                  }} // key={q.fileName + idx}
                  // // type="diploma"
                  // title={q.title}
                  // fileName={q.fileName}
                  // fileType={q.fileType}
                  // fileSize={q.fileSize}
                  // institution={q.institution}
                  // expDate={q.expDate}
                />
              ))}
            </div> */}
          </div>
          {/* Introduction Video */}
          <div className="mb-8">
            <div className="text-xs text-gray-400 mb-1">Introduction Video</div>
            <video controls className="rounded-lg w-full max-w-xs">
              <source
                src={tutor.introVideo || "/videos/sample-intro.mp4"}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              Decline Tutor
            </Button>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Approve Tutor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
