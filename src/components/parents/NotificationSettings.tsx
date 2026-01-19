"use client";

import { useState } from "react";
import { Switch } from "../ui/switch";

type NotificationType =
  | "parentsResponse"
  | "scheduleReminders"
  | "marketingPromos"
  | "transactional";

type Channel = "inApp" | "email";

type NotificationSettingsState = {
  [key in NotificationType]: {
    inApp: boolean;
    email: boolean;
  };
};

const defaultSettings: NotificationSettingsState = {
  parentsResponse: { inApp: true, email: true },
  scheduleReminders: { inApp: true, email: true },
  marketingPromos: { inApp: true, email: false },
  transactional: { inApp: true, email: true },
};

const settingsMeta: {
  key: NotificationType;
  title: string;
  description: string;
}[] = [
  {
    key: "parentsResponse",
    title: "Tutor Response Notifications",
    description: "Stay informed with notifications regarding your paid cards.",
  },
  {
    key: "scheduleReminders",
    title: "Schedule and Call Reminders",
    description:
      "Get tailored email notifications for the cards you've started, including reminders to complete any pending cards.",
  },
  {
    key: "marketingPromos",
    title: "Our Products",
    description:
      "Occasionally receive emails about our product updates, relevant events and discounts.",
  },
  {
    key: "transactional",
    title: "Transactional Notifications",
    description:
      "Get transactional emails concerning your card purchases, such as receipts, notifications when your card is dispatched, and thank-you emails received from the recipient.",
  },
];

export default function NotificationSettings() {
  const [settings, setSettings] =
    useState<NotificationSettingsState>(defaultSettings);

  const handleToggle = (
    type: NotificationType,
    channel: Channel,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [channel]: value,
      },
    }));
  };

  return (
    <section className="space-y-6 max-w-4xl mx-auto px-4">
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[#2C241B]">
          Notification Settings
        </h2>
        <p className="text-xs md:text-sm text-[#7D7D7D] border-b border-[#ddd] pb-4">
          Personalise your notifications
        </p>
      </div>

      <div className="w-full divide-y divide-[#E5E5E5]">
        {settingsMeta.map(({ key, title, description }) => (
          <div
            key={key}
            className="flex flex-col md:flex-row justify-between py-6 gap-4"
          >
            {/* Title + Description */}
            <div className="flex-1">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-[#2C241B]">
                {title}
              </h3>
              <p className="text-xs md:text-sm text-[#7D7D7D] mt-1 w-[400px]">
                {description}
              </p>
            </div>

            {/* Toggle Switches */}
            <div className="flex items-center gap-6 ml-auto">
              {(["inApp", "email"] as Channel[]).map((channel) => (
                <div key={channel} className="flex items-center gap-2">
                  <span className="text-xs md:text-sm font-medium text-[#2C241B] capitalize">
                    {channel === "inApp" ? "In-App" : "Email"}
                  </span>
                  <Switch
                    checked={settings[key][channel]}
                    onCheckedChange={(val) => handleToggle(key, channel, val)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
