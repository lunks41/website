"use client";

import { useState } from "react";
import { ContactFormWidget } from "@/components/ContactFormWidget";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";

export function FloatingDock() {
  const [panel, setPanel] = useState<"none" | "wa" | "contact">("none");

  return (
    <div className="float-dock">
      <WhatsAppWidget
        open={panel === "wa"}
        onOpenChange={(open) => setPanel(open ? "wa" : "none")}
      />
      <ContactFormWidget
        open={panel === "contact"}
        onOpenChange={(open) => setPanel(open ? "contact" : "none")}
      />
    </div>
  );
}
