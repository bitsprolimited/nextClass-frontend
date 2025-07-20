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
    <div className="space-y-8 w-full max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold text-[#2c241b] mb-2">My Reviews</h2>
      {/* Rating */}
      <div className="text-base font-semibold flex items-center gap-2">
        4.8/5{" "}
        <div className="flex gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
        </div>
      </div>
      <div className="bg-[#F8F8F8] p-6 rounded-2xl">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">20 Reviews</h3>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-[#DDEEFF] p-4 rounded-lg text-center flex flex-col items-center gap-8 text-sm"
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
              <h4 className="text-3xl font-semibold text-gray-900">
                {review.name}
              </h4>
              <p className="text-[11px] text-[#FFA300] font-medium uppercase tracking-wider">
                {review.role}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-[#F38500] text-white text-sm px-6 py-2 rounded-full hover:opacity-90 transition">
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  );
}
