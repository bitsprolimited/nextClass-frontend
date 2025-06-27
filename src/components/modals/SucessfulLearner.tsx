import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import React, { JSX } from "react";

export default function SuccessfulLearner(): JSX.Element {
  return (
    <Card className="inline-flex flex-col items-start pt-[60px] pb-5 px-[58px] bg-white rounded-[20px] border-none">
      <CardContent className="inline-flex flex-col items-center gap-2.5 pt-0 pb-10 px-0 w-full">
        <h1 className="relative w-fit mt-[-1.00px] [font-family:'Playfair_Display-Medium',Helvetica] font-medium text-3xl tracking-[0] leading-[42px] whitespace-nowrap">
          <span className="text-[#2c241b]">Learner Added </span>
          <span className="text-[#ffa300]">Successfully</span>
        </h1>

        <div className="flex flex-col items-center gap-10 px-0 py-5 relative self-stretch w-full">
          <p className="relative w-[710px] mt-[-1.00px] [font-family:'Lexend-Regular',Helvetica] font-normal text-black-600 text-base text-center tracking-[0] leading-8">
            You have successfully created a new account for your learner. Ask
            them to og in
          </p>

          <div className="relative w-[418px] h-[323px] bg-white flex items-center justify-center">
            <div className="relative w-[512px] h-[337px] -translate-y-[13px] -translate-x-[53px]">
              <CheckIcon className="w-full h-full text-green-500 stroke-[1.5]" />
              <div className="relative w-[125px] h-1 top-[311px] left-[147px] bg-[#59bf354f] rounded-[62.5px/2px]" />
            </div>
          </div>
        </div>

        <Button className="w-[395px] h-[55px] px-10 py-0 bg-[#ffa300] rounded-[50px] hover:bg-[#e89400]">
          <span className="[font-family:'Montserrat-Medium',Helvetica] font-medium text-white text-base text-center tracking-[0] leading-[55px]">
            Proceed To Select A Tutor
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
