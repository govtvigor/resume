"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

type PilotLoginGateProps = {
  callbackUrl: string;
  message: string;
  accentClass?: string;
};

export function PilotLoginGate({
  callbackUrl,
  message,
  accentClass = "border-amber-400/30 bg-amber-500/5",
}: PilotLoginGateProps) {
  return (
    <div className={`rounded-xl border p-6 text-center ${accentClass}`}>
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button className="mt-4" onClick={() => signIn("google", { callbackUrl })}>
        Pilot login
      </Button>
    </div>
  );
}
