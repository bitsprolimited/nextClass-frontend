"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { AppState, ExcalidrawProps } from "@excalidraw/excalidraw/types";
import {
  getWhiteboardState,
  getWhiteboardSocketToken,
  updateWhiteboardState,
} from "@/services/booking.service";
import { io, type Socket } from "socket.io-client";

const EMIT_DEBOUNCE_MS = 150;
type WhiteboardElements = Parameters<NonNullable<ExcalidrawProps["onChange"]>>[0];

export type WhiteboardScene = {
  elements: WhiteboardElements;
  appState: Pick<AppState, "viewBackgroundColor">;
  updatedAt: number;
  updatedBy?: string;
};

const isWhiteboardScene = (value: unknown): value is WhiteboardScene => {
  if (!value || typeof value !== "object") return false;
  return Array.isArray((value as WhiteboardScene).elements);
};

export const useWhiteboardSync = (meetingId: string, enabled: boolean) => {
  const [remoteScene, setRemoteScene] = useState<WhiteboardScene | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const queuedSceneRef = useRef<WhiteboardScene | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestAppliedTimestampRef = useRef(0);
  const lastSerializedSceneRef = useRef<string | null>(null);
  const isMountedRef = useRef(true);
  const socketRef = useRef<Socket | null>(null);

  const socketBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/api\/v1$/, "") ?? "";

  const flushScene = useCallback(async () => {
    if (!enabled || !queuedSceneRef.current) return;

    const nextScene = queuedSceneRef.current;
    queuedSceneRef.current = null;

    try {
      if (socketRef.current?.connected) {
        socketRef.current.emit("whiteboard:scene:update", {
          scene: nextScene,
        });
      } else {
        await updateWhiteboardState(
          meetingId,
          nextScene as Record<string, unknown>
        );
      }
      latestAppliedTimestampRef.current = nextScene.updatedAt;
      if (!isMountedRef.current) return;
      setLastSyncedAt(nextScene.updatedAt);
      setSyncError(null);
    } catch (error) {
      console.error("Failed to persist whiteboard scene:", error);
      if (!isMountedRef.current) return;
      setSyncError("Whiteboard changes could not be saved. Retrying on next edit.");
    }
  }, [enabled, meetingId]);

  const queueScenePublish = useCallback(
    (
      elements: WhiteboardElements,
      appState: Pick<AppState, "viewBackgroundColor">
    ) => {
      if (!enabled) return;

      const nextScene: WhiteboardScene = {
        elements,
        appState: {
          viewBackgroundColor: appState.viewBackgroundColor,
        },
        updatedAt: Date.now(),
      };

      const serializedScene = JSON.stringify(nextScene);
      if (serializedScene === lastSerializedSceneRef.current) return;

      lastSerializedSceneRef.current = serializedScene;
      queuedSceneRef.current = nextScene;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        void flushScene();
      }, EMIT_DEBOUNCE_MS);
    },
    [enabled, flushScene]
  );

  useEffect(() => {
    if (!enabled) return;

    const loadInitialScene = async () => {
      try {
        const whiteboard = await getWhiteboardState(meetingId);
        if (!isMountedRef.current || !isWhiteboardScene(whiteboard.scene)) return;

        latestAppliedTimestampRef.current = whiteboard.scene.updatedAt;
        lastSerializedSceneRef.current = JSON.stringify(whiteboard.scene);
        setRemoteScene(whiteboard.scene);
        setLastSyncedAt(whiteboard.scene.updatedAt);
      } catch (error) {
        console.error("Failed to load whiteboard scene:", error);
        if (!isMountedRef.current) return;
        setSyncError("Whiteboard could not be loaded for this class.");
      }
    };

    void loadInitialScene();
  }, [enabled, meetingId]);

  useEffect(() => {
    if (!enabled) return;

    const connectSocket = async () => {
      try {
        const { token } = await getWhiteboardSocketToken(meetingId);
        if (!isMountedRef.current || !socketBaseUrl) return;

        const socket = io(`${socketBaseUrl}/whiteboard`, {
          transports: ["websocket"],
          withCredentials: true,
          auth: { token },
        });

        socket.on("connect_error", (error) => {
          console.error("Whiteboard socket connection failed:", error);
          if (!isMountedRef.current) return;
          setSyncError(
            "Live whiteboard connection failed. Changes will fall back to direct saves."
          );
        });

        socket.on("whiteboard:scene:sync", (payload: { scene?: unknown }) => {
          if (!isWhiteboardScene(payload.scene)) return;
          if (payload.scene.updatedAt <= latestAppliedTimestampRef.current)
            return;

          latestAppliedTimestampRef.current = payload.scene.updatedAt;
          lastSerializedSceneRef.current = JSON.stringify(payload.scene);
          setRemoteScene(payload.scene);
          setLastSyncedAt(payload.scene.updatedAt);
          setSyncError(null);
        });

        socketRef.current = socket;
      } catch (error) {
        console.error("Failed to initialize whiteboard socket:", error);
        if (!isMountedRef.current) return;
        setSyncError(
          "Live whiteboard connection is unavailable. Changes will save through the API."
        );
      }
    };

    void connectSocket();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [enabled, meetingId, socketBaseUrl]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      isMountedRef.current = false;
    };
  }, []);

  return {
    remoteScene,
    queueScenePublish,
    lastSyncedAt,
    syncError,
  };
};
