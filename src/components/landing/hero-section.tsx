"use client";
import { motion } from "motion/react";
import { Button } from "../ui/button";

function HeroSection() {
  const items = ["Anywhere", "Anytime", "Any Place", "With Ease"];
  const duration = 0.5;
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
      opacity: 0,
    },
    visible: {
      y: [100, 0, -100],
      opacity: [0, 1, 0],
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
    <section className="h-screen w-full flex">
      <div className="flex flex-col items-start gap-20 w-1/2 pt-52 pl-16">
        <div className="flex flex-col items-start gap-[30px]">
          <div>
            <p className="text-primary text-sm">
              NO. 1 AFTERSCHOOL LESSON PLATFORM
            </p>
            <div className="relative max-w-4xl">
              <h1 className="w-full max-w-3xl text-[75px] leading-[80px]">
                <span className="max-w-lg inline-block">
                  Connect With the Perfect
                </span>
                <br />
                <span className="inline-flex items-center">
                  <span>Tutor </span>
                  <span className="ml-4">-</span>
                  <motion.div
                    className="relative w-[450px] h-[90px] overflow-hidden inline-block ml-4"
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
          <p className="text-zeus text-xl">
            Trusted tutors. Interactive learning. Stress-free scheduling
          </p>
          <div className="flex gap-4">
            <Button className="bg-secondary hover:bg-primary text-white rounded-full px-12 py-3 h-auto text-xl">
              Find a tutor
            </Button>
            <Button className="bg-primary hover:bg-secondary text-white rounded-full px-12 py-3 h-auto text-xl">
              Become a tutor
            </Button>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-primary"></div>
    </section>
  );
}

export default HeroSection;
