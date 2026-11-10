"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/lib/data";

/**
 * Message form. If NEXT_PUBLIC_FORM_ENDPOINT is set (e.g. a free Formspree endpoint such as
 * https://formspree.io/f/xxxxxxx) the message is sent there and arrives in your inbox.
 * Without it, the form opens the visitor's email app with the message already written.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const field =
  "mt-2 w-full rounded-lg border border-navy/30 bg-paper px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-navy";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never see or fill this field.
    if (data.get("website")) {
      setStatus("sent");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = topic ? `${topic} — message from ${name}` : `Message from ${name}`;

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, email, topic, message, _subject: subject }),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-navy p-8">
        <h2 className="display text-3xl font-semibold">Message sent.</h2>
        <p className="mt-3 text-ink-soft">Thanks for reaching out. I&apos;ll reply to the email you gave me.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="rule-link mt-6 text-sm font-medium text-navy"
        >
          Send another message
        </button>
      </div>
    );
  }

  const busy = status === "sending";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">Your name</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className="label">Your email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="topic" className="label">What is it about?</label>
        <select id="topic" name="topic" defaultValue="" className={`${field}`}>
          <option value="">Choose one (optional)</option>
          <option>A project or collaboration</option>
          <option>An internship or job</option>
          <option>A question about my work</option>
          <option>Just saying hello</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="label">Message</label>
        <textarea id="message" name="message" required rows={6} className={`${field} resize-y`} />
      </div>

      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-red px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-red-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send message"}
        </button>
        <p role="status" className="text-sm text-ink-soft">
          {status === "mailto" &&
            `Your email app should open with the message ready. If nothing opens, write to ${profile.email}.`}
          {status === "error" && `Something went wrong. Please try again, or write to ${profile.email}.`}
        </p>
      </div>
    </form>
  );
}
