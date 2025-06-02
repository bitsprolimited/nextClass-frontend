import HeroSection from "@/components/landing/hero-section";
import Testimonial from "@/components/landing/testimonials";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <Testimonial />
    </div>
  );
}
