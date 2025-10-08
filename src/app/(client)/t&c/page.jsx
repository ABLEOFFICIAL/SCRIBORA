import Nav from "@/components/Nav";
import Link from "next/link";
import React from "react";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Terms & Conditions
          </h1>
          <p className="text-base text-gray-700 mb-4">
            Welcome to Scribora. By accessing or using our website, you agree to
            comply with and be bound by the following Terms and Conditions.
            Please read them carefully before using our platform.
          </p>
          <p className="text-base text-gray-700">
            These Terms may be updated from time to time, and it is your
            responsibility to review them regularly.
          </p>
        </section>

        {/* Sections */}
        <section className="bg-white py-12 border-t">
          <div className="max-w-5xl mx-auto px-6 space-y-8">
            {/* Section 1 */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">1. Use of Content</h2>
              <p className="text-gray-700">
                All articles, images, videos, and other materials published on
                Scribora are protected by copyright and intellectual property
                laws. You may not reproduce, distribute, or modify our content
                without prior written consent, except for personal and
                non-commercial use.
              </p>
            </div>

            {/* Section 2 */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">2. User Conduct</h2>
              <p className="text-gray-700">
                You agree to use Scribora responsibly and lawfully. Any activity
                that promotes hate speech, misinformation, harassment, or
                unlawful behavior is strictly prohibited.
              </p>
            </div>

            {/* Section 3 */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">3. External Links</h2>
              <p className="text-gray-700">
                Our articles may contain links to third-party websites. Scribora
                is not responsible for the content, privacy policies, or
                practices of external sites.
              </p>
            </div>

            {/* Section 4 */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">
                4. Limitation of Liability
              </h2>
              <p className="text-gray-700">
                While we strive to provide accurate and timely news, Scribora
                does not guarantee that all information will always be
                error-free or up-to-date. We are not liable for any damages
                resulting from the use of our platform.
              </p>
            </div>

            {/* Section 5 */}
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">5. Governing Law</h2>
              <p className="text-gray-700">
                These Terms & Conditions are governed by the applicable laws of
                your country of residence. Any disputes will be resolved in
                accordance with those laws.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-neutral-500 py-12 mt-12">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Have questions about our Terms?
            </h2>
            <p className="text-indigo-100 mb-6">
              Reach out to our editorial and support team for clarification or
              further details.
            </p>
            <Link
              href="/contact-us"
              className="inline-block bg-amber-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-amber-600 transition"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
