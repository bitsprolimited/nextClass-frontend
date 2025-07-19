import Image from "next/image";
import { conversations } from "@/lib/constants";

export default function ChatSidebar() {
  return (
    <div className="h-full w-full bg-[#f5f4f8] p-4 rounded-tl-xl rounded-bl-xl">
      {conversations.map((c) => (
        <div
          key={c.id}
          className={
            `flex items-center justify-between p-3 mb-4 rounded-xl cursor-pointer transition-colors ` +
            (c.active ? "bg-[#031d95] text-white" : "bg-white hover:bg-gray-50")
          }
        >
          <div className="flex items-center gap-3">
            <Image
              src={c.avatar}
              alt={c.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex-1">
              <h4 className="font-medium text-[30px] font-Montserrat leading-snug">
                {c.name}
              </h4>
              <p className="text-sm text-gray-500 truncate">{c.lastMessage}</p>
            </div>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {c.timeAgo}
          </span>
        </div>
      ))}
    </div>
  );
}
