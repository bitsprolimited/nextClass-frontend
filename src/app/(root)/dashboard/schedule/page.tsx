import { getSession } from "@/services/session";
import HeroSchedule from "./hero-schedule";
import ClassTabs from "./schedule";

const Page = async () => {
  const session = await getSession();
  return (
    <main className=" ">
      <HeroSchedule />
      <ClassTabs session={session} />
    </main>
  );
};

export default Page;
