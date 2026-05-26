import {
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  LOGO_URL,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/seo/site";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: "HBM and Company",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: LOGO_URL,
          width: 512,
          height: 512,
        },
        description: DEFAULT_DESCRIPTION,
        foundingDate: "2024",
        foundingLocation: {
          "@type": "Place",
          name: "Wyoming, United States",
        },
        areaServed: "Worldwide",
        knowsAbout: [
          "Finance News",
          "Cryptocurrency",
          "Blockchain Infrastructure",
          "DeFi Analysis",
          "Digital Asset Reporting",
          "Texas Business",
          "On-Chain Intelligence",
          "Market Analysis",
          "Investigative Journalism",
        ],
        sameAs: [...SOCIAL_PROFILES],
        contactPoint: {
          "@type": "ContactPoint",
          email: CONTACT_EMAIL,
          contactType: "Customer Service",
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: DEFAULT_TITLE,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#organization`,
        },
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en-US",
      },
      {
        "@type": "NewsMediaOrganization",
        "@id": `${SITE_URL}/#newsmedia`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: LOGO_URL,
        description: DEFAULT_DESCRIPTION,
        parentOrganization: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
