"use client";

import "@excalidraw/excalidraw/index.css";
import type {
  AppState,
  ExcalidrawImperativeAPI,
  ExcalidrawProps,
} from "@excalidraw/excalidraw/types";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { useWhiteboardSync } from "@/hooks/useWhiteboardSync";

const Excalidraw = dynamic(
  async () => {
    const excalidrawModule = await import("@excalidraw/excalidraw");
    return excalidrawModule.Excalidraw;
  },
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center bg-white text-slate-600">
        <Loader2 className="size-5 animate-spin" />
      </div>
    ),
  }
);

const DEFAULT_BACKGROUND = "#ffffff";
type WhiteboardElements = Parameters<NonNullable<ExcalidrawProps["onChange"]>>[0];

const ClassWhiteboard = ({
  meetingId,
  isOpen,
}: {
  meetingId: string;
  isOpen: boolean;
}) => {
  const excalidrawApiRef = useRef<ExcalidrawImperativeAPI | null>(null);
  const isApplyingRemoteSceneRef = useRef(false);
  const hasAppliedRemoteSceneRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const { remoteScene, queueScenePublish, lastSyncedAt, syncError } =
    useWhiteboardSync(meetingId, true);

  useEffect(() => {
    if (!remoteScene || !excalidrawApiRef.current) return;

    isApplyingRemoteSceneRef.current = true;
    hasAppliedRemoteSceneRef.current = true;

    excalidrawApiRef.current.updateScene({
      elements: remoteScene.elements,
      appState: {
        viewBackgroundColor:
          remoteScene.appState.viewBackgroundColor ?? DEFAULT_BACKGROUND,
      },
      captureUpdate: "NEVER",
    });

    requestAnimationFrame(() => {
      isApplyingRemoteSceneRef.current = false;
    });
  }, [remoteScene]);

  // useEffect(() => {
  //   if (!isOpen || !isReady || !excalidrawApiRef.current) return;

  //   const refreshTimer = window.setTimeout(() => {
  //     excalidrawApiRef.current?.refresh();
  //   }, 100);

  //   return () => {
  //     window.clearTimeout(refreshTimer);
  //   };
  // }, [isOpen, isReady]);

  const handleSceneChange = (
    elements: WhiteboardElements,
    appState: AppState
  ) => {
    if (isApplyingRemoteSceneRef.current) return;
    if (!hasAppliedRemoteSceneRef.current && elements.length === 0) return;

    queueScenePublish(elements, {
      viewBackgroundColor: appState.viewBackgroundColor ?? DEFAULT_BACKGROUND,
    });
  };

  // const handleClearBoard = () => {
  //   excalidrawApiRef.current?.resetScene();
  // };

  return (
    <div className="flex h-full min-h-0 flex-col rounded-2xl border border-slate-200 bg-slate-50">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">Class whiteboard</p>
          <p className="text-xs text-slate-500">
            Shared live with everyone in the call
            {lastSyncedAt
              ? ` • synced ${new Date(lastSyncedAt).toLocaleTimeString()}`
              : ""}
          </p>
        </div>
        {/* <Button
          type="button"
          variant="outline"
          className="border-slate-300 bg-white text-slate-700"
          onClick={handleClearBoard}
        >
          <RefreshCw />
          Clear board
        </Button> */}
      </div>

      {syncError && (
        <div className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-900">
          {syncError}
        </div>
      )}

      <div className="relative min-h-0 flex-1">
        {!isReady && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
            <Loader2 className="size-5 animate-spin text-slate-600" />
          </div>
        )}
        <Excalidraw
          initialData={{
            appState: {
              viewBackgroundColor: DEFAULT_BACKGROUND,
            },
          }}
          excalidrawAPI={(api) => {
            excalidrawApiRef.current = api;
            setIsReady(true);
          }}
          onChange={handleSceneChange}
        />
      </div>
    </div>
  );
};

export default ClassWhiteboard;
