"use client";
import ErrorComponent from "@/components/ErrorComponent";
import Loader from "@/components/Loader";
import LearnersSection from "@/components/parents/learnersSection";
import LessonNotesSection from "@/components/parents/lessonNotesSection";
import TransactionsHistory from "@/components/parents/transactionHistory";
import ReviewsPanel from "@/components/tutors/ReviewsPanel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/useUser";
import { format } from "date-fns";
import {
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  PlayCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

export const Profile = (): JSX.Element => {
  const { data: user, isLoading, isError } = useUser();

  if (isLoading) return <Loader />;
  if (isError || !user) return <ErrorComponent />;

  const address = user?.user?.address
    ? Object.values(user.user.address).join(", ")
    : "N/A";

  return (
    <div className="flex flex-col gap-10 lg:gap-[100px] items-center py-8 lg:py-[60px] font-montserrat">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-6xl">
        {/* Profile Image */}
        <div className="hidden lg:flex flex-col items-center">
          <Avatar className="w-[120px] lg:w-[300px] h-[120px] lg:h-[300px]">
            <AvatarImage src={user.user.profilePicture ?? ""} />
            <AvatarFallback className="text-2xl lg:text-7xl">
              {user.user.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className="text-green-600 font-semibold mt-2">ONLINE</p>
        </div>

        {/* Info Card */}
        <div className="lg:bg-[#f4f4f4] gap-4 p-0 md:p-8 lg:rounded-xl shadow-none lg:shadow-sm w-full flex items-center justify-between">
          <div className="w-full flex flex-col gap-4 lg:gap-8">
            <div className="flex items-center lg:items-stretch lg:flex-col gap-4 px-4">
              <div className="lg:hidden flex flex-col items-center">
                <Avatar className="w-[66px] lg:w-[300px] h-[66px] lg:h-[300px]">
                  <AvatarImage src={user.user.profilePicture ?? ""} />
                  <AvatarFallback className="text-2xl lg:text-7xl">
                    {user.user.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-green-600 text-xs lg:text-base font-semibold mt-2">
                  ONLINE
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="bg-[#031d95] text-white text-xs lg:text-sm px-2 lg:px-4 py-1 rounded-md font-medium">
                    Parent
                  </span>

                  <Link href="/dashboard/parent/edit" passHref>
                    <button className="text-xs lg:text-sm font-medium text-[#031D95] underline hover:no-underline cursor-pointer">
                      Edit Profile
                    </button>
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-xl md:text-[60px] font-semibold text-[#2c241b]">
                  {/* <Image
              src="/images/USA.png"
              alt="US Flag"
              className="inline-block rounded-sm"
              width={68}
              height={32}
            /> */}
                  <h1 className="font-aero-trial  capitalize font-medium">
                    {user.user.fullName}
                  </h1>
                </div>
              </div>

              <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 text-[#2c241b]">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>0 classes Attended</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  <span>$0 paid</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>
                    {user.user?.children?.length || 0} Learner
                    {`${user.user?.children?.length > 1 ? "s" : ""}`}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <PlayCircle className="w-5 h-5" />
                  <span>0 Ongoing Class</span>
                </div>
              </div>
            </div>

            <div className="grid lg:hidden grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 text-[#2c241b] px-4 py-2 bg-[#f4f4f4]">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span className="text-xs">0 classes Attended</span>
              </div>
              <div className="flex gap-2">
                <DollarSign className="w-3 h-3" />
                <span className="text-xs">$0 paid</span>
              </div>
              <div className="flex gap-2">
                <Users className="w-3 h-3" />
                <span className="text-xs">
                  {user.user?.children?.length || 0} Learner
                  {`${user.user?.children?.length > 1 ? "s" : ""}`}
                </span>
              </div>
              <div className="flex gap-2 text-green-700">
                <PlayCircle className="w-3 h-3" />
                <span className="text-xs">0 Ongoing Class</span>
              </div>
            </div>

            <div className="text-right text-xs text-[#031d9580] font-medium mt-2 lg:mt-6 uppercase pr-4">
              Joined {format(user.user.createdAt, "PPP")}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="w-full max-w-6xl px-3 pb-5 lg:px-6 lg:py-10 border-b border-[#9A98C1] flex flex-wrap gap-3 lg:gap-6 md:justify-between">
        {/* Phone */}
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="bg-[#4c76ff45] border border-[#4c75ff] p-1.5 lg:p-4 rounded-lg">
            <Phone className="w-4 lg:w-[34px] h-4 lg:h-[34px]" />
          </div>
          <p className="text-[#292d32] font-aero-trial font-medium text-xs lg:text-lg">
            {user.user.phoneNumber}
          </p>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="bg-[#4cff9a45] border border-[#4cff99] p-1.5 lg:p-4 rounded-lg">
            <Mail className="w-4 lg:w-[34px] h-4 lg:h-[34px]" color="#039536" />
          </div>
          <p className="text-[#292d32] font-aero-trial font-medium text-xs lg:text-lg">
            {user.user.email}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="bg-[#ff4cff45] border border-[#ff4cff] p-1.5 lg:p-4 rounded-lg">
            <MapPin
              className="w-4 lg:w-[34px] h-4 lg:h-[34px]"
              color="#8B0395"
            />
          </div>
          <p className="text-[#2c241b] font-aero-trial font-medium text-xs lg:text-lg">{address}</p>
        </div>
      </div>
      <LearnersSection learners={user.user.children} />
      <LessonNotesSection />
      <ReviewsPanel />
      <TransactionsHistory />
    </div>
  );
};
