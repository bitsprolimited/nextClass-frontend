const PRIVATE_UPLOAD_PREFIXES = [
  "certificates/",
  "identity-documents/",
  "introduction-videos/",
  "profile-photos/",
];

const toPrivateFileRoute = (key: string) =>
  `/api/v1/upload/file?key=${encodeURIComponent(key)}`;

const extractPrivateUploadKey = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) return trimmed;

  if (trimmed.startsWith("/api/v1/upload/file")) {
    return trimmed;
  }

  const directPrefix = PRIVATE_UPLOAD_PREFIXES.find((prefix) =>
    trimmed.startsWith(prefix)
  );
  if (directPrefix) {
    return toPrivateFileRoute(trimmed);
  }

  try {
    const url = new URL(trimmed);
    const pathname = decodeURIComponent(url.pathname.replace(/^\/+/, ""));
    const prefixIndex = PRIVATE_UPLOAD_PREFIXES
      .map((prefix) => pathname.indexOf(prefix))
      .filter((index) => index >= 0)
      .sort((a, b) => a - b)[0];

    if (prefixIndex !== undefined) {
      return toPrivateFileRoute(pathname.slice(prefixIndex));
    }
  } catch {
    return trimmed;
  }

  return trimmed;
};

export const resolvePrivateFileUrl = (value?: string | null) =>
  value ? extractPrivateUploadKey(value) : "";
