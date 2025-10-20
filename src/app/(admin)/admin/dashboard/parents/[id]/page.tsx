"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { SuspendParentModal } from "@/components/admin/SuspendParentModal";
import { EditProfileModal } from "@/components/admin/EditParentProfileModal";
import {
  INITIAL_PROFILE_DATA,
  MOCK_UPCOMING_CLASSES,
  MOCK_TRANSACTIONS,
  ProfileData,
} from "@/lib/constants";

const ActivitiesContent = () => {
  const activities = [
    {
      timestamp: "28th, Feb. 2024 08:00am",
      category: "Login",
      activity: "Updated Business Profile",
    },
    {
      timestamp: "28th, Feb. 2024 08:00am",
      category: "Session bookings",
      activity: "Edited Agent-John Doe’s profile",
    },
    {
      timestamp: "28th, Feb. 2024 08:00am",
      category: "Profile updates",
      activity: "Deactivated User-John Doe’s Profile",
    },
  ];

  return (
    <div className="w-full border border-gray-100 rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-3 bg-[#F4F5FF] text-[13px] font-semibold text-[#0B0B0B] uppercase">
        <div className="py-3 px-4">Timestamp</div>
        <div className="py-3 px-4">Category</div>
        <div className="py-3 px-4">Activity</div>
      </div>

      {/* Table Rows */}
      {activities.map((item, idx) => (
        <div
          key={idx}
          className={`grid grid-cols-3 text-[14px] border-t border-gray-200 ${
            idx % 2 === 0 ? "bg-[#FFFAF5]" : "bg-white"
          }`}
        >
          {/* Timestamp */}
          <div className="py-3 px-4 text-[#FF6600] font-semibold">
            {item.timestamp}
          </div>

          {/* Category */}
          <div className="py-3 px-4 text-shadow-gray-600 font-medium">
            {item.category}
          </div>

          {/* Activity */}
          <div className="py-3 px-4 text-gray-600">{item.activity}</div>
        </div>
      ))}
    </div>
  );
};

