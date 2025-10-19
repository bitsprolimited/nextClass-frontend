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
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { User } from "better-auth";

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
}: {
  setIsSetupComplete: (value: boolean) => void;
  user: User;
}) => {
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
    call.camera.enable();
    call.microphone.enable();
  }, [call.camera, call.microphone]);

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
        onClick={() => {
          call.join();

          setIsSetupComplete(true);
        }}
      >
        <LogIn />
        Join meeting
      </Button>
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
