"use client";

import { useRef, useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "support@hubble.com",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 98765 43210",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Bangalore, India",
  },
];

type Status =
  | { state: "idle" }
  | { state: "success" }
  | { state: "error"; message: string };

export default function ConsultNow() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [loading, setLoading] = useState(false);

  // Tracks the pending "auto-hide" timer so a second submit can cancel it —
  // otherwise a leftover timer from a previous success/error could clear
  // the *new* message at the wrong moment.
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showStatus(next: Status) {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setStatus(next);
    hideTimeoutRef.current = setTimeout(() => {
      setStatus({ state: "idle" });
    }, 3000);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Grab a stable reference to the form BEFORE any `await`. React nulls
    // out `e.currentTarget` once the synchronous part of the handler
    // finishes, so using `e.currentTarget` after an awaited fetch throws
    // "Cannot read properties of null (reading 'reset')".
    const formEl = e.currentTarget;

    setLoading(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    setStatus({ state: "idle" });

    const form = new FormData(formEl);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/consult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let message = "Something went wrong. Please try again.";

        try {
          const data = await response.json();

          if (data?.message) {
            message = data.message;
          }
        } catch {
        }

        throw new Error(message);
      }

      showStatus({ state: "success" });
      formEl.reset();
    } catch (err) {
      console.error("Consultation form error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Unable to send your message. Please try again.";

      showStatus({ state: "error", message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="consult" className="bg-white py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <span className="text-sm font-semibold text-blue-600">
            Get In Touch
          </span>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Consult Now
          </h2>

          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-500">
            Have questions or need a custom solution? Fill out the form and
            our team will get back to you shortly.
          </p>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:flex-wrap">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50">
                  <Icon size={18} className="text-blue-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">{label}</p>

                  <p className="text-sm font-medium text-slate-900">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Name <span className="text-red-500">*</span>
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email <span className="text-red-500">*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Company (Optional)
              </label>

              <input
                id="company"
                name="company"
                type="text"
                placeholder="Your company name"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Message <span className="text-red-500">*</span>
              </label>

              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell us about your requirements..."
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Submit Consultation"}
              </button>
            </div>

            {status.state === "success" && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 sm:col-span-2">
                <CheckCircle2 size={18} />

                <span>
                  Thank you! Your message has been sent successfully.
                </span>
              </div>
            )}

           
          </form>
        </div>
      </div>
    </section>
  );
}