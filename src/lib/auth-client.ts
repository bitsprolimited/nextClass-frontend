import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export type BetterAuthSession = typeof authClient.$Infer.Session;

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          defaultValue: "parent",
        },
        status: {
          type: "string",
          defaultValue: "active",
        },
        phoneNumber: {
          type: "string",
          required: false,
        },
        timezone: {
          type: "string",
          defaultValue: "UTC",
        },
        rating: {
          type: "number",
          defaultValue: 0,
        },
        ratingCount: {
          type: "number",
          defaultValue: 0,
        },
        isProfileComplete: {
          type: "boolean",
          defaultValue: false,
        },
      },
    }),
  ],
});
