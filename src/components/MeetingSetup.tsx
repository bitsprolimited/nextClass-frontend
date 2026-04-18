"use client";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { Camera, CameraOff, LogIn, Mic, MicOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { User } from "better-auth";
import {
  joinMeetingSession,
  leaveMeetingSession,
  MeetingAccessResponse,
} from "@/services/booking.service";

interface PermissionCardProps {
  title: string;
  iconUrl?: string;
}

export const Alert = ({ title, iconUrl }: PermissionCardProps) => {
  return (
    <section className="flex items-center justify-center h-screen w-full">
      <Card className="w-full max-w-[520px] border-none bg-[#1C1F2E] p-6 py-9 text-white">
        <CardContent>
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-3.5">
              {iconUrl && (
                <div className="flex items-center justify-center">
                  <Image src={iconUrl} width={72} height={72} alt="icon" />
                </div>
              )}
              <p className="text-center text-xl font-semibold">{title}</p>
            </div>

            <Button asChild className="bg-[#0E78F9]">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

const NoCameraPreview = ({ user }: { user: User }) => (
  <div>
    <Avatar>
      <AvatarImage src={user?.image ?? ""} alt="avatar" />
      <AvatarFallback>{user?.name[0]}</AvatarFallback>
    </Avatar>
  </div>
);

const MeetingSetup = ({
  setIsSetupComplete,
  user,
  meetingId,
  meetingAccess,
  refetchMeetingAccess,
}: {
  setIsSetupComplete: (value: boolean) => void;
  user: User;
  meetingId: string;
  meetingAccess?: MeetingAccessResponse;
  refetchMeetingAccess: UseQueryResult<MeetingAccessResponse>["refetch"];
}) => {
  const [isJoining, setIsJoining] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#call-state
  const {
    useCallEndedAt,
    // useCallStartsAt,
    useCameraState,
    useMicrophoneState,
  } = useCallStateHooks();
  // const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  // const callTimeNotArrived =
  //   callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;
  const { isMute } = useCameraState();
  const { isMute: isMicrophoneMuted } = useMicrophoneState();

  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  useEffect(() => {
    const enableDevices = async () => {
      try {
        await Promise.all([call.camera.enable(), call.microphone.enable()]);
      } catch (error) {
        console.error("Failed to initialize call devices:", error);
      }
    };

    void enableDevices();
  }, [call.camera, call.microphone]);

  const handleJoinMeeting = async () => {
    setIsJoining(true);
    setJoinError(null);

    try {
      const access = await joinMeetingSession(meetingId);

      if (!access.canJoin) {
        setJoinError(access.message);
        await refetchMeetingAccess();
        return;
      }

      await call.join();
      setIsSetupComplete(true);
    } catch (error) {
      console.error("Failed to join meeting:", error);
      try {
        await leaveMeetingSession(meetingId);
      } catch (leaveError) {
        console.error("Failed to roll back failed join:", leaveError);
      }
      await refetchMeetingAccess();
      setJoinError("Could not join the meeting. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  // if (callTimeNotArrived)
  //   return (
  //     <Alert
  //       title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
  //     />
  //   );

  if (callHasEnded)
    return (
      <Alert
        title="The call has been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );

  if (meetingAccess?.shouldShowWaitingRoom) {
    return (
      <section className="flex items-center justify-center h-screen w-full">
        <Card className="w-full max-w-[560px] border-none bg-[#1C1F2E] p-6 py-9 text-white">
          <CardContent className="space-y-6">
            <div className="space-y-3 text-center">
              <p className="text-2xl font-semibold">Waiting room</p>
              <p className="text-sm text-slate-300">{meetingAccess.message}</p>
              <p className="text-sm text-slate-400">
                Join opens at{" "}
                {new Date(meetingAccess.joinWindowStartsAt).toLocaleString()}.
              </p>
              <p className="text-sm text-slate-400">
                Class starts at {new Date(meetingAccess.startTime).toLocaleString()}.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                type="button"
                onClick={() => void refetchMeetingAccess()}
                className="bg-[#0E78F9]"
              >
                Refresh status
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Leave</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <div className="flex h-screen w-full max-w-4xl mx-auto flex-col items-center justify-center gap-5">
      <h1 className="text-center text-2xl font-bold">
        Setup your call before joining
      </h1>
      <VideoPreview
        DisabledVideoPreview={() => <NoCameraPreview user={user} />}
      />
      <Button
        className="rounded-full bg-primary px-6 py-2.5"
        onClick={handleJoinMeeting}
        disabled={isJoining || !meetingAccess?.canJoin}
      >
        <LogIn />
        {isJoining ? "Joining..." : "Join meeting"}
      </Button>
      {meetingAccess && !meetingAccess.canJoin && !meetingAccess.shouldShowWaitingRoom && (
        <p className="text-sm text-amber-300">{meetingAccess.message}</p>
      )}
      {joinError && <p className="text-sm text-red-600">{joinError}</p>}
      <div className="py-6 border-t border-gray-200 w-full">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={async () => await call.microphone.toggle()}
            className={`p-3 rounded-full font-medium transition-colors ${
              isMicrophoneMuted
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isMicrophoneMuted ? (
              <MicOff className="w-5 h-5 mx-auto" />
            ) : (
              <Mic className="w-5 h-5 mx-auto" />
            )}
          </button>
          <button
            onClick={async () => await call.camera.toggle()}
            className={`p-3 rounded-full font-medium transition-colors ${
              isMute ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
            }`}
          >
            {!isMute ? (
              <Camera className="w-5 h-5 mx-auto" />
            ) : (
              <CameraOff className="w-5 h-5 mx-auto" />
            )}
          </button>
          <DeviceSettings />
        </div>
      </div>
    </div>
  );
};

export default MeetingSetup;
