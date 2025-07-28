"use client";

import HeroTransaction from "./heroTransaction";
import { Transaction } from "./transaction";

const page = () => {
  return (
    <main>
      <HeroTransaction />
      <Transaction />
    </main>
  );
};

export default page;
