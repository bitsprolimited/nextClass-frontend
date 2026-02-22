import { deleteSession } from "@/services/session";
import { redirect, RedirectType } from "next/navigation";

import { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  await deleteSession();

  redirect("/", RedirectType.push);
}
