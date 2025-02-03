import {
	BsTwitterX,
	BsInstagram,
	BsFacebook,
	BsTelegram,
} from "react-icons/bs";

import { SocialMediasTypes } from "../interfaces/social-medias.interface";

export const socialMedias: SocialMediasTypes[] = [
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
