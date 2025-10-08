import Nav from "@/components/Nav";
import Link from "next/link";
import React from "react";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <div className="bg-gray-50 min-h-screen">
        {/* Header Section */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-6 text-center">
            About Scribora
          </h1>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            Scribora is your trusted digital news platform, delivering accurate,
            engaging, and up-to-date stories from around the world. Our mission
            is to keep readers informed with reliable journalism that cuts
            through the noise.
          </p>
          <p className="text-base text-gray-700 leading-relaxed mb-4">
            From breaking news to in-depth features, Scribora covers politics,
            business, technology, entertainment, and culture with integrity and
            clarity. We believe that information should be accessible, unbiased,
            and thought-provoking.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Our editorial team is committed to ensuring every story we publish
            meets the highest standards of journalism, giving our readers the
            insights they need to make sense of today’s fast-moving world.
          </p>
        </section>

        {/* Mission / Values Section */}
        <section className="bg-white py-12 border-t">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
              <p className="text-gray-700">
                To empower communities through accessible news and create a
                space where voices are heard and stories matter.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Our Values</h2>
              <p className="text-gray-700">
                We stand for truth, transparency, and fairness. Our reporting is
                guided by accuracy and integrity.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-3">Our Vision</h2>
              <p className="text-gray-700">
                To become a global hub for digital storytelling, connecting
                readers to stories that inspire, inform, and spark change.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-neutral-500 py-12 mt-12">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to know more about Scribora?
            </h2>
            <p className="text-indigo-100 mb-6">
              Explore our latest articles, follow us on social platforms, or get
              in touch with our editorial team.
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
