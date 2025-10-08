"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Nav from "@/components/Nav";

const faqs = [
  {
    question: "What is Scribora?",
    answer:
      "Scribora is a digital news platform delivering reliable, timely, and engaging stories on politics, lifestyle, entertainment, business, and more.",
  },
  {
    question: "How often do you publish news?",
    answer:
      "We update our platform daily with fresh stories and breaking news updates. Some categories, like Politics and Business, may have multiple updates throughout the day.",
  },
  {
    question: "Can I submit a story or article?",
    answer:
      "Yes! We welcome story contributions and opinion pieces. Send your pitch to editor@scribora.com, and our editorial team will review it.",
  },
  {
    question: "Is Scribora free to use?",
    answer:
      "Yes. Scribora is completely free to read. However, we may introduce premium features in the future for exclusive content.",
  },
  {
    question: "How can I report misinformation?",
    answer:
      "If you come across misinformation, please email report@scribora.com with the article link and details. Our team will investigate promptly.",
  },
  {
    question: "Do you have a mobile app?",
    answer:
      "Currently, Scribora is web-based, but we’re working on a mobile app for Android and iOS to make your news experience even better.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Nav />
      <div className="bg-gray-50 min-h-screen py-12 px-6">
        {/* Header */}
        <section className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-700">
            Find answers to the most common questions about Scribora. Still need
            help?{" "}
            <a href="/contact" className="text-indigo-600 font-medium">
              Contact us
            </a>
            .
          </p>
        </section>

        {/* FAQ Accordion */}
        <section className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full h-20 flex justify-between items-center px-6 py-4 text-left font-medium text-gray-800 hover:bg-gray-100 transition"
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
              )}
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
