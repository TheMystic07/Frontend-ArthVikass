"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";

export function PayButton({ catagory, amount }) {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [error, setError] = useState(null);

  const handlePayNow = async () => {
    if (!session) {
      setError("You must be logged in to make a payment.");
      return;
    }

    setShowModal(true);
    setTimeout(async () => {
      try {
        const response = await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            amount,
            catagory,
          }),
        });

        if (!response.ok) {
          throw new Error("Payment failed");
        }

        const data = await response.json();
        console.log("Payment successful:", data);
        setPaymentSuccessful(true);
        setError(null);
      } catch (error) {
        console.error("Payment failed:", error);
        setError("Payment failed. Please try again.");
        setPaymentSuccessful(false);
      }
    }, 5000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPaymentSuccessful(false);
    setError(null);
  };

  return (
    <div className="">
      <Button
        className="bg-primary text-primary-foreground px-8 py-3 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={handlePayNow}
      >
        Pay Now
      </Button>
      {showModal && (
        <Dialog open={showModal} onOpenChange={handleCloseModal}>
          <DialogContent className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
            {!paymentSuccessful ? (
              <div className="flex flex-col items-center gap-4">
                <div className="bg-muted p-8 rounded-full">
                  <QrCodeIcon className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium">
                  Scan the QR code to complete your payment
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <CircleCheckIcon className="h-16 w-16 text-green-500" />
                <p className="text-lg font-medium text-green-500">
                  Payment Successful!
                </p>
              </div>
            )}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function QrCodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
