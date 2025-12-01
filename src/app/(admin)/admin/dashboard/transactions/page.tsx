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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ChevronDown, CreditCard, MoreVertical, Search, TrendingUp, Wallet, Copy, Check } from 'lucide-react';

import StatCard from "@/components/admin/StatCard";

// Table row shape
type TransactionRow = {
  id: string;
  referenceId: string;
  dateTime: string;
  participants: Array<{ name: string; role: string }>;
  sessionId: string;
  amount: number;
  status: "paid" | "pending" | "ongoing" | "completed";
};

// Mock data
const initialTransactions: TransactionRow[] = [
  {
    id: "1",
    referenceId: "1234qwerty56",
    dateTime: "01. Aug. 2025\n8am - 10pm",
    participants: [
      { name: "James Patterson", role: "tutor" },
      { name: "Abu Davidson", role: "student" },
    ],
    sessionId: "#00000001",
    amount: 9000,
    status: "paid",
  },
  {
    id: "2",
    referenceId: "1234qwerty56",
    dateTime: "01. Aug. 2025\n8am - 10pm",
    participants: [
      { name: "James Patterson", role: "tutor" },
      { name: "Abu Davidson", role: "student" },
    ],
    sessionId: "#00000001",
    amount: 9000,
    status: "pending",
  },
  {
    id: "3",
    referenceId: "1234qwerty56",
    dateTime: "01. Aug. 2025\n8am - 10pm",
    participants: [
      { name: "James Patterson", role: "tutor" },
      { name: "Abu Davidson", role: "student" },
    ],
    sessionId: "#00000001",
    amount: 9000,
    status: "ongoing",
  },
  {
    id: "4",
    referenceId: "1234qwerty56",
    dateTime: "01. Aug. 2025\n8am - 10pm",
    participants: [
      { name: "James Patterson", role: "tutor" },
      { name: "Abu Davidson", role: "student" },
    ],
    sessionId: "#00000001",
    amount: 9000,
    status: "completed",
  },
  {
    id: "5",
    referenceId: "1234qwerty56",
    dateTime: "01. Aug. 2025\n8am - 10pm",
    participants: [
      { name: "James Patterson", role: "tutor" },
      { name: "Abu Davidson", role: "student" },
    ],
    sessionId: "#00000001",
    amount: 9000,
    status: "paid",
  },
];

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
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function TransactionsPage() {
  const [transactions] = useState<TransactionRow[]>(
    initialTransactions
  );
  const [filteredTransactions, setFilteredTransactions] =
    useState<TransactionRow[]>(initialTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRow | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Handle search
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredTransactions(transactions);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = transactions.filter(
      (t) =>
        t.referenceId.toLowerCase().includes(lowercaseQuery) ||
        t.sessionId.toLowerCase().includes(lowercaseQuery) ||
        t.participants.some((p) =>
          p.name.toLowerCase().includes(lowercaseQuery)
        )
    );
    setFilteredTransactions(filtered);
  };

  const renderParticipants = (participants: Array<{ name: string; role: string }>) => {
    return (
      <div className="flex flex-col gap-3">
        {participants.map((participant, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${
                participant.role === "tutor" ? "bg-purple-600" : "bg-green-600"
              }`}></div>
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

  // Render one table (for each tab)
  const renderTable = (status: "all" | "paid" | "pending" | "ongoing" | "completed") => {
    const rows =
      status === "all"
        ? filteredTransactions
        : filteredTransactions.filter((t) => t.status === status);

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
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-8 text-center">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((transaction, idx) => (
                <TableRow
                  key={`${transaction.id}-${idx}`}
                  className="odd:bg-[#F5F4F8] even:bg-white"
                >
                  <TableCell>
                    <input type="checkbox" />
                  </TableCell>

                  <TableCell className="font-medium">
                    {transaction.referenceId}
                  </TableCell>

                  <TableCell className="text-sm">
                    {transaction.dateTime.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </TableCell>

                  <TableCell>
                    {renderParticipants(transaction.participants)}
                  </TableCell>

                  <TableCell className="font-medium">
                    {transaction.sessionId}
                  </TableCell>

                  <TableCell className="text-green-600 font-semibold">
                    ₦{transaction.amount.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                        transaction.status
                      )}`}
                    >
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
                        <DropdownMenuItem onClick={() => setSelectedTransaction(transaction)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Download Receipt</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Dispute Transaction
                        </DropdownMenuItem>
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

    const sender = selectedTransaction.participants.find((p) => p.role === "tutor");
    const recipient = selectedTransaction.participants.find((p) => p.role === "student");

    return (
      <Dialog open={!!selectedTransaction} onOpenChange={(open) => {
        if (!open) setSelectedTransaction(null);
      }}>
        <DialogContent className="max-w-md sm:rounded-lg">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-xl font-semibold">Transaction Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Amount and Status */}
            <div className="text-center space-y-3">
              <div>
                <p className="text-gray-500 text-sm mb-2">Amount</p>
                <p className="text-3xl font-bold">₦{selectedTransaction.amount.toLocaleString()}</p>
              </div>
              <span
                className={`inline-block px-4 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                  selectedTransaction.status
                )}`}
              >
                {getStatusCapitalized(selectedTransaction.status)}
              </span>
            </div>

            {/* Details Grid */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Sender</p>
                    <a href="#" className="text-blue-600 font-semibold hover:underline">
                      {sender?.name || "N/A"}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Session ID</p>
                    <p className="font-semibold">{selectedTransaction.sessionId}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Date</p>
                    <p className="font-semibold">{selectedTransaction.dateTime.split("\n")[0]}</p>
                    <p className="text-xs text-gray-600">
                      {selectedTransaction.dateTime.split("\n")[1]}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Recipient</p>
                    <a href="#" className="text-blue-600 font-semibold hover:underline">
                      {recipient?.name || "N/A"}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Transaction ID</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{selectedTransaction.referenceId}</p>
                      <button
                        onClick={copyToClipboard}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        title="Copy transaction ID"
                      >
                        {copiedId ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">Payment Method</p>
                    <p className="font-semibold">Card</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              onClick={() => setSelectedTransaction(null)}
              className="w-full bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const copyToClipboard = () => {
    if (selectedTransaction) {
      navigator.clipboard.writeText(selectedTransaction.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Total Tutors"
          value="1,543"
          icon={<CreditCard />}
          change="18%"
        />
        <StatCard
          title="Total Sessions"
          value="196"
          icon={<Wallet />}
          change="50%"
          changeColor="bg-green-100 text-green-600"
          subStats={[
            {
              label: "Scheduled",
              value: 100,
              color: "text-blue-600",
            },
            {
              label: "Completed",
              value: 96,
              color: "text-green-600",
            },
          ]}
        />
        <StatCard
          title="Total Revenue"
          value="₦124,309.50"
          icon={<TrendingUp />}
          change="32%"
        />
        <StatCard
          title="Total Refunds"
          value="₦124,309.50"
          icon={<Wallet />}
        />
      </div>

      {/* Search + Sort */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center bg-[#F5F4F8] rounded-lg px-2 py-1 max-w-md w-full sm:w-[300px]">
          <Input
            type="text"
            placeholder="Enter keywords"
            className="bg-transparent border-none focus:ring-0 px-2 text-sm w-full"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            size="sm"
            className="ml-2 rounded-full px-4 bg-secondary hover:bg-[#e6a700] text-white text-xs font-semibold flex items-center gap-1"
          >
            <Search size={16} /> Search
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort By <ChevronDown className="w-4 h-4" />
            </Button>
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

      {/* Tabs + Tables */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="flex justify-start gap-4 bg-transparent">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="paid"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Paid
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-secondary data-[state=active]:text-white bg-gray-200 text-gray-600 rounded-full px-4 py-3"
          >
            Pending
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
        </TabsList>

        <TabsContent value="all">{renderTable("all")}</TabsContent>
        <TabsContent value="paid">{renderTable("paid")}</TabsContent>
        <TabsContent value="pending">{renderTable("pending")}</TabsContent>
        <TabsContent value="ongoing">{renderTable("ongoing")}</TabsContent>
        <TabsContent value="completed">{renderTable("completed")}</TabsContent>
      </Tabs>

      {/* Transaction Details Modal */}
      {renderTransactionDetailsModal()}
    </div>
  );
}
