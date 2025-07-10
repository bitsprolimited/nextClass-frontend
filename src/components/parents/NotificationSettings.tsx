"use client";

import { Switch } from "../ui/switch";

// import { Switch } from "../ui/Switch";

export default function NotificationSettings() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-[32px] font-semibold text-[#2c241b]">
          Notification Settings
        </h2>
        <p className="text-sm text-muted-foreground">
          Personalize your notifications
        </p>
      </div>

      {/* List */}
      <div className="space-y-6 divide-y divide-[#ddd]">
        {/* Notification Item */}
        <div className="flex flex-col sm:flex-row justify-between pt-2">
          <div>
            <h3 className="text-sm font-semibold text-[#2c241b]">
              Tutor Response Notifications
            </h3>
            <p className="text-sm text-muted-foreground">
              Stay informed with tutor responses regarding your paid class.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#2c241b]">On App</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#2c241b]">Email</span>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Repeat for each notification type */}

        <div className="flex flex-col sm:flex-row justify-between pt-6">
          <div>
            <h3 className="text-sm font-semibold text-[#2c241b]">
              Schedule and Call Reminders
            </h3>
            <p className="text-sm text-muted-foreground">
              Get reminders before class starts or any other tutoring schedule.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#2c241b]">On App</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#2c241b]">Email</span>
              <Switch />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between pt-6">
          <div>
            <h3 className="text-sm font-semibold text-[#2c241b]">
              Marketing & Promotional Notifications
            </h3>
            <p className="text-sm text-muted-foreground">
              Receive updates on discounts, promotional updates, and tutor
              selection news.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#2c241b]">On App</span>
              <Switch />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#2c241b]">Email</span>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between pt-6">
          <div>
            <h3 className="text-sm font-semibold text-[#2c241b]">
              Transactional Notifications
            </h3>
            <p className="text-sm text-muted-foreground">
              Be notified when payments are made, class has been cancelled, or a
              refund has been issued.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#2c241b]">On App</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#2c241b]">Email</span>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
