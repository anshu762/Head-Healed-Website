"use client";

import { Button } from "@/components/ui/button";
import { useEmergency } from "@/components/emergency/emergency-provider";
import { ShieldAlert } from "lucide-react";

export function DisclaimerEmergencyButton() {
  const { openEmergency } = useEmergency();

  return (
    <Button
      variant="emergency"
      size="default"
      onClick={openEmergency}
      className="shadow-sm"
    >
      <ShieldAlert className="h-4 w-4 mr-2" aria-hidden="true" />
      Open Emergency Support Resources
    </Button>
  );
}
