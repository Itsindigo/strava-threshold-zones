import classNames from "classnames";
import React, { ChangeEvent } from "react";

interface IProps {
  id: string;
  inputMode?: "text" | "numeric";
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  extraClasses?: string;
}

const InputField = ({
  id,
  inputMode,
  label,
  name,
  value,
  onChange,
  extraClasses,
}: IProps) => {
  const classes = classNames(
    `text-white border text-center
    shadow-sm shadow-white caret-blue-300
    focus:outline-none rounded`,
    extraClasses
  );
  return (
    <>
      <label htmlFor={id} className="mb-2">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode || "text"}
        className={classes}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputField;
