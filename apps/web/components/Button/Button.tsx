import React, { ButtonHTMLAttributes } from "react";
import classNames from "classnames";

type Variant = "primary" | "secondary" | "success" | "danger";

const buttonBgColours: { [key in Variant]: string } = {
  primary: "bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700",
  secondary: "bg-orange-300",
  success: "bg-green-300",
  danger: "bg-red-300",
};

const buttonHoverColours: { [key in Variant]: string } = {
  primary: "hover:bg-gradient-to-br",
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
  className?: string;
  variant?: Variant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...rest
}) => {
  const classes = classNames(
    buttonBgColours[variant],
    buttonFontColours[variant],
    buttonHoverColours[variant],
    className
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: "",
  variant: "primary",
};

export default Button;
