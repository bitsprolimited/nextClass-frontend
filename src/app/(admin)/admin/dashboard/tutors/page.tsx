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
  Users,
  UserCheck,
  GraduationCap,
  MoreVertical,
  Search,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";

// Fake Data
const initialTutors = [
  {
    id: 1,
    name: "JOHN DOE SANDERS",
    email: "johndoe@xyz.com",
    phone: "+54 756 287 410",
    country: { code: "ARG", flag: "/images/ARG.png" },
    grade: "Grade 5",
    gradeMore: "Grade 2 +2 more",
    subjects: "Mathematics, Physics + 3 more",
    dateJoined: "01, Aug. 2025",
    status: "Active",
    avatar: "/images/ryan.png",
  },
  {
    id: 2,
    name: "JOHN DOE SANDERS",
    email: "johndoe@xyz.com",
    phone: "+54 756 287 410",
    country: { code: "USA", flag: "/images/USA.png" },
    grade: "Grade 5",
    gradeMore: "Grade 2 +2 more",
    subjects: "Mathematics, Physics + 3 more",
    dateJoined: "01, Aug. 2025",
    status: "Active",
    avatar: "/images/ryan.png",
  },
  {
    id: 3,
    name: "JOHN DOE SANDERS",
    email: "johndoe@xyz.com",
    phone: "+54 756 287 410",
    country: { code: "NGN", flag: "/images/NGN.png" },
    grade: "Grade 5",
    gradeMore: "Grade 2 +2 more",
    subjects: "Mathematics, Physics + 3 more",
    dateJoined: "01, Aug. 2025",
    status: "Suspended",
    avatar: "/images/ryan.png",
  },
  {
    id: 4,
    name: "JOHN DOE SANDERS",
    email: "johndoe@xyz.com",
    phone: "+54 756 287 410",
    country: { code: "BRA", flag: "/images/BRA.png" },
    grade: "Grade 5",
    gradeMore: "Grade 2 +2 more",
    subjects: "Mathematics, Physics + 3 more",
    dateJoined: "01, Aug. 2025",
    status: "Suspended",
    avatar: "/images/ryan.png",
  },
  {
    id: 5,
    name: "JOHN DOE SANDERS",
    email: "johndoe@xyz.com",
    phone: "+54 756 287 410",
    country: { code: "USA", flag: "/images/USA.png" },
    grade: "Grade 5",
    gradeMore: "Grade 2 +2 more",
    subjects: "Mathematics, Physics + 3 more",
    dateJoined: "01, Aug. 2025",
    status: "Suspended",
    avatar: "/images/ryan.png",
  },
];

export default function TutorsPage() {
  const [tutors] = useState(initialTutors);

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
            .filter((t) =>
              status === "all"
                ? true
                : status === "active"
                ? t.status.toLowerCase() === "active"
                : t.status.toLowerCase() === "suspended"
            )
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
                    <p className="text-xs text-gray-500">{tutor.email}</p>
                  </div>
                </TableCell>
                <TableCell>{tutor.phone}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={tutor.country.flag}
                    alt={tutor.country.code}
                    width={24}
                    height={24}
                  />
                  {tutor.country.code}
                </TableCell>
                <TableCell>
                  <div>
                    <div>{tutor.grade}</div>
                    <div className="text-xs text-gray-500">
                      {tutor.gradeMore}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">
                    {tutor.subjects.split(",")[0]}
                  </span>
                  <span className="text-xs text-gray-500">
                    , {tutor.subjects.split(",").slice(1).join(",")}
                  </span>
                </TableCell>
                <TableCell>{tutor.dateJoined}</TableCell>
                <TableCell>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      tutor.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    {tutor.status}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>
                        {tutor.status === "Active" ? "Suspend" : "Activate"}
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
          title="Total Tutors"
          value="1,543"
          icon={<Users />}
          change="18%"
        />
        <StatCard
          title="Total Sessions"
          value={196}
          icon={<UserCheck />}
          change="50%"
          changeColor="bg-green-100 text-green-600"
          subStats={[
            { label: "Booked", value: 100, color: "text-green-600" },
            { label: "Completed", value: "9%", color: "text-red-500" },
          ]}
        />
        <StatCard
          title="Total Revenue"
          value="₦124,309.50"
          icon={<GraduationCap />}
          change="32%"
          changeColor="bg-red-100 text-red-500"
        />
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
            <DropdownMenuItem>Grade</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 🗂️ Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex justify-start gap-4 bg-transparent">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Active
          </TabsTrigger>
          <TabsTrigger
            value="suspended"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Suspended
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderTable("all")}</TabsContent>
        <TabsContent value="active">{renderTable("active")}</TabsContent>
        <TabsContent value="suspended">{renderTable("suspended")}</TabsContent>
      </Tabs>
    </div>
  );
}
