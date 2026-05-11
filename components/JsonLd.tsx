export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://hbmandcompany.com/#organization",
        name: "HBM & Company",
        alternateName: "HBM and Company",
        url: "https://hbmandcompany.com",
        logo: {
          "@type": "ImageObject",
          url: "https://hbmandcompany.com/logo.png",
          width: 400,
          height: 400,
        },
        description:
          "A private holding company operating at the intersection of decentralized finance, digital asset infrastructure, and alternative capital formation.",
        foundingDate: "2024",
        foundingLocation: {
          "@type": "Place",
          name: "Wyoming, United States",
        },
        areaServed: "Worldwide",
        knowsAbout: [
          "Decentralized Finance",
          "Digital Asset Infrastructure",
          "Blockchain Technology",
          "Web3 Venture Development",
          "On-Chain Capital Formation",
          "Tokenized Asset Systems",
          "DePIN Networks",
          "Smart Contract Platforms",
          "Layer-2 Protocol Engineering",
          "Institutional Crypto Custody",
          "DAO Governance Frameworks",
          "Cross-Chain Bridge Infrastructure",
          "Zero-Knowledge Proof Systems",
          "Validator Node Operations",
          "DeFi Treasury Management",
        ],
        sameAs: [
          "https://twitter.com/hbmandcompany",
          "https://t.me/hbmandcompany",
          "https://linkedin.com/company/hbmandcompany",
          "https://www.tiktok.com/@hbmandcompany",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          email: "hbmandcompany@gmail.com",
          contactType: "General Inquiries",
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://hbmandcompany.com/#website",
        url: "https://hbmandcompany.com",
        name: "HBM & Company",
        description:
          "Private holding company building decentralized finance infrastructure, digital asset platforms, and on-chain capital systems.",
        publisher: {
          "@id": "https://hbmandcompany.com/#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://hbmandcompany.com/#webpage",
        url: "https://hbmandcompany.com",
        name: "HBM & Company — Digital Asset Infrastructure & Private Holdings",
        isPartOf: {
          "@id": "https://hbmandcompany.com/#website",
        },
        about: {
          "@id": "https://hbmandcompany.com/#organization",
        },
        description:
          "A private holding company operating at the intersection of decentralized finance, digital asset infrastructure, and alternative capital formation.",
        inLanguage: "en-US",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://hbmandcompany.com",
            },
          ],
        },
      },
      {
        "@type": "FinancialService",
        "@id": "https://hbmandcompany.com/#service",
        name: "HBM & Company — Digital Asset Holdings",
        provider: {
          "@id": "https://hbmandcompany.com/#organization",
        },
        serviceType: [
          "Digital Asset Management",
          "Blockchain Protocol Development",
          "DeFi Infrastructure",
          "Institutional Crypto Custody",
          "On-Chain Governance",
          "Web3 Venture Operations",
        ],
        areaServed: "Worldwide",
        description:
          "Institutional-grade digital asset holdings, protocol infrastructure development, and on-chain capital formation services for sophisticated investors and protocols.",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
