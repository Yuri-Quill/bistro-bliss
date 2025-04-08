import { NavLink, Link } from "react-router-dom";
import HeaderLogo from "../../assets/logo/header-logo.png";

import headerMenuData from "../../shared/data/header-menu.data";
import ButtonLink from "../ButtonLink/ButtonLink";

import "./Header.scss";
import Container from "../Container/Container";

const Header = () => {
	return (
		<header className="header">
			<Container>
				<Link className="header__logo" to="/" aria-label="Bistro Bliss homepage">
					<img
						className="header__logo-img"
						src={HeaderLogo}
						alt="Bistro Bliss logo image"
						width={56}
						height={56}
					/>
					Bistro Bliss
				</Link>

				<nav className="header__nav">
					<ul className="header__list">
						{headerMenuData.map((item) => (
							<li className="header__item" key={item.name}>
								<NavLink className="header__link" to={item.href} aria-label={item.body}>
									{item.name}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				<ButtonLink
					href="/book-a-table"
					className="header__button-link"
					aria="Book a table at Bistro Bliss"
				>
					Book A Table
				</ButtonLink>
			</Container>
		</header>
	);
};

export default Header;
