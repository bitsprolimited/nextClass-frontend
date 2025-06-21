import Image from "next/image";
import { Star } from "lucide-react";

const reviews = Array(4).fill({
  name: "Pollock Austin",
  role: "DESIGNER. MOTHER OF 4",
  content:
    "Lorem Ipsum is simply dummy text of the printing typesetting industry has been the industry's standard dummy text ever since the 1500s when unknown printer took a galley of type and scrambled it to",
  avatar: "/images/avatar.png",
});

export default function ReviewsPanel() {
  return (
    <div className="space-y-4 ">
      {/* Rating */}
      <div className="text-base font-semibold flex items-center gap-2">
        4.8/5{" "}
        <div className="flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">20 Reviews</h3>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="bg-[#DDEEFF] p-4 rounded-lg text-center flex flex-col items-center gap-2 text-sm"
          >
            <div className="relative w-[50px] h-[50px]">
              <Image
                src="/images/Author.png"
                alt={review.name}
                fill
                className="rounded-full object-cover"
              />
              <Image
                src="/images/quote.png"
                alt="quote"
                width={24}
                height={24}
                className="absolute -bottom-3 -right-[-10]"
              />
            </div>

            <p className="text-gray-700 leading-snug line-clamp-4">
              {review.content}
            </p>
            <h4 className="text-base font-semibold text-gray-900">
              {review.name}
            </h4>
            <p className="text-[11px] text-[#FFA300] font-medium uppercase tracking-wider">
              {review.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
