import { contacts } from "../../../shared/data/contacts.data";
import { socialMedias } from "../../../shared/data/social-medias.data";

import Container from "../../Container/Container";

import "./TopBar.scss";

const TopBar = () => {
	const filteredContacts = contacts.filter(
		(contact) => contact.name !== "Address"
	);

	return (
		<section className="top-bar">
			<Container>
				<nav className="top-bar__nav top-bar__nav--contacts">
					<ul className="top-bar__list top-bar__list--contacts">
						{filteredContacts.map((contact) => (
							<li
								className="top-bar__list-item top-bar__list-item--contacts"
								key={contact.href}
							>
								<a
									className="top-bar__list-link top-bar__list-link--contacts"
									href={contact.href}
									target="_blank"
									rel="noopener noreferrer"
									title={contact.description}
									aria-label={contact.description}
								>
									{contact.image} {contact.info}
								</a>
							</li>
						))}
					</ul>
				</nav>

				<nav className="top-bar__nav top-bar__nav--social-media">
					<ul className="top-bar__list top-bar__list--social-media">
						{socialMedias.map((social) => (
							<li
								className="top-bar__list-item top-bar__list-item--social-media"
								key={social.url}
							>
								<a
									className="top-bar__list-link top-bar__list-link--social-media"
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									title={social.description}
									aria-label={social.description}
								>
									{social.image}
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
