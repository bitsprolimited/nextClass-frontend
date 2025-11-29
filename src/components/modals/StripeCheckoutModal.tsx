import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientSecret: string | null;
  onComplete: () => void;
}

export function StripeCheckoutModal({
  isOpen,
  onClose,
  clientSecret,
  // onComplete,
}: StripeCheckoutModalProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientSecret) {
      setError("Failed to initialize payment. Please try again.");
    }
  }, [clientSecret]);

  if (!clientSecret) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Error</DialogTitle>
          </DialogHeader>
          <Alert variant="destructive">
            <AlertDescription>
              {error || "Failed to initialize payment. Please try again."}
            </AlertDescription>
          </Alert>
          <Button onClick={onClose}>Close</Button>
        </DialogContent>
      </Dialog>
    );
  }

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Booking Payment</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
