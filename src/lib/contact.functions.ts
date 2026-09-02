import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { verifyChallenge } from "./captcha.server";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(12, "Message is too short").max(2000),
  captchaToken: z.string().min(1).max(300),
  captchaAnswer: z.string().trim().min(1).max(10),
  /** Honeypot — must stay empty; bots tend to fill it in. */
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const TO_ADDRESS = "hariadityareddy666@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website && data.website.trim().length > 0) {
      // Silently accept: never tell a bot it was caught.
      return { sent: true as const };
    }

    const captchaOk = await verifyChallenge(data.captchaToken, data.captchaAnswer);
    if (!captchaOk) {
      throw new Error("CAPTCHA_FAILED");
    }

    const lovableApiKey = process.env["LOVABLE_API_KEY"];
    const resendApiKey = process.env["RESEND_API_KEY"];

    if (!lovableApiKey || !resendApiKey) {
      throw new Error("Email is not configured yet.");
    }

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h2 style="margin:0 0 16px">New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
      </div>
    `;

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
        "X-Connection-Api-Key": resendApiKey,
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [TO_ADDRESS],
        reply_to: data.email,
        subject: `Portfolio message from ${data.name}`,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Resend request failed [${response.status}]: ${errorBody}`);
      throw new Error(`Email delivery failed [${response.status}]: ${errorBody}`);
    }

    return { sent: true as const };
  });
