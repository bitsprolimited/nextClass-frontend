import Image from "next/image";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export const teamMembers = [
  {
    id: 1,
    name: "Ryan Patterson",
    title: "Founder",
    image: "/images/tutor-1.png",
    socials: [
      {
        icon: <FaFacebookF />,
        link: "",
      },
      {
        icon: <FaTwitter />,
        link: "",
      },
      {
        icon: <FaLinkedinIn />,
        link: "",
      },
    ],
  },
  {
    id: 2,
    name: "Ryan Patterson",
    title: "Founder",
    image: "/images/tutor-2.png",
    socials: [
      {
        icon: <FaFacebookF />,
        link: "",
      },
      {
        icon: <FaTwitter />,
        link: "",
      },
      {
        icon: <FaLinkedinIn />,
        link: "",
      },
    ],
  },
  {
    id: 3,
    name: "Ryan Patterson",
    title: "Founder",
    image: "/images/tutor-3.png",
    socials: [
      {
        icon: <FaFacebookF />,
        link: "",
      },
      {
        icon: <FaTwitter />,
        link: "",
      },
      {
        icon: <FaLinkedinIn />,
        link: "",
      },
    ],
  },
];

export type TeamMember = {
  id: number;
  title: string;
  name: string;
  image: string;
  socials: {
    icon: React.JSX.Element;
    link: string;
  }[];
};

function TeamMemberCard({
  teamMember,
}: {
  teamMember: TeamMember;
}): React.JSX.Element {
  return (
    <Card className="group border-none shadow-none w-full max-w-[360px]">
      <CardContent className="p-0">
        <div className="relative w-full">
          <div className="w-full h-[300px]">
            <Image
              src={teamMember.image}
              alt={teamMember.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex absolute bottom-0 items-center justify-center gap-4 pt-6 opacity-0 group-hover:opacity-100 [background:linear-gradient(270deg,rgba(248,246,244,1)_0%,rgba(255,255,255,1)_100%)] w-full transition-all duration-300 ease-in-out">
            {teamMember.socials.map((social, idx) => (
              <a
                key={idx}
                href="#"
                className="border border-abbey text-abbey rounded-full p-2 text-lg hover:text-white hover:border-secondary hover:bg-secondary transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="p-[30px] text-center [background:linear-gradient(270deg,rgba(248,246,244,1)_0%,rgba(255,255,255,1)_100%)]">
          <p className="text-secondary text-sm">{teamMember.title}</p>

          <h3 className="mt-2 font-medium text-2xl text-zeus">
            {teamMember.name}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}

function MeetTheTeam() {
  return (
    <section className="flex flex-col justify-center items-center py-14 px-4">
      <div className="flex flex-col max-w-7xl items-center mx-auto gap-14">
        <div className="flex flex-col items-center justify-center py-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative">
            <Image
              width={100}
              height={100}
              src="/images/book-img.png"
              alt=""
              className="place-self-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
            <p className="text-primary text-sm font-semibold uppercase mb-2">
              Meet The Team
            </p>
            <h2 className="text-zeus text-5xl font-medium ">
              Expert Instructors
            </h2>
          </div>
        </div>
        <div className="flex flex-col items-start gap-12 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {teamMembers.map((teamMember) => (
              <TeamMemberCard key={teamMember.id} teamMember={teamMember} />
            ))}
          </div>
        </div>
        <Button className="text-xl h-auto py-4 px-10 rounded-full bg-secondary hover:bg-primary">
          View All Tutors
        </Button>
      </div>
    </section>
  );
}

export default MeetTheTeam;
