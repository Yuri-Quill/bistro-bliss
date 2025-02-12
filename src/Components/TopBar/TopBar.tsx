import Contacts from "../Contacts/Contacts";
import Container from "../Container/Container";
import SocialMedia from "../SocialMedia/SocialMedia";

import { contactsData } from "../../shared/data/contacts.data";
import { socialMediaData } from "../../shared/data/social-media.data";

import excludeItems from "../../utils/excludeItems";

import "./TopBar.scss";

const TopBar = () => {
	const filteredContacts = excludeItems(contactsData, "address");

	return (
		<section className="top-bar">
			<Container>
				<nav className="top-bar__nav top-bar__nav--contacts">
					<ul className="top-bar__contacts-list ">
						{filteredContacts.map((item) => (
							<Contacts data={item} className="top-bar__contacts-" key={item.id}/>
						))}
					</ul>
				</nav>

				<nav className="top-bar__nav top-bar__nav--social-media">
					<ul className="top-bar__social-media-list">
						{socialMediaData.map((item) => (
							<SocialMedia data={item} className="top-bar__social-media-" key={item.id}/>
						))}
					</ul>
				</nav>
			</Container>
		</section>
	);
};

export default TopBar;
