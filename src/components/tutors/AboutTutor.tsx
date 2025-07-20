import Link from "next/link";

export default function AboutTutor() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-10">
      <div className="bg-[#F4F4F4] p-6 md:p-8 rounded-2xl">
        <h2 className="text-[#031D95] font-bold text-sm uppercase mb-4">
          About Me
        </h2>

        <p className="text-[#2c241bcc] text-sm leading-relaxed">
          My philosophy is to make education relevant and vibrant. Each student
          is unique, so I meet them where they are by helping students identify
          passions for education and helping them find opportunities and the{" "}
          <strong className="font-semibold text-[#2c241b]">
            guidance to grow
          </strong>
          —consistently one of my mantras to develop and overcome academic
          conflicts.
          <br />
          <br />
          Hello! My name is Ryan Patterson, I am from Canada. I hold a Bachelor
          of Arts degree in Psychology.{" "}
          <Link href="#" className="text-[#ef9000] font-medium hover:underline">
            Learn More
          </Link>
        </p>
      </div>
    </section>
  );
}
