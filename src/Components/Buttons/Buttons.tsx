import { Link } from "react-router-dom";

import "./Buttons.scss";

type ButtonVariant = "default" | "active";

interface BaseButtonProps {
	children: React.ReactNode;
	className: string;
	variant?: ButtonVariant;
	ariaLabel: string;
}

interface ButtonTypes extends BaseButtonProps {
	type: "button" | "submit" | "reset";
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
}

interface ButtonLinkTypes extends BaseButtonProps {
	to: string;
}
const ButtonClassNames = (
	baseClass: string,
	variant: string,
	className: string
): string => {
	const variantClass = variant !== "default" ? `${baseClass}--${variant}` : "";
	return [baseClass, variantClass, className].filter(Boolean).join(" ");
};

export const Button = ({
	children,
	type,
	ariaLabel,
	onClick,
	className,
	variant = "default",
	disabled,
}: ButtonTypes) => {
	const baseClass = "btn";

	return (
		<button
			className={ButtonClassNames(baseClass, variant, className)}
			type={type}
			aria-label={ariaLabel}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export const ButtonLink = ({
	children,
	to,
	ariaLabel,
	className,
	variant = "default",
}: ButtonLinkTypes) => {
	const baseClass = "btn-link";

	return (
		<Link
			className={ButtonClassNames(baseClass, variant, className)}
			to={to}
			aria-label={ariaLabel}
		>
			{children}
		</Link>
	);
};
