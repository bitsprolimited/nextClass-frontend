"use client";

import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useQuery } from "@tanstack/react-query";
import { User } from "better-auth";
import { useEffect, useState } from "react";
import { Chat, useCreateChatClient } from "stream-chat-react";
import { useAuth } from "./AuthProvider";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const fetchStreamToken = async (): Promise<string> => {
  const response = await axiosInstance.get("/stream/token");
  return response.data.token;
};

const StreamClientSetup = ({
  user,
  token,
  children,
}: {
  user: User;
  token: string;
  children: React.ReactNode;
}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  if (!API_KEY) throw new Error("Stream API key is missing");

  const chatClient = useCreateChatClient({
    apiKey: API_KEY,
    tokenOrProvider: token,
    userData: {
      id: user.id,
      name: user.name || user.id,
      image: user.image ?? "",
    },
  });

  useEffect(() => {
    if (!token) return;
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      user: {
        id: user.id,
        name: user.name || user.id,
        image: user.image ?? "",
      },
      token: token,
    });

    setVideoClient(client);

    return () => {
      client
        .disconnectUser()
        .catch((err) => console.error("Failed to disconnect user:", err));
      setVideoClient(undefined);
    };
  }, [user, token]);

  if (!chatClient || !videoClient) {
    return <Loader />;
  }

  return (
    <Chat client={chatClient}>
      <StreamVideo client={videoClient}>{children}</StreamVideo>
    </Chat>
  );
};

export const StreamVideoClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { session, isLoading: isPending } = useAuth();
  const { data: token, isPending: isTokenPending } = useQuery({
    queryKey: ["stream-token", session?.user?.id],
    queryFn: fetchStreamToken,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
  });
  const user = session?.user;

  if (isPending || isTokenPending) {
    return <Loader />;
  }

  if (user && token) {
    return (
      <StreamClientSetup key={user.id} user={user} token={token}>
        {children}
      </StreamClientSetup>
    );
  }

  return <>{children}</>;
};
