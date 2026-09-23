import type { Metadata } from "next";
import { Quicksand, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EmergencyFab } from "@/components/emergency/emergency-fab";
import { EmergencyProvider } from "@/components/emergency/emergency-provider";
import "@/app/globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Heard & Healed | Youth Emotional Wellbeing & Mental Health Education",
  description:
    "A gentle, youth-focused safe space to explore emotions, understand mental health, reflect with Echo AI, and discover supportive real-world resources.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://heard-healed.vercel.app"),
  openGraph: {
    title: "Heard & Healed | Youth Emotional Wellbeing",
    description:
      "A gentle, safe space to explore emotions, understand mental health, reflect with Echo AI, and discover supportive resources.",
    type: "website",
    locale: "en_US",
    siteName: "Heard & Healed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heard & Healed | Youth Emotional Wellbeing",
    description:
      "A gentle, safe space to explore emotions, understand mental health, and reflect.",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#3B3B3B] antialiased selection:bg-hh-yellow/60 selection:text-hh-ink">
        {/* Skip to main content link for WCAG AA compliance */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-hh-blue-deep focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        <EmergencyProvider>
          <Navbar />
          <main id="main" className="flex-1 pt-20">
            {children}
          </main>
          {modal}
          <Footer />
          <EmergencyFab />
          <Toaster position="top-right" richColors />
        </EmergencyProvider>
      </body>
    </html>
  );
}
