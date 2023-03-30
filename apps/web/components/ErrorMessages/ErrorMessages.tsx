import React from "react";

interface IProps {
  errors: string[];
}

const ErrorMessages: React.FC<IProps> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-700 px-4 py-3 rounded relative font-semibold">
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorMessages;
