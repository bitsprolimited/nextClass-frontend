// app/dashboard/page.tsx
"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { IoBookOutline } from "react-icons/io5";
import { MdOutlineCalendarMonth } from "react-icons/md";

import AlertRotator from "@/components/alerts/AlertRotator";
import ErrorComponent from "@/components/ErrorComponent";
import Loader from "@/components/Loader";
import { useUser } from "@/hooks/useUser";
import UpcomingIntroductionTabs from "@/components/parents/upcoming-Introductory";

/* ---------------- types ---------------- */
type Step = { id: number; label: string; completed: boolean };

/* ---------------- utils ---------------- */
const chunk = <T,>(arr: T[], size: number): T[][] => {
  if (size <= 0) return [arr];
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

/* ---------------- mobile chips carousel ---------------- */
function StepChip({
  step,
  onToggle,
}: {
  step: Step;
  onToggle: (id: number) => void;
}) {
  const done = step.completed;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={done}
      onClick={() => onToggle(step.id)}
      className="w-full  px-3 py-3 text-left transition"
    >
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
            done ? "bg-[#E9F0FF]" : "bg-[#FFF1E6]"
          }`}
          aria-hidden="true"
        >
          {done ? (
            <CheckCircle className="h-4 w-4 text-[#1B55E3]" />
          ) : (
            <AlertCircle className="h-4 w-4 text-[#FF7A00]" />
          )}
        </span>
        <span className="text-[13px] font-semibold text-gray-900 leading-snug">
          {step.label}
        </span>
      </div>
    </button>
  );
}

function MobileChecklistCarousel({
  steps,
  onToggle,
  perSlide = 2,
}: {
  steps: Step[];
  onToggle: (id: number) => void;
  perSlide?: number;
}) {
  const slides = useMemo(() => chunk(steps, perSlide), [steps, perSlide]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / (el.clientWidth || 1));
    if (idx !== active) setActive(idx);
  }, [active]);

  const goTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setActive(i);
  }, []);

  return (
    <div className="w-full rounded-2xl bg-[#f8f6f4] shadow-md p-4 sm:p-6">
      <h2 className="text-lg sm:text-2xl font-bold font-aero-trial leading-tight text-gray-900 mb-3">
        Finish Setting Up your Profile.
      </h2>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
        role="region"
        aria-roledescription="carousel"
        aria-label="Profile setup steps"
      >
        {slides.map((group, i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-full"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${slides.length}`}
          >
            <div className="flex divide-x divide-gray-300 gap-3">
              {group.map((step) => (
                <div key={step.id} className="flex-1 px-3">
                  <StepChip step={step} onToggle={onToggle} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* pagination dots — orange active to match your screenshot */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full transition ${
              active === i ? "bg-[#FF9500] w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- desktop list (unchanged) ---------------- */
function DesktopChecklistList({
  steps,
  onToggle,
}: {
  steps: Step[];
  onToggle: (id: number) => void;
}) {
  return (
    <div className="w-full lg:max-w-[360px] h-full rounded-2xl bg-[#f8f6f4] shadow-md p-6 flex-col hidden lg:flex">
      <h2 className="text-2xl font-bold font-aero-trial leading-tight text-gray-900 mb-6">
        Finish Setting Up <br />
        your Profile.
      </h2>
      <div className="flex flex-col justify-between flex-1 divide-y divide-gray-200">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onToggle(step.id)}
            className="w-full flex items-center justify-between flex-1 py-3 text-left hover:bg-gray-50 transition"
            role="switch"
            aria-checked={step.completed}
          >
            <div className="flex items-center gap-3">
              {step.completed ? (
                <CheckCircle className="text-[#1B55E3] w-5 h-5" />
              ) : (
                <AlertCircle className="text-[#FF7A00] w-5 h-5" />
              )}
              <span
                className={`text-base font-semibold ${
                  step.completed ? "text-gray-900" : "text-gray-800"
                }`}
              >
                {step.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- page ---------------- */
export default function Dashboard() {
  const { data: user, isLoading, isError } = useUser();

  const [steps, setSteps] = useState<Step[]>([
    { id: 1, label: "Add a Payment Method", completed: true },
    { id: 2, label: "Career Experience", completed: true },
    { id: 3, label: "Add Full Address", completed: false },
    { id: 4, label: "Education", completed: false },
    { id: 5, label: "Add Profile Picture", completed: true },
    { id: 6, label: "Add Introductory Video", completed: true },
    { id: 7, label: "Accept First Introductory Call", completed: true },
    { id: 8, label: "Add Gender", completed: true },
  ]);

  const toggleStep = (id: number) =>
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s))
    );

  if (isLoading) return <Loader />;
  if (isError || !user) return <ErrorComponent />;

  return (
    <>
      <div className="min-h-screen bg-[#F8F7FC]">
        <div className="flex w-full py-10 px-6">
          <div className="flex flex-col max-w-7xl mx-auto w-full space-y-10">
            {/* Header */}
            <div className="flex sm:flex-row justify-between items-start sm:items-center">
              <div className="flex flex-col item-start gap-1">
                <h1 className="text-xl sm:text-5xl font-medium font-aero-trial text-zeus">
                  My Dashboard
                </h1>
                <p className="text-zeus">Are you ready to teach today?</p>
              </div>
              <Button className="bg-primary hover:bg-secondary h-auto text-white rounded-full px-4 sm:px-8 py-3 text-base font-medium">
                View My Schedule
              </Button>
            </div>

            {/* Alerts */}
            <AlertRotator />

            {/* Next Class */}
            <div className="bg-[#FFF5E9] rounded-xl shadow-xl mt-6 flex flex-col w-full md:max-w-7xl md:mx-auto">
              <div className="relative pt-6 px-6 md:pt-4 md:pl-6 md:pr-4">
                <h2 className="hidden md:block text-2xl font-bold font-aero-trial text-gray-800 tracking-wide md:self-start">
                  Your Next Class
                </h2>
                <div className="flex items-center justify-between md:hidden">
                  <h2 className="text-lg font-bold font-aero-trial text-gray-800 tracking-wide">
                    Your Next Class
                  </h2>
                  <button className="bg-[#FF9500] hover:bg-[#E38500] text-white font-semibold px-4 py-1.5 rounded-full text-sm">
                    Join Class
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 pt-2 w-full">
                <div className="flex items-start md:items-center gap-4 md:gap-6 grow">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-lg overflow-hidden border border-gray-200 shrink-0">
                    <Image
                      src="/images/tutor-3.png"
                      alt="Class Tutor"
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h1 className="text-base md:text-[32px] font-medium font-aero-trial text-gray-900 mb-1 md:mb-2">
                      Basics of Algebra
                    </h1>
                    <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-xl text-gray-700 font-medium items-center">
                      <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                        <MdOutlineCalendarMonth />
                        <span>Mon, May 26</span>
                      </div>
                      <div className="hidden md:block w-px h-6 bg-gray-300 mx-3 self-center" />
                      <div className="flex flex-col mt-3 md:items-center leading-none">
                        <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                          <Clock className="w-3 h-3 text-gray-600" />
                          <span>9:00am - 9:30</span>
                        </div>
                        <span className="text-[10px] md:text-xs text-gray-500 md:ml-2 ml-5 md:pt-0.5">
                          30 minutes
                        </span>
                      </div>
                      <div className="hidden md:block w-px h-6 bg-gray-300 mx-3 self-center" />
                      <div className="flex items-center gap-1 md:gap-2 text-gray-600">
                        <IoBookOutline />
                        <span>Mathematics</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-6">
                  <button className="bg-[#FF9500] hover:bg-[#E38500] text-white font-semibold py-3 md:py-4 px-8 rounded-full transition duration-200 shadow-md">
                    Join Class
                  </button>
                </div>
              </div>
            </div>

            {/* Two-column section */}
            <div className="flex flex-col lg:flex-row gap-6">
              <UpcomingIntroductionTabs />

              {/* Mobile chips carousel */}
              <div className="lg:hidden">
                <MobileChecklistCarousel steps={steps} onToggle={toggleStep} />
              </div>

              {/* Desktop list */}
              <DesktopChecklistList steps={steps} onToggle={toggleStep} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
