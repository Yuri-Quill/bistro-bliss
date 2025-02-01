import { NavLink, Link } from "react-router-dom";

import TopBar from "./TopBar/TopBar";
import bistroBlissLogo from "../../assets/bistro-bliss-logo.svg";
import Container from "../Container/Container";
import { Button } from "../Buttons/Buttons";

import "./MainHeader.scss";

interface MainHeaderMenuTypes {
	name: string;
	description: string;
	url: string;
}

const mainHeaderMenu: MainHeaderMenuTypes[] = [
	{
		name: "Home",
		url: "/",
		description: "Home page",
	},
	{
		name: "About",
		url: "/about",
		description: "About Bistro Bliss",
	},
	{
		name: "Menu",
		url: "/menu",
		description: "Our menu",
	},
	{
		name: "Pages",
		url: "/pages",
		description: "Other pages",
	},
	{
		name: "Contact",
		url: "/contact",
		description: "Contact us",
	},
];

const MAIN_HEADER_PREFIX: string = "main-header__";

const MainHeader = () => {
	return (
		<header className="main-header">
			<TopBar />
			<Container>
				<nav className={`${MAIN_HEADER_PREFIX}nav`}>
					<Link className={`${MAIN_HEADER_PREFIX}logo`} to="/">
						<img
							className={`${MAIN_HEADER_PREFIX}img`}
							src={bistroBlissLogo}
							alt="Bistro Bliss logo"
							width={56}
							height={55}
						/>
						<span className={`${MAIN_HEADER_PREFIX}logo-text`}>Bistro Bliss</span>
					</Link>

					<ul className={`${MAIN_HEADER_PREFIX}list`}>
						{mainHeaderMenu.map((menu) => (
							<li className={`${MAIN_HEADER_PREFIX}list-item`} key={menu.url}>
								<NavLink
									className={`${MAIN_HEADER_PREFIX}list-link`}
									to={menu.url}
									title={menu.description}
									aria-label={menu.description}
								>
									{menu.name}
								</NavLink>
							</li>
						))}
					</ul>

					<Button
						className={`${MAIN_HEADER_PREFIX}button`}
						onClick={() => console.log("hello world")}
						ariaLabel="Book a table"
						type="button"
					>
						Book A Table
					</Button>
				</nav>
			</Container>
		</header>
	);
};

export default MainHeader;