export default function ParentProfilePage() {
  const { id } = useParams();
  const router = useRouter();

  // 1. STATE MANAGEMENT
  const [profileData, setProfileData] =
    useState<ProfileData>(INITIAL_PROFILE_DATA);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false); // Suspend modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit modal state
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(
    null
  ); // Transaction state fix

  // Handlers
  const handleSuspendAccount = (reason: string) => {
    console.log(`Suspending account ${id} with reason: ${reason}`);
    // API call goes here
    setIsSuspendModalOpen(false);
  };

  const handleSaveProfile = (
    updatedData: Omit<
      ProfileData,
      "cityState" | "status" | "profileImg" | "country"
    > & { city: string; state: string; country: string }
  ) => {
    console.log("Saving updated profile data:", updatedData);

    // Update local state, combining city and state for the display field
    setProfileData((prev) => ({
      ...prev,
      ...updatedData,
      cityState: `${updatedData.city}/${updatedData.state}`,
    }));

    // API call to update the profile on the backend here...
    setIsEditModalOpen(false);
  };

  // FIX: Transaction expansion toggle
  const toggleTransaction = (index: number) => {
    setExpandedTransaction(expandedTransaction === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] p-6 lg:p-8">
      {/* --- MODAL IMPLEMENTATION --- */}
      <SuspendParentModal
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        onConfirm={handleSuspendAccount}
      />
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        // Pass the subset of data the form needs: name, email, phone, address, city, state, country
        currentProfile={{
          name: profileData.name,
          email: profileData.email,
          phone: profileData.phone,
          address: profileData.address,
          city: profileData.city,
          state: profileData.state,
          country: profileData.country,
        }}
        onSave={handleSaveProfile}
      />
      {/* ---------------------------- */}

      {/* Back Header */}
      <div className="flex items-center justify-start ">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 p-0"
          onClick={() => router.push("/admin/dashboard/parents")}
        >
          &lt; Back to Parents
        </Button>
      </div>

      {/* Title and Top Action Buttons */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-[18px] text-[#9FA3A9]">Classes</h1>
        <div className="space-x-4">
          <Button
            variant="outline"
            className="rounded-full text-red-500 border-red-500 hover:bg-red-50"
          >
            Deactivate Account
          </Button>
          <Button
            onClick={() => setIsSuspendModalOpen(true)}
            className="bg-secondary rounded-full text-white shadow-md"
          >
            Suspend Account
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section (8/12 width) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Parent Profile Card with Tabs */}
          <Card className="p-6 h-[400px] overflow-y-auto">
            <Tabs defaultValue="bio" className="w-full">
              {/* Tabs List and Edit Button */}
              <div className="flex justify-between items-center border-b pb-3 mb-6">
                <TabsList className="h-auto bg-transparent p-0 space-x-6">
                  {/* ... TabsTrigger components (Bio, Activities, Reports) ... */}
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
                <Button
                  onClick={() => setIsEditModalOpen(true)}
                  size="sm"
                  className="bg-secondary text-white rounded-full px-4"
                >
                  Edit Profile
                </Button>
              </div>

              {/* Bio Content - USE profileData STATE */}
              <TabsContent value="bio" className="mt-4">
                <div className="flex items-start gap-4">
                  {/* Profile Image */}
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={profileData.profileImg}
                      alt={profileData.name}
                    />
                    <AvatarFallback className="text-xl bg-gray-200 text-gray-700">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Profile Details Grid */}
                  <div className="flex-1 grid grid-cols-3 gap-y-4 gap-x-8 text-sm">
                    {/* Name, Email, Phone Number */}
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-gray-500">Name</p>
                      <p className="font-semibold text-lg text-gray-800">
                        {profileData.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p className="font-medium text-gray-700">
                        {profileData.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-700">
                        {profileData.phone}
                      </p>
                    </div>

                    {/* Address, City/State, Country, Status */}
                    <div>
                      <p className="text-gray-500">Address</p>
                      <p className="font-medium text-gray-700">
                        {profileData.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">City/State</p>
                      <p className="font-medium text-gray-700">
                        {profileData.cityState}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Country</p>
                      <div className="flex items-center gap-2">
                        {/* Note: In a real app, the country flag image source should be dynamic */}
                        <Image
                          src="/images/USA.png"
                          alt="USA"
                          width={20}
                          height={20}
                          className="inline-block"
                        />
                        <p className="font-medium text-gray-700">
                          {profileData.country}
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <p className="text-gray-500">Status</p>
                      <Badge className="bg-secondary font-semibold hover:bg-orange-100">
                        {profileData.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Activities and Reports Content */}
              <TabsContent value="activities" className="mt-4">
                <ActivitiesContent />
              </TabsContent>
              <TabsContent value="reports" className="mt-4">
                <div className="text-center text-gray-500 py-10">
                  Reports content coming soon.
                </div>
              </TabsContent>
            </Tabs>
          </Card>

          {/* Classes Tabs (Upcoming and History) */}
          <Card className="p-0 rounded-xl border border-gray-100 shadow-sm h-[400px] overflow-y-auto">
            <h2 className="text-xl text-gray-400 font-semibold p-4 pb-0">
              Classes
            </h2>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="bg-white border-b h-auto p-0 flex justify-start space-x-8 px-4 pt-4">
                <TabsTrigger
                  value="upcoming"
                  className="text-base font-semibold text-gray-400 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 rounded-none pb-2"
                >
                  Upcoming Classes
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="text-base font-semibold text-gray-400 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 rounded-none pb-2"
                >
                  Class History
                </TabsTrigger>
              </TabsList>

              {/* Upcoming Classes Content */}
              <TabsContent value="upcoming" className="pt-2 px-4">
                {MOCK_UPCOMING_CLASSES.map((session, idx) => (
                  <div key={idx} className="py-4">
                    {/* ... (Session details remain the same) ... */}
                    {/* Top Row: ID + Price */}
                    <div className="flex justify-between items-start">
                      <p className="text-base font-semibold text-[#0B0B0B]">
                        #{session.id}
                      </p>
                      <p className="text-lg font-semibold text-[#0B0B0B]">
                        ₦{session.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Tutor, Learner, Date, Status */}
                    <div className="flex justify-between items-center flex-wrap gap-y-1 mt-1">
                      <p className="flex flex-col">
                        <span className="text-gray-500">Tutor </span>
                        <span className="font-medium text-gray-800">
                          {session.tutor}
                        </span>
                      </p>
                      <p className="flex flex-col">
                        <span className="text-gray-500">Learner </span>
                        <span className="font-medium text-gray-800">
                          {session.learner}
                        </span>
                      </p>
                      <p className="flex flex-col">
                        <span className="text-gray-500">Date/Time </span>
                        <span className="font-medium text-gray-800">
                          {session.dateTime}
                        </span>
                      </p>

                      <div className="text-right">
                        <Badge className="bg-[#FFA30033] text-[#FFA300] font-medium hover:bg-[#FFA30033]">
                          {session.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-2 border-t border-gray-100" />

                    {/* Grade / Subject / Session • Reschedule Count */}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <p className="font-medium text-gray-400">
                        Grade {session.grade} • {session.subject} •{" "}
                        {session.sessionsCount} Session
                      </p>
                      <p className="text-gray-500 text-sm">
                        Reschedule Count: {session.rescheduleCount}
                      </p>
                    </div>

                    {/* Separator between cards */}
                    {idx !== MOCK_UPCOMING_CLASSES.length - 1 && (
                      <div className="mt-4 border-b border-gray-200" />
                    )}
                  </div>
                ))}
              </TabsContent>

              {/* Class History Content (using the same content for now) */}
              <TabsContent value="history" className="pt-2 px-4">
                {MOCK_UPCOMING_CLASSES.map((session, idx) => (
                  <div key={idx} className="py-4">
                    {/* ... (Class History content remains the same) ... */}
                    {/* Top Row: ID + Price */}
                    <div className="flex justify-between items-start">
                      <p className="text-base font-semibold text-[#0B0B0B]">
                        #{session.id}
                      </p>
                      <p className="text-lg font-semibold text-[#0B0B0B]">
                        ₦{session.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Tutor, Learner, Date, Status */}
                    <div className="flex justify-between items-center flex-wrap gap-y-1 mt-1">
                      <p className="flex flex-col">
                        <span className="text-gray-500">Tutor </span>
                        <span className=" text-gray-800">{session.tutor}</span>
                      </p>
                      <p className="flex flex-col">
                        <span className="text-gray-500">Learner </span>
                        <span className=" text-gray-800">
                          {session.learner}
                        </span>
                      </p>
                      <p className="flex flex-col">
                        <span className="text-gray-500">Date/Time </span>
                        <span className=" text-gray-800">
                          {session.dateTime}
                        </span>
                      </p>

                      <div className="text-right">
                        <Badge className="bg-[#FFA30033] text-[#FFA300] font-medium hover:bg-[#FFA30033]">
                          {session.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="my-2 border-t border-gray-100" />

                    {/* Grade / Subject / Session • Reschedule Count */}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <p className="font-medium text-gray-400">
                        Grade {session.grade} • {session.subject} •{" "}
                        {session.sessionsCount} Session
                      </p>
                      <p className="text-gray-500 text-sm">
                        Reschedule Count: {session.rescheduleCount}
                      </p>
                    </div>

                    {/* Separator between cards */}
                    {idx !== MOCK_UPCOMING_CLASSES.length - 1 && (
                      <div className="mt-4 border-b border-gray-200" />
                    )}
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Right Section (4/12 width) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Learners Card */}
          <Card className="p-6 h-[400px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Learners</h2>
              <Button
                variant="ghost"
                className="secondary hover:bg-orange-50 hover:text-orange-600 text-sm p-0 h-auto"
              >
                <Plus className="w-4 h-4 mr-1" /> Add New Learner
              </Button>
            </div>

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

          {/* Transactions Card */}
          <Card className="p-6 h-[400px] overflow-y-auto rounded-2xl shadow-sm bg-white">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Transactions
            </h2>

            <div className="space-y-3">
              {MOCK_TRANSACTIONS.map((transaction, idx) => {
                const isOpen = expandedTransaction === idx; // Use expandedTransaction state

                return (
                  <div
                    key={idx}
                    className="bg-[#F5F4F8] rounded-xl px-3 py-3 transition-all"
                  >
                    {/* Top Row */}
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold text-gray-800">
                        Session {transaction.id}
                      </p>
                      <div className="flex flex-col items-end">
                        <span className="text-green-600 font-semibold text-sm">
                          ₦{transaction.price.toLocaleString()}
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-600 text-[10px] font-medium mt-1 hover:bg-green-100"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Middle Info */}
                    <div className="flex justify-between items-center text-[11px] text-gray-500 mt-1">
                      <p>Reference {transaction.reference}</p>
                      <p>{transaction.dateTime}</p>
                    </div>

                    {/* Expanded Info */}
                    {isOpen && (
                      <div className="mt-3 text-[11px] text-gray-600 space-y-1 border-t border-gray-200 pt-2">
                        <div className="flex justify-between">
                          <span>
                            Tutor:{" "}
                            <span className="font-medium text-gray-800">
                              {transaction.tutor}
                            </span>
                          </span>
                          <span>
                            Learner:{" "}
                            <span className="font-medium text-gray-800">
                              {transaction.learner}
                            </span>
                          </span>
                        </div>
                        <div className="flex gap-1 items-center text-gray-500">
                          <span>{transaction.grade}</span>
                          <span>•</span>
                          <span>{transaction.subject}</span>
                          <span>•</span>
                          <span>{transaction.sessions}</span>
                        </div>
                      </div>
                    )}

                    {/* Toggle Button */}
                    <div className="flex justify-center mt-1">
                      <button
                        className="text-gray-400 hover:text-gray-600 transition"
                        onClick={() => toggleTransaction(idx)} // Use the dedicated function
                      >
                        {isOpen ? (
                          <ChevronUp size={16} strokeWidth={2} />
                        ) : (
                          <ChevronDown size={16} strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
