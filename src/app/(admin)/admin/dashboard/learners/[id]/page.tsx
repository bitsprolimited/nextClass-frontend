"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLearner } from "@/hooks/useLearner";
import EditLearnerModal from "@/components/modals/EditLearnerModal";

// Mock data for upcoming classes (temporary until backend provides this data)
const MOCK_UPCOMING_CLASSES = [
  {
    id: "#0000001",
    tutor: "Abel Nick",
    learner: "John Doe Sanders",
    dateTime: "20/09/2025, 8:14am",
    price: 6000,
    status: "Pending",
    grade: "5",
    subject: "Mathematics",
    sessionsCount: 1,
    rescheduleCount: 0,
  },
  {
    id: "#0000002",
    tutor: "Sarah Johnson",
    learner: "John Doe Sanders",
    dateTime: "21/09/2025, 10:30am",
    price: 6000,
    status: "Pending",
    grade: "5",
    subject: "Physics",
    sessionsCount: 1,
    rescheduleCount: 0,
  },
];

// Mock data for transactions (temporary until backend provides this data)
const MOCK_TRANSACTIONS = [
  {
    id: "001",
    reference: "123ytrt56839fhvs",
    dateTime: "20/09/2025, 8:14am",
    price: 6000,
    status: "Paid",
    tutor: "Abel Nick",
    learner: "John Doe",
    grade: "Grade 5",
    subject: "Mathematics",
    sessions: "1 Session",
  },
  {
    id: "002",
    reference: "456ytrt56839fhvs",
    dateTime: "21/09/2025, 10:30am",
    price: 6000,
    status: "Pending",
    tutor: "Sarah Johnson",
    learner: "John Doe",
    grade: "Grade 5",
    subject: "Physics",
    sessions: "1 Session",
  },
];

// =====================
// Activities Component
// =====================
const ActivitiesContent = () => {
  const activities = [
    {
      timestamp: "28th, Feb. 2025 08:00am",
      category: "Login",
      activity: "Updated Business Profile",
    },
    {
      timestamp: "27th, Feb. 2025 14:30pm",
      category: "Session bookings",
      activity: "Edited Agent-John Doe's profile",
    },
    {
      timestamp: "26th, Feb. 2025 09:15am",
      category: "Session bookings",
      activity: "Edited Agent-John Doe's profile",
    },
  ];

  return (
    <div className="w-full space-y-3">
      {activities.map((item, idx) => (
        <div key={idx} className="pb-3 border-b border-gray-100 last:border-b-0">
          <div className="flex justify-between items-start mb-1">
            <p className="font-semibold text-gray-800 text-sm">{item.category}</p>
            <p className="text-xs text-orange-500 font-medium">{item.timestamp}</p>
          </div>
          <p className="text-sm text-gray-600">{item.activity}</p>
        </div>
      ))}
    </div>
  );
};

// =====================
// Main Page Component
// =====================
export default function LearnerDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [expandedTransaction, setExpandedTransaction] = useState<number | null>(
    null
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

  // Fetch learner data using the custom hook
  const { data: learnerData, isLoading, isError, error } = useLearner(id as string);

  const toggleTransaction = (idx: number) => {
    setExpandedTransaction(expandedTransaction === idx ? null : idx);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="text-red-500 font-semibold">Error loading learner data</div>
        <p className="text-gray-600">{error?.message || "Something went wrong"}</p>
        <Button
          onClick={() => router.push("/admin/dashboard/learners")}
          variant="outline"
        >
          Back to Learners
        </Button>
      </div>
    );
  }

  if (!learnerData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">No learner data available</div>
      </div>
    );
  }

  const profileData = learnerData;

  return (
    <main className="min-h-screen bg-[#F5F5F5] p-6 lg:p-8">
      {/* Back Header */}
      <div className="flex items-center justify-start mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 p-0"
          onClick={() => router.push("/admin/dashboard/learners")}
        >
          &lt; Back to Learners
        </Button>
      </div>

      {/* Title and Top Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[18px] text-[#9FA3A9]">Learner Profile</h1>
        <div className="space-x-4">
          <Button
            variant="outline"
            className="rounded-full text-red-500 border-red-500 hover:bg-red-50 bg-transparent"
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

      {/* Main Content Grid - 60/40 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Section (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Learner Profile Card */}
          <Card className="p-6 h-[400px] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 mb-6">
              <h2 className="text-base font-semibold text-[#9FA3A9]">Bio</h2>
              <Button
                onClick={() => setIsEditModalOpen(true)}
                size="sm"
                className="bg-secondary text-white rounded-full px-4"
              >
                Edit Profile
              </Button>
            </div>

            {/* Bio Content */}
            <div className="flex items-start gap-4">
              {/* Profile Image */}
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={profileData.profileImg || "/placeholder.svg"}
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
                {/* Name, Email, Age */}
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
                  <p className="text-gray-500">Age</p>
                  <p className="font-medium text-gray-700">
                    {profileData.age ? profileData.age : "N/A"}
                  </p>
                </div>

                {/* Grade, Date of Birth, Status */}
                <div>
                  <p className="text-gray-500">Grade</p>
                  <p className="font-medium text-gray-700">
                    {profileData.grade || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Date of Birth</p>
                  <p className="font-medium text-gray-700">
                    {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <Badge className="bg-secondary font-semibold hover:bg-orange-100">
                    {profileData.status}
                  </Badge>
                </div>
              </div>
            </div>
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
                    {/* Top Row: ID + Price */}
                    <div className="flex justify-between items-start">
                      <p className="text-base font-semibold text-[#0B0B0B]">
                        {session.id}
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

              {/* Class History Content */}
              <TabsContent value="history" className="pt-2 px-4">
                {MOCK_UPCOMING_CLASSES.map((session, idx) => (
                  <div key={idx} className="py-4">
                    {/* Top Row: ID + Price */}
                    <div className="flex justify-between items-start">
                      <p className="text-base font-semibold text-[#0B0B0B]">
                        {session.id}
                      </p>
                      <p className="text-lg font-semibold text-[#0B0B0B]">
                        ₦{session.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Tutor, Learner, Date, Status */}
                    <div className="flex justify-between items-center flex-wrap gap-y-1 mt-1">
                      <p className="flex flex-col">
                        <span className="text-gray-500">Tutor </span>
                        <span className="text-gray-800">{session.tutor}</span>
                      </p>
                      <p className="flex flex-col">
                        <span className="text-gray-500">Learner </span>
                        <span className="text-gray-800">{session.learner}</span>
                      </p>
                      <p className="flex flex-col">
                        <span className="text-gray-500">Date/Time </span>
                        <span className="text-gray-800">{session.dateTime}</span>
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

        {/* Right Section (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activities Summary Card */}
          <Card className="p-6 h-[400px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Activities</h2>
            </div>

            <ActivitiesContent />
          </Card>

          {/* Transactions Card */}
          <Card className="p-6 h-[400px] overflow-y-auto rounded-2xl shadow-sm bg-white">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Transactions
            </h2>

            <div className="space-y-3">
              {MOCK_TRANSACTIONS.map((transaction, idx) => {
                const isOpen = expandedTransaction === idx;

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
                        onClick={() => toggleTransaction(idx)}
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

      {/* Edit Learner Modal */}
      {learnerData && (
        <EditLearnerModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          learner={learnerData}
        />
      )}
    </main>
  );
}
