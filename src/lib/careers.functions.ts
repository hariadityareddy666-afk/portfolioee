import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { portfolio } from "@/config";
import type { Database } from "@/integrations/supabase/types";

const applicationSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().max(20).optional(),
  roleId: z.string().trim().min(1).max(100),
  message: z.string().trim().min(20, "Tell me a little more about the work").max(2000),
  links: z
    .union([z.literal(""), z.string().trim().url("Link must be a full URL").max(500)])
    .optional(),
  /** Honeypot — must stay empty; bots tend to fill it in. */
  website: z.string().max(200).optional(),
});

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const TO_ADDRESS = "hariadityareddy666@gmail.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website && data.website.trim().length > 0) {
      // Silently accept: never tell a bot it was caught.
      return { ok: true as const };
    }

    const role =
      portfolio.careers.roles.find((r) => r.id === data.roleId) ??
      portfolio.careers.roles[0];
    if (!role) {
      throw new Error("No roles are configured. Please email me instead.");
    }

    // Store the application with an unauthenticated (anon) insert — RLS only
    // allows INSERT, so submitted details are never readable through the API.
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabasePublic = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false },
      // Opaque sb_ keys aren't JWTs; send only apikey, not the default bearer.
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { error } = await supabasePublic.from("career_applications").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ? data.phone : null,
      role_id: role.id,
      role_title: role.title,
      message: data.message,
      links: data.links ? data.links : null,
    });

    if (error) {
      console.error("Application insert failed:", error.message);
      throw new Error("Could not save your application. Please email me instead.");
    }

    // Notify the inbox with the same Resend path the contact form uses.
    // Email is best-effort: the application is already stored.
    const lovableApiKey = process.env["LOVABLE_API_KEY"];
    const resendApiKey = process.env["RESEND_API_KEY"];
    if (lovableApiKey && resendApiKey) {
      try {
        const html = `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
            <h2 style="margin:0 0 16px">New role application</h2>
            <p><strong>Role:</strong> ${escapeHtml(role.title)} (${escapeHtml(role.type)})</p>
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
            ${data.links ? `<p><strong>Links:</strong> ${escapeHtml(data.links)}</p>` : ""}
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
            subject: `Application: ${role.title} — ${data.name}`,
            html,
          }),
        });
        if (!response.ok) {
          console.error(
            `Application notification failed [${response.status}]: ${await response.text()}`,
          );
        }
      } catch (notifyError) {
        console.error("Application notification error:", notifyError);
      }
    }

    return { ok: true as const };
  });
