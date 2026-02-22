"use client";

import AccountSettingsPage from "./account-settings";
import HeroSettings from "./hero-settings";

const page = () => {
  return (
    <main className="font-montserrat ">
      <HeroSettings />
      <AccountSettingsPage />
    </main>
  );
};

export default page;
