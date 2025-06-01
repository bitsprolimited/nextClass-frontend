import Footer from "@/components/footer";
import Testimonial from "@/components/testimonials";

export default function Page() {
  return (
    <div className="flex flex-col  items-center">
      <h1>Home</h1>
      <Testimonial />
      <Footer />
    </div>
  );
}
