import { Link } from "react-router-dom";
import { ButtonHTMLAttributes, ComponentPropsWithoutRef } from "react";
import classNames from "classnames";

import "./Buttons.scss";

interface ButtonLinkProps extends ComponentPropsWithoutRef<typeof Link> {
	isActive?: boolean;
	isPrimary?: boolean;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isActive?: boolean;
	isPrimary?: boolean;
}

export const ButtonLink = ({
	children,
	className = "",
	isActive,
	isPrimary,
	...props
}: ButtonLinkProps) => {
	const buttonLinkClass = classNames(
		"button-link",
		{
			"button-link--active": isActive,
			"button-link--primary": isPrimary,
		},
		className
	);

	return (
		<Link className={buttonLinkClass} {...props}>
			{children}
		</Link>
	);
};

export const Button = ({
	children,
	type = "button",
	className = "",
	isActive,
	isPrimary,
	...props
}: ButtonProps) => {
	const buttonClass = classNames(
		"main-button",
		{
			"main-button--active": isActive,
			"main-button--primary": isPrimary,
		},
		className
	);

	return (
		<button className={buttonClass} type={type} {...props}>
			{children}
		</button>
	);
};
