import { Download } from "lucide-react";
import Link from "next/link";

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

export default function LessonNotesSection() {
  return (
    <section className="w-full max-w-6xl mx-auto mt-10">
      <div className="bg-[#F4F4F4] p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#2c241b]">Lesson Notes</h2>
          <Link href="/dashboard/parent/lesson" passHref>
            <button className="text-sm font-medium text-[#031D95] hover:underline">
              View All
            </button>
          </Link>
        </div>

        {/* Wrapping Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`relative flex flex-col w-full h-[400px] items-start gap-5 p-5 rounded-lg ${note.bgColor}`}
            >
              {/* Top: Date & Tag */}
              <div className="flex flex-col items-start gap-[7px] pb-3 w-full border-b border-[#24242480]">
                <div className="flex items-start justify-between w-full">
                  <div className="text-xs text-[#242424b2] font-normal">
                    {note.date}
                  </div>
                  {note.tag && (
                    <div className="bg-[#4c75ff33] text-[#4c75ff] text-xs px-5 py-1 rounded">
                      {note.tag}
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="flex gap-3">
                  <p className="text-lg text-[#242424] font-medium tracking-[0.36px]">
                    {note.title}
                  </p>
                  <Download className="absolute w-6 h-6 top-[51px] right-5" />
                </div>
              </div>

              {/* Download Icon */}

              {/* Content */}
              <p className="text-sm text-[#24242499] tracking-[0.56px] whitespace-pre-line">
                {note.content}
              </p>

              {/* Last Updated */}
              <p className="text-xs text-right text-[#24242480] w-full tracking-[1px]">
                Last Updated {note.lastUpdated}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
