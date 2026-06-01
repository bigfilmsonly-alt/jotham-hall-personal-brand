import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    let subject = "";
    let html = "";

    if (type === "contact") {
      subject = `New Lead: ${data.name} — ${data.service || "No service selected"}`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #D4A853;">New Contact Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Name</td><td style="padding: 8px; border-bottom: 1px solid #333;"><strong>${data.name}</strong></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Email</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.email}</td></tr>
            ${data.phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.phone}</td></tr>` : ""}
            ${data.company ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Company</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.company}</td></tr>` : ""}
            ${data.website ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Website</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.website}</td></tr>` : ""}
            ${data.social_media ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Social</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.social_media}</td></tr>` : ""}
            ${data.service ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Service</td><td style="padding: 8px; border-bottom: 1px solid #333;"><strong>${data.service}</strong></td></tr>` : ""}
            ${data.challenge ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Bottleneck</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.challenge}</td></tr>` : ""}
            ${data.revenue_range ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Revenue</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.revenue_range}</td></tr>` : ""}
            ${data.budget ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Budget</td><td style="padding: 8px; border-bottom: 1px solid #333;"><strong>${data.budget}</strong></td></tr>` : ""}
            ${data.how_found ? `<tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Source</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.how_found}</td></tr>` : ""}
          </table>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">From jothamhall.com contact form</p>
        </div>
      `;
    } else if (type === "quiz") {
      subject = `Quiz Result: ${data.name || "Anonymous"} scored ${data.score}/20 — ${data.result_type}`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #D4A853;">New Quiz Completion</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Name</td><td style="padding: 8px; border-bottom: 1px solid #333;"><strong>${data.name || "Not provided"}</strong></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Email</td><td style="padding: 8px; border-bottom: 1px solid #333;">${data.email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Score</td><td style="padding: 8px; border-bottom: 1px solid #333;"><strong>${data.score}/20</strong></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #333; color: #888;">Result</td><td style="padding: 8px; border-bottom: 1px solid #333;"><strong>${data.result_type}</strong></td></tr>
          </table>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">From jothamhall.com quiz funnel</p>
        </div>
      `;
    } else if (type === "email_capture") {
      subject = `New Email Capture: ${data.email} (${data.source})`;
      html = `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #D4A853;">New Email Captured</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Source:</strong> ${data.source}</p>
          <p style="margin-top: 20px; color: #888; font-size: 12px;">From jothamhall.com</p>
        </div>
      `;
    }

    const { error } = await resend.emails.send({
      from: "Jotham Hall <jotham@jothamhall.com>",
      to: "bigfilmsonly@gmail.com",
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    // Send confirmation to the lead (contact form only)
    if (type === "contact" && data.email) {
      await resend.emails.send({
        from: "Jotham Hall <jotham@jothamhall.com>",
        to: data.email,
        subject: "Got your application — Jotham Hall",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #B8B0A8; background: #0D0D0D; padding: 40px; border: 1px solid #3D3A35;">
            <h2 style="color: #FAF8F5; font-size: 24px; margin-bottom: 8px;">Got it, ${data.name}.</h2>
            <p style="color: #D4A853; font-size: 14px; margin-bottom: 24px;">I review every application personally.</p>
            <p style="font-size: 15px; line-height: 1.6;">
              Thanks for reaching out. I received your application and I will get back to you within 24 hours with next steps.
            </p>
            <p style="font-size: 15px; line-height: 1.6; margin-top: 16px;">
              In the meantime, feel free to reach me directly:
            </p>
            <ul style="list-style: none; padding: 0; margin: 16px 0;">
              <li style="padding: 8px 0; border-bottom: 1px solid #3D3A35;">
                <strong style="color: #FAF8F5;">Call:</strong> <a href="tel:+15106809100" style="color: #D4A853;">(510) 680-9100</a>
              </li>
              <li style="padding: 8px 0; border-bottom: 1px solid #3D3A35;">
                <strong style="color: #FAF8F5;">Text:</strong> <a href="sms:+15106934083" style="color: #D4A853;">(510) 693-4083</a>
              </li>
              <li style="padding: 8px 0;">
                <strong style="color: #FAF8F5;">Email:</strong> <a href="mailto:bigfilmsonly@gmail.com" style="color: #D4A853;">bigfilmsonly@gmail.com</a>
              </li>
            </ul>
            <p style="font-size: 15px; line-height: 1.6; margin-top: 24px; color: #FAF8F5;">
              Talk soon,<br/>
              <strong>Jotham Hall</strong>
            </p>
            <p style="font-size: 11px; color: #5C5750; margin-top: 32px; border-top: 1px solid #3D3A35; padding-top: 16px;">
              AI Systems Architect · App Developer · Strategist<br/>
              jothamhall.com
            </p>
          </div>
        `,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
