import Container from "../Container/Container";

import contactsData from "../../shared/data/contacts.data";
import socialMediaData from "../../shared/data/social-media.data";

import "./TopBar.scss";

const TopBar = () => {
	return (
		<section className="top-bar">
			<Container>
				<nav className="top-bar__contacts">
					<ul className="top-bar__contacts-list">
						{contactsData.map((item) => (
							<li className="top-bar__contacts-item" key={item.name}>
								{item.image}
								<a
									className="top-bar__contacts-link"
									href={item.href}
									target="_blank"
									title={item.name}
									aria-label={item.description}
									rel="noopener noreferrer"
								>
									{item.body}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<nav className="top-bar__social-media">
					<ul className="top-bar__social-media-list">
						{socialMediaData.map((item) => (
							<li className="top-bar__social-media-item" key={item.name}>
								<a
									className="top-bar__social-media-link"
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
				</nav>
			</Container>
		</section>
	);
};

export default TopBar;
