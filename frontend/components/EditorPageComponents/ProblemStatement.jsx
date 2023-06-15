import React from "react";

const ProblemStatement = ({ title, description, examples, constraints, followUp }) => (
  <div>
    <h2 className="text-2xl mb-4 text-white font-bold">
      {title}
    </h2>
    <p className="text-white mb-4">
      {description}
    </p>
    {examples && examples.map((example, index) => (
      <div key={index}>
        <h3 className="text-white block font-bold text-xs mb-2 pt-4">Example {index + 1}:</h3>
        <p className='w-full p-2 rounded bg-dark-accent-2 text-white'>{example}</p>
      </div>
    ))}
    {constraints && (
      <div>
        <h3 className="text-white block font-bold text-xs mb-2 pt-4">Constraints:</h3>
        <ul>
          {constraints.map((constraint, index) => (
            <li className="scale-90 mb-2 rounded bg-dark-accent-2 text-white"  key={index}>{constraint}</li>
          ))}
        </ul>
      </div>
    )}
    {followUp && (
      <div> 
        <h3 className="text-white block font-bold text-xs mb-2 pt-4">Follow Up:</h3>
        <p className="w-full p-2 rounded bg-dark-accent-2 text-white">{followUp}</p>
      </div>
    )}
  </div>
);

export default ProblemStatement;
