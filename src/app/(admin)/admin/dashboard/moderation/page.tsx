"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatCard from "@/components/admin/StatCard";
import {
  AlertTriangle,
  ChevronDown,
  MoreVertical,
  Search,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

type ModerationStatus = "pending" | "review" | "removed" | "dismissed";
type ModerationSeverity = "low" | "medium" | "high" | "critical";

interface ModerationItem {
  id: string;
  title: string;
  source: string;
  reporter: string;
  reason: string;
  status: ModerationStatus;
  severity: ModerationSeverity;
  createdAt: string;
  reportCount: number;
  contentPreview: string;
}

const moderationItems: ModerationItem[] = [
  {
    id: "m-01",
    title: "Off-platform payment request",
    source: "Tutor message",
    reporter: "Amina Yusuf",
    reason: "Request to move communication off platform",
    status: "pending",
    severity: "high",
    createdAt: "Jun 13, 2026",
    reportCount: 3,
    contentPreview:
      "Please send your payment directly to my personal account and I will give you a discount for the next session.",
  },
  {
    id: "m-02",
    title: "Inappropriate profile bio",
    source: "Tutor profile",
    reporter: "System",
    reason: "Contains non-educational claims and unverified offers",
    status: "review",
    severity: "medium",
    createdAt: "Jun 12, 2026",
    reportCount: 1,
    contentPreview:
      "I guarantee admission to top universities and can tutor every subject in one week.",
  },
  {
    id: "m-03",
    title: "Fake review detected",
    source: "Learner review",
    reporter: "Admin audit",
    reason: "Review appears too generic and repeated",
    status: "removed",
    severity: "medium",
    createdAt: "Jun 10, 2026",
    reportCount: 2,
    contentPreview:
      "Great tutor! I learned everything in one hour. Best ever. Highly recommend!",
  },
  {
    id: "m-04",
    title: "Potential harassment",
    source: "Message thread",
    reporter: "Learner",
    reason: "Unprofessional tone and repeated profanity",
    status: "pending",
    severity: "critical",
    createdAt: "Jun 14, 2026",
    reportCount: 5,
    contentPreview:
      "If you don’t submit the homework on time again, I will remove you from my roster.",
  },
  {
    id: "m-05",
    title: "Suggestion to post personal contact",
    source: "Tutor profile",
    reporter: "Parent",
    reason: "Profile mentions personal WhatsApp and email",
    status: "dismissed",
    severity: "low",
    createdAt: "May 31, 2026",
    reportCount: 1,
    contentPreview:
      "Contact me on WhatsApp at +234 801 234 5678 for faster scheduling.",
  },
];

const statusLabel: Record<ModerationStatus, string> = {
  pending: "Pending",
  review: "Under Review",
  removed: "Removed",
  dismissed: "Dismissed",
};

const severityLabel: Record<ModerationSeverity, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

const statusTone: Record<ModerationStatus, string> = {
  pending: "bg-orange-50 text-orange-500",
  review: "bg-blue-50 text-blue-600",
  removed: "bg-red-50 text-red-500",
  dismissed: "bg-gray-100 text-gray-500",
};

const severityTone: Record<ModerationSeverity, string> = {
  low: "bg-green-50 text-green-600",
  medium: "bg-yellow-50 text-yellow-600",
  high: "bg-orange-50 text-orange-600",
  critical: "bg-red-50 text-red-600",
};

export default function ModerationPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<ModerationStatus | "all">("all");

  const totalReports = moderationItems.length;
  const pendingCount = moderationItems.filter(
    (item) => item.status === "pending"
  ).length;
  const underReviewCount = moderationItems.filter(
    (item) => item.status === "review"
  ).length;
  const removedCount = moderationItems.filter(
    (item) => item.status === "removed"
  ).length;
  const dismissedCount = moderationItems.filter(
    (item) => item.status === "dismissed"
  ).length;

  const filteredItems = useMemo(() => {
    return moderationItems.filter((item) => {
      const matchesTab = activeTab === "all" || item.status === activeTab;

      const searchValue = search.toLowerCase();
      const matchesSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.source.toLowerCase().includes(searchValue) ||
        item.reporter.toLowerCase().includes(searchValue) ||
        item.reason.toLowerCase().includes(searchValue);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const renderTable = () => (
    <Card className="mt-4 overflow-hidden">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white">Report</TableHead>
            <TableHead className="text-white">Source</TableHead>
            <TableHead className="text-white">Reporter</TableHead>
            <TableHead className="text-white">Severity</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="py-8 text-center">
                <p className="text-sm text-gray-500">
                  No moderation report found.
                </p>
              </TableCell>
            </TableRow>
          ) : (
            filteredItems.map((item) => (
              <TableRow
                key={item.id}
                className="odd:bg-[#F5F4F8] even:bg-white cursor-pointer hover:bg-orange-50/40"
                onClick={() =>
                  router.push(`/admin/dashboard/moderation/${item.id}`)
                }
              >
                <TableCell>
                  <div>
                    <p className="font-medium text-sm text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {item.reason}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="text-sm">{item.source}</TableCell>
                <TableCell className="text-sm">{item.reporter}</TableCell>

                <TableCell>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${severityTone[item.severity]}`}
                  >
                    {severityLabel[item.severity]}
                  </span>
                </TableCell>

                <TableCell>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${statusTone[item.status]}`}
                  >
                    {statusLabel[item.status]}
                  </span>
                </TableCell>

                <TableCell className="text-sm text-gray-600">
                  {item.createdAt}
                </TableCell>

                <TableCell onClick={(event) => event.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          router.push(`/admin/dashboard/moderation/${item.id}`)
                        }
                      >
                        View Report
                      </DropdownMenuItem>
                      <DropdownMenuItem>Mark Under Review</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500">
                        Remove Content
                      </DropdownMenuItem>
                      <DropdownMenuItem>Dismiss Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Reports in Queue"
          value={totalReports}
          icon={<ShieldAlert className="w-5 h-5" />}
          change="+18%"
          changeColor="bg-green-100 text-green-600"
          iconBg="bg-yellow-50"
        />

        <StatCard
          title="Pending Review"
          value={pendingCount}
          icon={<AlertTriangle className="w-5 h-5" />}
          change="+9%"
          changeColor="bg-orange-100 text-orange-500"
          iconBg="bg-orange-50"
        />

        <StatCard
          title="Under Review"
          value={underReviewCount}
          icon={<ShieldCheck className="w-5 h-5" />}
          change="0%"
          changeColor="bg-blue-100 text-blue-600"
          iconBg="bg-blue-50"
        />

        <StatCard
          title="Confirmed Removals"
          value={removedCount}
          icon={<ShieldCheck className="w-5 h-5" />}
          change="+24%"
          changeColor="bg-green-100 text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center bg-[#F5F4F8] rounded-lg px-4 py-2 max-w-md w-full sm:w-[400px]">
          <Search size={18} className="text-gray-400" />
          <Input
            type="text"
            placeholder="Search by report, source, or reporter"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="bg-transparent border-none focus-visible:ring-0 px-2 text-sm w-full"
          />
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort By <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Severity</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="bg-secondary rounded-full text-white shadow-md px-5">
            New moderation note
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as ModerationStatus | "all")
        }
        className="w-full"
      >
        <TabsList className="flex justify-start gap-4 bg-transparent flex-wrap">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            All ({totalReports})
          </TabsTrigger>

          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Pending ({pendingCount})
          </TabsTrigger>

          <TabsTrigger
            value="review"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Under Review ({underReviewCount})
          </TabsTrigger>

          <TabsTrigger
            value="removed"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Removed ({removedCount})
          </TabsTrigger>

          <TabsTrigger
            value="dismissed"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Dismissed ({dismissedCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderTable()}</TabsContent>
        <TabsContent value="pending">{renderTable()}</TabsContent>
        <TabsContent value="review">{renderTable()}</TabsContent>
        <TabsContent value="removed">{renderTable()}</TabsContent>
        <TabsContent value="dismissed">{renderTable()}</TabsContent>
      </Tabs>
    </div>
  );
}