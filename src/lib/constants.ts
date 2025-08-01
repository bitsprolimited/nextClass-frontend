import { FaFacebookF, FaSkype, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export const navItems = {
  root: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about-us",
    },
    {
      label: "Tutors",
      href: "/tutors",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
  parent: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Tutors",
      href: "/tutors",
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
    },
    {
      label: "Schedule",
      href: "/dashboard/parent/schedule",
    },
  ],
  tutor: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
    },
    {
      label: "Schedule",
      href: "/dashboard/tutor/schedule",
    },
  ],
};

export const HERO_IMAGES = [
  {
    id: 1,
    src: "/images/hero-img1.png",
    alt: "",
  },
  {
    id: 2,
    src: "/images/hero-img2.png",
    alt: "",
  },
  {
    id: 3,
    src: "/images/hero-bg1.png",
    alt: "",
  },
  {
    id: 4,
    src: "/images/hero-img7.png",
    alt: "",
  },
  {
    id: 5,
    src: "/images/hero-img8.png",
    alt: "",
  },
  {
    id: 6,
    src: "/images/hero-bg1.png",
    alt: "",
  },
  {
    id: 7,
    src: "/images/hero-img3.png",
    alt: "",
  },
  {
    id: 8,
    src: "/images/hero-img4.png",
    alt: "",
  },
  {
    id: 9,
    src: "/images/hero-bg1.png",
    alt: "",
  },
  {
    id: 10,
    src: "/images/hero-img5.png",
    alt: "",
  },
  {
    id: 11,
    src: "/images/hero-img6.png",
    alt: "",
  },
  {
    id: 12,
    src: "/images/hero-bg2.png",
    alt: "",
  },
];

export const slideConfigurations = [
  {
    image1: {
      classes: "absolute bottom-0 -left-6 max-w-[700px] object-cover z-10",
      transitionDelay: 0.1,
    },
    image2: {
      classes: "absolute -bottom-10 -right-10 max-w-[700px] object-cover z-[5]",
      transitionDelay: 0.3,
    },
    image3: {
      classes: "absolute -top-4 -right-40 w-full h-full object-cover z-0",
      transitionDelay: 0,
    },
  },
  {
    image1: {
      classes: "absolute bottom-0 -left-20 max-w-[600px] object-cover z-10",
      transitionDelay: 0.1,
    },
    image2: {
      classes: "absolute bottom-0 right-[-210px] object-cover z-[5]",
      transitionDelay: 0.3,
    },
    image3: {
      classes: "absolute -top-4 -right-40 w-full h-full object-cover z-0",
      transitionDelay: 0,
    },
  },
  {
    image1: {
      classes: "absolute bottom-0 -left-[100px] object-cover transform z-10",
      transitionDelay: 0.15,
    },
    image2: {
      classes: "absolute bottom-0 right-[-150px] object-cover transform z-[5]",
      transitionDelay: 0.35,
    },
    image3: {
      classes: "absolute -top-4 -right-40 w-full h-full object-cover z-0",
      transitionDelay: 0,
    },
  },
  {
    image1: {
      classes: "absolute bottom-0 max-w-[600px] left-0 object-cover z-10",
      transitionDelay: 0.1,
    },
    image2: {
      classes: "absolute top-20 max-w-[500px] right-0 object-cover z-10",
      transitionDelay: 0.3,
    },
    image3: {
      classes: "absolute bottom-0 w-full max-h-[790px] object-cover z-0",
      transitionDelay: 0,
    },
  },
];

export const SOCIAL_ICONS = [FaFacebookF, FaSkype, FaTwitter, FaLinkedinIn];

export const tutors = [
  {
    id: 1,
    name: "Ryan Patterson",
    course: "Math",
    price: "$50",
    image: "/images/tutor-1.png",
    duration: "8hrs",
    lectures: "20",
  },
  {
    id: 2,
    name: "Ryan Patterson",
    course: "Math",
    price: "$50",
    image: "/images/tutor-2.png",
    duration: "8hrs",
    lectures: "20",
  },
  {
    id: 3,
    name: "Ryan Patterson",
    course: "Math",
    price: "$50",
    image: "/images/tutor-3.png",
    duration: "8hrs",
    lectures: "20",
  },
];

export const STEPS = {
  parents: {
    img: "/images/parent-how-it-works.png",
    steps: [
      {
        title: "Sign up",
        description:
          "Create your account to have access to tutors and  book classes. Register with us",
      },
      {
        title: "Discover Tutors",
        description:
          "Explore subjects and view our professional tutors. Check out the best tutors for children/ward development.",
      },
      {
        title: "Schedule Introduction",
        description:
          "Book a real-time introductory session with tutors and confirm their personality matches what's best for your child(ren)/ward(s).",
      },
      {
        title: "Book Classes",
        description: "Easily book a class and begin your learning journey.",
      },
      {
        title: "Explore and Learn",
        description:
          "Seamlessly explore the different subjects, courses and tutors that are available on NextClass",
      },
    ],
  },
  tutors: {
    img: "/images/tutor-how-it-works.png",
    steps: [
      {
        title: "Sign up",
        description:
          "Create your account to have access to bookings and  create courses classes. Get started.",
      },
      {
        title: "Showcase your Experience",
        description:
          "Complete your profile by showcasing your area(s) of expertise, the excellent records and professional achievements you've garnered over the years.",
      },
      {
        title: "Schedule your Availability",
        description:
          "Set your availability for real-time introductory session with parents to confirm they need for your child(ren)/ward(s).",
      },
      {
        title: "Deliver Classes",
        description:
          "Deliver quality classes and continue your tutoring journey seamlessly. Follow courses outline to completion.",
      },
      {
        title: "Teach and Earn",
        description:
          "Seamlessly teach all the different subjects, courses and classes within your expertise and start earning NextClass.",
      },
    ],
  },
};

