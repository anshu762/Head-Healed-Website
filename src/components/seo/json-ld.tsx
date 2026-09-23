import React from "react";

interface OrganizationJsonLdProps {
  url?: string;
  name?: string;
  description?: string;
}

export function OrganizationJsonLd({
  url = "https://heard-healed.vercel.app",
  name = "Heard & Healed",
  description = "A youth-focused emotional wellbeing and mental health education platform.",
}: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: `${url}/Image/emotion-icon-set.png`,
    description,
    sameAs: [
      "https://github.com/anshu762/Head-Healed-Website",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FaqItemSchema {
  question: string;
  answer: string;
}

export function FaqPageJsonLd({ faqs }: { faqs: FaqItemSchema[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  authorName: string;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  datePublished,
  authorName,
}: ArticleJsonLdProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://heard-healed.vercel.app";

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${baseUrl}/stories/${slug}`,
    datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Heard & Healed",
      url: baseUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
