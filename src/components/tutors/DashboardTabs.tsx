"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // adjust path if different
import { Teacher } from "@/types";
import { format } from "date-fns";
import { Card, CardContent } from "../ui/card";
import ReviewsPanel from "./ReviewsPanel";

export default function DashboardTabs({ tutor }: { tutor: Teacher }) {

  return (
    <div className="mt-10 mb-20 max-w-6xl mx-auto w-full">
      <Tabs defaultValue="description" className="w-full">
        {/* Tabs Nav */}
        <TabsList className="flex justify-start gap-8  bg-transparent p-0">
          {["description", "schedule", "reviews", "qualifications"].map(
            (tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-2 font-medium capitalize text-[#A4A4A4]"
              >
                {tab}
              </TabsTrigger>
            )
          )}
        </TabsList>

        {/* Description Content */}
        <TabsContent
          value="description"
          className="mt-6 bg-[#F9F6F2] p-8 rounded-md text-gray-900"
        >
          <div className="inline-flex flex-col items-center gap-8 w-full">
            <div className="flex flex-wrap self-stretch items-start w-full relative">
              <Card className="w-full max-w-[600px] px-8 py-6">
                <CardContent className="inline-flex flex-col gap-4 relative p-0 w-full">
                  <p className="text-[#031d95] font-semibold text-2xl">
                    {tutor?.bio}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other Tabs Placeholder */}
        <TabsContent value="schedule" className="mt-6 text-gray-600">
          Schedule content goes here.
        </TabsContent>
        <TabsContent
          value="reviews"
          className="mt-6 bg-[#F9F6F2] p-8 rounded-md text-gray-900"
        >
          <ReviewsPanel />
        </TabsContent>
        <TabsContent
          value="qualifications"
          className="mt-6 bg-[#F9F6F2] p-8 rounded-md text-gray-900"
        >
          <div className="inline-flex flex-col items-center gap-8 w-full">
            <div className="flex flex-wrap self-stretch items-start w-full relative">
              {tutor?.qualifications?.map((qualification, index) => (
                <Card key={index} className="w-full max-w-[600px] px-8 py-6">
                  <CardContent className="inline-flex flex-col gap-4 relative p-0 w-full capitalize">
                    <div className="inline-flex gap-1.5 flex-col items-start">
                      <h3 className="font-light font-montserrat italic text-[#ffa300]">
                        {qualification.type}
                      </h3>
                      <p className="text-[#031d95] font-semibold text-2xl">
                        {qualification.courseName}
                      </p>
                    </div>
                    <div className="flex items-end justify-between relative w-full">
                      <span className="font-montserrat text-[#757575]">
                        {qualification.issuingInstitution}
                      </span>
                      <span className="text-[#031d9559] font-montserrat flex items-center gap-2">
                        <span>Exp</span>
                        {qualification.expiryDate
                          ? format(
                              new Date(qualification.expiryDate),
                              "dd.MM.yyyy"
                            )
                          : "—"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
