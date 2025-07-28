"use client";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import HeroSectionCarousel from "./hero-section-carousel";
import HeroStudentAvatar from "./hero-student-avatar";
import { SOCIAL_ICONS } from "@/lib/constants";

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

  const itemVariants = {
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
    <section className="min-h-screen 2xl:min-h-[900px] w-full flex">
      <div className="flex flex-col justify-center items-start gap-20 w-1/2 max-w-[800px] pt-16 pl-16 ml-auto">
        <div className="flex flex-col items-start gap-[30px]">
          <div>
            <p className="text-primary text-sm mb-4 font-studio-sans">
              NO. 1 AFTERSCHOOL LESSON PLATFORM
            </p>
            <div className="relative max-w-4xl font-aero-trial">
              <h1 className="w-full max-w-3xl text-[75px] leading-[80px]">
                <span className="inline-block">
                  Connect With the Perfect
                </span>
                <br />
                <span className="inline-flex items-center">
                  <span>Tutor </span>
                  <span className="ml-4">-</span>
                  <motion.div
                    className="relative w-[500px] h-[90px] overflow-hidden inline-block ml-4"
                    style={{ perspective: "400px" }}
                    initial="hidden"
                    animate={"visible"}
                    variants={containerVariants}
                  >
                    {items.map((item, index) => (
                      <motion.div
                        key={index}
                        className="absolute font-extrabold text-secondary whitespace-nowrap"
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
          <p className="text-zeus text-xl font-studio-sans">
            Trusted tutors. Interactive learning. Stress-free scheduling
          </p>
          <div className="flex gap-4 font-studio-sans">
            <Button className="bg-secondary hover:bg-primary text-white rounded-full px-12 py-3 h-auto text-xl">
              Find a tutor
            </Button>
            <Button className="bg-primary hover:bg-secondary text-white rounded-full px-12 py-3 h-auto text-xl">
              Become a tutor
            </Button>
          </div>
        </div>
        <div className="flex gap-4 items-center font-studio-sans">
          <p>Connect with us:</p>
          <div className="flex space-x-4">
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
      <div className="w-1/2">
        <div className="relative w-full h-full">
          <HeroSectionCarousel />
          <HeroStudentAvatar />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
