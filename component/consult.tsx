"use client";

import { useState, type FormEvent } from "react";
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

export default function ConsultNow() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSubmitted(false);
    setError(false);
    setErrorMessage("");

    const form = new FormData(e.currentTarget);
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
          // Keep default error message
        }

        throw new Error(message);
      }

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

      e.currentTarget.reset();
    } catch (err) {
      console.error("Consultation form error:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Unable to send your message. Please try again.";

      setErrorMessage(message);
      setError(true);

      // Hide error message after 3 seconds
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="consult" className="bg-white py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-8">
        {/* Left Content */}
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

        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {/* Name */}
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

            {/* Email */}
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

            {/* Phone */}
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

            {/* Company */}
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

            {/* Message */}
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

            {/* Submit */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Submit Consultation"}
              </button>
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 sm:col-span-2">
                <CheckCircle2 size={18} />

                <span>
                  Thank you! Your message has been sent successfully.
                </span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700 sm:col-span-2">
                <AlertCircle size={18} />

                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}