export const ARTICLES = [
  {
    date: {
      month: "May",
      day: "25",
    },
    title: "Top 5 Best Programming Languages to Learn in 2023",
    description:
      "Programming languages are the foundation of any software development project. Here are the top 5 programming languages to learn in 2023.",
    author: "Maddie Rife",
    likes: 123,
    shares: 45,
  },
  {
    date: {
      month: "May",
      day: "25",
    },
    title: "Top 5 Best Programming Languages to Learn in 2023",
    description:
      "Programming languages are the foundation of any software development project. Here are the top 5 programming languages to learn in 2023.",
    author: "John Doe",
    likes: 123,
    shares: 45,
  },
  {
    date: {
      month: "May",
      day: "25",
    },
    title: "Top 5 Best Programming Languages to Learn in 2023",
    description:
      "Programming languages are the foundation of any software development project. Here are the top 5 programming languages to learn in 2023.",
    author: "John Doe",
    likes: 123,
    shares: 45,
  },
];

export const GRADES = [
  "Pre-K",
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

export const SUBJECTS = [
  "English",
  "Math",
  "Science",
  "Fine Arts",
  "Coding & Tech",
  "Music",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Generate years from current year down to 2005
export const YEARS = Array.from(
  { length: new Date().getFullYear() - 2004 },
  (_, i) => (new Date().getFullYear() - i).toString()
);
// data/chatData.ts
export const conversations = [
  {
    id: 1,
    name: "King James",
    avatar: "/images/ryan.png",
    lastMessage: "Hi, thanks much for the...",
    timeAgo: "2days ago",
    active: true,
  },
  {
    id: 2,
    name: "Queen Esther",
    avatar: "/images/ryan.png",
    lastMessage: "Hi, thanks much for the...",
    timeAgo: "2days ago",
  },
  {
    id: 3,
    name: "Marvin Gaye",
    avatar: "/images/Author.png",
    lastMessage: "Hi, thanks much for the...",
    timeAgo: "2days ago",
  },
];

export const messages = [
  {
    id: 1,
    sender: "them",
    text: `Hello, Good morning.\nI wanted to confirm if you will be available for today's session`,
    timestamp: "10:03am",
  },
  {
    id: 2,
    sender: "me",
    text: `Hello, Good morning.\nI wanted to confirm that I will be available, thanks.`,
    timestamp: "10:03am",
  },
];

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const times = [
  {
    id: 0,
    time: "00:00",
  },
  {
    id: 1,
    time: "00:30",
  },
  {
    id: 2,
    time: "01:00",
  },
  {
    id: 3,
    time: "01:30",
  },
  {
    id: 4,
    time: "02:00",
  },
  {
    id: 5,
    time: "02:30",
  },
  {
    id: 6,
    time: "03:00",
  },
  {
    id: 7,
    time: "03:30",
  },
  {
    id: 8,
    time: "04:00",
  },
  {
    id: 9,
    time: "04:30",
  },
  {
    id: 10,
    time: "05:00",
  },
  {
    id: 11,
    time: "05:30",
  },
  {
    id: 12,
    time: "06:00",
  },
  {
    id: 13,
    time: "06:30",
  },
  {
    id: 14,
    time: "07:00",
  },
  {
    id: 15,
    time: "07:30",
  },
  {
    id: 16,
    time: "08:00",
  },
  {
    id: 17,
    time: "08:30",
  },
  {
    id: 18,
    time: "09:00",
  },
  {
    id: 19,
    time: "09:30",
  },
  {
    id: 20,
    time: "10:00",
  },
  {
    id: 21,
    time: "10:30",
  },
  {
    id: 22,
    time: "11:00",
  },
  {
    id: 23,
    time: "11:30",
  },
  {
    id: 24,
    time: "12:00",
  },
  {
    id: 25,
    time: "12:30",
  },
  {
    id: 26,
    time: "13:00",
  },
  {
    id: 27,
    time: "13:30",
  },
  {
    id: 28,
    time: "14:00",
  },
  {
    id: 29,
    time: "14:30",
  },
  {
    id: 30,
    time: "15:00",
  },
  {
    id: 31,
    time: "15:30",
  },
  {
    id: 32,
    time: "16:00",
  },
  {
    id: 33,
    time: "16:30",
  },
  {
    id: 34,
    time: "17:00",
  },
  {
    id: 35,
    time: "17:30",
  },
  {
    id: 36,
    time: "18:00",
  },
  {
    id: 37,
    time: "18:30",
  },
  {
    id: 38,
    time: "19:00",
  },
  {
    id: 39,
    time: "19:30",
  },
  {
    id: 40,
    time: "20:00",
  },
  {
    id: 41,
    time: "20:30",
  },
  {
    id: 42,
    time: "21:00",
  },
  {
    id: 43,
    time: "21:30",
  },
  {
    id: 44,
    time: "22:00",
  },
  {
    id: 45,
    time: "22:30",
  },
  {
    id: 46,
    time: "23:00",
  },
  {
    id: 47,
    time: "23:30",
  },
];
import * as z from "zod";

export const bioDataSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  address: z.string(),
  about: z.string(),
});
