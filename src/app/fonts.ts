import localFont from "next/font/local";

export const AeroTrial = localFont({
  variable: "--font-aero-trial",
  src: [
    {
      path: "./fonts/aero-trial-bold/AeroTrial-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-ExtraLightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-BookItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/aero-trial-bold/AeroTrial-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
});

export const StudioSans = localFont({
  variable: "--font-studio-sans",
  src: "./fonts/studio-sans/StudioSansDEMO.otf",
});
