"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // adjust path if different
import { Teacher } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import ReviewsPanel from "./ReviewsPanel";

export default function DashboardTabs({ tutor }: { tutor: Teacher }) {
  const [expanded, setExpanded] = useState(false);

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
          <h4 className="text-sm font-bold text-blue-900 uppercase mb-4">
            About Rachel
          </h4>
          <p className="leading-relaxed text-[17px] max-w-3xl mb-4">
            My philosophy is that all students can and will learn. Each student
            is unique and learns in their own way. My enthusiasm, lifelong
            passion for education and many years of experience are all qualities
            I bring to the classroom to help each one of my learners to develop
            and become more confident.
          </p>

          <p className="leading-relaxed text-[17px] max-w-3xl">
            Hello! My name is Rose Northcott and I am from Canada. I hold a
            Bachelor of Arts degree in Psychology...
            {!expanded && (
              <button
                onClick={() => setExpanded(true)}
                className="text-[#FFA300] ml-1 font-medium hover:underline"
              >
                View More
              </button>
            )}
          </p>

          {expanded && (
            <p className="leading-relaxed text-[17px] max-w-3xl mt-2">
              I have 10+ years of experience working with students of diverse
              backgrounds. I use student-centered approaches and believe in
              making learning fun, engaging, and personalized.
            </p>
          )}
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
