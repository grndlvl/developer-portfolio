"use client";

import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

const capabilities = [
  "I orchestrate specialized AI agents.",
  "I automate real business workflows.",
  "I combine deterministic tests with AI judgment.",
  "I ship AI into production.",
];

function RotatingCapabilities() {
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const updateMotionPreference = () =>
      setReduceMotion(motionPreference.matches);

    updateMotionPreference();
    motionPreference.addEventListener("change", updateMotionPreference);

    return () =>
      motionPreference.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <>
      <span className="sr-only">
        I orchestrate specialized AI agents, automate business workflows,
        combine deterministic testing with AI judgment, and ship AI into
        production.
      </span>
      <span aria-hidden="true">
        {reduceMotion ? (
          capabilities[0]
        ) : (
          <Typewriter
            options={{
              strings: capabilities,
              autoStart: true,
              loop: true,
              delay: 42,
              deleteSpeed: 24,
              pauseFor: 1800,
            }}
          />
        )}
      </span>
    </>
  );
}

export default RotatingCapabilities;
