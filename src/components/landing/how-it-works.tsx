import React from "react";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { STEPS } from "@/lib/constants";

function Content({
  img,
  steps,
}: {
  img: string;
  steps: { title: string; description: string }[];
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 w-full">
      <div className="relative w-full max-w-[600px]">
        <Image
          src={img}
          alt="how it works"
          width={600}
          height={600}
          className="w-full h-full object-cover rounded-full"
        />
      </div>
      <Card className="border-0 shadow-none w-full max-w-[800px] bg-transparent">
        <CardContent className="p-0 space-y-12 w-full">
          {steps.map((step, index) => (
            <div className="flex items-start gap-4" key={index}>
              <div className="flex items-center justify-center mt-1">
                <div className="w-5 h-5 shrink-0 rounded-full bg-primary" />
              </div>
              <div className="flex-col">
                <h3 className="font-bold text-[#2e2e2e] text-xl">
                  {step.title}
                </h3>
                <p className="text-[#6a6a6a] text-sm mt-2">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function HowItWorksSection(): React.JSX.Element {
  return (
    <section className="flex flex-col items-center justify-center py-[50px] bg-[#2509790a] w-full">
      <div className="flex flex-col items-center justify-center gap-[50px] max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center w-full pt-4 text-center">
          <p className="text-primary text-sm font-semibold whitespace-nowrap">
            Discover what makes Nextclass work for you
          </p>
          <h2 className="font-medium text-zeus text-5xl">How it Works</h2>
        </div>

        <Tabs
          defaultValue="parents"
          className="w-full max-w-(--breakpoint-2xl)"
        >
          <TabsList className="w-full flex justify-center sm:justify-start bg-transparent p-0 h-auto gap-6 mb-[50px]">
            <TabsTrigger
              className="data-[state=active]:text-primary data-[state=active]:underline data-[state=active]:underline-offset-4 data-[state=inactive]:text-[#a4a4a4] text-3xl text-center h-auto bg-transparent"
              value="parents"
            >
              Parents
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:text-primary data-[state=active]:underline data-[state=inactive]:text-[#a4a4a4] text-3xl text-center h-auto bg-transparent"
              value="tutors"
            >
              Tutors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="parents" className="w-full">
            <Content img={STEPS.parents.img} steps={STEPS.parents.steps} />
          </TabsContent>
          <TabsContent value="tutors" className="w-full">
            <Content img={STEPS.tutors.img} steps={STEPS.tutors.steps} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default HowItWorksSection;
