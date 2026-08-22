import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { portfolio } from "@/config";
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
      const endpoint = portfolio.contact.formEndpoint;
      if (endpoint) {
        // Ready for Formspree / any POST endpoint.
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((r) => setTimeout(r, 1400));
      }
      toast.success("Message sent — I'll get back to you shortly.");
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
            <a
              href={`mailto:${portfolio.person.email}`}
              className="flex items-center gap-3 text-sm transition-colors hover:text-accent"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-accent">
                <Mail className="h-4 w-4" />
              </span>
              {portfolio.person.email}
            </a>
            <p className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-accent">
                <MapPin className="h-4 w-4" />
              </span>
              {portfolio.person.location}
            </p>
          </div>
          <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
            {portfolio.person.availability}. Typical reply time: under two business
            days.
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
                placeholder="Ada Lovelace"
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
                placeholder="you@company.com"
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
              placeholder="What are you building?"
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
