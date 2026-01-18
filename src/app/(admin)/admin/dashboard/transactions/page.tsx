"use client";

import { useState, useMemo } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ChevronDown, CreditCard, MoreVertical, Search, TrendingUp, Wallet, Copy, Check } from "lucide-react";

import StatCard from "@/components/admin/StatCard";
import Loader from "@/components/Loader";
import ErrorComponent from "@/components/ErrorComponent";

import { useTransactions, useTransaction } from "@/hooks/useTransactions";
import type { PaymentItem, TransactionRow } from "@/types/transactions";

// helper: safely produce a display string for IDs or small objects
const toDisplayId = (v: unknown) => {
  if (v === undefined || v === null) return "N/A";
  if (typeof v === "string" || typeof v === "number") return String(v);
  // handle common object shapes: { _id } or { id }
  if (typeof v === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = v as any;
    if (typeof obj._id === "string") return obj._id;
    if (typeof obj.id === "string") return obj.id;
    if (typeof obj.referenceId === "string") return obj.referenceId;
    // try fullName/name fallbacks
    if (typeof obj.fullName === "string") return obj.fullName;
    if (typeof obj.name === "string") return obj.name;
    // last resort: pretty-print a small subset so it won't crash React
    try {
      return JSON.stringify(obj);
    } catch {
      return "[object]";
    }
  }
  return String(v);
};

// helper: get a human name from a person-like value (string or object)
const getPersonName = (p: unknown) => {
  if (!p) return null;
  if (typeof p === "string") return p;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj = p as any;
  return obj.fullName ?? obj.name ?? obj._id ?? null;
};

