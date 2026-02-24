import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export function Contact() {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Have a restaurant recommendation? Want to collaborate? Or just want to chat about food? 
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  placeholder="Your name"
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
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  placeholder="your@email.com"
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
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
                  placeholder="What's this about?"
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
                  className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
              >
                Send Message
              </button>
            </form>
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
                      href="mailto:hello@stickafork.init" 
                      className="text-stone-600 hover:text-pink-600 transition-colors"
                    >
                      hello@stickafork.init
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Phone className="size-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-2">Phone</h3>
                    <a 
                      href="tel:+15551234567" 
                      className="text-stone-600 hover:text-pink-600 transition-colors"
                    >
                      +1 (555) 123-4567
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
                      San Francisco, CA<br />
                      United States
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
                Know a hidden gem we should review? We're always on the hunt for exceptional 
                dining experiences, from street food to fine dining.
              </p>
              <p className="text-sm text-stone-600">
                Please include the restaurant name, location, and what makes it special. 
                We review all suggestions and visit as many as we can!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}