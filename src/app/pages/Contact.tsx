import { Mail, MapPin } from "lucide-react";
import React, { useState } from "react";
import { supabase } from "../lib/supabase";

type FormState = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, subject, message } = fields;
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMessage("Please fill in all fields.");
      setFormState("error");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    const { error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, subject, message }]);

    if (error) {
      setErrorMessage("Something went wrong. Please try emailing us directly.");
      setFormState("error");
      return;
    }

    setFormState("success");
    setFields({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Have a restaurant recommendation? Want to collaborate? Join the team!? Or just want to chat about food?
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Send us a message</h2>

            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="size-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">Message sent!</h3>
                <p className="text-stone-600 mb-6">Thanks for reaching out — we'll get back to you soon.</p>
                <button
                  onClick={() => setFormState("idle")}
                  className="px-4 py-2 text-sm text-pink-600 font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    placeholder="Your name"
                    disabled={formState === "submitting"}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    placeholder="your@email.com"
                    disabled={formState === "submitting"}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={fields.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                    placeholder="What's this about?"
                    disabled={formState === "submitting"}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={fields.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none"
                    placeholder="Tell us what's on your mind..."
                    disabled={formState === "submitting"}
                  />
                </div>

                {formState === "error" && (
                  <p className="text-sm text-red-600">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === "submitting" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Mail className="size-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-2">Email</h3>
                    <a
                      href="mailto:stickaforkinitpersonal@gmail.com"
                      className="text-stone-600 hover:text-pink-600 transition-colors"
                    >
                      stickaforkinitpersonal@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <MapPin className="size-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">Location</h3>
                    <p className="text-stone-600">
                      Hamilton, Toronto, Montreal
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-stone-900 mb-3">
                Restaurant Submissions
              </h3>
              <p className="text-stone-700 mb-4">
                Know a hidden gem I should review or are you a restaurant that wants to collab? I'm always on the hunt for exceptional
                dining experiences, from street food to fine dining.
              </p>
              <p className="text-sm text-stone-600">
                Please include the restaurant name, location, and what makes it special.
                My team personally reviews all suggestions and visit as many as we can!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
