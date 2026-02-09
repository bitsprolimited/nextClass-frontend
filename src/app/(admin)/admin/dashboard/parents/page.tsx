"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { useParents } from "@/hooks/useUser";
import Loader from "@/components/Loader";
import { User, Child } from "@/types";
import { getAllLearners } from "@/services/learner.service";

// =====================
// Type Definitions
// =====================

interface Learner {
  name: string;
  avatar: string | null;
}

interface Country {
  code: string;
  flag: string;
}

interface ParentDisplayItem {
  id: string;
  name: string;
  email: string;
  country: Country;
  learners: Learner[];
  moreLearners: number;
  joined: string;
  status: "Active" | "Suspended";
  avatar: string | null;
  learnersFull?: FullLearner[];
}

interface FullLearner {
  avatar?: string;
  name: string;
  age: number;
  grade: number;
  subjects: string[];
}

// =====================
// Helper Functions
// =====================

/**
 * Converts a country code (e.g., 'NG', 'US') to a flag emoji
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Flag emoji string
 */
const getCountryFlagEmoji = (countryCode: string): string => {
  if (!countryCode || typeof countryCode !== "string" || countryCode.length < 2) {
    return "🌍";
  }
  
  try {
    const code = countryCode.toUpperCase().substring(0, 2);
    const regional_indicator_offset = 0x1F1E6;
    
    const flag = Array.from(code)
      .map(char => String.fromCodePoint(regional_indicator_offset + char.charCodeAt(0) - "A".charCodeAt(0)))
      .join("");
    
    return flag || "🌍";
  } catch (error) {
    console.error("Flag emoji conversion error:", error);
    return "🌍";
  }
};

/**
 * Maps a User object to ParentDisplayItem for display
 */
const mapUserToParentDisplay = (user: User): ParentDisplayItem => {
  try {
    const learners = user.children && Array.isArray(user.children) ? user.children : [];
    const displayLearners: Learner[] = learners.slice(0, 2).map((child: Child) => ({
      name: child.name || "Unknown",
      avatar: (child.profileImg && child.profileImg.trim() !== "") ? child.profileImg : null,
    }));

    // Handle address safely
    const countryCode = typeof user.address === "object" && user.address?.country
      ? user.address.country.substring(0, 2).toUpperCase()
      : "NG";

    return {
      id: user._id || user.id || `user-${Math.random()}`,
      name: user.fullName || "Unknown Parent",
      email: user.email || "no-email@example.com",
      country: {
        code: countryCode,
        flag: "", // No longer used, but keeping for type compatibility
      },
      learners: displayLearners,
      moreLearners: Math.max(0, learners.length - 2),
      joined: typeof user.createdAt === "string" 
        ? new Date(user.createdAt).toLocaleDateString() 
        : user.createdAt instanceof Date 
        ? user.createdAt.toLocaleDateString() 
        : "Recently",
      status: (user.status === "active" ? "Active" : "Suspended") as "Active" | "Suspended",
      avatar: user.profilePicture && user.profilePicture.trim() !== "" 
        ? user.profilePicture 
        : null, // null indicates no image, will use initials
    };
  } catch (error) {
    console.error("Error mapping user to parent display:", error, user);
    // Return a safe default
    return {
      id: user._id || user.id || `user-${Math.random()}`,
      name: user.fullName || "Unknown Parent",
      email: user.email || "no-email@example.com",
      country: { code: "NG", flag: "" },
      learners: [],
      moreLearners: 0,
      joined: "Unknown",
      status: "Active",
      avatar: null, // Use initials instead
    };
  }
};

/**
 * Generates mock learner data for modal display
 */
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

export default function ParentsPage() {
  const router = useRouter();
  const { data: parentResponse, isLoading, error } = useParents();
  const { data: learnersData } = useQuery({
    queryKey: ["all-learners-stats"],
    queryFn: () => getAllLearners({ limit: 1 }),
  });
  
  // Map API users to display format
  const apiUsers: User[] = parentResponse?.users || [];
  const parents: ParentDisplayItem[] = apiUsers.map(mapUserToParentDisplay);

  // Calculate stats
  const totalParents = apiUsers.length;
  const activeParents = apiUsers.filter(p => p.status === "active").length;
  const totalLearners = learnersData?.meta?.total || 0;

  const [selectedParent, setSelectedParent] = useState<ParentDisplayItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

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
            .filter((p: ParentDisplayItem) => {
              if (status === "all") return true;
              if (status === "active") return p.status === "Active";
              if (status === "suspended") return p.status === "Suspended";
              return false;
            })
            .map((parent: ParentDisplayItem) => (
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
                  {parent.avatar ? (
                    <Image
                      src={parent.avatar}
                      alt={parent.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {parent.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{parent.name}</p>
                  </div>
                </TableCell>
                <TableCell>{parent.email}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <span>{getCountryFlagEmoji(parent.country.code)}</span>
                  <span>{parent.country.code}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {parent.learners.length > 0 ? (
                      <>
                        {parent.learners.map((learner, idx) => (
                          learner.avatar ? (
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
                          ) : (
                            <div
                              key={idx}
                              className={`w-6 h-6 bg-blue-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${
                                idx > 0 ? "-ml-3" : ""
                              }`}
                            >
                              {learner.name.charAt(0).toUpperCase()}
                            </div>
                          )
                        ))}
                        <span className="ml-2 text-gray-500 text-xs">
                          {parent.learners.map(l => l.name).join(", ")}
                          {parent.moreLearners > 0 && ` + ${parent.moreLearners} more`}
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-400 text-xs">No learners</span>
                    )}
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

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
          Failed to load parents. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Total Registered Parents"
          value={totalParents}
          icon={<Users className="w-5 h-5" />}
          change={totalParents > 0 ? "+12%" : "0%"}
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Total Registered Students"
          value={totalLearners}
          icon={<GraduationCap className="w-5 h-5" />}
          change={totalLearners > 0 ? "+18%" : "0%"}
          changeColor="bg-green-100 text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Active Parents"
          value={activeParents}
          icon={<UserCheck className="w-5 h-5" />}
          change={activeParents > 0 ? "+8%" : "0%"}
          changeColor="bg-green-100 text-green-600"
          iconBg="bg-green-50"
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
