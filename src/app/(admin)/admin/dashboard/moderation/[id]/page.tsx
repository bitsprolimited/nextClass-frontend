"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  UserCheck,
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
  reportedUser: string;
  contentOwner: string;
  policyArea: string;
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
    reportedUser: "John Doe",
    contentOwner: "Tutor",
    policyArea: "Payment Safety",
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
    reportedUser: "Sarah Johnson",
    contentOwner: "Tutor",
    policyArea: "Profile Integrity",
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
    reportedUser: "Obinna",
    contentOwner: "Learner",
    policyArea: "Review Quality",
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
    reportedUser: "Abel Nick",
    contentOwner: "Tutor",
    policyArea: "User Safety",
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
    reportedUser: "Blessing Tutor",
    contentOwner: "Tutor",
    policyArea: "Contact Policy",
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

const activities = [
  {
    timestamp: "14th, Jun. 2026 09:15am",
    category: "Report Created",
    activity: "The report was submitted for moderation review.",
  },
  {
    timestamp: "14th, Jun. 2026 09:20am",
    category: "Policy Flag",
    activity: "System matched this report with a platform safety rule.",
  },
  {
    timestamp: "14th, Jun. 2026 09:40am",
    category: "Admin Review",
    activity: "Awaiting admin decision on the reported item.",
  },
];

const relatedReports = [
  {
    id: "#RPT-001",
    title: "Payment safety warning",
    date: "Jun 13, 2026",
    status: "Pending",
  },
  {
    id: "#RPT-002",
    title: "Repeated contact sharing",
    date: "Jun 10, 2026",
    status: "Reviewed",
  },
];

