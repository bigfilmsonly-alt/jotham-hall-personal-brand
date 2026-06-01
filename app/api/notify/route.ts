import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

// Simple rate limiting (per IP, 5 requests per minute)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + 60000 });
    return false;
  }

  entry.count++;
  if (entry.count > 5) return true;
  return false;
}

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_TO = "bigfilmsonly@gmail.com";
const FROM = "Jotham Hall <jotham@jothamhall.com>";

const signature = `
  <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #3D3A35;">
    <p style="font-size: 13px; color: #5C5750; margin: 0; line-height: 1.6;">
      <strong style="color: #B8B0A8;">Jotham Hall</strong><br/>
      AI Systems Architect<br/>
      <a href="tel:+15106809100" style="color: #D4A853; text-decoration: none;">(510) 680-9100</a><br/>
      <a href="https://jothamhall.com" style="color: #D4A853; text-decoration: none;">jothamhall.com</a>
    </p>
  </div>
`;

const calendlyButton = `
  <p style="margin: 24px 0;">
    <a href="https://calendly.com/bigfilmsonly/30min" style="display: inline-block; background: #D4A853; color: #0D0D0D; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">Book a free strategy call</a>
  </p>
`;

function wrap(content: string) {
  return `<div style="font-family: 'Inter', sans-serif; max-width: 600px; color: #B8B0A8; background: #0D0D0D; padding: 40px; border: 1px solid #3D3A35;">${content}</div>`;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit check
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const body = await req.json();
    const { type, data } = body;

    // Input validation
    if (!type || !data) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const validTypes = ["contact", "quiz", "email_capture", "calendly"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    // Sanitize email
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const firstName = data.name ? data.name.split(" ")[0] : "there";

    // ========================================
    // EMAIL 1: Notify Jotham (ALL types)
    // ========================================
    let notifySubject = "";
    let notifyHtml = "";

    if (type === "contact") {
      notifySubject = `New Lead: ${data.name} — ${data.service || "No service selected"}`;
      const rows = [
        ["Name", data.name, true],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Company", data.company],
        ["Website", data.website],
        ["Social", data.social_media],
        ["Service", data.service, true, true],
        ["Bottleneck", data.challenge],
        ["Revenue", data.revenue_range],
        ["Budget", data.budget, true, true],
        ["Source", data.how_found],
      ]
        .filter(([, val]) => val)
        .map(([label, val, bold, gold]) =>
          `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">${label}</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: ${gold ? "#D4A853" : "#FAF8F5"}; font-size: 14px;">${bold ? `<strong>${val}</strong>` : val}</td></tr>`
        )
        .join("");
      notifyHtml = wrap(`
        <h2 style="color: #D4A853; font-size: 20px; margin: 0 0 20px 0; font-family: serif; text-transform: uppercase; letter-spacing: 2px;">New Contact Submission</h2>
        <table style="width: 100%; border-collapse: collapse;">${rows}</table>
        <p style="margin-top: 24px; color: #5C5750; font-size: 11px;">From jothamhall.com contact form</p>
      `);
    } else if (type === "quiz") {
      notifySubject = `Quiz Result: ${data.name || "Anonymous"} scored ${data.score}/20 — ${data.result_type}`;
      notifyHtml = wrap(`
        <h2 style="color: #D4A853; font-size: 20px; margin: 0 0 20px 0; font-family: serif; text-transform: uppercase; letter-spacing: 2px;">New Quiz Completion</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Name</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;"><strong>${data.name || "Not provided"}</strong></td></tr>
          <tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Email</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;">${data.email}</td></tr>
          <tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Score</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #D4A853; font-size: 14px;"><strong>${data.score}/20</strong></td></tr>
          <tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Result</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #D4A853; font-size: 14px;"><strong>${data.result_type}</strong></td></tr>
        </table>
        <p style="margin-top: 24px; color: #5C5750; font-size: 11px;">From jothamhall.com quiz funnel</p>
      `);
    } else if (type === "email_capture") {
      notifySubject = `New Email Capture: ${data.email} (${data.source})`;
      notifyHtml = wrap(`
        <h2 style="color: #D4A853; font-size: 20px; margin: 0 0 20px 0; font-family: serif; text-transform: uppercase; letter-spacing: 2px;">New Email Captured</h2>
        <p style="color: #FAF8F5; font-size: 14px;"><strong>Email:</strong> ${data.email}</p>
        <p style="color: #B8B0A8; font-size: 14px;"><strong>Source:</strong> ${data.source}</p>
        <p style="margin-top: 24px; color: #5C5750; font-size: 11px;">From jothamhall.com</p>
      `);
    } else if (type === "calendly") {
      notifySubject = "New Calendly Booking — someone just booked a call";
      notifyHtml = wrap(`
        <h2 style="color: #D4A853; font-size: 20px; margin: 0 0 20px 0; font-family: serif; text-transform: uppercase; letter-spacing: 2px;">New Call Booked</h2>
        <p style="color: #FAF8F5; font-size: 15px;">Someone just booked a strategy call through jothamhall.com.</p>
        <p style="color: #B8B0A8; font-size: 14px;">Check your Calendly dashboard for details.</p>
        <p style="margin-top: 24px; color: #5C5750; font-size: 11px;">Via Calendly embed on jothamhall.com</p>
      `);
    }

    // Send notification to Jotham
    const { error } = await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      subject: notifySubject,
      html: notifyHtml,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // ========================================
    // EMAIL 2: Confirmation to the lead
    // ========================================

    // Contact form
    if (type === "contact" && data.email) {
      await resend.emails.send({
        from: FROM,
        to: data.email,
        subject: "You're on my radar — here's what's next",
        html: wrap(`
          <p style="font-size: 16px; line-height: 1.7; color: #FAF8F5;">Hey ${firstName},</p>
          <p style="font-size: 15px; line-height: 1.7;">Got your submission. I personally review every inquiry within 24 hours.</p>
          <p style="font-size: 15px; line-height: 1.7; color: #FAF8F5; font-weight: 600;">Here's what happens next:</p>
          <ol style="font-size: 15px; line-height: 2; padding-left: 20px; color: #B8B0A8;">
            <li>I'll look at your answers</li>
            <li>If there's a fit, I'll reach out to schedule a call</li>
            <li>If I'm not the right person to help, I'll tell you that too</li>
          </ol>
          <p style="font-size: 15px; line-height: 1.7;">Want to skip the wait?</p>
          ${calendlyButton}
          <p style="font-size: 15px; line-height: 1.7;">Talk soon,</p>
          <p style="font-size: 15px; color: #FAF8F5; font-weight: 600;">Jotham</p>
          ${signature}
        `),
      }).catch(() => {});
    }

    // Quiz
    if (type === "quiz" && data.email) {
      const resultTitles: Record<string, string> = {
        foundation: "Foundation Stage",
        growth: "Growth Stage",
        scale: "Scale Stage",
        optimize: "Optimization Stage",
      };
      const resultTitle = resultTitles[data.result_type] || data.result_type;

      await resend.emails.send({
        from: FROM,
        to: data.email,
        subject: `Your Business Assessment: ${resultTitle}`,
        html: wrap(`
          <p style="font-size: 16px; line-height: 1.7; color: #FAF8F5;">Hey ${firstName},</p>
          <p style="font-size: 15px; line-height: 1.7;">Thanks for taking the Business Growth Assessment.</p>
          <div style="background: #1A1A1A; border: 1px solid #3D3A35; padding: 24px; margin: 24px 0; text-align: center;">
            <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #5C5750; margin: 0 0 8px 0;">Your Score</p>
            <p style="font-size: 32px; color: #D4A853; font-weight: 700; margin: 0 0 4px 0;">${data.score}/20</p>
            <p style="font-size: 18px; color: #FAF8F5; font-weight: 600; margin: 0;">${resultTitle}</p>
          </div>
          <p style="font-size: 15px; line-height: 1.7;">I review every assessment personally. If I see an opportunity to help, I'll reach out within 24 hours.</p>
          <p style="font-size: 15px; line-height: 1.7;">Want to talk now?</p>
          ${calendlyButton}
          <p style="font-size: 15px; line-height: 1.7;">Talk soon,</p>
          <p style="font-size: 15px; color: #FAF8F5; font-weight: 600;">Jotham</p>
          ${signature}
        `),
      }).catch(() => {});
    }

    // Email capture (exit intent, footer, city pages)
    if (type === "email_capture" && data.email) {
      await resend.emails.send({
        from: FROM,
        to: data.email,
        subject: "Welcome — you're in",
        html: wrap(`
          <p style="font-size: 16px; line-height: 1.7; color: #FAF8F5;">Hey,</p>
          <p style="font-size: 15px; line-height: 1.7;">You're on the list. I send insights on AI automation, revenue systems, and scaling businesses that actually work.</p>
          <p style="font-size: 15px; line-height: 1.7;">No fluff. No spam. Just what's working right now.</p>
          <p style="font-size: 15px; line-height: 1.7;">Want to go deeper?</p>
          ${calendlyButton}
          <p style="font-size: 15px; line-height: 1.7;">Talk soon,</p>
          <p style="font-size: 15px; color: #FAF8F5; font-weight: 600;">Jotham</p>
          ${signature}
        `),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
