// components/ReviewStats.tsx
import { MessagesSquare, Star as StarIcon } from "lucide-react";
import { Star } from "lucide-react";

export default function ReviewStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl mx-auto h-[220px]">
      {/* Overall Reviews */}
      <div className="flex items-center gap-16 p-10 bg-white rounded-2xl shadow-md">
        <div className="bg-primary p-5 rounded-full text-white">
          <MessagesSquare className="w-6 h-6" />
        </div>
        <div>
          <p className="text-[34px] font-semibold text-black">100+</p>
          <p className="text-sm text-gray-600">Overall Review</p>
        </div>
      </div>

      {/* Average Rating */}
      <div className="flex items-center gap-16 p-10 bg-white rounded-2xl shadow-md">
        <div className="bg-primary p-5 rounded-full text-white">
          <StarIcon className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[34px] font-semibold text-black">4.5</p>
            <div className="flex gap-0.5 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  fill={i < 4.5 ? "#FACC15" : "none"}
                  className="w-4 h-4"
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">Average Rating</p>
        </div>
      </div>
    </div>
  );
}