// Status badge styling
const getStatusStyles = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-600";
    case "pending":
      return "bg-orange-100 text-orange-600";
    case "ongoing":
      return "bg-blue-100 text-blue-600";
    case "completed":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getStatusCapitalized = (status: string) => {
  if (!status) return "N/A";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function TransactionsPage() {
  
  const { data, isLoading, isError, error } = useTransactions();

  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRow | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [query, setQuery] = useState("");

  // call detail hook at top-level (enabled only when id present)
  const transactionDetailQuery = useTransaction(selectedTransaction?.id ?? "");

  // normalize PaymentItem -> TransactionRow (safe defaults)
  const rows = useMemo(() => {
    const list: PaymentItem[] = Array.isArray(data) ? data : [];
    return list.map((p) => {
      // pick parent name from possible fields
      const parentName =
        p.parent?.fullName ??
        p.parent?.fullName ??
        p.parentId?.fullName ??
        p.parentId?.fullName ??
        p.parent?.fullName ??
        "Unknown Parent";

      // pick teacher name from possible fields
      const teacherName =
        p.teacher?.fullName ??
        p.teacher?.fullName ??
        p.teacherId?.fullName ??
        p.teacherId?.fullName ??
        p.teacher?.fullName ??
        "Unknown Teacher";

      const participants =
        Array.isArray(p.participants) && p.participants.length
          ? p.participants.map((pp) => ({ name: pp.name ?? "Unknown", role: pp.role ?? "participant" }))
          : [
              // put parent as sender and teacher as recipient
              { name: parentName, role: "parent" },
              { name: teacherName, role: "teacher" },
            ];

      // prefer createdAt for date/time (fallback to dateTime)
      const dateTime = p.createdAt ?? p.dateTime ?? "N/A";

      // session/booking id in API may be bookingId or sessionId
      const sessionId = p.bookingId ?? p.sessionId ?? "N/A";

      return {
        id: String(p.id ?? p._id ?? "unknown"),
        referenceId: String(p.referenceId ?? p.id ?? p._id ?? "unknown"),
        dateTime: String(dateTime),
        participants,
        sessionId: String(sessionId),
        amount: typeof p.amount === "number" ? p.amount : Number(p.amount) || 0,
        status: (String(p.status ?? "pending").toLowerCase() as TransactionRow["status"]) || "pending",
      } as TransactionRow;
    });
  }, [data]);

  // local search filter
  const filteredRows = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        (r.referenceId || "").toLowerCase().includes(q) ||
        (r.sessionId || "").toLowerCase().includes(q) ||
        r.participants.some((p) => p.name.toLowerCase().includes(q))
    );
  }, [rows, query]);

  if (isLoading) return <Loader className="py-14" />;
  if (isError)
    return (
      <div>
        <ErrorComponent />
        {error?.message && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
      </div>
    );

  const formatDateLines = (dateTime?: string | null | number) => {
    if (dateTime === undefined || dateTime === null) return ["N/A"];
    const s = typeof dateTime === "string" ? dateTime : String(dateTime);
    return s.split(/\r?\n/).filter(Boolean);
  };

  const renderParticipants = (participants: Array<{ name: string; role: string }>) => {
    return (
      <div className="flex flex-col gap-3">
        {participants.map((participant, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <div className="flex flex-col items-center">
              <div
                className={`w-3 h-3 rounded-full ${
                  participant.role === "tutor" ? "bg-purple-600" : "bg-green-600"
                }`}
              ></div>
              {idx < participants.length - 1 && (
                <div className="w-0.5 h-6 border-l-2 border-dashed border-gray-400 my-1"></div>
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">
                {participant.role === "tutor" ? "Sender" : "Recipient"}
              </span>
              <a href="#" className="text-sm text-blue-600 hover:underline font-medium">
                {participant.name}
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTable = (status: "all" | "paid" | "pending" | "ongoing" | "completed") => {
    const rowsToShow = status === "all" ? filteredRows : filteredRows.filter((t) => t.status === status);

    return (
      <Card className="mt-4">
        <Table>
          <TableHeader className="bg-primary">
            <TableRow>
              <TableHead className="text-white"></TableHead>
              <TableHead className="text-white">REFERENCE ID</TableHead>
              <TableHead className="text-white">DATE/TIME</TableHead>
              <TableHead className="text-white">REPORT PARTICIPANTS</TableHead>
              <TableHead className="text-white">SESSION ID</TableHead>
              <TableHead className="text-white">AMOUNT</TableHead>
              <TableHead className="text-white">STATUS</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rowsToShow.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              rowsToShow.map((transaction, idx) => (
                <TableRow key={`${transaction.id}-${idx}`} className="odd:bg-[#F5F4F8] even:bg-white">
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>

                  <TableCell className="font-medium">{transaction.referenceId}</TableCell>

                  <TableCell className="text-sm">
                    {formatDateLines(transaction.dateTime).map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </TableCell>

                  <TableCell>{renderParticipants(transaction.participants)}</TableCell>

                  <TableCell className="font-medium">{transaction.sessionId}</TableCell>

                  <TableCell className="text-green-600 font-semibold">₦{transaction.amount.toLocaleString()}</TableCell>

                  <TableCell>
                    <span className={`px-4 py-1 rounded-full text-xs font-medium ${getStatusStyles(transaction.status)}`}>
                      {getStatusCapitalized(transaction.status)}
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
                        <DropdownMenuItem onClick={() => setSelectedTransaction(transaction)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Dispute Transaction</DropdownMenuItem>
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
  };

  const renderTransactionDetailsModal = () => {
    if (!selectedTransaction) return null;

    // prefer fresh server data when available
    const detail = transactionDetailQuery.data ?? (null as PaymentItem | null);

    // pick sender/recipient from server detail when available, fallback to mapped participants
   const senderName =
  getPersonName(detail?.parent) ??
  getPersonName(detail?.parentId) ??
  selectedTransaction.participants.find((p) => p.role === "parent" || p.role === "tutor")?.name ??
  "N/A";

const recipientName =
  getPersonName(detail?.teacher) ??
  getPersonName(detail?.teacherId) ??
  selectedTransaction.participants.find((p) => p.role === "teacher" || p.role === "student")?.name ??
  "N/A";

const dateStr = (typeof detail?.createdAt === "string" || typeof detail?.createdAt === "number")
  ? String(detail?.createdAt)
  : selectedTransaction.dateTime ?? "N/A";


    

    
    return (
      <Dialog open={!!selectedTransaction} onOpenChange={(open) => { if (!open) setSelectedTransaction(null); }}>
        <DialogContent className="max-w-[600px] sm:rounded-lg">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-xl font-semibold">Transaction Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="text-center space-y-3">
              <div>
                <p className="text-gray-500 text-sm mb-2">Amount</p>
                <p className="text-3xl font-bold">₦{selectedTransaction.amount.toLocaleString()}</p>
              </div>
              <span className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${getStatusStyles(selectedTransaction.status)}`}>
                {getStatusCapitalized(selectedTransaction.status)}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Sender</p>
                    <a href="#" className="text-blue-600 font-semibold hover:underline">{senderName}</a>
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs mb-1">Session ID</p>
                    <p className="font-semibold">{toDisplayId(detail?.bookingId ?? selectedTransaction.sessionId)}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs mb-1">Date</p>
                    <p className="font-semibold">{dateStr}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Recipient</p>
                    <a href="#" className="text-blue-600 font-semibold hover:underline">{recipientName}</a>
                  </div>

                  <div>
                    <p className="text-gray-500 text-xs mb-1">Transaction ID</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{toDisplayId(selectedTransaction.referenceId)}</p>
                      <button onClick={() => {
                        navigator.clipboard.writeText(selectedTransaction.id);
                        setCopiedId(true);
                        setTimeout(() => setCopiedId(false), 2000);
                      }} className="p-1 hover:bg-gray-200 rounded transition-colors" title="Copy transaction ID">
                        {copiedId ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-600" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button onClick={() => setSelectedTransaction(null)} className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <StatCard title="Total Tutors" value="1,543" icon={<CreditCard />} change="18%" />
        <StatCard title="Total Sessions" value="196" icon={<Wallet />} change="50%" changeColor="bg-green-100 text-green-600" subStats={[{ label: "Scheduled", value: 100, color: "text-blue-600" }, { label: "Completed", value: 96, color: "text-green-600" }]} />
        <StatCard title="Total Revenue" value="₦124,309.50" icon={<TrendingUp />} change="32%" />
        <StatCard title="Total Refunds" value="₦124,309.50" icon={<Wallet />} />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center bg-[#F5F4F8] rounded-lg px-2 py-1 max-w-md w-full sm:w-[300px]">
          <Input type="text" placeholder="Enter keywords" className="bg-transparent border-none focus:ring-0 px-2 text-sm w-full" onChange={(e) => setQuery(e.target.value)} />
          <Button size="sm" className="ml-2 rounded-full px-4 bg-secondary hover:bg-[#e6a700] text-white text-xs font-semibold flex items-center gap-1"><Search size={16} /> Search</Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Sort By <ChevronDown className="w-4 h-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Amount (High to Low)</DropdownMenuItem>
            <DropdownMenuItem>Amount (Low to High)</DropdownMenuItem>
            <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
            <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
            <DropdownMenuItem>Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex justify-start gap-4 bg-transparent">
          <TabsTrigger value="all" className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3">All</TabsTrigger>
          <TabsTrigger value="paid" className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3">Paid</TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3">Pending</TabsTrigger>
          <TabsTrigger value="ongoing" className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3">Ongoing</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">{renderTable("all")}</TabsContent>
        <TabsContent value="paid">{renderTable("paid")}</TabsContent>
        <TabsContent value="pending">{renderTable("pending")}</TabsContent>
        <TabsContent value="ongoing">{renderTable("ongoing")}</TabsContent>
        <TabsContent value="completed">{renderTable("completed")}</TabsContent>
      </Tabs>

      {renderTransactionDetailsModal()}
    </div>
  );
}