export default function ModerationDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [expandedReport, setExpandedReport] = useState<number | null>(null);
  const [status, setStatus] = useState<ModerationStatus>("pending");

  const report = useMemo(() => {
    return moderationItems.find((item) => item.id === id);
  }, [id]);

  if (!report) {
    return (
      <main className="min-h-screen bg-[#F5F5F5] p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <p className="font-semibold text-red-500">
            Moderation report not found.
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/dashboard/moderation")}
          >
            Back to Moderation
          </Button>
        </div>
      </main>
    );
  }

  const currentStatus = status || report.status;

  return (
    <main className="min-h-screen bg-[#F5F5F5] p-6 lg:p-8">
      <div className="flex items-center justify-start mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 p-0"
          onClick={() => router.push("/admin/dashboard/moderation")}
        >
          &lt; Back to Moderation
        </Button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center mb-6">
        <div>
          <h1 className="text-[18px] text-[#9FA3A9]">Moderation Report</h1>
          <p className="text-xl font-semibold text-gray-900 mt-1">
            {report.title}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            className="rounded-full text-red-500 border-red-500 hover:bg-red-50 bg-transparent"
            onClick={() => setStatus("removed")}
          >
            Remove Content
          </Button>

          <Button
            variant="outline"
            className="rounded-full text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent"
            onClick={() => setStatus("dismissed")}
          >
            Dismiss Report
          </Button>

          <Button
            className="bg-secondary rounded-full text-white shadow-md"
            onClick={() => setStatus("review")}
          >
            Mark Under Review
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6 min-h-[400px]">
            <div className="flex justify-between items-center border-b pb-3 mb-6">
              <h2 className="text-base font-semibold text-[#9FA3A9]">
                Report Details
              </h2>

              <Badge className={`${statusTone[currentStatus]} hover:bg-transparent`}>
                {statusLabel[currentStatus]}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-sm">
              <div>
                <p className="text-gray-500">Reported User</p>
                <p className="font-semibold text-gray-800">
                  {report.reportedUser}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Source</p>
                <p className="font-semibold text-gray-800">{report.source}</p>
              </div>

              <div>
                <p className="text-gray-500">Reporter</p>
                <p className="font-semibold text-gray-800">{report.reporter}</p>
              </div>

              <div>
                <p className="text-gray-500">Policy Area</p>
                <p className="font-semibold text-gray-800">
                  {report.policyArea}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Content Owner</p>
                <p className="font-semibold text-gray-800">
                  {report.contentOwner}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Date Reported</p>
                <p className="font-semibold text-gray-800">
                  {report.createdAt}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Severity</p>
                <Badge
                  className={`${severityTone[report.severity]} mt-1 hover:bg-transparent`}
                >
                  {severityLabel[report.severity]}
                </Badge>
              </div>

              <div>
                <p className="text-gray-500">Report Count</p>
                <p className="font-semibold text-gray-800">
                  {report.reportCount}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Report ID</p>
                <p className="font-semibold text-gray-800">{report.id}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-[#F5F4F8] p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-5 h-5 text-orange-500" />
                <p className="font-semibold text-gray-800">Content Preview</p>
              </div>
              <p className="text-sm leading-7 text-gray-700">
                {report.contentPreview}
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-white border p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <p className="font-semibold text-gray-800">Reason</p>
              </div>
              <p className="text-sm leading-7 text-gray-700">
                {report.reason}
              </p>
            </div>
          </Card>

          <Card className="p-0 rounded-xl border border-gray-100 shadow-sm min-h-[300px]">
            <h2 className="text-xl text-gray-400 font-semibold p-4 pb-0">
              Review Notes
            </h2>

            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="bg-white border-b h-auto p-0 flex justify-start space-x-8 px-4 pt-4">
                <TabsTrigger
                  value="notes"
                  className="text-base font-semibold text-gray-400 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 rounded-none pb-2"
                >
                  Admin Notes
                </TabsTrigger>

                <TabsTrigger
                  value="policy"
                  className="text-base font-semibold text-gray-400 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-700 rounded-none pb-2"
                >
                  Policy Check
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="p-4">
                <div className="rounded-xl bg-[#F5F4F8] p-4 text-sm text-gray-600">
                  No admin note has been added yet. This area can later connect
                  to your backend moderation notes.
                </div>
              </TabsContent>

              <TabsContent value="policy" className="p-4">
                <div className="rounded-xl bg-[#F5F4F8] p-4 text-sm text-gray-600">
                  Check whether the reported content violates payment safety,
                  profile integrity, communication, or user protection policy.
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 h-[400px] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Activities
              </h2>
            </div>

            <div className="w-full space-y-3">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="pb-3 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex justify-between items-start mb-1 gap-4">
                    <p className="font-semibold text-gray-800 text-sm">
                      {activity.category}
                    </p>
                    <p className="text-xs text-orange-500 font-medium text-right">
                      {activity.timestamp}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{activity.activity}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 h-[400px] overflow-y-auto rounded-2xl shadow-sm bg-white">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Related Reports
            </h2>

            <div className="space-y-3">
              {relatedReports.map((item, index) => {
                const isOpen = expandedReport === index;

                return (
                  <div
                    key={item.id}
                    className="bg-[#F5F4F8] rounded-xl px-3 py-3 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {item.id}
                        </p>
                        <p className="text-xs text-gray-500">{item.title}</p>
                      </div>

                      <Badge className="bg-[#FFA30033] text-[#FFA300] font-medium hover:bg-[#FFA30033]">
                        {item.status}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-gray-500 mt-2">
                      <p>{item.date}</p>
                      <p>Same policy area</p>
                    </div>

                    {isOpen && (
                      <div className="mt-3 text-[11px] text-gray-600 space-y-1 border-t border-gray-200 pt-2">
                        <p>
                          This can later show linked moderation records from the
                          backend.
                        </p>
                      </div>
                    )}

                    <div className="flex justify-center mt-1">
                      <button
                        className="text-gray-400 hover:text-gray-600 transition"
                        onClick={() =>
                          setExpandedReport(isOpen ? null : index)
                        }
                      >
                        {isOpen ? (
                          <ChevronUp size={16} strokeWidth={2} />
                        ) : (
                          <ChevronDown size={16} strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <UserCheck className="h-5 w-5 text-secondary mt-0.5" />
              <p>
                This page is ready for backend integration. Replace the mock
                report data with your moderation API response when the endpoint
                is ready.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}