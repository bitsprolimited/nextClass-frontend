import React from "react";

import Dashboard from "./Dashboard";

function Page() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center ">
      <div className="w-[80%]">
        <Dashboard />
      </div>
    </main>
  );
}

export default Page;
