import { Teacher } from "@/types";

export default function AboutTutor({ tutor }: { tutor: Teacher }) {
  return (
    <section className="w-full max-w-6xl mx-auto mt-10">
      <div className="bg-[#F4F4F4] p-6 md:p-8 rounded-2xl">
        <h2 className="text-[#031D95] font-bold text-sm uppercase mb-4">
          About Me
        </h2>

        <p className="text-[#2c241bcc] text-sm leading-relaxed">{tutor.bio}</p>
      </div>
    </section>
  );
}
