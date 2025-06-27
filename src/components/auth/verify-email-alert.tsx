import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

function VerifyEmailAlert({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-14 max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl text-center">
            Kindly Verify your <span className="text-secondary">Email</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            You have successfully created your account and a verification link
            has been sent to your registered mail. Kindly follow the link to
            verify your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <Image
            src="/images/mail-box.png"
            alt="Decorative"
            width={500}
            height={500}
          />
        </div>
        <AlertDialogFooter className="flex sm:justify-center mt-10">
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
          <AlertDialogAction
            onClick={() => router.push("/login")}
            className="bg-secondary hover:bg-primary px-10 h-auto py-3 w-full max-w-md rounded-full text-base"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default VerifyEmailAlert;
