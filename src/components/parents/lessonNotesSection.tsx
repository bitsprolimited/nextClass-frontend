import { Download } from "lucide-react";
import Link from "next/link";
import React from "react";

type Note = {
  date: string;
  title: string;
  content: string;
  tag?: string;
  lastUpdated: string;
  bgColor: string;
};

const notes: Note[] = [
  {
    date: "14/06/2025",
    title: "Meeting with James P. Paxwell",
    content:
      "orem ipsum dolor sit amet consectetur.blandit eu est.Vitae sit risus ligula eu suscipit scelerisque sit diam diam. Faucibus lectus amet volutpat nulla aliquam lorem neque phasellus. Malesuada id tortor sed consequat risus. Et convallis massa gravid.Enim nisi turpis arcu morbi lectus elementum. Commodo a se...",
    tag: "Ongoing",
    lastUpdated: "28, MAY 2025",
    bgColor: "bg-[#F9C5C5]",
  },
  {
    date: "16/06/2025",
    title: "Meeting with James P. Paxwell",
    content:
      "orem ipsum dolor sit amet consectetur.blandit eu est.Vitae sit risus ligula eu suscipit scelerisque sit diam diam. Faucibus lectus amet volutpat nulla aliquam lorem neque phasellus. Malesuada id tortor sed consequat risus. Et convallis massa gravid.Enim nisi turpis arcu morbi lectus elementum. Commodo a se...",
    tag: "Ongoing",
    lastUpdated: "28, MAY 2025",
    bgColor: "bg-[#EFF58A]",
  },
  {
    date: "19/06/2025",
    title: "Meeting with James P. Paxwell",
    content:
      "Lorem ipsum dolor sit amet consectetur.blandit eu est.Vitae sit risus ligula eu suscipit scelerisque sit diam diam. Faucibus lectus amet volutpat nulla aliquam lorem neque phasellus. Malesuada id tortor sed consequat risus. Et convallis massa gravid.Enim nisi turpis arcu morbi lectus elementum. Commodo a se...",
    tag: "Ongoing",
    lastUpdated: "28, MAY 2025",
    bgColor: "bg-[#9FD9FF]",
  },
  {
    date: "21/06/2025",
    title: "Meeting with James P. Paxwell",
    content:
      "Lorem ipsum dolor sit amet consectetur.blandit eu est.Vitae sit risus ligula eu suscipit scelerisque sit diam diam. Faucibus lectus amet volutpat nulla aliquam lorem neque phasellus. Malesuada id tortor sed consequat risus. Et convallis massa gravid.Enim nisi turpis arcu morbi lectus elementum. Commodo a se...",
    lastUpdated: "28, MAY 2025",
    bgColor: "bg-[#F5B97F]",
  },
];

function TitleWithBoldName({ title }: { title: string }) {
  const idx = title.toLowerCase().indexOf("with ");
  if (idx !== -1) {
    const before = title.slice(0, idx + 5); // include "with "
    const after = title.slice(idx + 5);
    return (
      <>
        {before}
        <span className="font-semibold">{after}</span>
      </>
    );
  }
  return <>{title}</>;
}

export default function LessonNotesSection() {
  return (
    <section className="w-full max-w-6xl mx-auto">
      <div className="bg-[#F4F4F4] p-6 rounded-2xl shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#2c241b]">Lesson Notes</h2>
          <Link
            href="/dashboard/parent/lesson"
            className="text-sm font-medium text-[#031D95] hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {notes.map((note, index) => (
            <div
              key={index}
              className={[
                "relative overflow-hidden rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/10",
                "p-4 sm:p-5",
                // More generous mobile height
                "min-h-[220px] sm:min-h-[400px]",
                "flex flex-col",
                note.bgColor,
              ].join(" ")}
            >
              {/* Header Row 1: Date + Tag */}
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-[#242424b2]">{note.date}</span>
                {note.tag && (
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] leading-5 bg-[#E6E3FF] text-[#5A48FF]">
                    {note.tag}
                  </span>
                )}
              </div>

              {/* Header Row 2: Title + Download */}
              <div className="flex items-center justify-between w-full mt-2">
                <h3 className="text-base sm:text-lg text-[#242424] tracking-[0.3px] font-medium">
                  <TitleWithBoldName title={note.title} />
                </h3>
                <button
                  aria-label="Download note"
                  className="ml-3 grid place-items-center w-8 h-8 rounded-full bg-white shadow-sm ring-1 ring-black/10"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Divider */}
              <div className="my-2 border-b border-[#24242420]" />

              {/* Body */}
              <p
                className={[
                  "text-sm text-[#24242499] tracking-[0.3px]",
                  "line-clamp-3 sm:line-clamp-none",
                ].join(" ")}
              >
                {note.content}
              </p>

              {/* Footer */}
              <p className="mt-auto pt-2 text-xs italic text-[#24242480]">
                Last Updated {note.lastUpdated}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
