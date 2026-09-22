import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ResourceBrowser } from "@/components/resources/resource-browser";
import {
  CANONICAL_DOWNLOADS,
  getAllResources,
  getEmergencyHelplines,
} from "@/lib/data/resources-data";

export const metadata: Metadata = {
  title: "Support Resources & Downloads | Heard & Healed",
  description:
    "Evidence-based mental health articles, free grounding worksheets, helplines, and reputable youth support services.",
  openGraph: {
    title: "Support Resources & Downloads | Heard & Healed",
    description:
      "Evidence-based mental health articles, free grounding worksheets, helplines, and reputable youth support services.",
  },
};

function ResourceBrowserFallback() {
  return (
    <div className="space-y-16 animate-pulse">
      <div className="h-40 bg-white/60 rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-48 bg-white/60 rounded-3xl" />
        <div className="h-48 bg-white/60 rounded-3xl" />
        <div className="h-48 bg-white/60 rounded-3xl" />
      </div>
    </div>
  );
}

export default async function ResourcesPage() {
  const [resources, emergencyContacts] = await Promise.all([
    getAllResources(),
    getEmergencyHelplines(),
  ]);

  return (
    <div className="py-12 sm:py-20">
      <Container>
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionHeading
            badge="Support & Resources"
            title="Explore Guidance, Worksheets & Support"
            description="Curated educational articles, practical printable grounding guides, and verified 24/7 youth mental health organisations to explore at your own pace."
            as="h1"
          />
        </div>

        <Suspense fallback={<ResourceBrowserFallback />}>
          <ResourceBrowser
            downloads={CANONICAL_DOWNLOADS}
            resources={resources}
            emergencyContacts={emergencyContacts}
          />
        </Suspense>
      </Container>
    </div>
  );
}
