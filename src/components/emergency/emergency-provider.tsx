"use client";

import * as React from "react";
import { EmergencyModal } from "./emergency-modal";

export interface EmergencyContactItem {
  id?: string;
  name: string;
  phone: string;
  description: string;
  url?: string | null;
  availableHours?: string;
  region?: string;
}

interface EmergencyContextType {
  isOpen: boolean;
  openEmergency: () => void;
  closeEmergency: () => void;
}

const EmergencyContext = React.createContext<EmergencyContextType | undefined>(
  undefined
);

// Fallback emergency contacts ready immediately if DB query is pending
export const DEFAULT_EMERGENCY_CONTACTS: EmergencyContactItem[] = [
  {
    name: "Childline (National Helpline for Children & Youth)",
    phone: "1098",
    description: "24/7 free, confidential emergency phone service for children and adolescents in need of care and protection.",
    url: "https://childlineindia.org",
    availableHours: "24/7",
    region: "India",
  },
  {
    name: "Tele-MANAS Mental Health Helpline",
    phone: "14416 / 1800 891 4416",
    description: "National tele-mental health programme providing 24/7 free psychosocial support and psychiatric counselling.",
    url: "https://telemanas.mohfw.gov.in",
    availableHours: "24/7",
    region: "India",
  },
  {
    name: "NIMHANS Psychological Support",
    phone: "080-46110007",
    description: "24/7 mental health and psychological support helpline provided by the National Institute of Mental Health and Neurosciences.",
    url: "https://nimhans.ac.in",
    availableHours: "24/7",
    region: "India",
  },
  {
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    description: "24/7 free, confidential support for people in suicidal crisis or emotional distress.",
    url: "https://988lifeline.org",
    availableHours: "24/7",
    region: "USA / Canada",
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free, 24/7 crisis support via text message connecting with trained crisis counselors.",
    url: "https://www.crisistextline.org",
    availableHours: "24/7",
    region: "International",
  },
  {
    name: "The Trevor Project",
    phone: "1-866-488-7386",
    description: "24/7 suicide prevention and crisis intervention for LGBTQ+ young people.",
    url: "https://www.thetrevorproject.org",
    availableHours: "24/7",
    region: "International",
  },
];

interface EmergencyProviderProps {
  children: React.ReactNode;
  initialContacts?: EmergencyContactItem[];
}

export function EmergencyProvider({
  children,
  initialContacts,
}: EmergencyProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const openEmergency = React.useCallback(() => setIsOpen(true), []);
  const closeEmergency = React.useCallback(() => setIsOpen(false), []);

  const contacts = initialContacts && initialContacts.length > 0
    ? initialContacts
    : DEFAULT_EMERGENCY_CONTACTS;

  return (
    <EmergencyContext.Provider value={{ isOpen, openEmergency, closeEmergency }}>
      {children}
      <EmergencyModal
        isOpen={isOpen}
        onClose={closeEmergency}
        contacts={contacts}
      />
    </EmergencyContext.Provider>
  );
}

export function useEmergency() {
  const context = React.useContext(EmergencyContext);
  if (!context) {
    throw new Error("useEmergency must be used within an EmergencyProvider");
  }
  return context;
}
