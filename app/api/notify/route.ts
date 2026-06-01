import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_TO = "bigfilmsonly@gmail.com";
const FROM = "Jotham Hall <jotham@jothamhall.com>";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    const firstName = data.name ? data.name.split(" ")[0] : "there";

    // ========================================
    // EMAIL 1: Notify Jotham (all types)
    // ========================================
    let notifySubject = "";
    let notifyHtml = "";

    if (type === "contact") {
      notifySubject = `New Lead: ${data.name} — ${data.service || "No service selected"}`;
      notifyHtml = `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; background: #0D0D0D; padding: 32px; border: 1px solid #3D3A35;">
          <h2 style="color: #D4A853; font-size: 20px; margin: 0 0 20px 0; font-family: serif; text-transform: uppercase; letter-spacing: 2px;">New Contact Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Name</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;"><strong>${data.name}</strong></td></tr>
            <tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Email</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;">${data.email}</td></tr>
            ${data.phone ? `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Phone</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;">${data.phone}</td></tr>` : ""}
            ${data.company ? `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Company</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;">${data.company}</td></tr>` : ""}
            ${data.website ? `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Website</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;">${data.website}</td></tr>` : ""}
            ${data.social_media ? `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Social</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;">${data.social_media}</td></tr>` : ""}
            ${data.service ? `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Service</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #D4A853; font-size: 14px;"><strong>${data.service}</strong></td></tr>` : ""}
            ${data.challenge ? `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Bottleneck</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;">${data.challenge}</td></tr>` : ""}
            ${data.revenue_range ? `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Revenue</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;">${data.revenue_range}</td></tr>` : ""}
            ${data.budget ? `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Budget</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #D4A853; font-size: 14px;"><strong>${data.budget}</strong></td></tr>` : ""}
            ${data.how_found ? `<tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Source</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;">${data.how_found}</td></tr>` : ""}
          </table>
          <p style="margin-top: 24px; color: #5C5750; font-size: 11px;">From jothamhall.com contact form</p>
        </div>
      `;
    } else if (type === "quiz") {
      notifySubject = `Quiz Result: ${data.name || "Anonymous"} scored ${data.score}/20 — ${data.result_type}`;
      notifyHtml = `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; background: #0D0D0D; padding: 32px; border: 1px solid #3D3A35;">
          <h2 style="color: #D4A853; font-size: 20px; margin: 0 0 20px 0; font-family: serif; text-transform: uppercase; letter-spacing: 2px;">New Quiz Completion</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Name</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;"><strong>${data.name || "Not provided"}</strong></td></tr>
            <tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Email</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #FAF8F5; font-size: 14px;">${data.email}</td></tr>
            <tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Score</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #D4A853; font-size: 14px;"><strong>${data.score}/20</strong></td></tr>
            <tr><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #5C5750; font-size: 13px;">Result</td><td style="padding: 10px 8px; border-bottom: 1px solid #252320; color: #D4A853; font-size: 14px;"><strong>${data.result_type}</strong></td></tr>
          </table>
          <p style="margin-top: 24px; color: #5C5750; font-size: 11px;">From jothamhall.com quiz funnel</p>
        </div>
      `;
    } else if (type === "email_capture") {
      notifySubject = `New Email Capture: ${data.email} (${data.source})`;
      notifyHtml = `
        <div style="font-family: 'Inter', sans-serif; max-width: 600px; background: #0D0D0D; padding: 32px; border: 1px solid #3D3A35;">
          <h2 style="color: #D4A853; font-size: 20px; margin: 0 0 20px 0; font-family: serif; text-transform: uppercase; letter-spacing: 2px;">New Email Captured</h2>
          <p style="color: #FAF8F5; font-size: 14px;"><strong>Email:</strong> ${data.email}</p>
          <p style="color: #B8B0A8; font-size: 14px;"><strong>Source:</strong> ${data.source}</p>
          <p style="margin-top: 24px; color: #5C5750; font-size: 11px;">From jothamhall.com</p>
        </div>
      `;
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

    // Contact form confirmation
    if (type === "contact" && data.email) {
      await resend.emails.send({
        from: FROM,
        to: data.email,
        subject: "You're on my radar — here's what's next",
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; color: #B8B0A8; background: #0D0D0D; padding: 40px; border: 1px solid #3D3A35;">
            <p style="font-size: 16px; line-height: 1.7; color: #FAF8F5;">Hey ${firstName},</p>
            <p style="font-size: 15px; line-height: 1.7;">Got your submission. I personally review every inquiry within 24 hours.</p>
            <p style="font-size: 15px; line-height: 1.7; color: #FAF8F5; font-weight: 600;">Here's what happens next:</p>
            <ol style="font-size: 15px; line-height: 2; padding-left: 20px; color: #B8B0A8;">
              <li>I'll look at your answers</li>
              <li>If there's a fit, I'll reach out to schedule a call</li>
              <li>If I'm not the right person to help, I'll tell you that too</li>
            </ol>
            <p style="font-size: 15px; line-height: 1.7;">Want to skip the wait?</p>
            <p style="margin: 24px 0;">
              <a href="https://calendly.com/bigfilmsonly/30min" style="display: inline-block; background: #D4A853; color: #0D0D0D; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">Book directly</a>
            </p>
            <p style="font-size: 15px; line-height: 1.7;">Talk soon,</p>
            <p style="font-size: 15px; color: #FAF8F5; font-weight: 600;">Jotham</p>
            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #3D3A35;">
              <p style="font-size: 13px; color: #5C5750; margin: 0; line-height: 1.6;">
                <strong style="color: #B8B0A8;">Jotham Hall</strong><br/>
                AI Systems Architect<br/>
                <a href="tel:+15106809100" style="color: #D4A853; text-decoration: none;">(510) 680-9100</a><br/>
                <a href="https://jothamhall.com" style="color: #D4A853; text-decoration: none;">jothamhall.com</a>
              </p>
            </div>
          </div>
        `,
      }).catch(() => {});
    }

    // Quiz confirmation
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
        html: `
          <div style="font-family: 'Inter', sans-serif; max-width: 600px; color: #B8B0A8; background: #0D0D0D; padding: 40px; border: 1px solid #3D3A35;">
            <p style="font-size: 16px; line-height: 1.7; color: #FAF8F5;">Hey ${firstName},</p>
            <p style="font-size: 15px; line-height: 1.7;">Thanks for taking the Business Growth Assessment.</p>
            <div style="background: #1A1A1A; border: 1px solid #3D3A35; padding: 24px; margin: 24px 0;">
              <p style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #5C5750; margin: 0 0 8px 0;">Your Score</p>
              <p style="font-size: 32px; color: #D4A853; font-weight: 700; margin: 0 0 4px 0;">${data.score}/20</p>
              <p style="font-size: 18px; color: #FAF8F5; font-weight: 600; margin: 0;">${resultTitle}</p>
            </div>
            <p style="font-size: 15px; line-height: 1.7;">I review every assessment personally. If I see an opportunity to help, I'll reach out within 24 hours.</p>
            <p style="font-size: 15px; line-height: 1.7;">Want to talk now?</p>
            <p style="margin: 24px 0;">
              <a href="https://calendly.com/bigfilmsonly/30min" style="display: inline-block; background: #D4A853; color: #0D0D0D; padding: 14px 28px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">Book a free strategy call</a>
            </p>
            <p style="font-size: 15px; line-height: 1.7;">Talk soon,</p>
            <p style="font-size: 15px; color: #FAF8F5; font-weight: 600;">Jotham</p>
            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #3D3A35;">
              <p style="font-size: 13px; color: #5C5750; margin: 0; line-height: 1.6;">
                <strong style="color: #B8B0A8;">Jotham Hall</strong><br/>
                AI Systems Architect<br/>
                <a href="tel:+15106809100" style="color: #D4A853; text-decoration: none;">(510) 680-9100</a><br/>
                <a href="https://jothamhall.com" style="color: #D4A853; text-decoration: none;">jothamhall.com</a>
              </p>
            </div>
          </div>
        `,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
