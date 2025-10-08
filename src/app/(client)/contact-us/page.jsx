import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  FileText,
  AlertTriangle,
  Info,
} from "lucide-react";
import Nav from "@/components/Nav";

export default function ContactPage() {
  return (
    <>
      <Nav />
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-gray-700">
            Have a question, story idea, or concern? We’d love to hear from you.
            Choose the best way to reach out to our Scribora team below.
          </p>
        </section>

        {/* Contact Methods */}
        <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Online enquiry */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <MessageSquare className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Online Enquiry</h3>
            <p className="text-gray-600 mb-4">
              Send us a message and we’ll respond within 48 hours.
            </p>
            <a
              href="mailto:editor@scribora.com"
              className="inline-block bg-amber-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Send a Message
            </a>
          </div>

          {/* Call */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <Phone className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">
              +234 (0) 812 345 6789 <br />
              Mon – Fri, 9:00am – 6:00pm
            </p>
            <a
              href="tel:+2348123456789"
              className="inline-block bg-amber-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Call Now
            </a>
          </div>

          {/* Write to us */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <MapPin className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visit Our Office</h3>
            <p className="text-gray-600 mb-4">
              Scribora HQ <br />
              6 Ibekwe Drive, Awka <br />
              Anambra State, Nigeria
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              View on Map
            </a>
          </div>
        </section>

        {/* Other Requests */}
        <section className="max-w-6xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">Other Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <FileText className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="font-semibold mb-2">Media Enquiry</h3>
              <p className="text-gray-600 mb-3">
                For press and media-related requests.
              </p>
              <a
                href="mailto:press@scribora.com"
                className="text-blue-400 font-medium"
              >
                Make enquiry →
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <AlertTriangle className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="font-semibold mb-2">Report an Issue</h3>
              <p className="text-gray-600 mb-3">
                Found misinformation or content that concerns you?
              </p>
              <a
                href="mailto:report@scribora.com"
                className="text-blue-400 font-medium"
              >
                Raise concern →
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
              <Info className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="font-semibold mb-2">General Info</h3>
              <p className="text-gray-600 mb-3">
                Need assistance with navigating Scribora?
              </p>
              <a
                href="mailto:info@scribora.com"
                className="text-blue-400 font-medium"
              >
                Get help →
              </a>
            </div>
          </div>
        </section>

        {/* Feedback CTA */}
        <section className="bg-neutral-500 py-12">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              How helpful were we today?
            </h2>
            <p className="text-indigo-100 mb-6">
              At Scribora, your feedback matters. We’re committed to making our
              news platform better for you.
            </p>
            <a
              href="mailto:feedback@scribora.com"
              className="inline-block bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-amber-600 transition"
            >
              Send Feedback
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
