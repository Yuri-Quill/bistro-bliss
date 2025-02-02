import { Link } from "react-router-dom";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

import "./Buttons.scss";

interface BaseButtonProps {
	variant?: "base" | "active";
}

interface ButtonTypes
	extends BaseButtonProps,
		ButtonHTMLAttributes<HTMLButtonElement> {}

interface ButtonLinkTypes
	extends BaseButtonProps,
		AnchorHTMLAttributes<HTMLAnchorElement> {
	to: string;
}

const ButtonClassNames = (
	baseClass: string,
	variant: "base" | "active",
	className?: string
): string => {
	const variantClass = variant !== "base" ? `${baseClass}--${variant}` : "";
	return [baseClass, variantClass, className].filter(Boolean).join(" ");
};

export const Button = ({
	className,
	variant = "base",
	children,
	...props
}: ButtonTypes) => {
	const baseClass = "btn";

	return (
		<button
			className={ButtonClassNames(baseClass, variant, className)}
			{...props}
		>
			{children}
		</button>
	);
};

export const ButtonLink = ({
	to,
	className,
	variant = "base",
	children,
	...props
}: ButtonLinkTypes) => {
	const baseClass = "btn-link";

	return (
		<Link
			className={ButtonClassNames(baseClass, variant, className)}
			to={to}
			{...props}
		>
			{children}
		</Link>
	);
};
