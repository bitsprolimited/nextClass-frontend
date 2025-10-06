"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";
import {
  ChevronDown,
  GraduationCap,
  MoreVertical,
  Search,
  UserCheck,
  Users,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import TutorVerificationModal from "@/components/admin/TutorVerificationModal";

// Fake Data
const initialTutors = [
  {
    id: 1,
    name: "JOHN DOE SANDERS",
    email: "johndoe@xyz.com",
    phone: "+54 756 287 410",
    country: { code: "ARG", flag: "/images/USA.png" },
    grade: "Grade 5",
    subjects: "Mathematics, Physics + 3 more",
    joined: "01, Aug. 2025",
    status: "Pending",
    avatar: "/images/tutor-3.png",
  },
  {
    id: 2,
    name: "JANE DOE",
    email: "janedoe@xyz.com",
    phone: "+44 123 456 789",
    country: { code: "USA", flag: "/images/USA.png" },
    grade: "Grade 6",
    subjects: "English, Chemistry + 2 more",
    joined: "05, Aug. 2025",
    status: "Pending",
    avatar: "/images/tutor-3.png",
  },
];
interface Tutor {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: { code: string; flag: string };
  grade: string;
  subjects: string;
  joined: string;
  status: string;
  avatar: string;
}

export default function VerificationPage() {
  const [tutors, setTutors] = useState(initialTutors);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Update tutor status
  const handleStatusChange = (id: number, newStatus: string) => {
    setTutors((prev) =>
      prev.map((tutor) =>
        tutor.id === id ? { ...tutor, status: newStatus } : tutor
      )
    );
  };

  // Reusable table for each tab
  const renderTable = (status: string) => (
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
            <TableHead className="text-white">Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tutors
            .filter((t) => t.status.toLowerCase() === status)
            .map((tutor) => (
              <TableRow
                key={tutor.id}
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
                <TableCell>{tutor.phone}</TableCell>
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
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-secondary border-secondary rounded-full px-6"
                    onClick={() => {
                      setSelectedTutor(tutor);
                      setModalOpen(true);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(tutor.id, "Accepted")}
                      >
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(tutor.id, "Declined")}
                      >
                        Decline
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Total Registered Parents"
          value="1,543"
          icon={<Users />}
          change="18%"
        />
        <StatCard
          title="Total Registered Learners"
          value="1,543"
          icon={<GraduationCap />}
          change="18%"
        />
        <StatCard
          title="Total Registered Tutors"
          value={196}
          icon={<UserCheck />}
          change="50%"
          changeColor="bg-green-100 text-green-600"
          subStats={[
            { label: "Verified", value: 100, color: "text-green-600" },
            { label: "Pending", value: "9%", color: "text-red-500" },
          ]}
        />
        <StatCard title="Total Revenue" value="₦124,309.50" />
      </div>

      {/* 🔎 Search + Sort */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center bg-[#F5F4F8] rounded-lg px-2 py-1 max-w-md w-full sm:w-[300px]">
          <Input
            type="text"
            placeholder="Enter keywords"
            className="bg-transparent border-none focus:ring-0 px-2 text-sm w-full"
          />
          <Button
            size="sm"
            className="ml-2 rounded-full px-4 bg-secondary hover:bg-[#e6a700] text-white text-xs font-semibold flex items-center gap-1"
          >
            <Search size={16} />
            Search
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort By <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Name</DropdownMenuItem>
            <DropdownMenuItem>Date Joined</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 🗂️ Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="flex justify-start gap-4 bg-transparent">
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

        <TabsContent value="pending">{renderTable("pending")}</TabsContent>
        <TabsContent value="accepted">{renderTable("accepted")}</TabsContent>
        <TabsContent value="declined">{renderTable("declined")}</TabsContent>
      </Tabs>

      <TutorVerificationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        tutor={selectedTutor}
      />
    </div>
  );
}
