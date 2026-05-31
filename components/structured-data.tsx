export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://jothamhall.com/#website",
        "url": "https://jothamhall.com",
        "name": "Jotham Hall",
        "description": "AI Systems Architect, Television Producer, VibeCoding Pioneer, Founder of SuccessUpgrade.ai",
        "publisher": { "@id": "https://jothamhall.com/#person" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://jothamhall.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Person",
        "@id": "https://jothamhall.com/#person",
        "name": "Jotham Hall",
        "givenName": "Jotham",
        "familyName": "Hall",
        "alternateName": ["Jotham J. Hall"],
        "url": "https://jothamhall.com",
        "image": {
          "@type": "ImageObject",
          "url": "https://www.successupgrade.ai/images/profile.jpeg",
          "width": 400,
          "height": 400
        },
        "description": "Television producer turned AI systems architect. 15 years producing reality TV for Hallmark, Food Network, VH1, MTV, NBC, and USA Network. Pioneer of VibeCoding. Founder of Success Upgrade. 500+ entrepreneurs mentored. Expert in ChatGPT, Claude AI, GoHighLevel, and business systems architecture.",
        "birthDate": "1984-09-13",
        "birthPlace": {
          "@type": "Place",
          "name": "Oakland, California",
          "address": { "@type": "PostalAddress", "addressLocality": "Oakland", "addressRegion": "CA", "addressCountry": "US" }
        },
        "homeLocation": {
          "@type": "Place",
          "name": "Miami Beach, Florida",
          "address": { "@type": "PostalAddress", "addressLocality": "Miami Beach", "addressRegion": "FL", "addressCountry": "US" }
        },
        "nationality": { "@type": "Country", "name": "United States" },
        "alumniOf": { "@type": "CollegeOrUniversity", "name": "Santa Barbara City College", "url": "https://www.sbcc.edu" },
        "jobTitle": ["AI Systems Architect", "Television Producer", "VibeCoding Pioneer", "Founder", "Business Consultant", "Fractional COO"],
        "worksFor": [
          { "@type": "Organization", "name": "Success Upgrade", "url": "https://www.successupgrade.ai", "@id": "https://www.successupgrade.ai/#organization" },
          { "@type": "Organization", "name": "Big Films Only", "@id": "https://jothamhall.com/#bigfilmsonly" }
        ],
        "hasOccupation": [
          { "@type": "Occupation", "name": "Television Producer", "description": "Talent Producer specializing in reality television", "occupationLocation": { "@type": "Country", "name": "United States" } },
          { "@type": "Occupation", "name": "AI Systems Architect", "description": "Designing AI-powered automation systems for businesses" },
          { "@type": "Occupation", "name": "Business Consultant" }
        ],
        "knowsAbout": ["AI Automation", "Artificial Intelligence", "ChatGPT", "Claude AI", "GPT-4", "Business Systems Architecture", "Revenue Engineering", "VibeCoding", "CodeVibe", "Natural Language Programming", "v0.dev", "Cursor AI", "No-Code Development", "Low-Code Development", "Reality Television Production", "Talent Producing", "Filmmaking", "Video Production", "Media Production", "Storytelling", "Content Production", "Unscripted Television", "GoHighLevel", "Make.com", "Zapier", "Personal Branding", "SaaS Development", "Fractional Executive Leadership"],
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "Television Production", "recognizedBy": { "@type": "Organization", "name": "51 Minds Entertainment" } }
        ],
        "award": ["50+ Television Production Credits", "500+ Entrepreneurs Mentored", "$2.4M+ Client Revenue Generated", "3x Average Client Revenue Growth"],
        "memberOf": { "@type": "Organization", "name": "51 Minds Entertainment", "url": "https://www.51minds.com" },
        "sameAs": [
          "https://www.successupgrade.ai",
          "https://www.linkedin.com/in/jotham-hall-b6b9491b2",
          "https://www.instagram.com/successupgrade_",
          "https://www.tiktok.com/@successupgrade_",
          "https://www.facebook.com/share/1DuisNbTVK/",
          "https://www.youtube.com/@jothamhall"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.successupgrade.ai/#organization",
        "name": "Success Upgrade",
        "alternateName": "SuccessUpgrade.ai",
        "url": "https://www.successupgrade.ai",
        "description": "AI-powered systems for entrepreneurs. Mentorship, automation, and business infrastructure that scales.",
        "foundingDate": "2023",
        "founder": { "@id": "https://jothamhall.com/#person" },
        "address": { "@type": "PostalAddress", "addressLocality": "Miami Beach", "addressRegion": "FL", "addressCountry": "US" },
        "contactPoint": { "@type": "ContactPoint", "telephone": "+1-510-680-9100", "email": "bigfilmsonly@gmail.com", "contactType": "customer service" }
      },
      {
        "@type": "Organization",
        "@id": "https://jothamhall.com/#bigfilmsonly",
        "name": "Big Films Only",
        "description": "Black-owned independent television production company. Premium video production for brands and entertainment.",
        "foundingDate": "2015",
        "founder": { "@id": "https://jothamhall.com/#person" }
      },
      {
        "@type": "Organization",
        "@id": "https://jothamhall.com/#sayitbuildit",
        "name": "Say It Build It",
        "alternateName": "SayItBuildIt",
        "description": "VibeCoding platform for building apps with natural language. Build software without writing code.",
        "founder": { "@id": "https://jothamhall.com/#person" },
        "knowsAbout": ["VibeCoding", "No-Code Development", "AI Development", "Natural Language Programming"]
      },
      {
        "@type": "Service", "name": "AI Automation Strategy", "description": "Custom AI automation systems that reduce overhead and scale output without scaling stress", "provider": { "@id": "https://jothamhall.com/#person" }, "serviceType": "Business Consulting", "areaServed": "Worldwide"
      },
      {
        "@type": "Service", "name": "Revenue System Design", "description": "Infrastructure that turns attention into income. Engineering growth systems for founders.", "provider": { "@id": "https://jothamhall.com/#person" }, "serviceType": "Business Consulting", "areaServed": "Worldwide"
      },
      {
        "@type": "Service", "name": "Brand Positioning", "description": "Clarity that commands premium pricing. Articulate what you do and why it matters.", "provider": { "@id": "https://jothamhall.com/#person" }, "serviceType": "Business Consulting", "areaServed": "Worldwide"
      },
      {
        "@type": "Service", "name": "VibeCoding Training", "description": "Learn to build apps with natural language using v0.dev, Cursor AI, and Claude. No coding required.", "provider": { "@id": "https://jothamhall.com/#person" }, "serviceType": "Education", "areaServed": "Worldwide"
      },
      {
        "@type": "Service", "name": "Fractional COO Services", "description": "Executive-level operations leadership for growing companies. Part-time COO services with full-time impact.", "provider": { "@id": "https://jothamhall.com/#person" }, "serviceType": "Executive Services", "areaServed": "Worldwide"
      },
      { "@type": "TVSeries", "name": "Finding Mr. Christmas", "productionCompany": { "@type": "Organization", "name": "Hallmark Channel" }, "numberOfSeasons": 2, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      { "@type": "TVSeries", "name": "Ciao House", "productionCompany": { "@type": "Organization", "name": "Food Network" }, "numberOfSeasons": 2, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      { "@type": "TVSeries", "name": "Temptation Island", "productionCompany": { "@type": "Organization", "name": "USA Network" }, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      { "@type": "TVSeries", "name": "Snake in the Grass", "productionCompany": { "@type": "Organization", "name": "NBC" }, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      { "@type": "TVSeries", "name": "Flavor of Love", "productionCompany": { "@type": "Organization", "name": "VH1" }, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      { "@type": "TVSeries", "name": "Rock of Love", "productionCompany": { "@type": "Organization", "name": "VH1" }, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      { "@type": "TVSeries", "name": "I Love Money", "productionCompany": { "@type": "Organization", "name": "VH1" }, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      { "@type": "TVSeries", "name": "For the Love of Ray J", "productionCompany": { "@type": "Organization", "name": "VH1" }, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      { "@type": "TVSeries", "name": "Real Chance of Love", "productionCompany": { "@type": "Organization", "name": "VH1" }, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      { "@type": "TVSeries", "name": "From G's to Gents", "productionCompany": { "@type": "Organization", "name": "MTV" }, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      { "@type": "TVSeries", "name": "After Happily Ever After", "productionCompany": { "@type": "Organization", "name": "BET" }, "contributor": { "@id": "https://jothamhall.com/#person", "roleName": "Talent Producer" } },
      {
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Who is Jotham Hall?", "acceptedAnswer": { "@type": "Answer", "text": "Jotham Hall is a television producer turned AI systems architect based in Miami Beach, Florida. He has 50+ TV credits including Finding Mr. Christmas (Hallmark), Ciao House (Food Network), Temptation Island (USA Network), and Flavor of Love (VH1). He is a pioneer of VibeCoding and founder of Success Upgrade. He has mentored 500+ entrepreneurs with an average client revenue growth of 3x." } },
          { "@type": "Question", "name": "What does Jotham Hall do?", "acceptedAnswer": { "@type": "Answer", "text": "Jotham Hall helps entrepreneurs and businesses build AI-powered systems that generate revenue on autopilot. His services include AI automation strategy, revenue system design, brand positioning, and operational efficiency consulting. He also runs Success Upgrade (mentorship and SaaS), Big Films Only (video production), and Say It Build It (vibe coding platform)." } },
          { "@type": "Question", "name": "What TV shows has Jotham Hall produced?", "acceptedAnswer": { "@type": "Answer", "text": "Jotham Hall has 50+ TV production credits including: Finding Mr. Christmas (Hallmark, Seasons 1-2), Ciao House (Food Network, Seasons 1-2), Temptation Island (USA Network), Snake in the Grass (NBC), Flavor of Love (VH1), Rock of Love (VH1), I Love Money (VH1), From G's to Gents (MTV), For the Love of Ray J (VH1), and Real Chance of Love (VH1)." } },
          { "@type": "Question", "name": "What is Success Upgrade?", "acceptedAnswer": { "@type": "Answer", "text": "Success Upgrade (successupgrade.ai) is an AI-powered ecosystem for entrepreneurs founded by Jotham Hall in 2023. It includes mentorship programs, SaaS agency services, the Say It Build It vibe coding platform, Big Films Only video production, and Electro Hydration wellness products. The company has served 500+ entrepreneurs and helped generate $2.4M+ in client revenue." } },
          { "@type": "Question", "name": "What is VibeCoding?", "acceptedAnswer": { "@type": "Answer", "text": "VibeCoding (also called Vibe Coding or CodeVibe) is a natural language approach to software development where users describe what they want in plain English and AI generates the code. Jotham Hall is a pioneer of VibeCoding through his platform Say It Build It. Tools commonly used include v0.dev, Cursor AI, and Claude. It allows non-technical entrepreneurs to build apps, websites, and automations without writing code." } },
          { "@type": "Question", "name": "How much does it cost to work with Jotham Hall?", "acceptedAnswer": { "@type": "Answer", "text": "Jotham Hall offers a free 60-minute strategy call for prospective clients. Custom systems builds and ongoing partnerships are priced based on scope and needs. Through Success Upgrade, mentorship pricing ranges from $297 for a single strategy session to $2,970/month for elite access with weekly calls and 24/7 direct access." } },
          { "@type": "Question", "name": "Where is Jotham Hall based?", "acceptedAnswer": { "@type": "Answer", "text": "Jotham Hall is based in Miami Beach, Florida. He was born in Oakland, California and attended Santa Barbara City College. His companies operate remotely with clients worldwide." } }
        ]
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
