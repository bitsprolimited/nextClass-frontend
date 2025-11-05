"use client";

import Image from "next/image";
import { Tutor } from "@/lib/constants";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import EditExperienceModal from "./EditExperienceModal";
import EditQualificationsModal from "./EditQualificationsModal";
import EditIDModal from "./EditIDModal";

export default function TutorProfileCard({ tutor }: { tutor: Tutor }) {
  const name = tutor?.name || "—";
  const email = tutor?.email || "—";
  const phone = tutor?.phone || "—";
  const address = tutor?.address || "—";
  const cityState = tutor?.cityState || "—";
  const country = tutor?.country?.code || "—";
  const countryFlag = tutor?.country?.flag || "/images/USA.png";
  const status = tutor?.status || "Pending";

  // additional fields from constants.ts / profileData
  const grades = tutor?.grades ?? tutor?.profileData?.grades ?? "—";
  const experience = tutor?.experience ?? tutor?.profileData?.experience ?? "—";
  const fee = tutor?.fee ?? tutor?.profileData?.fee ?? "—";
  const bankName = tutor?.bankName ?? tutor?.profileData?.bankName ?? "—";
  const accountNumber =
    tutor?.accountNumber ?? tutor?.profileData?.accountNumber ?? "—";
  const subjects = tutor?.subjects ?? tutor?.profileData?.subjects ?? "—";
  const bio = tutor?.bio ?? tutor?.profileData?.bio ?? "";

  const [openModal, setOpenModal] = useState<
    null | "profile" | "experience" | "quals" | "id"
  >(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Card className="p-6 h-[400px] overflow-y-auto">
      <Tabs defaultValue="bio" className="w-full">
        {/* Tabs List and Edit Button */}
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <TabsList className="h-auto bg-transparent p-0 space-x-6">
            <TabsTrigger
              value="bio"
              className="text-base font-semibold text-[#9FA3A9] data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none p-0"
            >
              Bio
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="text-base font-semibold text-[#9FA3A9] data-[state=active]:primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none p-0 "
            >
              Activities
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="text-base font-semibold text-[#9FA3A9] data-[state=active]:primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none p-0"
            >
              Reports
            </TabsTrigger>
          </TabsList>

          <div className="relative">
            <Button
              size="sm"
              className="bg-secondary text-white rounded-full px-4"
              onClick={() => setMenuOpen((s) => !s)}
            >
              Edit Profile
            </Button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-20">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    setOpenModal("profile");
                    setMenuOpen(false);
                  }}
                >
                  Edit Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    setOpenModal("experience");
                    setMenuOpen(false);
                  }}
                >
                  Edit Career / Experience
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    setOpenModal("quals");
                    setMenuOpen(false);
                  }}
                >
                  Edit Qualifications
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-50"
                  onClick={() => {
                    setOpenModal("id");
                    setMenuOpen(false);
                  }}
                >
                  Edit ID
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bio Content */}
        <TabsContent value="bio" className="mt-4 text-">
          <div className="flex items-start gap-4">
            {/* Profile Image */}
            <Avatar className="h-16 w-16">
              {tutor?.avatar ? (
                <AvatarImage src={tutor.avatar} alt={name} />
              ) : (
                <AvatarFallback className="text-xl bg-gray-200 text-gray-700">
                  {name
                    .split(" ")
                    .map((n) => n?.[0] ?? "")
                    .join("")}
                </AvatarFallback>
              )}
            </Avatar>

            {/* Profile Details Grid */}
            <div className="flex-1 grid grid-cols-4 gap-y-4 gap-x-8 text-sm">
              {/* Row 1 */}
              <div className="col-span-2 sm:col-span-1">
                <p className="text-gray-500">Name</p>
                <p className="font-semibold text-lg text-gray-800">{name}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium text-gray-700">{email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-700">{phone}</p>
              </div>

              {/* Row 2 */}
              <div>
                <p className="text-gray-500">Address</p>
                <p className="font-medium text-gray-700">{address}</p>
              </div>
              <div>
                <p className="text-gray-500">City/State</p>
                <p className="font-medium text-gray-700">{cityState}</p>
              </div>
              <div>
                <p className="text-gray-500">Country</p>
                <div className="flex items-center gap-2">
                  <Image
                    src={countryFlag}
                    alt={country}
                    width={20}
                    height={14}
                    className="inline-block"
                  />
                  <p className="font-medium text-gray-700">{country}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <Badge className="bg-secondary font-semibold ">{status}</Badge>
              </div>

              {/* Row 3 - additional profile fields */}
              <div>
                <p className="text-gray-500">Grades</p>
                <p className="font-medium text-gray-700">{grades}</p>
              </div>
              <div>
                <p className="text-gray-500">Experience</p>
                <p className="font-medium text-gray-700">{experience}</p>
              </div>
              <div>
                <p className="text-gray-500">Fee</p>
                <p className="font-medium text-gray-700">{fee}</p>
              </div>
              <div>
                <p className="text-gray-500">Bank</p>
                <p className="font-medium text-gray-700">{bankName}</p>
              </div>

              {/* Row 4 */}
              <div>
                <p className="text-gray-500">Account Number</p>
                <p className="font-medium text-gray-700">{accountNumber}</p>
              </div>
              <div className="col-span-3">
                <p className="text-gray-500">Subjects</p>
                <p className="font-medium text-sm text-gray-800">{subjects}</p>
              </div>

              {/* Bio / Description if present */}
              {bio ? (
                <div className="col-span-4 pt-2">
                  <p className="text-gray-500">About</p>
                  <p className="text-sm text-gray-700">{bio}</p>
                </div>
              ) : null}
            </div>
          </div>
        </TabsContent>

        {/* Activities and Reports Content */}
        <TabsContent value="activities" className="mt-4">
          <div className="text-center text-gray-500 py-10">
            Activities content coming soon.
          </div>
        </TabsContent>
        <TabsContent value="reports" className="mt-4">
          <div className="text-center text-gray-500 py-10">
            Reports content coming soon.
          </div>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      {openModal === "profile" && (
        <EditProfileModal tutor={tutor} onClose={() => setOpenModal(null)} />
      )}
      {openModal === "experience" && (
        <EditExperienceModal tutor={tutor} onClose={() => setOpenModal(null)} />
      )}
      {openModal === "quals" && (
        <EditQualificationsModal
          tutor={tutor}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === "id" && (
        <EditIDModal tutor={tutor} onClose={() => setOpenModal(null)} />
      )}
    </Card>
  );
}
