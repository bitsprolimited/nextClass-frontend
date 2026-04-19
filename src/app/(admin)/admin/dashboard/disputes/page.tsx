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
  AlertCircle,
  Package,
  CheckCircle,
  MoreVertical,
  Search,
} from "lucide-react";
import StatCard from "@/components/admin/StatCard";

// Mock Data
const mockDisputes = [
  {
    id: "#00000001",
    date: "01, Aug. 2025",
    time: "8am - 10pm",
    reportedBy: {
      name: "James Patterson",
      avatar: "/images/ryan.png",
    },
    reportedAgainst: {
      name: "Abu Davidson",
      avatar: "/images/ryan.png",
    },
    reportType: "Grade 5",
    comment: "Mathematics",
    duration: 2,
    amount: "₦9,000",
    status: "Completed",
  },
  {
    id: "#00000002",
    date: "01, Aug. 2025",
    time: "8am - 10pm",
    reportedBy: {
      name: "James Patterson",
      avatar: "/images/ryan.png",
    },
    reportedAgainst: {
      name: "Abu Davidson",
      avatar: "/images/ryan.png",
    },
    reportType: "Grade 5",
    comment: "Mathematics",
    duration: 2,
    amount: "₦9,000",
    status: "Scheduled",
  },
  {
    id: "#00000003",
    date: "01, Aug. 2025",
    time: "8am - 10pm",
    reportedBy: {
      name: "James Patterson",
      avatar: "/images/ryan.png",
    },
    reportedAgainst: {
      name: "Abu Davidson",
      avatar: "/images/ryan.png",
    },
    reportType: "Grade 5",
    comment: "Mathematics",
    duration: 2,
    amount: "₦9,000",
    status: "Ongoing",
  },
  {
    id: "#00000004",
    date: "01, Aug. 2025",
    time: "8am - 10pm",
    reportedBy: {
      name: "James Patterson",
      avatar: "/images/ryan.png",
    },
    reportedAgainst: {
      name: "Abu Davidson",
      avatar: "/images/ryan.png",
    },
    reportType: "Grade 5",
    comment: "Mathematics",
    duration: 2,
    amount: "-",
    status: "Cancelled",
  },
];

