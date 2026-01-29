import React, { Suspense } from "react";
import EmailVerificationPage from "./EmailVerificationPage";
import Loader from "@/components/Loader";

function page() {
  return (
    <Suspense fallback={<Loader />}>
      <EmailVerificationPage />
    </Suspense>
  );
}

export default page;
