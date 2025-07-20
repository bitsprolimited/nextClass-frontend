import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messages } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";

export default function ChatBox() {
  return (
    <div className="flex flex-col h-full bg-white rounded-tr-xl rounded-xl shadow-xl overflow-hidden m-5">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#031d95] text-white">
        <div className="flex items-center gap-3">
          <Image
            src="/images/ryan.png"
            alt="King James"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h4 className="font-semibold text-[30px] font-Montserrat leading-snug">
              King James
            </h4>
            <p className="text-xs leading-none">Online</p>
          </div>
        </div>
        <div className="text-xl">⋮</div>
      </div>

      {/* Highlight bar */}
      <div className="h-12 bg-[#fbbd35]" />

      {/* Messages list */}
      <ScrollArea className="flex-1 px-4 py-6 ">
        <div className="flex flex-col space-y-8">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={
                `max-w-[70%] px-4 py-2 rounded-xl relative ` +
                (msg.sender === "me"
                  ? "ml-auto bg-[#e8eaf6] text-gray-900"
                  : "bg-[#031d95] text-white")
              }
            >
              <p className="whitespace-pre-line text-sm leading-relaxed">
                {msg.text}
              </p>
              <span className="absolute bottom-[-3] right-2 text-[10px] text-gray-500">
                {msg.timestamp}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input area */}
      <form className="flex items-center gap-2 px-4 py-3 border-t bg-white">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Start typing..."
            className="w-full bg-gray-100 rounded-full pr-20" // Extra padding to make room for icons
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="p-0 h-6 w-6"
            >
              <Camera className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="p-0 h-6 w-6"
            >
              <Upload className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          size="icon"
          className="w-10 h-10 p-0 rounded-full bg-[#031d95] text-white"
        >
          ➤
        </Button>
      </form>
    </div>
  );
}
