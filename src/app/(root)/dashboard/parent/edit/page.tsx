"use server";

import { getCurrentUser, getCurrentUserId } from "@/services/session";
import EditProfile from "./editProfile";
import HeroLesson from "./heroEdit";

const page = async () => {
  const userId = await getCurrentUserId();
  const userDetails = await getCurrentUser();
  if (!userId || !userDetails) {
    return <div>Unauthorized</div>;
  }
  return (
    <main className=" ">
      <HeroLesson />
      <EditProfile userId={userId} userDetails={userDetails} />
    </main>
  );
};

export default page;
