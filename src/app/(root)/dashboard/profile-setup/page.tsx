import FormWrapper from "./FormWrapper";
import HeroSection from "./hero";

export default function MultiStepFormPage() {
  return (
    <main className="min-h-screen flex flex-col gap-5 items-center justify-center ">
      <HeroSection />
      <FormWrapper />
    </main>
  );
}
