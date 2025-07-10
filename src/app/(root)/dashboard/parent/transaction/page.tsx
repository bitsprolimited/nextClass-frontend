"use client";

import TransactionsHistory from "@/components/parents/transactionHistory";

import HeroTransaction from "./heroTransaction";
import { Transaction } from "./transaction";

const page = () => {
  return (
    <main className=" ">
      <HeroTransaction />
      <Transaction />
      <TransactionsHistory />
    </main>
  );
};

export default page;
