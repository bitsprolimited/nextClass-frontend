"use server";

import EditProfile from "./editProfile";
import HeroLesson from "./heroEdit";

const page = async () => {
  return (
    <main className=" ">
      <HeroLesson />
      <EditProfile />
    </main>
  );
};

export default page;
