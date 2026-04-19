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
import { AnimatePresence, motion, Variants } from "motion/react";
import { LayoutList, MessageSquare, PenTool, Users, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import {
  endMeetingSession,
  leaveMeetingSession,
  MeetingAccessResponse,
} from "@/services/booking.service";
import Loader from "./Loader";
import { Alert } from "./MeetingSetup";
import ClassWhiteboard from "./meeting/ClassWhiteboard";
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
    await endMeetingSession(call.id);
    await call.endCall();
    router.push("/");
  };

  return (
    <Button onClick={endCall} className="bg-red-500 hover:bg-red-600">
      End call for everyone
    </Button>
  );
};

const MeetingRoom = ({
  callId,
  isClassSession,
  meetingAccess,
}: {
  callId: string;
  isClassSession: boolean;
  meetingAccess?: MeetingAccessResponse;
}) => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const { useCallCallingState, useLocalParticipant } = useCallStateHooks();
  const hasRecordedLeaveRef = useRef(false);

  const callingState = useCallCallingState();
  const call = useCall();
  const localParticipant = useLocalParticipant();

  const { client, setActiveChannel } = useChatContext();

  useEffect(() => {
    const channel = client.channel("messaging", callId);
    setActiveChannel(channel);
  }, [callId, client, setActiveChannel]);

  useEffect(() => {
    if (!meetingAccess || !call) return;
    if (meetingAccess.isSessionEnded) {
      setSessionExpired(true);
      return;
    }

    const endTimeMs = new Date(meetingAccess.endTime).getTime();
    const currentServerMs = Date.now() + meetingAccess.serverTimeOffsetMs;
    const remainingMs = Math.max(0, endTimeMs - currentServerMs);

    const timer = window.setTimeout(() => {
      const expireSession = async () => {
        try {
          hasRecordedLeaveRef.current = true;
          await leaveMeetingSession(callId);
        } catch (error) {
          console.error("Failed to record session expiry:", error);
        }

        try {
          if (call?.state.createdBy?.id === localParticipant?.userId) {
            await endMeetingSession(callId);
            await call.endCall();
          } else {
            await call?.leave();
          }
        } catch (error) {
          console.error("Failed to close expired session:", error);
        } finally {
          setSessionExpired(true);
        }
      };

      void expireSession();
    }, remainingMs);

    return () => window.clearTimeout(timer);
  }, [call, callId, localParticipant?.userId, meetingAccess]);

  useEffect(() => {
    return () => {
      if (hasRecordedLeaveRef.current) return;
      hasRecordedLeaveRef.current = true;
      void leaveMeetingSession(callId).catch((error) => {
        console.error("Failed to record meeting leave:", error);
      });
    };
  }, [callId]);

  if (sessionExpired) {
    return (
      <Alert title="This session has ended because the scheduled time expired." />
    );
  }
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
  const participantsPanelVariants: Variants = {
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
  const mainContentVariants: Variants = {
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

  const whiteboardOverlayVariants = {
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
        duration: 0.15,
      },
    },
  };

  const whiteboardPanelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.985,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.18,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.985,
      transition: {
        duration: 0.12,
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
        <CallControls
          onLeave={() => {
            hasRecordedLeaveRef.current = true;
            void leaveMeetingSession(callId).finally(() => router.push(`/`));
          }}
        />

        {isClassSession && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-2xl bg-[#19232d] text-white hover:bg-[#4c535b] hover:text-white"
            onClick={() => setShowWhiteboard(true)}
          >
            <PenTool size={20} />
          </Button>
        )}

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

      <AnimatePresence>
        {showWhiteboard && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-[2px]"
              variants={whiteboardOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowWhiteboard(false)}
            />

            <motion.div
              className="fixed inset-0 z-50 flex items-stretch justify-end p-0 sm:p-4"
              variants={whiteboardOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                className="relative flex h-full w-full overflow-hidden border-l border-slate-800 bg-slate-950 shadow-2xl sm:max-w-[min(92vw,1100px)] sm:rounded-3xl sm:border"
                variants={whiteboardPanelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="absolute right-4 top-4 z-20">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-slate-900/80 text-white hover:bg-slate-800 hover:text-white"
                    onClick={() => setShowWhiteboard(false)}
                  >
                    <X />
                  </Button>
                </div>

                <div className="h-full w-full p-0 sm:p-3">
                  <ClassWhiteboard meetingId={callId} isOpen={showWhiteboard} />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MeetingRoom;
