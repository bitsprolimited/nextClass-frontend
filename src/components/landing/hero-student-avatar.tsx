import React from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { motion } from "motion/react";

const HERO_STUDENT_AVATARS = [
  {
    id: 1,
    alt: "Student Avatar",
    src: "/images/hero-avatar-1.png",
  },
  {
    id: 2,
    alt: "Student Avatar",
    src: "/images/hero-avatar-2.png",
  },
  {
    id: 3,
    alt: "Student Avatar",
    src: "/images/hero-avatar-3.png",
  },
  {
    id: 4,
    alt: "Student Avatar",
    src: "/images/hero-avatar-4.png",
  },
];

const HeroStudentAvatar = () => {
  return (
    <motion.div
      initial={{ x: 0, y: 0 }}
      animate={{ x: [0, 60, 0], y: [0, 60, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "loop",
      }}
      className="shadow-[0px_4px_24px_#000000a6] absolute bottom-4 left-1 sm:bottom-16 sm:-left-16 z-50 max-w-[160px] sm:max-w-[400px] rounded-[10px] overflow-hidden"
    >
      <Card>
        <CardContent className="flex flex-col items-center gap-2 px-2 py-1 sm:gap-5 sm:px-6 sm:py-4">
          <div className="flex flex-col items-center w-full">
            <p className="font-bold text-sm sm:text-xl">20,041+</p>
            <p className="text-[10px] sm:text-sm font-medium text-[606060]">
              Students are currently Learning
            </p>
          </div>
          <div className="flex items-start">
            {HERO_STUDENT_AVATARS.map((avatar, index) => (
              <Image
                key={avatar.id}
                src={avatar.src}
                alt={avatar.alt}
                width={28}
                height={28}
                className={`${index > 0 ? "-ml-2 sm:-ml-5" : ""}`}
              />
            ))}
            <div className="w-[28px] h-[28px] sm:w-[60px] sm:h-[60px] -ml-2 sm:-ml-5 bg-secondary rounded-full flex flex-col justify-center items-center text-white shrink-0 p-1">
              <span className="text-[10px] sm:text-base">500+</span>
              <span className="text-[6px] sm:text-[10px] uppercase">
                Online
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HeroStudentAvatar;