export default function DisputesPage() {
  const [disputes] = useState(mockDisputes);
  const [mainTab, setMainTab] = useState("reports");
  const [reportsTab, setReportsTab] = useState("all");

  // Calculate stats
  const pendingDisputes = disputes.filter((d) => d.status === "Scheduled").length;
  const totalDisputes = disputes.length;
  const totalResolved = disputes.filter((d) => d.status === "Completed").length;

  const renderTable = (tab: string) => (
    <Card className="mt-4">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white"></TableHead>
            <TableHead className="text-white">REPORT ID</TableHead>
            <TableHead className="text-white">DATE/TIME</TableHead>
            <TableHead className="text-white">REPORT PARTICIPANTS</TableHead>
            <TableHead className="text-white">REPORT TYPE</TableHead>
            <TableHead className="text-white">COMMENT</TableHead>
            <TableHead className="text-white">DURATION (hrs)</TableHead>
            <TableHead className="text-white">AMOUNT</TableHead>
            <TableHead className="text-white">STATUS</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {disputes
            .filter((d) => {
              if (tab === "all") return true;
              if (tab === "pending") return d.status === "Scheduled";
              if (tab === "in-progress") return d.status === "Ongoing";
              if (tab === "resolved") return d.status === "Completed";
              return false;
            })
            .map((dispute, idx) => (
              <TableRow
                key={dispute.id + idx}
                className="odd:bg-[#F5F4F8] even:bg-white"
              >
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell className="font-medium">{dispute.id}</TableCell>
                <TableCell>
                  {dispute.date}
                  <br />
                  <span className="text-xs text-gray-500">{dispute.time}</span>
                </TableCell>
                <TableCell>
                  <div className="mb-2">
                    <span className="text-xs text-gray-400">Reporting</span>
                    <div className="flex items-center gap-2">
                      <Image
                        src={dispute.reportedBy.avatar}
                        alt={dispute.reportedBy.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-primary font-semibold underline cursor-pointer text-sm">
                        {dispute.reportedBy.name}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">Reported</span>
                    <div className="flex items-center gap-2">
                      <Image
                        src={dispute.reportedAgainst.avatar}
                        alt={dispute.reportedAgainst.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-primary font-semibold underline cursor-pointer text-sm">
                        {dispute.reportedAgainst.name}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{dispute.reportType}</TableCell>
                <TableCell className="text-sm">{dispute.comment}</TableCell>
                <TableCell className="text-sm">{dispute.duration}</TableCell>
                <TableCell className="font-semibold text-green-600">
                  {dispute.amount}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      dispute.status === "Completed"
                        ? "bg-green-50 text-green-600"
                        : dispute.status === "Scheduled"
                        ? "bg-orange-50 text-orange-500"
                        : dispute.status === "Ongoing"
                        ? "bg-blue-50 text-blue-600"
                        : dispute.status === "Cancelled"
                        ? "bg-red-50 text-red-500"
                        : ""
                    }`}
                  >
                    {dispute.status}
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
                      <DropdownMenuItem>Resolve</DropdownMenuItem>
                      <DropdownMenuItem>Close</DropdownMenuItem>
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
          title="Pending Disputes"
          value={pendingDisputes}
          icon={<AlertCircle className="w-5 h-5" />}
          change="50%"
          changeColor="bg-green-100 text-green-600"
          subStats={[
            { label: "Booked", value: pendingDisputes, color: "text-orange-600" },
            { label: "Completed", value: 0, color: "text-red-500" },
          ]}
        />
        <StatCard
          title="Total Disputes"
          value={totalDisputes}
          icon={<Package className="w-5 h-5" />}
          change="18%"
          iconBg="bg-orange-50"
        />
        <StatCard
          title="Total Resolved"
          value={totalResolved}
          icon={<CheckCircle className="w-5 h-5" />}
          change="32%"
          changeColor="bg-red-100 text-red-500"
          iconBg="bg-green-50"
        />
      </div>

      {/* 🔎 Search + Sort */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center bg-[#F5F4F8] rounded-lg px-4 py-2 max-w-md w-full sm:w-[400px]">
          <Search size={18} className="text-gray-400" />
          <Input
            type="text"
            placeholder="Enter keywords"
            className="bg-transparent border-none focus:ring-0 px-2 text-sm w-full"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort By <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Report ID</DropdownMenuItem>
            <DropdownMenuItem>Date/Time</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 🗂️ Main Tabs (Reports / Abuse Alerts) */}
      <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
        <TabsList className="flex justify-start gap-4 bg-transparent">
          <TabsTrigger
            value="reports"
            className="
        bg-transparent px-0 pb-3 text-sm font-medium text-gray-500
        data-[state=active]:text-blue-600
        data-[state=active]:border-b-2
        data-[state=active]:border-blue-600
        rounded-none
      "
          >
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="abuse-alerts"
           className="
        bg-transparent px-0 pb-3 text-sm font-medium text-gray-500
        data-[state=active]:text-blue-600
        data-[state=active]:border-b-2
        data-[state=active]:border-blue-600
        rounded-none
      "
          >
            Abuse Alerts
          </TabsTrigger>
          
        </TabsList>

        {/* Reports Tab Content with Sub-tabs */}
        <TabsContent value="reports" className="w-full">
          <Tabs
            value={reportsTab}
            onValueChange={setReportsTab}
            className="w-full"
          >
            <TabsList className="flex justify-start gap-2 bg-transparent mb-4">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-yellow-400 text-white rounded-full px-4 py-2 text-sm font-semibold"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-2 text-sm"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-2 text-sm"
              >
                In Progress
              </TabsTrigger>
              <TabsTrigger
                value="resolved"
                className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-2 text-sm"
              >
                Resolved
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">{renderTable("all")}</TabsContent>
            <TabsContent value="pending">{renderTable("pending")}</TabsContent>
            <TabsContent value="in-progress">{renderTable("in-progress")}</TabsContent>
            <TabsContent value="resolved">{renderTable("resolved")}</TabsContent>
          </Tabs>
        </TabsContent>

        {/* Abuse Alerts Tab Content */}
        <TabsContent value="abuse-alerts">
          <Card className="mt-4 p-8 text-center">
            <p className="text-gray-500">Abuse Alerts content goes here</p>
          </Card>
        </TabsContent>

        {/* Abuse Alerts 2 Tab Content */}
        <TabsContent value="abuse-alerts-2">
          <Card className="mt-4 p-8 text-center">
            <p className="text-gray-500">Abuse Alerts (2) content goes here</p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
