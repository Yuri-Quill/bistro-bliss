import { Link } from "react-router-dom";
import headerMenuData from "../../shared/data/header-menu.data";
import "./BurgerMenu.scss";
import { useState } from "react";
import cn from "classnames";
import { AiOutlineMenu } from "react-icons/ai";
import Container from "../Container/Container";

import BurgerMenuLogo from "../../assets/logo/header-logo.png";
import ButtonLink from "../ButtonLink/ButtonLink";
import socialMediaData from "../../shared/data/social-media.data";

const BurgerMenu = () => {
	const [isOpen, setIsOpen] = useState(false);

	const burgerMenuCn = cn("burger-menu__nav", {
		"burger-menu__nav--open": isOpen,
	});

	const buttonBurgerMenuCn = cn("burger-menu__button", {
		"burger-menu__button--open": isOpen,
	});

	const burgerMenuToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<header className="burger-menu">
			<Container>
				<Link
					className="burger-menu__logo"
					to="/"
					aria-label="Bistro Bliss homepage"
				>
					<img
						className="burger-menu__logo-img"
						src={BurgerMenuLogo}
						alt="Bistro Bliss logo image"
						width={56}
						height={56}
					/>
					Bistro Bliss
				</Link>

				<button
					className={buttonBurgerMenuCn}
					onClick={burgerMenuToggle}
					type="button"
				>
					{<AiOutlineMenu size={30} />}
				</button>

				<nav className={burgerMenuCn} onClick={burgerMenuToggle}>
					<ul className="burger-menu__list">
						{headerMenuData.map((item, index) => (
							<li className="burger-menu__item" key={index}>
								<Link
									className="burger-menu__link"
									to={item.href}
									aria-label={item.body}
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>

					<ButtonLink
						className="burger-menu__booking-link"
						href="/book-a-table"
						aria="Book a table at Bistro Bliss"
						isActive
					>
						Book A Table
					</ButtonLink>

					{
						<ul className="burger-menu__social-media-list">
							{socialMediaData.map((item) => (
								<li className="burger-menu__social-media-item" key={item.name}>
									<a
										className="burger-menu__social-media-link"
										href={item.href}
										target="_blank"
										title={item.name}
										aria-label={item.body}
										rel="noopener noreferrer"
									>
										{item.image}
									</a>
								</li>
							))}
						</ul>
					}
				</nav>
			</Container>
		</header>
	);
};
export default BurgerMenu;
