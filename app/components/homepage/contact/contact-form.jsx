"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput
      );

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    };
  };

  return (
    <div>
      <div className="max-w-3xl text-white rounded-2xl border border-[#293052] bg-[#11152c]/80 p-4 lg:p-6">
        <p className="text-sm text-[#d3d8e8]">{"Have an AI workflow to design, a product to shape, or a small-business idea that needs experienced technical execution? Tell me what you’re trying to accomplish."}</p>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSendMail}>
          <div className="flex flex-col gap-2">
            <label className="text-base" htmlFor="contact-name">Your Name: </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base" htmlFor="contact-email">Your Email: </label>
            <input
              id="contact-email"
              name="email"
              autoComplete="email"
              aria-describedby={error.email ? "contact-email-error" : undefined}
              aria-invalid={error.email}
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email && <p id="contact-email-error" role="alert" className="text-sm text-red-400">Enter a valid email address.</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base" htmlFor="contact-message">Your Message: </label>
            <textarea
              id="contact-message"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            {error.required && <p role="alert" className="text-sm text-red-400">
              All fields are required.
            </p>}
            <button
              type="submit"
              className="flex min-h-11 items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60 md:font-semibold"
              disabled={isLoading}
            >
              {
                isLoading ?
                <span>Sending Message...</span>:
                <span className="flex items-center gap-1">
                  Send Message
                  <TbMailForward size={20} />
                </span>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
