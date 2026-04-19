"use client";

import { useState, useEffect } from "react";
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
import { ChevronDown, Users, UserCheck, GraduationCap, MoreVertical, Search, Loader } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { getAllLearners } from "@/services/learner.service";
import { useRouter } from "next/navigation";

export default function LearnersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch learners
  const { data, isLoading } = useQuery({
    queryKey: ["learners", page, limit, debouncedSearch],
    queryFn: () =>
      getAllLearners({
        page,
        limit,
        search: debouncedSearch || undefined,
      }),
  });

 

  const learners = data?.items || [];
  const pagination = data?.meta;

  // Calculate stats
  const totalLearners = pagination?.total || 0;
  const activeLearners = learners.filter(
    (l) => l.status === "active"
  ).length;
  const suspendedLearners = learners.filter(
    (l) => l.status === "suspended"
  ).length;

  // Filter based on tab
  const filteredLearners = learners.filter((learner) => {
    if (activeTab === "active") return learner.status === "active";
    if (activeTab === "suspended") return learner.status === "suspended";
    return true;
  });

  const renderTable = () => (
    <Card className="mt-4">
      <Table>
        <TableHeader className="bg-primary">
          <TableRow>
            <TableHead className="text-white"></TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Gender</TableHead>
            <TableHead className="text-white">Age</TableHead>
            <TableHead className="text-white">Grade</TableHead>
            <TableHead className="text-white">Email</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <div className="flex justify-center items-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Loading learners...
                </div>
              </TableCell>
            </TableRow>
          ) : filteredLearners.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8">
                <p className="text-gray-500">No learners found</p>
              </TableCell>
            </TableRow>
          ) : (
            filteredLearners.map((learner) => (
              <TableRow
                key={learner._id}
                className="odd:bg-[#F5F4F8] even:bg-white"
              >
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {learner.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{learner.name}</p>
                    <p className="text-xs text-gray-500">{learner.email}</p>
                  </div>
                </TableCell>
                <TableCell className="capitalize text-sm">
                  {learner.gender}
                </TableCell>
                <TableCell className="text-sm">{learner.age}</TableCell>
                <TableCell className="text-sm">{learner.grade}</TableCell>
                <TableCell className="text-sm text-gray-600">
                  {learner.email}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-semibold ${
                      learner.status === "active"
                        ? "bg-green-50 text-green-600"
                        : "bg-orange-50 text-orange-500"
                    }`}
                  >
                    {learner.status === "active" ? "Active" : "Suspended"}
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
                        onClick={() =>
                          router.push(
                            `/admin/dashboard/learners/${learner._id}`
                          )
                        }
                      >
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {learner.status === "active"
                          ? "Suspend Learner"
                          : "Activate Learner"}
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between p-4 border-t">
          <p className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages} (Total:{" "}
            {pagination.total})
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPage(Math.min(pagination.totalPages, page + 1))
              }
              disabled={page === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Total Registered Students"
          value={totalLearners}
          icon={<Users className="w-5 h-5" />}
          change={totalLearners > 0 ? "+12%" : "0%"}
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Active Learners"
          value={activeLearners}
          icon={<UserCheck className="w-5 h-5" />}
          change={activeLearners > 0 ? "+18%" : "0%"}
          changeColor="bg-green-100 text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard
          title="Suspended Learners"
          value={suspendedLearners}
          icon={<GraduationCap className="w-5 h-5" />}
          change={suspendedLearners > 0 ? "-5%" : "0%"}
          changeColor="bg-red-100 text-red-500"
          iconBg="bg-red-50"
        />
      </div>

      {/* 🔎 Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center bg-[#F5F4F8] rounded-lg px-4 py-2 max-w-md w-full sm:w-[400px]">
          <Search size={18} className="text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <DropdownMenuItem>Name</DropdownMenuItem>
            <DropdownMenuItem>Grade</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 🗂️ Tabs */}
      <Tabs
        defaultValue="all"
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="flex justify-start gap-4 bg-transparent">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            All ({totalLearners})
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Active ({activeLearners})
          </TabsTrigger>
          <TabsTrigger
            value="suspended"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Suspended ({suspendedLearners})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderTable()}</TabsContent>
        <TabsContent value="active">{renderTable()}</TabsContent>
        <TabsContent value="suspended">{renderTable()}</TabsContent>
      </Tabs>
    </div>
  );
}
