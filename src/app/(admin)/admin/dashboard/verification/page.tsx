// src/app/(admin)/admin/dashboard/verification/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  ChevronDown,
  GraduationCap,
  Search,
  UserCheck,
  Users,
} from "lucide-react";

import StatCard from "@/components/admin/StatCard";
import { useTutors, useTutor } from "@/hooks/useTutors";
import type { Teacher, Qualification } from "@/types";
import { TutorVerificationModal } from "@/components/admin/TutorVerificationModal";


// ---------- Table row shape ----------
type TutorRow = {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  country: { code: string; flag: string };
  grade: string;
  subjects: string;
  joined: string;
  status: "pending" | "accepted" | "declined";
  avatar: string;
};

// Fallback row so UI isn’t empty before API resolves
const initialTutors: TutorRow[] = [
  {
    id: 1,
    name: "JOHN DOE SANDERS",
    email: "johndoe@xyz.com",
    phone: "+54 756 287 410",
    country: { code: "ARG", flag: "/images/USA.png" },
    grade: "Grade 5",
    subjects: "Mathematics, Physics + 3 more",
    joined: "01, Aug. 2025",
    status: "pending",
    avatar: "/images/tutor-3.png",
  },
];

export default function VerificationPage() {
  // which tab is active (controlled Tabs)
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "accepted" | "declined"
  >("all");

  // list state (render rows)
  const [tutors, setTutors] = useState<TutorRow[]>(initialTutors);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // list fetch
  const { data, isLoading, error } = useTutors();

  // detail fetch (when modal is open)
  const { data: tutorDetail, isLoading: isTutorLoading } = useTutor(
    selectedId ?? "",
    { enabled: modalOpen && !!selectedId }
  );

  // map API list → table rows (status from isAdminVerified)
  useEffect(() => {
    if (!data?.teachers) return;

    const mapped: TutorRow[] = data.teachers.map((t: Teacher, idx: number) => {
      const gradeFromGrades =
        Array.isArray(t.grades) && t.grades.length
          ? t.grades.length > 1
            ? `${t.grades[0]} + ${t.grades.length - 1} more`
            : t.grades[0]
          : "";

      const gradeFromQuals = Array.isArray(t.qualifications)
        ? t.qualifications
            .map((q: Qualification) => q?.courseName)
            .filter(Boolean)
            .join(", ")
        : "";

      const derivedStatus: TutorRow["status"] =
        t.isAdminVerified === true
          ? "accepted"
          : t.isAdminVerified === false
          ? "declined"
          : "pending";

      return {
        id: t._id ?? `t-${idx}`,
        name: t.fullName ?? "—",
        email: t.email ?? "—",
        phone: t.phoneNumber ?? "—",
        country: {
          code: t.countryCode ?? "NGA",
          flag: t.countryFlag ?? "/images/USA.png",
        },
        grade: gradeFromGrades || gradeFromQuals || "—",
        subjects: Array.isArray(t.subjects)
          ? t.subjects.length > 2
            ? `${t.subjects[0]}, ${t.subjects[1]} + ${t.subjects.length - 2} more`
            : t.subjects.join(", ")
          : "—",
        joined: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "—",
        status: derivedStatus,
        avatar: t.profilePicture ?? "/images/tutor-3.png",
      };
    });

    setTutors(mapped);
  }, [data]);

  // ---- Modal detail mapping ----
  const modalTutor = useMemo(() => {
    if (!tutorDetail) return null;
    const t: Teacher = tutorDetail;

    return {
      id: t._id,
      name: t.fullName,
      email: t.email,
      bio: t.bio,
      phoneNumber: t.phoneNumber,
      subjects: Array.isArray(t.subjects) ? t.subjects.join(", ") : "—",
      experience:
        typeof t.experience === "number" ? `${t.experience} yrs` : t.experience ?? "—",
      qualifications: Array.isArray(t.qualifications)
        ? t.qualifications.map((q: Qualification, i: number) => ({
            id: i + 1,
            courseName: q.courseName ?? "—",
            issuingInstitution: q.issuingInstitution ?? "—",
            certificateUrl: q.certificateUrl,
            expiryDate: q.expiryDate,
          }))
        : [],
      rating: typeof t.rating === "number" ? t.rating.toFixed(1) : "—",
      status:
        t.isAdminVerified === true
          ? "accepted"
          : t.isAdminVerified === false
          ? "declined"
          : "pending",
      profilePicture: t.profilePicture,
      introductionVideoUrl: t.introductionVideoUrl,
      address: t.address?.street ?? "—",
      country: t.address?.country ?? t.countryCode ?? "—",
      timezone: t.timezone ?? "—",
      createdAt: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "—",
      identityDocument: t.identityDocument,
      grade:
        Array.isArray(t.grades) && t.grades.length
          ? t.grades.join(", ")
          : "—",
    };
  }, [tutorDetail]);

  // ---------- Stats (functional) ----------
  const totalTutors = tutors.length;
  const acceptedCount = tutors.filter((t) => t.status === "accepted").length;
  const pendingCount = tutors.filter((t) => t.status === "pending").length;
  const declinedCount = tutors.filter((t) => t.status === "declined").length;

  // ---------- Table Helper ----------
  const renderTable = (status: "all" | "pending" | "accepted" | "declined") => {
    const rows =
      status === "all" ? tutors : tutors.filter((t) => t.status === status);

    return (
      <Card className="mt-4">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-white"></TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Phone Number</TableHead>
              <TableHead className="text-white">Country</TableHead>
              <TableHead className="text-white">Grade</TableHead>
              <TableHead className="text-white">Subjects</TableHead>
              <TableHead className="text-white">Date Joined</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center text-red-500">
                  {error instanceof Error ? error.message : "Failed to load tutors"}
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center">
                  No tutors found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((tutor, idx) => (
                <TableRow
                  key={String(tutor.id ?? tutor.email ?? `tutor-${idx}`)}
                  className="odd:bg-[#F5F4F8] even:bg-white"
                >
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>

                  <TableCell className="flex items-center gap-3">
                    <Image
                      src={tutor.avatar}
                      alt={tutor.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{tutor.name}</p>
                      <p className="text-sm text-gray-500">{tutor.email}</p>
                    </div>
                  </TableCell>

                  <TableCell>{tutor.phone || "—"}</TableCell>

                  <TableCell className="flex items-center gap-2">
                    <Image
                      src={tutor.country.flag}
                      alt={tutor.country.code}
                      width={20}
                      height={20}
                    />
                    {tutor.country.code}
                  </TableCell>

                  <TableCell>{tutor.grade}</TableCell>
                  <TableCell>{tutor.subjects}</TableCell>
                  <TableCell>{tutor.joined}</TableCell>

                  <TableCell>
                    {/* View only. Approve/Decline lives in the modal now. */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-secondary border-secondary rounded-full px-6"
                      onClick={() => {
                        setSelectedId(String(tutor.id));
                        setModalOpen(true);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Total Tutor Applications"
          value={totalTutors}
          icon={<Users className="w-5 h-5" />}
          change={
            totalTutors > 0
              ? `${Math.round((pendingCount / totalTutors) * 100)}%`
              : "0%"
          }
        />
        <StatCard
          title="Pending Verification"
          value={pendingCount}
          icon={<GraduationCap className="w-5 h-5" />}
          change={pendingCount > 0 ? "+5%" : "0%"}
          changeColor="bg-yellow-100 text-yellow-600"
          iconBg="bg-yellow-50"
        />
        <StatCard
          title="Verified Tutors"
          value={acceptedCount}
          icon={<UserCheck className="w-5 h-5" />}
          change={acceptedCount > 0 ? "+12%" : "0%"}
          changeColor="bg-green-100 text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Declined Tutors"
          value={declinedCount}
          icon={<Users className="w-5 h-5" />}
          change={declinedCount > 0 ? "-3%" : "0%"}
          changeColor="bg-red-100 text-red-500"
          iconBg="bg-red-50"
        />
      </div>

      {/* Search (kept simple) */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center bg-[#F5F4F8] rounded-lg px-2 py-1 max-w-md w-full sm:w-[300px]">
          <Input
            type="text"
            placeholder="Enter keywords"
            className="bg-transparent border-none focus:ring-0 px-2 text-sm w-full"
            // wire your filter here if needed
          />
          <Button
            size="sm"
            className="ml-2 rounded-full px-4 bg-secondary hover:bg-[#e6a700] text-white text-xs font-semibold flex items-center gap-1"
          >
            <Search size={16} /> Search
          </Button>
        </div>

        <Button variant="outline">
          Sort By <ChevronDown className="w-4 h-4" />
        </Button>
      </div>

      {/* Tabs + Tables (controlled) */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as typeof activeTab)}
        className="w-full"
      >
        <TabsList className="flex justify-start gap-4 bg-transparent">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Pending
          </TabsTrigger>
          <TabsTrigger
            value="accepted"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Accepted
          </TabsTrigger>
          <TabsTrigger
            value="declined"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Declined
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderTable("all")}</TabsContent>
        <TabsContent value="pending">{renderTable("pending")}</TabsContent>
        <TabsContent value="accepted">{renderTable("accepted")}</TabsContent>
        <TabsContent value="declined">{renderTable("declined")}</TabsContent>
      </Tabs>

      {/* Modal (Approve/Decline only here) */}
      <TutorVerificationModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedId(null);
        }}
        tutor={isTutorLoading || !modalTutor ? null : modalTutor}
        onAfterAction={(status, id) => {
          if (!id) return;
          const newStatus: TutorRow["status"] = status;
          setTutors((prev) =>
            prev.map((row) =>
              String(row.id) === String(id) ? { ...row, status: newStatus } : row
            )
          );
          setActiveTab(newStatus);
        }}
        onDeclineReason={(reason) => {
          console.log("Decline reason:", reason);
          // TODO: when endpoint exists we can send this along
        }}
      />
    </div>
  );
}