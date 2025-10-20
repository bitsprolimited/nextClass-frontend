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
import ParentProfileModal from "@/components/admin/ParentProfileModal";
import { useRouter } from "next/navigation";

// =====================
// Type Definitions
// =====================

interface Learner {
  name: string;
  avatar: string;
}

interface Country {
  code: string;
  flag: string;
}

interface Parent {
  id: number;
  name: string;
  email: string;
  country: Country;
  learners: Learner[];
  moreLearners: number;
  joined: string;
  status: "Active" | "Suspended";
  avatar: string;
  learnersFull?: FullLearner[]; // ✅ FIXED: Added this optional property
}

interface FullLearner {
  avatar?: string;
  name: string;
  age: number;
  grade: number;
  subjects: string[];
}

// =====================
// Fake Data
// =====================

const initialParents: Parent[] = [
  {
    id: 1,
    name: "JOHN DOE SANDERS",
    email: "johndoe@xyz.com",
    country: { code: "ARG", flag: "/images/ARG.png" },
    learners: [
      { name: "Abel", avatar: "/images/tutor-2.png" },
      { name: "Tamun", avatar: "/images/tutor-2.png" },
    ],
    moreLearners: 3,
    joined: "01, Aug. 2025",
    status: "Active",
    avatar: "/images/ryan.png",
  },
  {
    id: 2,
    name: "JOHN DOE",
    email: "johndoe@xyz.com",
    country: { code: "USA", flag: "/images/USA.png" },
    learners: [
      { name: "Abel", avatar: "/images/tutor-3.png" },
      { name: "Tamun", avatar: "/images/tutor-3.png" },
    ],
    moreLearners: 3,
    joined: "01, Aug. 2025",
    status: "Suspended",
    avatar: "/images/tutor-3.png",
  },
  {
    id: 3,
    name: "JOHN DOE",
    email: "johndoe@xyz.com",
    country: { code: "NGN", flag: "/images/NGN.png" },
    learners: [
      { name: "Abel", avatar: "/images/learner-1.png" },
      { name: "Tamun", avatar: "/images/learner-2.png" },
    ],
    moreLearners: 3,
    joined: "01, Aug. 2025",
    status: "Active",
    avatar: "/images/tutor-3.png",
  },
  {
    id: 4,
    name: "JOHN DOE",
    email: "johndoe@xyz.com",
    country: { code: "ENG", flag: "/images/ENG.png" },
    learners: [
      { name: "Abel", avatar: "/images/learner-1.png" },
      { name: "Tamun", avatar: "/images/learner-2.png" },
    ],
    moreLearners: 3,
    joined: "01, Aug. 2025",
    status: "Active",
    avatar: "/images/tutor-3.png",
  },
  {
    id: 5,
    name: "JOHN DOE",
    email: "johndoe@xyz.com",
    country: { code: "BRA", flag: "/images/BRA.png" },
    learners: [
      { name: "Abel", avatar: "/images/learner-1.png" },
      { name: "Tamun", avatar: "/images/learner-2.png" },
    ],
    moreLearners: 3,
    joined: "01, Aug. 2025",
    status: "Suspended",
    avatar: "/images/tutor-3.png",
  },
];

// =====================
// Component
// =====================

export default function ParentsPage() {
  const router = useRouter();
  const [parents] = useState<Parent[]>(initialParents);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const getLearnersFull = (): FullLearner[] => [
    {
      avatar: "/images/ryan.png",
      name: "Jamie Sanders",
      age: 6,
      grade: 1,
      subjects: ["Mathematics", "English"],
    },
    {
      name: "Lydia Sanders",
      age: 7,
      grade: 1,
      subjects: ["Mathematics", "English"],
    },
    {
      name: "Aram Sanders",
      age: 9,
      grade: 1,
      subjects: ["Mathematics", "English"],
    },
  ];

  const renderTable = (status: string) => (
    <Card className="mt-4">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white"></TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Country</TableHead>
            <TableHead className="text-white">Learners</TableHead>
            <TableHead className="text-white">Date Joined</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parents
            .filter((p) =>
              status === "all"
                ? true
                : status === "active"
                ? p.status.toLowerCase() === "active"
                : p.status.toLowerCase() === "suspended"
            )
            .map((parent) => (
              <TableRow
                key={parent.id}
                className="odd:bg-[#F5F4F8] even:bg-white hover:bg-gray-100 cursor-pointer transition"
                onClick={() =>
                  router.push(`/admin/dashboard/parents/${parent.id}`)
                }
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" />
                </TableCell>
                <TableCell className="flex items-center gap-3">
                  <Image
                    src={parent.avatar}
                    alt={parent.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{parent.name}</p>
                  </div>
                </TableCell>
                <TableCell>{parent.email}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={parent.country.flag}
                    alt={parent.country.code}
                    width={20}
                    height={20}
                  />
                  {parent.country.code}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {parent.learners.map((learner, idx) => (
                      <Image
                        key={idx}
                        src={learner.avatar}
                        alt={learner.name}
                        width={24}
                        height={24}
                        className={`rounded-full border-2 border-white ${
                          idx > 0 ? "-ml-3" : ""
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-500 text-xs">
                      {parent.learners[0].name}, {parent.learners[1].name} +{" "}
                      {parent.moreLearners} more
                    </span>
                  </div>
                </TableCell>
                <TableCell>{parent.joined}</TableCell>
                <TableCell>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      parent.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    {parent.status}
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
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedParent({
                            ...parent,
                            learnersFull: getLearnersFull(),
                          });
                          setModalOpen(true);
                        }}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {parent.status === "Active" ? "Suspend" : "Activate"}
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
          title="Total Registered Students"
          value="1,543"
          icon={<GraduationCap />}
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
        <StatCard title="Total Revenue" value="₦124,309.50" />
      </div>

      {/* 🔎 Search + Sort + Add */}
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

      <ParentProfileModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        parent={selectedParent}
      />
    </div>
  );
}
