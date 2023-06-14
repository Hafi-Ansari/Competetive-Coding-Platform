import React from "react"

const ProblemStatement = ({ title, description }) => (
  <div>
    <h2 className="text-2xl mb-4 text-white font-bold">
      {title}
    </h2>
    <p className="text-white mb-4">
      {description}
    </p>
  </div>
);

export default ProblemStatement