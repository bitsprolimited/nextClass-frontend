"use client";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { AnimatePresence, motion } from "framer-motion";
import { LayoutList, MessageSquare, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import Loader from "./Loader";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  useChatContext,
  Window,
} from "stream-chat-react";
import { cn } from "@/lib/utils";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();

  if (!call)
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    await call.endCall();
    router.push("/");
  };

  return (
    <Button onClick={endCall} className="bg-red-500 hover:bg-red-600">
      End call for everyone
    </Button>
  );
};

const MeetingRoom = ({ callId }: { callId: string }) => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  const { client, setActiveChannel } = useChatContext();

  useEffect(() => {
    const channel = client.channel("messaging", callId);
    setActiveChannel(channel);
  }, [callId, client, setActiveChannel]);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  // Animation variants for the participants panel
  const participantsPanelVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.4,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 150,
        duration: 0.3,
      },
    },
  };

  // Animation variants for the main content area
  const mainContentVariants = {
    full: {
      marginRight: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.4,
      },
    },
    compressed: {
      marginRight: "384px", // w-96 = 384px
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.4,
      },
    },
  };

  // Backdrop animation variants
  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section className="relative h-screen w-full overflow-hidden py-6 bg-[#1C1F2E] text-white">
      <div className="relative flex size-full items-center justify-center">
        {/* Main Content Area with Animation */}
        <motion.div
          className="flex size-full max-w-[1000px] items-center"
          variants={mainContentVariants}
          animate={showParticipants || showChat ? "compressed" : "full"}
        >
          <CallLayout />
        </motion.div>

        {/* Animated Participants Panel */}
        <AnimatePresence mode="wait">
          {(showParticipants || showChat) && (
            <>
              {/* Mobile Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => {
                  setShowParticipants(false);
                  setShowChat(false);
                }}
              />

              {/* Participants Panel */}
              <motion.div
                className="fixed right-0 top-0 h-full w-96 z-50 lg:absolute lg:top-6 lg:h-[calc(100vh-86px)]"
                variants={participantsPanelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="h-full bg-[#1C1F2E] lg:rounded-l-xl shadow-2xl">
                  {/* Participants List */}
                  <div
                    className={cn("h-full overflow-hidden", {
                      "p-5": showParticipants,
                    })}
                  >
                    {showParticipants && (
                      <CallParticipantsList
                        onClose={() => setShowParticipants(false)}
                      />
                    )}
                    {showChat && (
                      <Channel>
                        <Window>
                          <ChannelHeader />
                          <MessageList />
                          <MessageInput focus />
                        </Window>
                      </Channel>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Video Layout and Call Controls */}
      <div className="sticky bottom-0 flex w-full items-center justify-center gap-5 z-30">
        <CallControls onLeave={() => router.push(`/`)} />

        {/* Layout Dropdown */}
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] transition-colors duration-200">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                  className="hover:bg-gray-700 cursor-pointer"
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />

        {/* Animated Participants Toggle Button */}
        <motion.button
          onClick={() => {
            setShowParticipants((prev) => !prev);
            setShowChat(false);
          }}
          className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] transition-colors duration-200 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={showParticipants ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Users size={20} className="text-white" />
          </motion.div>

          {/* Active State Indicator */}
          <AnimatePresence>
            {showParticipants && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.button>
        <motion.button
          onClick={() => {
            setShowChat((prev) => !prev);
            setShowParticipants(false);
          }}
          className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b] transition-colors duration-200 relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={showChat ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MessageSquare size={20} className="text-white" />
          </motion.div>

          {/* Active State Indicator */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
