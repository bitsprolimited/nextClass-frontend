import ComingSoon from "@/components/comingSoon";
import SubscribeNewsletter from "@/components/subscribeNewsletter";
import HeroSection from "@/components/landing/hero-section";
import Testimonial from "@/components/landing/testimonials";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <HeroSection />
      <Testimonial />
      <ComingSoon />
      <SubscribeNewsletter />
    </div>
  );
}
