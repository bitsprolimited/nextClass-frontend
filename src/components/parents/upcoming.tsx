import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpenIcon, CalendarIcon, ClockIcon, PlusIcon } from "lucide-react";
import React from "react";

// Class data for mapping
const classData = [
  {
    title: "Basics of Algebra",
    image: "/courses.png",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    duration: "30mins",
    subject: "Mathematics",
  },
  {
    title: "Fine Art Fundamentals",
    image: "/image.png",
    date: "Mon, May 26",
    time: "9:00am - 9:30",
    duration: "30mins",
    subject: "Mathematics",
  },
];

export default function Upcoming() {
  return (
    <div className="flex items-start gap-10 relative">
      <Card className="flex-col gap-8 px-[60px] py-10 bg-[#f8f6f4] rounded-[20px] shadow-[0px_4px_9px_#0000001a]">
        <div className="flex items-start gap-8">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="bg-transparent p-0 h-auto">
              <TabsTrigger
                value="upcoming"
                className="font-htmldemo-net-semantic-heading-6-upper font-bold text-[#031d95] text-[14px] tracking-[1px] leading-[15.4px] underline whitespace-nowrap p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                UPCOMING CLASSES
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="font-montserrat font-medium text-[#52565b] text-sm tracking-[1px] leading-[15.4px] whitespace-nowrap p-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                CLASS HISTORY
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <CardContent className="p-0 space-y-10">
          {classData.map((classItem, index) => (
            <div
              key={index}
              className={`flex w-[852px] items-start justify-between relative ${
                index > 0 ? "pt-10 border-t border-[#031d9547]" : ""
              }`}
            >
              <div
                className="relative w-36 h-36 rounded-[10px] border border-solid border-[#ada1a1] bg-cover bg-position-[50%_50%]"
                style={{ backgroundImage: `url(${classItem.image})` }}
              />

              <div className="flex flex-col items-end justify-center gap-[22px]">
                <h2 className="self-stretch font-['Aero_Trial-Medium',Helvetica] font-medium text-[#2c241b] text-[32px] leading-normal">
                  {classItem.title}
                </h2>

                <div className="flex w-[656px] items-start justify-between">
                  <div className="flex flex-col gap-3 items-start">
                    <CalendarIcon className="w-6 h-6" />
                    <div className="w-[166px] font-montserrat font-medium text-[#2c241b] text-2xl leading-[26.2px]">
                      {classItem.date}
                      <br />
                      <span className="text-[#2c241b99] text-xl">
                        {classItem.time}
                      </span>
                    </div>
                  </div>

                  <div className="opacity-20 font-montserrat font-light text-[#2c241b] text-[64px] leading-normal">
                    |
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <ClockIcon className="w-6 h-6" />
                    <div className="font-montserrat font-medium text-[#2c241b] text-2xl leading-[26.2px] whitespace-nowrap">
                      {classItem.duration}
                    </div>
                  </div>

                  <div className="opacity-20 font-montserrat font-light text-[#2c241b] text-[64px] leading-normal">
                    |
                  </div>

                  <div className="flex flex-col gap-3 items-start">
                    <BookOpenIcon className="w-6 h-6" />
                    <div className="font-montserrat font-medium text-[#2c241b] text-2xl leading-[26.2px] whitespace-nowrap">
                      {classItem.subject}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-[22px]">
                  <Button
                    variant="ghost"
                    className="px-10 py-0 h-auto rounded-[50px]"
                  >
                    <span className="font-montserrat font-medium text-[#d43838] text-[16px] leading-[55px] whitespace-nowrap">
                      Cancel Class
                    </span>
                  </Button>

                  <Button className="px-10 py-0 h-auto bg-[#031d95] rounded-[50px]">
                    <span className="font-montserrat font-medium text-white text-[16px] leading-[55px] whitespace-nowrap">
                      Reshedule Class
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="flex flex-col w-[360px] h-[642px] gap-[22px] px-[30px] py-20 bg-[#f8f6f4] rounded-[20px] shadow-[0px_4px_9px_#0000001a]">
        <CardContent className="p-0">
          <div className="flex flex-col items-start gap-[110px]">
            <div className="flex flex-col items-start gap-1">
              <h3 className="w-[295px] font-['Aero_Trial-Medium',Helvetica] font-medium text-[#ffa300] text-3xl tracking-[0.60px] leading-normal">
                Add a Learner today
              </h3>
              <p className="w-[271px] font-['Studio_Sans_DEMO-Regular',Helvetica] font-normal text-[#2c241b] text-base leading-7">
                What are you learning today?
              </p>
            </div>

            <Button className="w-[310px] px-[100px] py-5 bg-primary-secondary rounded-[30px] border border-solid border-glide-primary-color400 flex items-center justify-center gap-1">
              <span className="font-body-text-inter-14-medium font-medium text-glide-primary-color400 text-[14px] leading-[20px] whitespace-nowrap">
                Add a Learner
              </span>
              <PlusIcon className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
