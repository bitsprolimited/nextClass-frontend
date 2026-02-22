// src/components/admin/TutorVerificationModal.tsx
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Loader2, X } from "lucide-react";

/** ---------- Types (unchanged) ---------- */
type TutorQualification = {
  id: string | number;
  courseName: string;
  issuingInstitution: string;
  certificateUrl?: string;
  expiryDate?: string;
};

type TutorIdentityDoc = {
  idType: string;
  documentUrl?: string;
  issuingAuthority?: string;
  issueDate?: string;
  expiryDate?: string;
  isVerified?: boolean;
};

export interface TutorVerificationViewModel {
  id: string | number;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  profilePicture?: string;
  gender?: string;
  address?: string;
  state?: string;
  country?: string;
  countryFlagUrl?: string;
  grade?: string;
  subjects?: string;
  experience?: string;
  bio?: string;
  identityDocument?: TutorIdentityDoc;
  qualifications?: TutorQualification[];
  introductionVideoUrl?: string;
  timezone?: string;
  createdAt?: string;
}

export interface TutorVerificationModalProps {
  open: boolean;
  onClose: () => void;
  tutor: TutorVerificationViewModel | null;
}

/** ---------- Small UI helpers ---------- */
const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-xs text-gray-400">{children}</div>
);

const Value: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="font-semibold text-[15px] leading-snug wrap-break-word">
    {children ?? "—"}
  </div>
);

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  const s = status?.toLowerCase() ?? "pending";
  const tone =
    s === "accepted" || s === "verified"
      ? "bg-green-100 text-green-700"
      : s === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tone}`}>
      {status}
    </span>
  );
};

/** ---------- Reusable atoms for the card look ---------- */
const ViewPill: React.FC<{ href?: string }> = ({ href }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-[11px] px-3 py-1 rounded-full border border-secondary text-secondary hover:bg-[#FFF3D6] inline-flex items-center"
    >
      View
    </a>
  ) : (
    <button
      className="text-[11px] px-3 py-1 rounded-full border border-[#FFA300] text-[#FFA300] opacity-40 cursor-not-allowed"
      disabled
    >
      View
    </button>
  );

const FileTile: React.FC<{
  ext?: string;
  name?: string;
  sizeLabel?: string;
  formatLabel?: string;
}> = ({ ext = "PNG", name = "—", sizeLabel = "—", formatLabel = "—" }) => (
  <div className="mt-3 w-full rounded-md  bg-gray-200">
    <div className="flex items-center gap-3 p-3">
      <div className="w-10 h-12 rounded-md bg-[#3C5BFF] text-white flex items-center justify-center text-[10px] font-semibold">
        {ext}
      </div>
      <div className="min-w-0">
        <div className="text-[13px] font-semibold truncate">{name}</div>
        <div className="text-xs text-gray-500">
          {sizeLabel} <span className="mx-1">•</span> {formatLabel}
        </div>
      </div>
      <button
        type="button"
        className="ml-auto text-[11px] text-red-500 hover:underline"
        aria-label="Remove file"
      >
        Remove
      </button>
    </div>
  </div>
);

/** ---------- Styled to match screenshot ---------- */
const IDCard: React.FC<{ doc?: TutorIdentityDoc }> = ({ doc }) => {
  if (!doc) {
    return (
      <div className="border rounded-xl p-4 text-sm text-gray-600">
        No ID uploaded.
      </div>
    );
  }

  const filename = doc.documentUrl
    ? decodeURIComponent(doc.documentUrl.split("/").pop() ?? "")
    : "Document";
  // simple size/format placeholders; replace with real metadata if you have it
  const sizeLabel = "8mb";
  const formatLabel = "PNG";

  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <p className="italic text-sm text-[#A87C00]">Drivers License</p>
        <ViewPill href={doc.documentUrl} />
      </div>

      <FileTile
        ext="PNG"
        name={filename}
        sizeLabel={sizeLabel}
        formatLabel={formatLabel}
      />

      <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
        <div>
          Issuance Date:{" "}
          {doc.issueDate ? new Date(doc.issueDate).toLocaleDateString() : "—"}
        </div>
        <div>
          exp.{" "}
          {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : "—"}
        </div>
      </div>
    </div>
  );
};

const QualificationCard: React.FC<{ q: TutorQualification }> = ({ q }) => {
  const filename = q.certificateUrl
    ? decodeURIComponent(q.certificateUrl.split("/").pop() ?? "")
    : "IMGVV001";
  const sizeLabel = "8mb";
  const formatLabel = "PNG";

  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <p className="italic text-sm text-secondary">Diploma in</p>
        <ViewPill href={q.certificateUrl} />
      </div>

      <p className="mt-2 text-[18px] font-semibold text-[#031D95]">
        {q.courseName || "—"}
      </p>

      <FileTile
        ext="PNG"
        name={filename}
        sizeLabel={sizeLabel}
        formatLabel={formatLabel}
      />

      <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
        <div>{q.issuingInstitution || "—"}</div>
        <div>
          exp.{" "}
          {q.expiryDate ? new Date(q.expiryDate).toLocaleDateString() : "—"}
        </div>
      </div>
    </div>
  );
};

/** ---------- Main ---------- */
export const TutorVerificationModal: React.FC<TutorVerificationModalProps> = ({
  open,
  onClose,
  tutor,
}) => {
  const [isPlaying, setPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    setExpanded(false);
  }, [tutor?.id]);

  if (!tutor) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-[420px] w-[420px] h-[220px] flex flex-col items-center justify-center text-center">
          <Loader2 className="w-6 h-6 mb-3 animate-spin text-gray-500" />
          <p className="text-gray-600 text-sm">Loading tutor details…</p>
        </DialogContent>
      </Dialog>
    );
  }

  const description = tutor.bio ?? "";
  const clamp = description.length > 320;
  const text =
    expanded || !clamp ? description : description.slice(0, 320) + "…";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[975px] w-[975px] h-[900px] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-5 pb-3 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-[22px] font-semibold">
              Verification Approval
            </DialogTitle>
            <DialogClose asChild>
              <button aria-label="Close" className="p-1">
                <X className="h-6 w-6" />
              </button>
            </DialogClose>
          </div>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="h-[calc(900px-64px)]">
            <ScrollArea className="h-full">
              <div className="px-6 py-6 space-y-8">
                {/* Section 1: profile + grid */}
                <section className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={tutor.profilePicture ?? "/images/tutor-3.png"}
                      alt={tutor.name}
                      width={72}
                      height={72}
                      className="rounded-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
                    <div>
                      <Label>Name</Label>
                      <Value>{tutor.name}</Value>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Value>{tutor.email}</Value>
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Value>{tutor.phoneNumber}</Value>
                    </div>
                    <div>
                      <Label>Gender</Label>
                      <Value>{tutor.gender ?? "—"}</Value>
                    </div>
                    <div>
                      <Label>Address</Label>
                      <Value>{tutor.address ?? "—"}</Value>
                    </div>
                    <div>
                      <Label>City/State</Label>
                      <Value>{tutor.state ?? "—"}</Value>
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Value>
                        <span className="inline-flex items-center gap-2">
                          {tutor.countryFlagUrl ? (
                            <Image
                              src={tutor.countryFlagUrl}
                              alt={tutor.country ?? "flag"}
                              width={20}
                              height={14}
                              className="rounded-sm"
                            />
                          ) : null}
                          {tutor.country ?? "—"}
                        </span>
                      </Value>
                    </div>
                    <div>
                      <Label>Status</Label>
                      <div className="mt-0.5">
                        <StatusPill status={tutor.status} />
                      </div>
                    </div>
                    <div>
                      <Label>Subjects</Label>
                      <Value>
                        <span className="whitespace-pre-line">
                          {tutor.subjects ?? "—"}
                        </span>
                      </Value>
                    </div>
                    <div>
                      <Label>Grades</Label>
                      <Value>{tutor.grade ?? "—"}</Value>
                    </div>
                    <div>
                      <Label>Experience</Label>
                      <Value>{tutor.experience ?? "—"}</Value>
                    </div>
                  </div>
                </section>

                {/* Section 2: description */}
                <section className="space-y-2">
                  <Label>Description</Label>
                  <div className="bg-[#F5F4F8] rounded-lg p-4 text-sm">
                    {text || "—"}
                  </div>
                  {clamp && (
                    <button
                      type="button"
                      className="text-[#FFA300] text-sm font-medium"
                      onClick={() => setExpanded((v) => !v)}
                    >
                      {expanded ? "View less" : "View more"}
                    </button>
                  )}
                </section>

                {/* Section 3: ID verification (styled) */}
                <section className="space-y-3">
                  <Label>ID Verification</Label>
                  <IDCard doc={tutor.identityDocument} />
                </section>

                {/* Section 4: qualifications (styled) */}
                <section className="space-y-3">
                  <Label>Qualifications</Label>
                  {tutor.qualifications && tutor.qualifications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {tutor.qualifications.map((q) => (
                        <QualificationCard key={q.id} q={q} />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border p-4 text-sm text-gray-600">
                      No qualifications uploaded.
                    </div>
                  )}
                </section>

                {/* Section 5: Introductory Video (styled) */}
                {tutor.introductionVideoUrl && (
                  <section className="space-y-2">
                    <Label>Introductory Video</Label>

                    {/* light grey card */}
                    <div className="bg-[#F5F4F8] rounded-xl px-3 sm:px-4 py-2">
                      {/* fixed 16:9 frame */}
                      <div className="relative aspect-video rounded-lg overflow-hidden mx-auto w-full max-w-[560px] md:max-w-[640px]">
                        {/* black video surface */}
                        <video
                          ref={videoRef}
                          src={tutor.introductionVideoUrl}
                          className="h-full w-full bg-black object-cover"
                          controls={isPlaying} // controls appear when playing
                          onEnded={() => setPlaying(false)}
                        />

                        {/* centered play icon overlay */}
                        {!isPlaying && (
                          <button
                            type="button"
                            className="absolute inset-0 grid place-items-center"
                            onClick={() => {
                              setPlaying(true);
                              videoRef.current?.play();
                            }}
                          >
                            <span className="grid place-items-center h-12 w-12 rounded-full ring-2 ring-white">
                              {/* minimal play glyph */}
                              <svg
                                viewBox="0 0 24 24"
                                className="h-5 w-5 fill-white"
                                aria-hidden="true"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                {/* Footer buttons (passive for now) */}
                <section className="flex justify-end gap-4 pt-2">
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50"
                    disabled
                    title="Endpoint not ready"
                  >
                    Decline Tutor
                  </Button>
                  <Button
                    className="bg-primary text-white hover:bg-primary/90"
                    disabled
                    title="Endpoint not ready"
                  >
                    Approve Tutor
                  </Button>
                </section>
              </div>
            </ScrollArea>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
