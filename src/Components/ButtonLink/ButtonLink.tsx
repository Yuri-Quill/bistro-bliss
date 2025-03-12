import { Link } from "react-router-dom";
import classNames from "classnames";

import "./ButtonLink.scss";

interface IButtonLink {
	children: React.ReactNode;
	href: string;
	isActive?: boolean;
	className: string;
	aria: string;
}

const ButtonLink = ({
	children,
	href,
	isActive = false,
	className,
	aria,
}: IButtonLink) => {
	const buttonLinkClass = classNames(
		"button-link",
		{
			"button-link--active": isActive,
		},
		className
	);

	return (
		<Link className={buttonLinkClass} to={href} aria-label={aria}>
			{children}
		</Link>
	);
};

export default ButtonLink;
