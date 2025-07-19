import ChatBox from "@/components/chat/ChatBox";
import ChatSidebar from "@/components/chat/ChatSidebar";

export default function MessagesPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="flex w-[1060px] h-[640px] shadow rounded-xl overflow-hidden">
        {/* Sidebar */}
        <div className="w-[462px] border-r">
          <ChatSidebar />
        </div>
        {/* Chat Section */}
        <div className="w-[595px]">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
