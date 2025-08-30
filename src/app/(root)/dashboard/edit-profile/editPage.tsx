"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  CloudUploadIcon,
  Pencil,
  Plus,
  Trash2,
  X
} from "lucide-react";
import { useRef, useState } from "react";

// Add any other imports you need from your step components

export default function EditProfilePage() {
  // States for all steps
  const [issueDate, setIssueDate] = useState<Date>();
  const [expiryDate, setExpiryDate] = useState<Date>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const grades = [
    "KG/Nursery",
    "Grade 1-3",
    "Grade 4-6",
    "Grade 7-9",
    "Grade 10-12",
  ];

  // Qualification data state
  const [qualifications] = useState([
    {
      id: 1,
      type: "Diploma",
      course: "Fundamentals of Web Design",
      institution: "BITSPRO ACADEMY",
      expiry: "26.07.2030",
      file: {
        name: "IMGVV001",
        size: "8mb",
        format: "PNG",
      },
    },
    // Add more as needed
  ]);

  // Add other states for StepOne, StepTwo, StepFour as needed
  const [showQualificationForm, setShowQualificationForm] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleGradeClick = (grade: string) => {
    if (!selectedGrades.includes(grade)) {
      setSelectedGrades([...selectedGrades, grade]);
    }
  };

  const handleRemoveGrade = (grade: string) => {
    setSelectedGrades(selectedGrades.filter((g) => g !== grade));
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center  py-10">
      <div className="w-full max-w-6xl bg-[#f7f7fa] rounded-2xl shadow p-8 space-y-12">
        <div className="max-w-[418px] w-full mx-auto space-y-10">
          {/* BioData Section */}
          <section>
            <h2 className="text-xl font-semibold text-[#001E62] mb-4">
              Bio<span className="text-[#fbbd35]">Data</span>
            </h2>
            <div className="space-y-4">
              <Input
                placeholder="Full Name"
                className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white"
              />
              <Input
                placeholder="Email Address"
                className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white"
              />
              <Input
                placeholder="Phone Number"
                className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white"
              />
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Lagos">Lagos</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Ikeja">Ikeja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Tell us a little about yourself"
                className="h-24 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white resize-none"
              />
              <Button className="w-full bg-secondary text-white rounded-full h-12 font-semibold">
                Update
              </Button>
            </div>
          </section>

          {/* Career Experience Section */}
          <section>
            <h2 className="text-xl font-semibold text-[#001E62] mb-4">
              Career <span className="text-[#fbbd35]">Experience</span>
            </h2>
            <Textarea
              placeholder="Type a subject you teach..."
              className="bg-white h-24 border border-gray-300 rounded-lg px-4 text-gray-700 resize-none mb-4"
            />
            {/* Grades selection */}
            <div className="bg-white p-4 rounded-xl shadow mb-4">
              <p className="mb-2 text-slate-500">
                Tap to select the grade you teach
              </p>
              <div className="flex flex-wrap gap-2 text-primary">
                {/* Selected grades */}
                {selectedGrades.map((grade) => (
                  <div
                    key={grade}
                    className="flex items-center px-4 py-1 rounded-full text-sm bg-[#F3F6FF] border border-[#001E62] text-[#001E62] font-semibold cursor-pointer"
                  >
                    <span className="mr-2">{grade}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveGrade(grade)}
                      className="ml-1 text-[#001E62] hover:text-red-500"
                      aria-label={`Remove ${grade}`}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {/* Unselected grades */}
                {grades
                  .filter((grade) => !selectedGrades.includes(grade))
                  .map((grade) => (
                    <div
                      key={grade}
                      className="px-4 py-1 rounded-full text-sm border border-[#001E62] text-[#001E62] cursor-pointer hover:bg-[#001E62] hover:text-white transition"
                      onClick={() => handleGradeClick(grade)}
                    >
                      {grade}
                    </div>
                  ))}
              </div>
            </div>
            {/* Years of Experience Select */}
            <Select>
              <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white mb-4">
                <SelectValue placeholder="Select your Years of Experience" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="1">1 year</SelectItem>
                <SelectItem value="2">2 years</SelectItem>
                <SelectItem value="3">3 years</SelectItem>
                <SelectItem value="4">4 years</SelectItem>
                <SelectItem value="5">5+ years</SelectItem>
              </SelectContent>
            </Select>
            {/* Qualifications details */}
            <div className="bg-white p-4 rounded-xl shadow space-y-5">
              <h3 className="text-lg font-semibold text-gray-600 mb-0">
                Qualifications details
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Provide details of certificates and qualifications here
              </p>

              {/* Existing qualification cards */}
              {qualifications.map((q) => (
                <div
                  key={q.id}
                  className="rounded-xl p-4 mb-2"
                  style={{ background: "rgba(3, 29, 149, 0.04)" }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-[#fbbd35] italic">
                      Diploma in
                    </span>
                    <div className="flex gap-2">
                      <button className="text-[#001E62] hover:text-[#fbbd35]">
                        <Pencil size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-base font-semibold text-[#001E62] mb-2">
                    {q.course}
                  </div>
                  <div className="text-xs text-gray-500">{q.institution}</div>
                  <div className="flex justify-end text-xs text-[#001E62]">
                    exp. {q.expiry}
                  </div>
                </div>
              ))}

              {/* Add Qualification Form */}
              {showQualificationForm && (
                <div className="space-y-4 mt-4">
                  <Select>
                    <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                      <SelectValue placeholder="Select the type of qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Certificate">Certificate</SelectItem>
                      <SelectItem value="Degree">Degree</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Input Course Name"
                    className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white"
                  />
                  <Input
                    placeholder="Input Issuing Institution"
                    className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-12 w-full flex items-center border border-gray-300 rounded-lg px-4 text-gray-700 bg-white justify-between",
                          !expiryDate && "text-muted-foreground"
                        )}
                        style={{ boxShadow: "none" }}
                      >
                        <span className="flex items-center gap-2">
                          <CalendarIcon className="h-5 w-5 text-[#fbbd35]" />
                          {expiryDate ? (
                            format(expiryDate, "PPP")
                          ) : (
                            <span className="text-gray-400 font-normal">
                              Select Expiry date{" "}
                              <span className="italic">(optional)</span>
                            </span>
                          )}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={expiryDate}
                        onSelect={setExpiryDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {/* File formats allowed */}
                  <div className="flex justify-center gap-2 mb-2">
                    <span className="text-xs text-gray-500">
                      File formats allowed:
                    </span>
                    <span
                      className=" text-green-700 px-2 py-0.5 rounded text-xs font-medium"
                      style={{ background: "rgba(3, 29, 149, 0.04)" }}
                    >
                      JPG
                    </span>
                    <span className="bg-[#E6F0FF] text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                      PNG
                    </span>
                    <span className="bg-[#F3F6FF] text-[#0395B7] px-2 py-0.5 rounded text-xs font-medium">
                      WebP
                    </span>
                  </div>
                  {/* Upload Box */}
                  <div className="border border-dashed border-gray-300 p-4 rounded-xl text-center bg-[#F9F7F5]">
                    <CloudUploadIcon
                      className="mx-auto text-primary mb-2 cursor-pointer"
                      size={32}
                      onClick={handleUploadClick}
                    />
                    <Label
                      className="block text-base text-gray-600 mb-1 font-medium cursor-pointer"
                      onClick={handleUploadClick}
                    >
                      Select files here
                    </Label>
                    <span className="block text-xs text-gray-400 mb-2">
                      (Max file size: 8mb)
                    </span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handleFileChange}
                    />
                    {selectedFile && (
                      <div className="mt-2 text-sm text-gray-700">
                        Selected: {selectedFile.name}
                      </div>
                    )}
                  </div>
                  {/* Action buttons */}
                  <div className="flex justify-between mt-4">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-primary font-semibold"
                      onClick={() => setShowQualificationForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      className="bg-primary text-white rounded-full h-12 font-semibold px-8"
                      onClick={() => {
                        // handle save logic here
                        setShowQualificationForm(false);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              )}

              {/* Add Another Qualification Button */}
              {!showQualificationForm && (
                <button
                  type="button"
                  className="flex items-center justify-end gap-2 text-[#fbbd35] text-base font-medium mt-4 w-full"
                  onClick={() => setShowQualificationForm(true)}
                >
                  <Plus size={20} />
                  Add Another Qualification
                </button>
              )}
            </div>
            <Button className="w-full bg-secondary text-white rounded-full h-12 font-semibold mt-2">
              Update Career Experience
            </Button>
          </section>

          {/* Identity Verification Section */}
          <section>
            <h2 className="text-xl font-semibold text-[#001E62] mb-4">
              Identity <span className="text-[#fbbd35]">Verification</span>
            </h2>
            <div className="space-y-4">
              <Select>
                <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                  <SelectValue placeholder="Select Means of Valid ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="National ID">National ID</SelectItem>
                  <SelectItem value="Passport">Passport</SelectItem>
                  <SelectItem value="Driver's License">
                    Driver&apos;s License
                  </SelectItem>
                  <SelectItem value="Voter's Card">Voter&apos;s Card</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-12 border border-gray-300 rounded-lg px-4 text-gray-700 bg-white">
                  <SelectValue placeholder="Select Issuing Authority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NIMC">NIMC</SelectItem>
                  <SelectItem value="FRSC">FRSC</SelectItem>
                  <SelectItem value="NIS">NIS</SelectItem>
                  <SelectItem value="INEC">INEC</SelectItem>
                </SelectContent>
              </Select>
              {/* Issuance Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full flex items-center border border-gray-300 rounded-lg px-4 text-gray-700 bg-white justify-between focus:ring-0 focus:outline-none",
                      !issueDate && "text-muted-foreground"
                    )}
                    style={{ boxShadow: "none" }}
                  >
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-[#fbbd35]" />
                      {issueDate ? (
                        format(issueDate, "PPP")
                      ) : (
                        <span className="text-gray-400 font-normal">
                          Issuance Date{" "}
                          <span className="italic">(If available)</span>
                        </span>
                      )}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={issueDate}
                    onSelect={setIssueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* Expiry Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full flex items-center border border-gray-300 rounded-lg px-4 text-gray-700 bg-white justify-between focus:ring-0 focus:outline-none",
                      !expiryDate && "text-muted-foreground"
                    )}
                    style={{ boxShadow: "none" }}
                  >
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-[#fbbd35]" />
                      {expiryDate ? (
                        format(expiryDate, "PPP")
                      ) : (
                        <span className="text-gray-400 font-normal">
                          Expiry Date{" "}
                          <span className="italic">(If available)</span>
                        </span>
                      )}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={expiryDate}
                    onSelect={setExpiryDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* Upload Box */}
              <div className="border border-dashed border-gray-300 p-4 rounded-xl text-center bg-[#F9F7F5]">
                <CloudUploadIcon
                  className="mx-auto text-[#7C3AED] mb-2 cursor-pointer"
                  size={32}
                  onClick={handleUploadClick}
                />
                <Label
                  className="block text-base text-gray-600 mb-1 font-medium cursor-pointer"
                  onClick={handleUploadClick}
                >
                  Select files here
                </Label>
                <span className="block text-xs text-gray-400 mb-2">
                  (Max file size: 8mb)
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <div className="mt-2 text-sm text-gray-700">
                    Selected: {selectedFile.name}
                  </div>
                )}
              </div>
              <Button className="w-full bg-secondary text-white rounded-full h-12 font-semibold mt-2">
                Continue To Introduction Video
              </Button>
            </div>
          </section>

          {/* Introduction Video Section */}
          <section>
            <h2 className="text-xl font-semibold text-[#001E62] mb-4">
              Introduction <span className="text-[#fbbd35]">Video</span>
            </h2>
            <Label className="text-sm text-gray-700 mb-2 block">
              Tap to Record or Upload Video
            </Label>
            {/* Add your video upload/record logic here */}
            <div className="border border-dashed border-gray-300 p-4 rounded-xl text-center bg-[#F9F7F5] mb-4">
              {/* Video upload/record UI */}
              <CloudUploadIcon
                className="mx-auto text-[#7C3AED] mb-2 cursor-pointer"
                size={32}
              />
              <Label className="block text-base text-gray-600 mb-1 font-medium cursor-pointer">
                Select video file here
              </Label>
              <span className="block text-xs text-gray-400 mb-2">
                (Max file size: 50mb)
              </span>
              <input
                type="file"
                className="hidden"
                accept="video/mp4,video/webm"
              />
            </div>
            <Button className="w-full bg-secondary text-white rounded-full h-12 font-semibold">
              Submit All Details
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
