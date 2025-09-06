"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // adjust path if different
import { useState } from "react";
import ReviewsPanel from "./ReviewsPanel";

export default function DashboardTabs() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-10 mb-20 max-w-6xl w-full">
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
      </Tabs>
    </div>
  );
}
