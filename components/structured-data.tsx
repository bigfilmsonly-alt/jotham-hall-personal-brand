export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://jothamhall.com/#person",
    "name": "Jotham Hall",
    "givenName": "Jotham",
    "familyName": "Hall",
    "alternateName": ["Jotham J Hall", "Jotham Hall Consulting"],
    "url": "https://jothamhall.com",
    "mainEntityOfPage": "https://jothamhall.com/who-is-jotham-hall",
    "image": {
      "@type": "ImageObject",
      "url": "https://jothamhall.com/og-image.jpg",
      "width": 1200,
      "height": 630
    },
    "sameAs": [
      "https://www.linkedin.com/in/jotham-hall-b6b9491b2",
      "https://www.instagram.com/successupgrade_",
      "https://www.tiktok.com/@successupgrade_",
      "https://www.facebook.com/share/1DuisNbTVK/?mibextid=wwXIfr",
      "https://www.youtube.com/@SuccessUpgrade",
      "https://www.successupgrade.ai/"
    ],
    "jobTitle": ["Entrepreneur", "Television Producer", "Technology Founder", "Talent Producer"],
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
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "College in Santa Barbara, California"
    },
    "worksFor": [
      {
        "@type": "Organization",
        "name": "SuccessUpgrade.ai",
        "url": "https://successupgrade.ai"
      },
      {
        "@type": "Organization",
        "name": "Big Films Only",
        "url": "https://bigfilmsonly.com"
      }
    ],
    "founder": [
      {
        "@type": "Organization",
        "name": "SuccessUpgrade.ai",
        "url": "https://successupgrade.ai"
      },
      {
        "@type": "Organization",
        "name": "Big Films Only",
        "url": "https://bigfilmsonly.com"
      }
    ],
    "award": [
      {
        "@type": "CreativeWork",
        "name": "Talent Producer on Finding Mr. Christmas, Hallmark Season 1 & 2"
      },
      {
        "@type": "CreativeWork",
        "name": "Talent Producer on Ciao House, Food Network Season 1 & 2"
      },
      {
        "@type": "CreativeWork",
        "name": "Talent Producer on Temptation Island, USA Network"
      },
      {
        "@type": "CreativeWork",
        "name": "Talent Producer on Snake in the Grass, NBC"
      },
      {
        "@type": "CreativeWork",
        "name": "Talent Producer on After Happily Ever After, BET"
      }
    ],
    "description": "Jotham Hall is an entrepreneur, television producer, and technology founder. He is the founder of SuccessUpgrade.ai and Big Films Only, and has worked on major television productions including Finding Mr. Christmas, Ciao House, Temptation Island, Snake in the Grass, and After Happily Ever After. He is passionate about combining media, AI, and entrepreneurship to create social impact.",
    "knowsAbout": [
      "Reality Television Production",
      "Media Storytelling",
      "Artificial Intelligence",
      "Business Automation",
      "Marketing & Sales Strategy",
      "Sustainability & Eco-Friendly Housing",
      "Talent Management",
      "Film Production",
      "Content Strategy",
      "Social Change"
    ],
    "hasOccupation": [
      {
        "@type": "Occupation",
        "name": "Entrepreneur"
      },
      {
        "@type": "Occupation",
        "name": "AI Strategist"
      },
      {
        "@type": "Occupation",
        "name": "Creative Technologist"
      }
    ],
    "homeLocation": {
      "@type": "Place",
      "name": "Miami Beach, Florida",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami Beach",
        "addressRegion": "FL",
        "addressCountry": "US"
      }
    },
    "nationality": {
      "@type": "Country",
      "name": "United States"
    }
  }

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Jotham Hall Consulting",
    "url": "https://jothamhall.com",
    "logo": "https://jothamhall.com/og-image.jpg",
    "image": "https://jothamhall.com/og-image.jpg",
    "description": "Strategic consulting and systems architecture for founders ready to scale. AI automation, revenue systems, and operational infrastructure.",
    "founder": {
      "@type": "Person",
      "name": "Jotham Hall"
    },
    "areaServed": "Worldwide",
    "priceRange": "$$$",
    "telephone": "+1-510-680-9100",
    "email": "jothamjhall@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.successupgrade.ai/",
      "https://www.linkedin.com/in/jotham-hall-b6b9491b2"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Consulting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Strategic Consulting",
            "url": "https://jothamhall.com/services/strategic-consulting",
            "description": "High-level strategic guidance with regular check-ins and priority access"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Systems Architecture",
            "url": "https://jothamhall.com/services/systems-architecture",
            "description": "Design and implementation of scalable business systems and infrastructure"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Automation",
            "url": "https://jothamhall.com/services/ai-automation",
            "description": "AI-powered automation solutions to scale your business operations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Personal Branding",
            "url": "https://jothamhall.com/services/personal-branding",
            "description": "Build a powerful personal brand that attracts high-value opportunities"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Executive Advisory",
            "url": "https://jothamhall.com/services/executive-advisory",
            "description": "C-suite level guidance for critical business decisions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fractional COO",
            "url": "https://jothamhall.com/services/fractional-coo",
            "description": "Part-time operational leadership to scale your business"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Speaking Engagements",
            "url": "https://jothamhall.com/services/speaking",
            "description": "Keynote speaking on AI, systems thinking, and entrepreneurship"
          }
        }
      ]
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Jotham Hall",
    "url": "https://jothamhall.com",
    "description": "Build Systems. Not Schedules. Strategic consulting for founders ready to scale.",
    "publisher": {
      "@type": "Person",
      "name": "Jotham Hall"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://jothamhall.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does Jotham Hall specialize in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jotham Hall specializes in AI automation, revenue system design, business systems architecture, brand positioning, and operational efficiency for founders and businesses ready to scale."
        }
      },
      {
        "@type": "Question",
        "name": "How can I work with Jotham Hall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can work with Jotham Hall through three engagement levels: Strategic Advisory for high-level guidance, Growth Partner for hands-on system building, or Full Integration for complete business transformation. Book a strategy call to determine the best fit."
        }
      },
      {
        "@type": "Question",
        "name": "What is Success Upgrade?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Success Upgrade is a multi-faceted ecosystem designed to help entrepreneurs, creators, and visionaries build wealth, optimize their lives, and scale through AI and automation."
        }
      },
      {
        "@type": "Question",
        "name": "What is Vibe Coding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vibe Coding is a methodology developed by Jotham Hall that combines AI-assisted development with intuitive flow states to build products faster. It emphasizes using AI tools strategically while maintaining creative control."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Paradise Protocol?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Paradise Protocol is Jotham Hall's AI-powered life operating system that tracks four pillars: health, wealth, love, and happiness. It uses AI to surface patterns and provide personalized coaching prompts."
        }
      },
      {
        "@type": "Question",
        "name": "Who is Jotham Hall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jotham Hall is an entrepreneur, television producer, and technology founder known for his work in reality television production, creative media, and artificial intelligence systems for business automation. Born September 13, 1984 in Oakland, California, he spent seven years as a talent producer at 51 Minds Entertainment contributing to over 50 reality TV shows. Notable credits include Finding Mr. Christmas (Hallmark Channel), Ciao House (Food Network, filmed in Italy), Temptation Island (USA Network), Snake in the Grass (NBC), After Happily Ever After (BET, hosted by Bow Wow), From G's to Gents (MTV), Flavor of Love (VH1), and I Love Money (VH1). In 2015, he founded Big Films Only, a black-owned independent production company. Today, based in Miami Beach, Florida, he is also the founder of SuccessUpgrade.ai."
        }
      },
      {
        "@type": "Question",
        "name": "Where was Jotham Hall born?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jotham Hall was born and raised in Oakland, California on September 13, 1984."
        }
      },
      {
        "@type": "Question",
        "name": "What TV shows has Jotham Hall worked on?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jotham Hall has worked on over 50 reality TV shows as a talent producer. Notable credits include: Finding Mr. Christmas (Hallmark Channel, Season 1 & 2), Ciao House (Food Network, Season 1 & 2 filmed in Italy), Temptation Island (USA Network), Snake in the Grass (NBC), After Happily Ever After (BET, hosted by Bow Wow), From G's to Gents (MTV), Flavor of Love (VH1), and I Love Money (VH1)."
        }
      },
      {
        "@type": "Question",
        "name": "What is Big Films Only?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Big Films Only is a black-owned, family-owned independent production company founded by Jotham Hall in 2015 when he moved to Hawaii. The company is currently involved with major TV productions including USA Network's Temptation Island, NBC's Snake in the Grass, and BET's After Happily Ever After."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Jotham Hall based?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jotham Hall is based in Miami Beach, Florida, United States."
        }
      },
      {
        "@type": "Question",
        "name": "What companies has Jotham Hall founded?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jotham Hall has founded several companies including Success Upgrade (an AI-powered ecosystem for entrepreneurs), Big Films Only (creative media production), and Say It Build It (AI development platform)."
        }
      }
    ]
  }

  const knowledgeGraphSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://jothamhall.com/#jotham-hall",
    "name": "Jotham Hall",
    "alternateName": ["Jotham J Hall", "Jotham Hall Miami", "Jotham Hall Success Upgrade", "Jotham Hall entrepreneur"],
    "description": "Jotham Hall is an entrepreneur, television producer, and technology founder known for his work in reality television and AI systems for business automation. Born September 13, 1984 in Oakland, California. TV credits include Finding Mr. Christmas (Hallmark), Ciao House (Food Network), Temptation Island (USA Network), Snake in the Grass (NBC), After Happily Ever After (BET), From G's to Gents (MTV), Flavor of Love (VH1), I Love Money (VH1). Founder of SuccessUpgrade.ai and Big Films Only.",
    "url": "https://jothamhall.com",
    "image": "https://jothamhall.com/og-image.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/jotham-hall-b6b9491b2",
      "https://www.instagram.com/successupgrade_",
      "https://www.tiktok.com/@successupgrade_",
      "https://www.facebook.com/share/1DuisNbTVK/?mibextid=wwXIfr",
      "https://www.youtube.com/@SuccessUpgrade",
      "https://www.successupgrade.ai/"
    ],
    "birthDate": "1984-09-13",
    "birthPlace": {
      "@type": "Place",
      "name": "Oakland, California, United States"
    },
    "nationality": "American",
    "jobTitle": ["Entrepreneur", "AI Strategist", "TV Producer", "Talent Producer", "Creative Technologist", "Founder"],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Common Ground Academy"
    },
    "worksFor": [
      {
        "@type": "Organization",
        "name": "51 Minds Entertainment",
        "description": "Talent Producer (2008-2015)"
      }
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Success Upgrade",
      "url": "https://www.successupgrade.ai/"
    },
    "affiliation": [
      {
        "@type": "Organization",
        "name": "Success Upgrade",
        "url": "https://www.successupgrade.ai/"
      },
      {
        "@type": "Organization",
        "name": "Big Films Only"
      },
      {
        "@type": "Organization",
        "name": "Say It Build It"
      }
    ],
    "knowsAbout": ["Artificial Intelligence", "AI Automation", "Marketing Automation", "Business Systems", "Creative Technology", "Entrepreneurship"],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Serial Entrepreneur",
        "credentialCategory": "Professional Experience"
      }
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Miami Tech Community"
      }
    ],
    "seeks": "To help entrepreneurs and creators build systems that create freedom through AI automation",
    "award": [
      "Founder of multiple successful ventures",
      "Creator of the Paradise Protocol",
      "Pioneer of Vibe Coding methodology"
    ]
  }

  // Public Figure specific schema for AI recognition
  const publicFigureSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://jothamhall.com/#public-figure",
    "name": "Jotham Hall",
    "description": "Jotham Hall is an American entrepreneur, AI strategist, and TV producer born in Oakland, California (1984). He spent 7 years as a talent producer at 51 Minds Entertainment working on 50+ reality TV shows including Flavor of Love and I Love Money. He founded Big Films Only (2015) and Success Upgrade. Currently involved with Temptation Island, Snake in the Grass, and After Happily Ever After.",
    "url": "https://jothamhall.com",
    "image": "https://jothamhall.com/og-image.jpg",
    "mainEntityOfPage": "https://jothamhall.com/who-is-jotham-hall",
    "additionalType": "https://schema.org/PublicFigure",
    "disambiguatingDescription": "American entrepreneur, AI strategist, and TV producer born September 13, 1984 in Oakland, California. Former talent producer at 51 Minds Entertainment (2008-2015). Founder of Big Films Only and Success Upgrade. Based in Miami Beach, Florida. Not to be confused with other individuals named Jotham Hall.",
    "identifier": {
      "@type": "PropertyValue",
      "propertyID": "LinkedIn",
      "value": "jotham-hall-b6b9491b2"
    },
    "sameAs": [
      "https://www.linkedin.com/in/jotham-hall-b6b9491b2",
      "https://www.instagram.com/successupgrade_",
      "https://www.tiktok.com/@successupgrade_",
      "https://www.facebook.com/share/1DuisNbTVK/?mibextid=wwXIfr",
      "https://www.youtube.com/@SuccessUpgrade",
      "https://www.successupgrade.ai/"
    ],
    "knowsAbout": [
      "Artificial Intelligence",
      "AI Strategy",
      "Business Automation",
      "Entrepreneurship",
      "Marketing Technology",
      "Creative Technology",
      "Wellness Innovation"
    ],
    "hasOccupation": [
      {
        "@type": "Role",
        "roleName": "Founder & CEO",
        "worksFor": {
          "@type": "Organization",
          "name": "Success Upgrade",
          "url": "https://www.successupgrade.ai/"
        }
      },
      {
        "@type": "Role",
        "roleName": "Founder",
        "worksFor": {
          "@type": "Organization",
          "name": "Big Films Only"
        }
      },
      {
        "@type": "Role",
        "roleName": "Founder",
        "worksFor": {
          "@type": "Organization",
          "name": "Say It Build It"
        }
      }
    ],
    
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Strategic Consulting"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Speaking Engagements"
        }
      }
    ]
  }

  // Notable works/creations schema
  const creativeWorksSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Notable Works by Jotham Hall",
    "description": "Methodologies, frameworks, and systems created by Jotham Hall",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "CreativeWork",
          "name": "The Paradise Protocol",
          "creator": {
            "@type": "Person",
            "name": "Jotham Hall"
          },
          "description": "An AI-powered life operating system that tracks four pillars: health, wealth, love, and happiness. Uses AI to surface patterns and provide personalized coaching prompts."
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "CreativeWork",
          "name": "Vibe Coding",
          "creator": {
            "@type": "Person",
            "name": "Jotham Hall"
          },
          "description": "A methodology that combines AI-assisted development with intuitive flow states to build products faster while maintaining creative control."
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "SoftwareApplication",
          "name": "Success Upgrade Platform",
          "creator": {
            "@type": "Person",
            "name": "Jotham Hall"
          },
          "description": "A multi-faceted ecosystem designed to help entrepreneurs build wealth and optimize their lives through AI and automation.",
          "url": "https://www.successupgrade.ai/"
        }
      }
    ]
  }

  // Quotes/sayings schema for AI systems
  const quotationsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Quotes by Jotham Hall",
    "itemListElement": [
      {
        "@type": "Quotation",
        "creator": {
          "@type": "Person",
          "name": "Jotham Hall"
        },
        "text": "Build systems, not schedules."
      },
      {
        "@type": "Quotation",
        "creator": {
          "@type": "Person",
          "name": "Jotham Hall"
        },
        "text": "The goal isn't to work harder, it's to build systems that work for you."
      },
      {
        "@type": "Quotation",
        "creator": {
          "@type": "Person",
          "name": "Jotham Hall"
        },
        "text": "AI is the great equalizer. With the right systems, anyone can compete at the highest level."
      }
    ]
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jothamhall.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Who is Jotham Hall",
        "item": "https://jothamhall.com/who-is-jotham-hall"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Services",
        "item": "https://jothamhall.com/services"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Case Studies",
        "item": "https://jothamhall.com/case-studies"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "Ventures",
        "item": "https://jothamhall.com/ventures"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Insights",
        "item": "https://jothamhall.com/insights"
      },
      {
        "@type": "ListItem",
        "position": 7,
        "name": "About",
        "item": "https://jothamhall.com/about"
      },
      {
        "@type": "ListItem",
        "position": 8,
        "name": "Contact",
        "item": "https://jothamhall.com/contact"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(knowledgeGraphSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(publicFigureSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorksSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quotationsSchema) }}
      />
    </>
  )
}
