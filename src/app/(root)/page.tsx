import ComingSoon from "@/components/comingSoon";
import SubscribeNewsletter from "@/components/subscribeNewsletter";
import AboutSection from "@/components/landing/about-section";
import ArticlesSection from "@/components/landing/articles-section";
import FeaturedTutors from "@/components/landing/featured-tutors";
import Features from "@/components/landing/features";
import HeroSection from "@/components/landing/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works";
import Testimonial from "@/components/landing/testimonials";

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <HeroSection />
      <Features />
      <AboutSection />
      <FeaturedTutors />
      <HowItWorksSection />
      <Testimonial />
      <ArticlesSection />
      <ComingSoon className="max-w-7xl mx-auto"/>
      <SubscribeNewsletter />
    </main>
  );
}
