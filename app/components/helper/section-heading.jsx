// @flow strict

function SectionHeading({ id, eyebrow, title, intro, className = "" }) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#16f2b3]">
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-bold text-white sm:text-4xl"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;
