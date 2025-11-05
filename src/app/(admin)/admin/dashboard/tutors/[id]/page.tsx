import TutorProfileCard from "@/components/admin/tutors/TutorProfileCard";
import TutorClassesCard from "@/components/admin/tutors/TutorClassesCard";
import TutorTransactionsCard from "@/components/admin/tutors/TutorTransactionsCard";
import TutorSidebarCard from "@/components/admin/tutors/TutorSidebarCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const mockTutor = (id: string) => ({
  id,
  avatar: "/images/ryan.png",
  name: "JOHN DOE SANDERS",
  email: "johndoe@xyz.com",
  phone: "+54 756 287 410",
  country: { code: "USA", flag: "/images/USA.png" },
  status: "Pending",
  gender: "Male",
  address: "1234, Street Name, Area.",
  cityState: "Houston/Texas",
  grades: "Grade 1, 2, 3, 4, 5",
  experience: "5yrs",
  fee: "₦5000",
  bankName: "Access",
  accountNumber: "1234567890",
  subjects: "Mathematics, English, Physics",
  learners: [
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
  ],
  classes: [
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
  ],
  transactions: [
    {
      id: "txn-0001",
      reference: "123ytrt56839fhvs",
      dateTime: "20/08/2025, 8:14am",
      tutorName: "Abel Sanders",
      learnerName: "Abel Sanders",
      amount: "₦6000",
      status: "Paid",
    },
  ],
  profileData: undefined,
  bio: undefined,
});

export default function TutorDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // replace with await fetch(`/api/tutors/${params.id}`) when API is available
  const tutor = mockTutor(params.id);

  return (
    <main className="min-h-screen bg-[#F5F5F5] p-6 lg:p-8">
      {/* --- MODAL IMPLEMENTATION --- */}
      {/* <SuspendParentModal
         isOpen={isSuspendModalOpen}
         onClose={() => setIsSuspendModalOpen(false)}
         onConfirm={handleSuspendAccount}
       /> */}
      {/* <EditProfileModal
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
       /> */}
      {/* ---------------------------- */}

      {/* Back Header */}
      <div className="flex items-center justify-start ">
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
          <Button
            //  onClick={() => setIsSuspendModalOpen(true)}
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
          <TutorProfileCard tutor={tutor} />

          {/* Classes Tabs (Upcoming and History) */}
          <TutorClassesCard classes={tutor.classes} />
        </div>

        {/* Right Section (4/12 width) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Learners Card */}
          <TutorSidebarCard learners={tutor.learners} />

          {/* Transactions Card */}
          <TutorTransactionsCard transactions={tutor.transactions} />
        </div>
      </div>
    </main>
  );
}
