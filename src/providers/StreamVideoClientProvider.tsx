"use client";

import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import { Session } from "@/services/session";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useMemo, useState } from "react";
import { Chat, useCreateChatClient } from "stream-chat-react";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

export const StreamVideoClientProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null | undefined;
}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const user = session?.user;

  if (!API_KEY) throw new Error("Stream API key is missing");
  if (!user) throw new Error("User is not logged in");

 const tokenProvider = useMemo(
   () => async () => {
     const response = await axiosInstance.get("/stream/token");
     return response.data.token;
   },
   []
 );

  const chatClient = useCreateChatClient({
    apiKey: API_KEY,
    tokenOrProvider: tokenProvider,
    userData: {
      id: user?.id,
      name: user?.fullName || user?.id,
      image: user?.profilePicture,
    },
  });

  useEffect(() => {
    if (!user) return;
    if (!API_KEY) throw new Error("Stream API key is missing");

    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user?.id,
        name: user?.fullName || user?.id,
        image: user?.profilePicture,
      },
      tokenProvider,
    });

    setVideoClient(client);

    return () => {
      // dispose the client once you don't need it anymore
      client.disconnectUser().catch((err) => console.error(err));
      setVideoClient(undefined);
    };
  }, [user, tokenProvider]);

  if (!user) return <>{children}</>;

  if (!chatClient || !videoClient) return <Loader />;

  return (
    <Chat client={chatClient}>
      <StreamVideo client={videoClient}>{children}</StreamVideo>;
    </Chat>
  );
};
