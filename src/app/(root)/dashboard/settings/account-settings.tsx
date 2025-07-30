import Account2fa from "@/components/parents/account2fa";
import NotificationSettings from "@/components/parents/NotificationSettings";
import PasswordSettings from "@/components/parents/passwordSettings";

export default function AccountSettingsPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-10 px-4">
      <PasswordSettings />
      <NotificationSettings />
      <Account2fa />
    </div>
  );
}
