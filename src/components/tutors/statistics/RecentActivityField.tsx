"use client";

import { MoreVertical, ScrollText } from "lucide-react";

const activities = [
  {
    message: (
      <>
        Request <span className="text-blue-600 underline">#123456</span> has
        been successfully completed with <strong>Curtis J. Bajaj</strong>.
      </>
    ),
    time: "10:03am",
  },
  {
    message: (
      <>
        <strong>Bryan Taylor</strong> has scheduled a call for 3:19am.
      </>
    ),
    time: "10:03am",
  },
  {
    message: (
      <>
        Bryan Taylor just made payments for class request{" "}
        <span className="text-blue-600 underline">#123456</span>.
      </>
    ),
    time: "10:03am",
  },
  {
    message: (
      <>
        Introductory Call with <strong>Curtis J. Bajaj</strong> has been
        successfully completed.
      </>
    ),
    time: "10:03am",
  },
];

export default function RecentActivityFeed() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-md w-full h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-800">
          Recent Activities
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-700">
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      <hr className="border-t border-gray-200 mb-4 w-full" />
      <ul className="space-y-4">
        {activities.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-[8px]">
            <ScrollText className="text-orange-500 w-5 h-5 mt-1" />
            <div className="flex justify-between">
              <p className="text-gray-800">{item.message}</p>
              <p className="text-[8px] text-gray-500 mt-3 flex items-end">
                {item.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
