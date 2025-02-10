import { Link } from "react-router-dom";

import Container from "../Container/Container";
import TopBar from "../TopBar/TopBar";
import { ButtonLink } from "../Buttons/Buttons";

import HeaderLogo from "../../assets/bistro-bliss-logo.svg";

import { mainMenu } from "../../shared/data/main-menu.data";

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
							{mainMenu.map((item, index) => (
								<li className="header-item" key={index}>
									<Link
										className="header-link"
										to={item.url}
										aria-label={item.description}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<ButtonLink to="/" aria-label="Book A Table" className="header-button">
						Book A Table
					</ButtonLink>
				</Container>
			</header>
		</>
	);
};

export default MainHeader;
