import { insights } from '@/lib/insights-data'

export async function GET() {
  const baseUrl = 'https://jothamhall.com'
  
  const items = insights
    .slice(0, 20)
    .map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/insights/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/insights/${article.slug}</guid>
      <description><![CDATA[${article.excerpt}]]></description>
      <author>Jotham Hall</author>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <category>${article.category}</category>
    </item>`)
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Jotham Hall - Insights</title>
    <link>${baseUrl}</link>
    <description>Insights on AI automation, business systems, and entrepreneurship from Jotham Hall - Entrepreneur, AI Strategist, and Founder of Success Upgrade.</description>
    <language>en-us</language>
    <managingEditor>contact@jothamhall.com (Jotham Hall)</managingEditor>
    <webMaster>contact@jothamhall.com (Jotham Hall)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/og-image.jpg</url>
      <title>Jotham Hall</title>
      <link>${baseUrl}</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
