"use client";

import AccountSettingsPage from "./account-settings";
import HeroSettings from "./hero-settings";

const page = () => {
  return (
    <main className="font-['Montserrat'] ">
      <HeroSettings />
      <AccountSettingsPage />
    </main>
  );
};

export default page;
