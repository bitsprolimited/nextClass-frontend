// components/SubscribeNewsletter.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function SubscribeNewsletter() {
  return (
    <section className="bg-[#0D3B5B] text-white py-10 px-4 md:px-16 rounded-md mt-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Text Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold">
            Subscribe Newsletter
          </h2>
          <p className="text-sm md:text-base text-gray-300 mt-2">
            Submit your email to get the latest updates on{" "}
            <span className="font-medium">NEXTCLASS</span>
          </p>
        </div>

        {/* Input & Button */}
        <form className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter Email Address"
            className="bg-white text-black placeholder:text-gray-500 w-full sm:w-[300px] h-12 rounded-md"
          />
          <Button
            type="submit"
            className="bg-[#FFA500] hover:bg-[#e69700] text-black px-6 h-12 rounded-md font-medium"
          >
            Get Newsletters <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}
