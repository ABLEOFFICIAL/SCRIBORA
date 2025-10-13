"use client";
import React, { useState } from "react";
import Input from "./Input";
import { Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setEmailSuccess } from "@/store/contextSlice";
import emailjs from "@emailjs/browser";

export default function Newsletter() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { emailSuccess } = useSelector((state) => state.context);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_xw05ht7";
    const templateID = "template_vqxo8x7";
    const publicKey = "0-UL1jRHodRtq_rl7";

    const templateParams = {
      email: email,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey).then(
      () => {
        setEmail("");
        setIsSubmitting(false);
      },
      (error) => {
        setIsSubmitting(false);
        console.error("EmailJS error:", error);
      }
    );
    dispatch(setEmailSuccess(true));
    setTimeout(() => {
      dispatch(setEmailSuccess(false));
    }, 3000);
  };
  return (
    <div
      style={{ backgroundImage: "url('/Group 8 (5).png')" }}
      className="w-full h-72 bg-cover bg-no-repeat rounded-lg  space-y-4"
    >
      <div className="bg-blue-500/40 h-full w-full p-6 rounded-lg flex flex-col items-center space-y-4 justify-center">
        <h2 className="text-3xl font-medium text-white font-serif text-center">
          Subscribe to receive daily news updates.
        </h2>
        <form onSubmit={handleSubscribe} className="flex space-x-2 relative">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="h-10 text-xs w-64 rounded-lg px-3 focus:outline-none border border-white text-white"
          />
          <button
            type="submit"
            className="bg-amber-500 text-white font-semibold text-sm px-4 rounded-lg absolute right-0 top-0 h-full w-24"
          >
            Subscribe
          </button>
        </form>
        <div
          className="flex items-center gap-2 cursor-pointer text-xs text-white font-semibold"
          onClick={() => setIsSubscribed(!isSubscribed)}
        >
          {isSubscribed ? (
            <Check className="text-black bg-white rounded-sm size-4 p-0.5" />
          ) : (
            <span className="w-4 h-4 rounded-sm bg-white block"></span>
          )}
          <p>Accept Terms and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}
