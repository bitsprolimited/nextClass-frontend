"use client";

import HeroProfile from "./heroSectionProfile";
import { Profile } from "./Profile";

const page = () => {
  return (
    <main className=" ">
      <HeroProfile />
      <Profile />
    </main>
  );
};

export default page;
