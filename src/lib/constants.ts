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
      href: "/messages",
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
      href: "/messages",
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
