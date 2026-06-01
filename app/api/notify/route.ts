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
      from: "JothamHall.com <onboarding@resend.dev>",
      to: "bigfilmsonly@gmail.com",
      subject,
      html,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
