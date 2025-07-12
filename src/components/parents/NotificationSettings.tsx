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
  parentsResponse: { inApp: true, email: false },
  scheduleReminders: { inApp: true, email: false },
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
    title: "Parents Response Notifications",
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
    title: "Marketing & Promotional Notifications",
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

    // Future: Send API request here
    // await updateNotificationSettingAPI(type, channel, value);
  };

  return (
    <section className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-[32px] font-bold text-[#2C241B]">
          Notification Settings
        </h2>
        <p className="text-[#7D7D7D] text-sm">Personalise your notifications</p>
      </div>

      <div className="w-full divide-y divide-[#E5E5E5]">
        {/* Loop through notifications */}
        {settingsMeta.map(({ key, title, description }) => (
          <div
            key={key}
            className="flex flex-col md:flex-row justify-between py-6 gap-4"
          >
            {/* Title + Description */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-[#2C241B]">
                {title}
              </h3>
              <p className="text-sm text-[#7D7D7D] mt-1">{description}</p>
            </div>

            {/* Toggle Switches */}
            <div className="flex gap-6 min-w-[180px] items-center justify-between md:justify-end">
              {(["inApp", "email"] as Channel[]).map((channel) => (
                <div key={channel} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#2C241B] capitalize">
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
