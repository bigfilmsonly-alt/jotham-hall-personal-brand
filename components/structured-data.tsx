export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://jothamhall.com/#person",
        "name": "Jotham Hall",
        "givenName": "Jotham",
        "familyName": "Hall",
        "url": "https://jothamhall.com",
        "image": "https://jothamhall.com/images/jotham-hall-headshot.jpg",
        "description": "Television producer and AI systems architect. Talent Producer on 50+ reality TV shows including Finding Mr. Christmas, Ciao House, Temptation Island, and Flavor of Love. Founder of SuccessUpgrade.ai and Big Films Only. Based in Miami.",
        "jobTitle": ["Television Producer", "AI Systems Architect", "Entrepreneur"],
        "birthDate": "1984-09-13",
        "birthPlace": {
          "@type": "Place",
          "name": "Oakland, California",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Oakland",
            "addressRegion": "CA",
            "addressCountry": "US"
          }
        },
        "homeLocation": {
          "@type": "Place",
          "name": "Miami, Florida",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Miami",
            "addressRegion": "FL",
            "addressCountry": "US"
          }
        },
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "Santa Barbara City College",
          "url": "https://www.sbcc.edu"
        },
        "worksFor": [
          {
            "@type": "Organization",
            "name": "SuccessUpgrade.ai",
            "url": "https://successupgrade.ai",
            "description": "AI-powered business automation and systems architecture"
          },
          {
            "@type": "Organization",
            "name": "Big Films Only",
            "url": "https://bigfilmsonly.com",
            "description": "Independent film and television production company",
            "foundingDate": "2015"
          }
        ],
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "Television Producer",
            "description": "Talent Producer specializing in reality television"
          },
          {
            "@type": "Occupation",
            "name": "AI Systems Architect",
            "description": "Designing AI-powered automation systems for businesses"
          }
        ],
        "knowsAbout": ["Reality Television Production", "Talent Producing", "AI Automation", "Business Systems Architecture", "Revenue Engineering", "No-Code Development", "Vibe Coding"],
        "sameAs": [
          "https://www.linkedin.com/in/jotham-hall-b6b9491b2",
          "https://www.instagram.com/successupgrade_",
          "https://www.youtube.com/@jothamhall",
          "https://www.tiktok.com/@successupgrade_",
          "https://successupgrade.ai"
        ],
        "memberOf": {
          "@type": "Organization",
          "name": "51 Minds Entertainment",
          "url": "https://www.51minds.com",
          "description": "Reality television production company"
        }
      },
      {
        "@type": "TVSeries",
        "name": "Finding Mr. Christmas",
        "productionCompany": {"@type": "Organization", "name": "Hallmark Channel"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "TVSeries",
        "name": "Ciao House",
        "productionCompany": {"@type": "Organization", "name": "Food Network"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "TVSeries",
        "name": "Temptation Island",
        "productionCompany": {"@type": "Organization", "name": "USA Network"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "TVSeries",
        "name": "Snake in the Grass",
        "productionCompany": {"@type": "Organization", "name": "NBC"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "TVSeries",
        "name": "Flavor of Love",
        "productionCompany": {"@type": "Organization", "name": "VH1"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "TVSeries",
        "name": "Rock of Love",
        "productionCompany": {"@type": "Organization", "name": "VH1"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "TVSeries",
        "name": "I Love Money",
        "productionCompany": {"@type": "Organization", "name": "VH1"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "TVSeries",
        "name": "For the Love of Ray J",
        "productionCompany": {"@type": "Organization", "name": "VH1"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "TVSeries",
        "name": "Real Chance of Love",
        "productionCompany": {"@type": "Organization", "name": "VH1"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "TVSeries",
        "name": "From G's to Gents",
        "productionCompany": {"@type": "Organization", "name": "MTV"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "TVSeries",
        "name": "After Happily Ever After",
        "productionCompany": {"@type": "Organization", "name": "BET"},
        "contributor": {"@id": "https://jothamhall.com/#person", "roleName": "Talent Producer"}
      },
      {
        "@type": "WebSite",
        "url": "https://jothamhall.com",
        "name": "Jotham Hall",
        "publisher": {"@id": "https://jothamhall.com/#person"}
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
