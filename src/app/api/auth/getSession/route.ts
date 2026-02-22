import { NextResponse } from "next/server";
import { getSession } from "@/services/session";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ session: null }, { status: 401 });
  }
  return NextResponse.json({ session }, { status: 200 });
}
