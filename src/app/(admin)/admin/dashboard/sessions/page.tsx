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
const initialSessions = [
  {
    id: "#00000001",
    date: "01, Aug. 2025",
    time: "8am - 10pm",
    tutor: {
      name: "James Patterson",
      avatar: "/images/ryan.png",
      status: "online",
    },
    learner: {
      name: "Abu Davidson",
      avatar: "/images/ryan.png",
      status: "online",
    },
    grade: "Grade 5",
    subject: "Mathematics",
    sessions: 2,
    amount: "₦9,000",
    status: "Scheduled",
  },
  {
    id: "#00000002",
    date: "01, Aug. 2025",
    time: "8am - 10pm",
    tutor: {
      name: "James Patterson",
      avatar: "/images/ryan.png",
      status: "online",
    },
    learner: {
      name: "Abu Davidson",
      avatar: "/images/ryan.png",
      status: "online",
    },
    grade: "Grade 5",
    subject: "Mathematics",
    sessions: 2,
    amount: "₦9,000",
    status: "Scheduled",
  },
  // ...repeat as needed
];

export default function SessionsPage() {
  const [sessions, setSessions] = useState(initialSessions);

  const renderTable = (tab: string) => (
    <Card className="mt-4">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white"></TableHead>
            <TableHead className="text-white">Class ID</TableHead>
            <TableHead className="text-white">Date/Time</TableHead>
            <TableHead className="text-white">Participants</TableHead>
            <TableHead className="text-white">Grade</TableHead>
            <TableHead className="text-white">Subject</TableHead>
            <TableHead className="text-white">Sessions (hrs)</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions
            .filter((s) =>
              tab === "all" ? true : s.status.toLowerCase() === tab
            )
            .map((session, idx) => (
              <TableRow
                key={session.id + idx}
                className="odd:bg-[#F5F4F8] even:bg-white"
              >
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{session.id}</TableCell>
                <TableCell>
                  {session.date}
                  <br />
                  <span className="text-xs text-gray-500">{session.time}</span>
                </TableCell>
                <TableCell>
                  <div className="mb-1">
                    <span className="text-xs text-gray-400">Tutor</span>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                      <Image
                        src={session.tutor.avatar}
                        alt={session.tutor.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-primary font-semibold underline cursor-pointer">
                        {session.tutor.name}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Learner</span>
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
                      <Image
                        src={session.learner.avatar}
                        alt={session.learner.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-primary font-semibold underline cursor-pointer">
                        {session.learner.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{session.grade}</TableCell>
                <TableCell>{session.subject}</TableCell>
                <TableCell>{session.sessions}</TableCell>
                <TableCell className="font-semibold text-green-600">
                  {session.amount}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      session.status === "Scheduled"
                        ? "bg-orange-50 text-orange-500"
                        : session.status === "Ongoing"
                        ? "bg-blue-50 text-blue-600"
                        : session.status === "Completed"
                        ? "bg-green-50 text-green-600"
                        : session.status === "Cancelled"
                        ? "bg-red-50 text-red-500"
                        : ""
                    }`}
                  >
                    {session.status}
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
                      <DropdownMenuItem>Cancel</DropdownMenuItem>
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
          title="Total Sessions"
          value={196}
          icon={<Users />}
          change="50%"
          changeColor="bg-green-100 text-green-600"
          subStats={[
            { label: "Booked", value: 100, color: "text-green-600" },
            { label: "Completed", value: "9%", color: "text-red-500" },
          ]}
        />
        <StatCard
          title="Active Sessions"
          value="1,543"
          icon={<UserCheck />}
          change="18%"
        />
        <StatCard
          title="Total Cancelled Sessions"
          value="₦124,309.50"
          icon={<GraduationCap />}
          change="32%"
          changeColor="bg-red-100 text-red-500"
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
            <DropdownMenuItem>Class ID</DropdownMenuItem>
            <DropdownMenuItem>Date/Time</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 🗂️ Tabs */}
      <Tabs defaultValue="scheduled" className="w-full">
        <TabsList className="flex justify-start gap-4 bg-transparent">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="scheduled"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Scheduled
          </TabsTrigger>
          <TabsTrigger
            value="ongoing"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Ongoing
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderTable("all")}</TabsContent>
        <TabsContent value="scheduled">{renderTable("scheduled")}</TabsContent>
        <TabsContent value="ongoing">{renderTable("ongoing")}</TabsContent>
        <TabsContent value="completed">{renderTable("completed")}</TabsContent>
        <TabsContent value="cancelled">{renderTable("cancelled")}</TabsContent>
      </Tabs>
    </div>
  );
}
