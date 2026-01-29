// File A: MessagesPage.tsx

import ChatBox from "@/components/chat/ChatBox";
import ChatSidebar from "@/components/chat/ChatSidebar";

export default function MessagesPage() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex w-[1060px] h-[640px] rounded-xl overflow-hidden bg-[#f5f4f8]">
        {/* Sidebar */}
        <div className="w-[462px]">
          <ChatSidebar />
        </div>
        <div className="my-5 border-2"></div>
        {/* Chat Section */}
        <div className="w-[598px]">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
