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
      className="shadow-[0px_4px_24px_#000000a6] absolute bottom-16 -left-16 z-50 max-w-[400px] rounded-[10px] overflow-hidden"
    >
      <Card>
        <CardContent className="flex flex-col items-center gap-5 px-6 py-4">
          <div className="flex flex-col items-center w-full">
            <p className="font-bold text-xl">20,041+</p>
            <p className="text-sm font-medium text-[606060]">
              Students are currently Learning
            </p>
          </div>
          <div className="flex items-start">
            {HERO_STUDENT_AVATARS.map((avatar, index) => (
              <Image
                key={avatar.id}
                src={avatar.src}
                alt={avatar.alt}
                width={60}
                height={60}
                className={`w-full ${index > 0 ? "-ml-5" : ""}`}
              />
            ))}
            <div className="w-[60px] h-[60px] -ml-5 bg-secondary rounded-full flex flex-col justify-center items-center text-white shrink-0 p-1">
              <span>500+</span>
              <span className="text-[10px] uppercase">Online</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HeroStudentAvatar;
