"use client";

import TutorProfileCard from "@/components/admin/tutors/TutorProfileCard";
import TutorClassesCard from "@/components/admin/tutors/TutorClassesCard";
import TutorTransactionsCard from "@/components/admin/tutors/TutorTransactionsCard";
import TutorSidebarCard from "@/components/admin/tutors/TutorSidebarCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useTutor } from "@/hooks/useTutors";
import { useParams } from "next/navigation";
import { getPayments } from "@/services/payments.service";
import { useQuery } from "@tanstack/react-query";
import type { Qualification, Address } from "@/types";
import type { PaymentItem } from "@/types/transactions";
import type { Tutor } from "@/lib/constants";

// Mock data for classes (temporary until backend provides this data)
const MOCK_CLASSES = [
  {
    id: "#00000001",
    tutorName: "Abel Nick",
    learnerName: "Fabrio Sanders",
    grade: "Grade 1",
    subject: "Mathematics",
    dateTime: "20/08/2025, 8:4am",
    amount: "₦6000",
    status: "Pending",
  },
];

// Mock learners (temporary until backend provides this data)
const MOCK_LEARNERS = [
  {
    id: "l1",
    name: "Jamie Sanders",
    age: 6,
    grade: "1",
    subjects: ["Mathematics", "English"],
  },
  {
    id: "l2",
    name: "Lydia Sanders",
    age: 7,
    grade: "1",
    subjects: ["Mathematics", "English"],
  },
  {
    id: "l3",
    name: "Aram Sanders",
    age: 9,
    grade: "1",
    subjects: ["Mathematics", "English"],
  },
];

export default function TutorDetailsPage() {
  const { id } = useParams();
  const { data: tutorData, isLoading, isError, error } = useTutor(id as string);
  
  // Fetch transactions from API and filter by tutor ID
  const {
    data: allPayments = [],
  } = useQuery({
    queryKey: ["payments"],
    queryFn: () => getPayments(),
    refetchOnWindowFocus: false,
  });
  
  // Filter payments for the current tutor
  const transactions = allPayments.filter((payment: PaymentItem) => {
    const tutorId = tutorData?._id || tutorData?.id;
    
    // Handle teacher reference from PaymentItem
    const paymentTeacherId = 
      (payment.teacher && typeof payment.teacher === 'object' && '_id' in payment.teacher)
        ? (payment.teacher as { _id: string })._id
        : (payment.teacher && typeof payment.teacher === 'object' && 'id' in payment.teacher)
        ? (payment.teacher as { id: string }).id
        : (payment.teacherId && typeof payment.teacherId === 'object' && '_id' in payment.teacherId)
        ? (payment.teacherId as { _id: string })._id
        : (payment.teacherId && typeof payment.teacherId === 'object' && 'id' in payment.teacherId)
        ? (payment.teacherId as { id: string }).id
        : null;
    return paymentTeacherId === tutorId;
  });

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
        <div className="text-red-500 font-semibold">Error loading tutor data</div>
        <p className="text-gray-600">{error?.message || "Something went wrong"}</p>
        <Link
          href="/admin/dashboard/tutors"
          className="text-primary underline"
        >
          Back to Tutors
        </Link>
      </div>
    );
  }

  if (!tutorData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">No tutor data available</div>
      </div>
    );
  }

  // Prepare tutor object with proper data transformation
  // API returns simpler structure, so we map it to what components expect
  const tutor: Tutor = {
    // Basic required fields (from Tutor interface)
    id: tutorData._id || tutorData.id || "",
    name: tutorData.fullName || "—",
    email: tutorData.email || "—",
    phone: tutorData.phoneNumber || "—",
    address: typeof tutorData.address === 'object'
      ? `${(tutorData.address as Address).street || ''}, ${(tutorData.address as Address).city || ''}`.replace(/^,\s+|\s+,$/g, '')
      : typeof tutorData.address === 'string' ? tutorData.address : "—",
    cityState: typeof tutorData.address === 'object'
      ? `${(tutorData.address as Address).city || ""}/${(tutorData.address as Address).state || ""}`
      : "—",
    country: {
      code: typeof tutorData.address === 'object' && (tutorData.address as Address).country
        ? (tutorData.address as Address).country || tutorData.countryCode || "—"
        : tutorData.countryCode || "—",
      flag: tutorData.countryFlag || "/images/USA.png",
    },
    status: tutorData.status || "Pending",
    
    // Optional fields
    avatar: tutorData.profilePicture,
    grades: Array.isArray(tutorData.qualifications)
      ? tutorData.qualifications
          .map((q: Qualification) => typeof q === 'string' ? q : q.courseName)
          .filter(Boolean)
          .join(", ")
      : "—",
    experience: typeof tutorData.experience === 'number' 
      ? `${tutorData.experience}+ years`
      : tutorData.experience ?? "—",
    fee: tutorData.hourlyRate 
      ? `₦${tutorData.hourlyRate}`
      : "—",
    subjects: Array.isArray(tutorData.subjects)
      ? tutorData.subjects.join(", ")
      : "—",
    bio: tutorData.bio || "",
  };

  // Additional data for the cards (not part of Tutor interface)
  const classes = MOCK_CLASSES;
  const learners = MOCK_LEARNERS;

  return (
    <main className="min-h-screen bg-[#F5F5F5] p-6 lg:p-8">
      {/* Back Header */}
      <div className="flex items-center justify-start">
        <Link
          href="/admin/dashboard/tutors"
          className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 p-2 text-sm"
        >
          &lt; Back to Tutors
        </Link>
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
          <Button className="bg-secondary rounded-full text-white shadow-md">
            Suspend Account
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-8 space-y-6">
          <TutorProfileCard tutor={tutor} />
          <TutorClassesCard classes={classes} />
        </div>

        {/* Right Section */}
        <div className="lg:col-span-4 space-y-6">
          <TutorSidebarCard learners={learners} />
          <TutorTransactionsCard transactions={transactions} />
        </div>
      </div>
    </main>
  );
}
