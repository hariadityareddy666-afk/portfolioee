import { motion } from "framer-motion";
import { Check, Copy, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { portfolio } from "@/config";
import { sendContactMessage } from "@/lib/contact.functions";
import { cn } from "@/lib/utils";
import { Section } from "./Section";


type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell me your name.";
  if (!values.email.trim()) errors.email = "An email is required.";
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = "That doesn't look like a valid email.";
  if (!values.message.trim()) errors.message = "Please add a short message.";
  else if (values.message.trim().length < 12)
    errors.message = "A little more detail helps (12+ characters).";
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const send = useServerFn(sendContactMessage);


  async function copyEmail() {
    const email = portfolio.person.email;
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Clipboard API unavailable (e.g. non-secure context) — legacy fallback.
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    toast.success("Email address copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  }

  function set<K extends keyof Fields>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      await send({
        data: {
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        },
      });
      toast.success("Message sent — it's in my inbox. I'll get back to you shortly.");
      setValues({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please email me directly.");
    } finally {
      setLoading(false);
    }

  }

  const inputBase =
    "w-full rounded-xl border bg-background/40 px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/25";

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={portfolio.contact.heading}
      intro={portfolio.contact.subheading}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass flex flex-col justify-between rounded-3xl p-8"
        >
          <div className="space-y-5">
            {portfolio.person.email && (
              <div className="flex items-center gap-3">
                <a
                  href={`mailto:${portfolio.person.email}`}
                  className="flex items-center gap-3 text-sm transition-colors hover:text-accent"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-accent">
                    <Mail className="h-4 w-4" />
                  </span>
                  {portfolio.person.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label={copied ? "Email address copied" : "Copy email address"}
                  className="grid h-8 w-8 place-items-center rounded-full border border-glass-border bg-secondary/40 text-muted-foreground transition-colors hover:text-accent"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-accent">
                <Phone className="h-4 w-4" />
              </span>
              {portfolio.person.phone} ({portfolio.person.phoneNote})
            </p>
            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-accent">
                <MapPin className="h-4 w-4" />
              </span>

              {portfolio.person.location}
            </p>
          </div>
          <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
            {portfolio.person.availability}.
          </p>
        </motion.div>

        <motion.form
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass space-y-5 rounded-3xl p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                className={cn(inputBase, errors.name ? "border-destructive" : "border-glass-border")}
              />
              {errors.name && (
                <p className="mt-2 text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                className={cn(inputBase, errors.email ? "border-destructive" : "border-glass-border")}
              />
              {errors.email && (
                <p className="mt-2 text-xs text-destructive">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Your message"
              aria-invalid={Boolean(errors.message)}
              className={cn(
                inputBase,
                "resize-none",
                errors.message ? "border-destructive" : "border-glass-border",
              )}
            />
            {errors.message && (
              <p className="mt-2 text-xs text-destructive">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="glow-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-95 disabled:opacity-60 sm:w-auto"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Send message
              </>
            )}
          </button>
        </motion.form>
      </div>
    </Section>
  );
}
