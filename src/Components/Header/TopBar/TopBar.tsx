import {
	BsTwitterX,
	BsInstagram,
	BsFacebook,
	BsTelegram,
	BsTelephone,
	BsEnvelope,
} from "react-icons/bs";
import Container from "../../Container/Container";

import "./TopBar.scss";

interface ContactsTypes {
	name: string;
	image: React.ReactElement;
	info: string;
	href: string;
	description: string;
}

interface SocialMediasTypes {
	name: string;
	image: React.ReactElement;
	url: string;
	description: string;
}

const contacts: ContactsTypes[] = [
	{
		name: "Phone number",
		image: <BsTelephone />,
		info: "(414) 857 - 0107",
		href: "tel:+14148570107",
		description: "Phone number for reservations and take-out orders",
	},
	{
		name: "Email address",
		image: <BsEnvelope />,
		info: "yummy@bistrobliss",
		href: "mailto:yummy@bistrobliss",
		description:
			"Email us for take-out orders, reservations, or any other questions",
	},
];

const socialMedias: SocialMediasTypes[] = [
	{
		name: "x",
		image: <BsTwitterX />,
		url: "https://x.com/",
		description: "Visit x for more updates and information.",
	},
	{
		name: "facebook",
		image: <BsFacebook />,
		url: "https://facebook.com/",
		description: "Connect with us on Facebook for the latest news.",
	},
	{
		name: "instagram",
		image: <BsInstagram />,
		url: "https://instagram.com/",
		description: "Follow us on Instagram for photos and stories.",
	},
	{
		name: "telegram",
		image: <BsTelegram />,
		url: "https://telegram.org/",
		description: "Connect with us on Telegram for instant updates.",
	},
];

const TopBar = () => {
	return (
		<section className="top-bar">
			<Container>
				<nav className="top-bar__nav top-bar__nav--contacts">
					<ul className="top-bar__list top-bar__list--contacts">
						{contacts.map((contact) => (
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
