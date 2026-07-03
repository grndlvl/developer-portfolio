"use client";
// @flow strict

import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbRocket } from "react-icons/tb";
import { toast } from "react-toastify";

const EMPTY = { name: "", email: "", business: "", details: "" };

// Reuses the shared /api/contact endpoint. Launch-specific fields are composed
// into the `message` so no backend change is needed.
function LaunchForm({ mailtoHref }) {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState(EMPTY);

  const checkRequired = () => {
    if (userInput.email && userInput.details && userInput.name) {
      setError((prev) => ({ ...prev, required: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.name || !userInput.email || !userInput.details) {
      setError((prev) => ({ ...prev, required: true }));
      return;
    }
    if (error.email) return;
    setError((prev) => ({ ...prev, required: false }));

    const message = `grndlvl Launch project inquiry\n\nBusiness: ${
      userInput.business || "—"
    }\n\n${userInput.details}`;

    try {
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/contact`, {
        name: userInput.name,
        email: userInput.email,
        message,
      });
      toast.success("Thanks — your project details are on the way!");
      setUserInput(EMPTY);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-[#353a52] bg-[#0a0d1f] px-3 py-2 text-white transition-all duration-300 focus:border-[#16f2b3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

  return (
    <div className="rounded-2xl border border-[#293052] bg-[#0d1224]/80 p-5 sm:p-6">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-200" htmlFor="launch-name">
              Your name
            </label>
            <input
              id="launch-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength="100"
              required
              className={inputClass}
              value={userInput.name}
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              onBlur={checkRequired}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-200" htmlFor="launch-email">
              Your email
            </label>
            <input
              id="launch-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength="100"
              required
              aria-describedby={error.email ? "launch-email-error" : undefined}
              aria-invalid={error.email}
              className={inputClass}
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email && (
              <p id="launch-email-error" role="alert" className="text-sm text-red-400">
                Enter a valid email address.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-200" htmlFor="launch-business">
            Business or organization{" "}
            <span className="text-gray-400">(optional)</span>
          </label>
          <input
            id="launch-business"
            name="business"
            type="text"
            autoComplete="organization"
            maxLength="120"
            className={inputClass}
            value={userInput.business}
            onChange={(e) =>
              setUserInput({ ...userInput, business: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-200" htmlFor="launch-details">
            What are you building?
          </label>
          <textarea
            id="launch-details"
            name="details"
            rows="4"
            maxLength="800"
            required
            placeholder="What you're building, what you need people to do, and what's getting in the way."
            className={`${inputClass} placeholder:text-gray-400`}
            value={userInput.details}
            onChange={(e) =>
              setUserInput({ ...userInput, details: e.target.value })
            }
            onBlur={checkRequired}
          />
        </div>

        {error.required && (
          <p role="alert" className="text-sm text-red-400">
            Name, email, and project details are required.
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <span>Sending…</span>
          ) : (
            <span className="flex items-center gap-2">
              <TbRocket aria-hidden="true" size={18} className="-rotate-45" />
              Start a grndlvl Launch Project
            </span>
          )}
        </button>

        {mailtoHref && (
          <p className="text-sm text-gray-400">
            Prefer email?{" "}
            <a
              href={mailtoHref}
              className="font-semibold text-[#16f2b3] underline decoration-[#16f2b3]/40 underline-offset-4 hover:decoration-[#16f2b3]"
            >
              Email me directly
            </a>
            .
          </p>
        )}
      </form>
    </div>
  );
}

export default LaunchForm;
