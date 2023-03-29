import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

type Variant = "primary" | "secondary" | "success" | "danger";

const buttonBgColours: { [key in Variant]: string } = {
  primary: "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700",
  secondary: "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700",
  success: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
  danger: "bg-gradient-to-r from-red-500 via-red-600 to-red-700",
};

const buttonHoverColours: { [key in Variant]: string } = {
  primary: "hover:bg-gradient-to-br focus:bg-gradient-to-br",
  secondary: "hover:bg-orange-500",
  success: "hover:bg-green-500",
  danger: "hover:bg-red-500",
};

const buttonFontColours: { [key in Variant]: string } = {
  primary: "text-white",
  secondary: "text-white",
  success: "text-white",
  danger: "text-white",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  extraClasses?: string;
  variant?: Variant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  extraClasses = "",
  variant = "primary",
  ...rest
}) => {
  const classes = classNames(
    buttonBgColours[variant],
    buttonFontColours[variant],
    buttonHoverColours[variant],
    "py-2 px-2 font-semibold shadow-sm shadow-white",
    extraClasses
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default Button;
