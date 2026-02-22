export type PaymentParticipant = {
  name?: string;
  role?: string;
};

export type Person = {
  id?: string;
  fullName?: string;
  email?: string;
};

export type PaymentItem = {
  id?: string;
  _id?: string;
  referenceId?: string;
  // backend uses createdAt for date/time — include it
  createdAt?: string;
  dateTime?: string;
  participants?: PaymentParticipant[] | Record<string, unknown>[]; // accept object participants
  // sometimes the docs show bookingId or sessionId (string or object)
  bookingId?: string | Record<string, unknown>;
  sessionId?: string | Record<string, unknown>;
  amount?: number | string;
  status?: string;
  // include nested objects for easier mapping
  parent?: Person | Record<string, unknown>;
  teacher?: Person | Record<string, unknown>;

  // some backends name these fields parentId / teacherId (object refs)
  parentId?: Person | Record<string, unknown>;
  teacherId?: Person | Record<string, unknown>;
};


export type PaymentsApiResponse = {
  data?: PaymentItem[] | null;
} | PaymentItem[];

export type TransactionRow = {
  id: string;
  referenceId: string;
  dateTime: string; // normalized as string (createdAt preferred)
  participants: Array<{ name: string; role: string }>;
  sessionId: string;
  amount: number;
  status: "paid" | "pending" | "ongoing" | "completed";
};