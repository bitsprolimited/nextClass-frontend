"use client";
import { motion, Variants } from "motion/react";
import { Button } from "../ui/button";
import HeroSectionCarousel from "./hero-section-carousel";
import HeroStudentAvatar from "./hero-student-avatar";
import { SOCIAL_ICONS } from "@/lib/constants";
import Link from "next/link";

function HeroSection() {
  const items = ["Anywhere", "Anytime", "Any Place", "With Ease"];
  const duration = 1;
  const pause = 1;
  const stagger = duration + pause;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      y: 100,
    },
    visible: {
      y: [100, 0, -100],
      transition: {
        duration: duration * 2 + pause,
        times: [0, 0.5, 1],
        ease: "easeInOut",
        type: "tween",
        repeat: Infinity,
        repeatDelay: stagger * (items.length - 1),
      },
    },
  };

  return (
    <section className="min-h-screen 2xl:min-h-[900px] w-full flex flex-col-reverse md:flex-row">
      {/* Text Section */}
      <div className="flex flex-col justify-center items-center md:items-start gap-8 md:gap-20 w-full md:w-1/2 max-w-[800px] pt-8 md:pt-16 px-4 md:pl-16 mx-auto">
        <div className="flex flex-col items-center md:items-start gap-5 md:gap-[30px] w-full">
          <div className="w-full text-center md:text-left">
            <p className="text-primary text-xs sm:text-sm mb-2 md:mb-4 font-studio-sans">
              NO. 1 AFTERSCHOOL LESSON PLATFORM
            </p>
            <div className="relative max-w-4xl font-aero-trial mx-auto md:mx-0">
              <h1 className="w-full max-w-3xl text-[20px] sm:text-[48px] md:text-[75px] leading-tight md:leading-[80px] ">
                <span className="inline-block">Connect With the Perfect</span>
                <br />
                <span className="inline-flex items-center justify-center md:justify-start">
                  <span>Tutor </span>
                  <span className="ml-2 md:ml-4">-</span>
                  <motion.div
                    className="relative w-[160px] sm:w-[250px] md:w-[500px] h-[40px] sm:h-[60px] md:h-[90px] overflow-hidden inline-block ml-2 md:ml-4"
                    style={{ perspective: "400px" }}
                    initial="hidden"
                    animate={"visible"}
                    variants={containerVariants}
                  >
                    {items.map((item, index) => (
                      <motion.div
                        key={index}
                        className="absolute font-extrabold text-secondary whitespace-nowrap text-[20px] sm:text-[32px] md:text-[48px]"
                        variants={itemVariants}
                        custom={index}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </motion.div>
                </span>
              </h1>
            </div>
          </div>
          <p className="text-zeus text-sm sm:text-lg md:text-xl font-studio-sans text-center md:text-left">
            Trusted tutors. Interactive learning. Stress-free scheduling
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center md:justify-start font-studio-sans">
            <Button className="bg-secondary hover:bg-primary text-white rounded-full px-8 py-2 sm:px-12 sm:py-3 h-auto text-base sm:text-xl">
              <Link href="/tutors">Find a tutor</Link>
            </Button>
            <Button className="bg-primary hover:bg-secondary text-white rounded-full px-8 py-2 sm:px-12 sm:py-3 h-auto text-base sm:text-xl">
              <Link href="/sign-up/tutor">Become a tutor</Link>
            </Button>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4 items-center font-studio-sans justify-center md:justify-start w-full">
          <p className="text-xs sm:text-base">Connect with us:</p>
          <div className="flex space-x-2 sm:space-x-4">
            {SOCIAL_ICONS.map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="border border-abbey text-abbey rounded-full p-2 text-lg hover:text-white hover:border-primary hover:bg-primary transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-4 pt-8 md:pt-0">
        <div className="relative w-full h-[421px] md:h-full flex justify-center items-center mx-auto">
          <HeroSectionCarousel />
          <HeroStudentAvatar />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
