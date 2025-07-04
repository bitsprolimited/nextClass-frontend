"use client";

import HeroLesson from "./heroLesson";
import { Lesson } from "./Lesson";

const page = () => {
  return (
    <main className=" ">
      <HeroLesson />

      <Lesson />
    </main>
  );
};

export default page;
