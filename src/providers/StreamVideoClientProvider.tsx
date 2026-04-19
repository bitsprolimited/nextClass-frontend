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
  }, [token, user.id, user.name, user.image]);

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
    enabled: !!session?.user?.id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
  });
  const [stableUser, setStableUser] = useState<User | null>(null);
  const [stableToken, setStableToken] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      setStableUser(session.user);
    } else if (!isPending) {
      setStableUser(null);
    }
  }, [isPending, session?.user]);

  useEffect(() => {
    if (token) {
      setStableToken(token);
    } else if (!isTokenPending && !session?.user) {
      setStableToken(null);
    }
  }, [isTokenPending, session?.user, token]);

  if ((isPending || isTokenPending) && !(stableUser && stableToken)) {
    return <Loader />;
  }

  if (stableUser && stableToken) {
    return (
      <StreamClientSetup
        key={`${stableUser.id}:${stableToken}`}
        user={stableUser}
        token={stableToken}
      >
        {children}
      </StreamClientSetup>
    );
  }

  return <>{children}</>;
};
