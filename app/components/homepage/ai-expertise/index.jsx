// @flow strict

import {
  TbBinaryTree,
  TbBuildingFactory2,
  TbPlugConnected,
  TbShieldCheck,
} from "react-icons/tb";

const capabilities = [
  {
    title: "Agentic system design",
    description:
      "Design single- and multi-agent systems that plan, use tools, delegate work, retain context, and escalate when human judgment is required.",
    icon: TbBinaryTree,
  },
  {
    title: "Workflow integration",
    description:
      "Connect AI to the systems where work already happens—APIs, internal tools, content platforms, ticketing, data stores, and operational processes.",
    icon: TbPlugConnected,
  },
  {
    title: "AI-enabled delivery",
    description:
      "Equip engineering and business teams with repeatable agent workflows for research, implementation, review, documentation, and quality assurance.",
    icon: TbBuildingFactory2,
  },
  {
    title: "Production guardrails",
    description:
      "Build for observability, evaluation, permissions, cost control, data boundaries, and human approval—not just a convincing prototype.",
    icon: TbShieldCheck,
  },
];

const deliverySteps = [
  ["01", "Find leverage", "Identify high-value work where AI can improve speed, quality, or capacity."],
  ["02", "Design the system", "Choose the right model, tools, data access, agent boundaries, and human checkpoints."],
  ["03", "Integrate the workflow", "Connect the system to real software, teams, and operating processes."],
  ["04", "Evaluate with experience", "Recognize correctness, test reliability and business impact, and refine the system over time."],
];

function AIExpertise() {
  return (
    <section
      id="ai-expertise"
      aria-labelledby="ai-expertise-heading"
      className="relative scroll-mt-20 border-y border-[#25213b] py-16 lg:py-24"
    >
      <div className="absolute left-1/2 top-24 -z-10 h-48 w-48 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
          AI expertise
        </p>
        <h2
          id="ai-expertise-heading"
          className="mt-3 text-3xl font-bold text-white sm:text-4xl"
        >
          Beyond prompting. I build the system around the model.
        </h2>
        <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
          Useful AI is an engineering and operations problem. I combine model
          capabilities with software architecture, business context, and
          responsible controls to move AI from experimentation into dependable
          day-to-day work.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {capabilities.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="rounded-2xl border border-[#293052] bg-[#11152c]/80 p-6 transition-colors duration-200 hover:border-violet-500/70"
          >
            <Icon aria-hidden="true" className="text-[#16f2b3]" size={30} />
            <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
            <p className="mt-3 leading-7 text-gray-300">{description}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-950/30 to-[#11152c] p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-white">
          From opportunity to operating capability
        </h3>
        <ol className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {deliverySteps.map(([number, title, description]) => (
            <li key={number}>
              <span className="font-mono text-sm text-pink-400">{number}</span>
              <h4 className="mt-2 font-semibold text-white">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                {description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-4 border-t border-violet-400/20 pt-7 sm:grid-cols-[auto_1fr] sm:gap-7">
          <span className="h-fit rounded-md border border-pink-400/30 bg-pink-500/10 px-3 py-2 font-mono text-xs text-pink-300">
            human_judgment
          </span>
          <div>
            <h4 className="text-lg font-semibold text-white">
              Experience recognizes correctness.
            </h4>
            <p className="mt-2 max-w-3xl leading-7 text-gray-300">
              AI can generate an answer that looks plausible. Knowing what right
              looks like—seeing whether it fits the real system, catching what is
              subtly wrong, and deciding what is safe and ready to ship—is earned
              through experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIExpertise;
