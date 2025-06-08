import ComingSoon from "@/components/comingSoon";
import Footer from "@/components/footer";
import SubscribeNewsletter from "@/components/subscribeNewsletter";
import Testimonial from "@/components/testimonials";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col  items-center">
      <h1>Home</h1>
      <Link className="text-blue-500" href="/about-us">
        About
      </Link>
      <Link className="text-blue-500" href="/tutors">
        Tutors
      </Link>
      <Link className="text-blue-500" href="/login">
        Login
      </Link>
      <Testimonial />
      <ComingSoon />
      <SubscribeNewsletter />
      <Footer />
    </div>
  );
}
