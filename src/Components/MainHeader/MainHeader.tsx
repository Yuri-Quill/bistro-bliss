import { Link, NavLink } from "react-router-dom";

import Container from "../Container/Container";
import TopBar from "../TopBar/TopBar";
import { ButtonLink } from "../Buttons/Buttons";

import HeaderLogo from "../../assets/bistro-bliss-logo.svg";

import { mainMenuData } from "../../shared/data/main-menu.data";

import "./MainHeader.scss";

const MainHeader = () => {
	return (
		<>
			<TopBar />
			<header className="header">
				<Container>
					<Link className="header-logo" to="/">
						<img
							className="header-logo__image"
							src={HeaderLogo}
							alt="Bistro Bliss logo image"
							width={57}
							height={55}
						/>
						<h2 className="header-logo__title">Bistro Bliss</h2>
					</Link>

					<nav className="header-nav">
						<ul className="header-list">
							{mainMenuData.map((item) => (
								<li className="header-list__item" key={item.id}>
									<NavLink
										className="header-list__link"
										to={item.url}
										aria-label={item.description}
									>
										{item.name}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>

					<ButtonLink
						to="/reservation"
						aria-label="Book A Table"
						className="header-button__link"
					>
						Book A Table
					</ButtonLink>
				</Container>
			</header>
		</>
	);
};

export default MainHeader;
