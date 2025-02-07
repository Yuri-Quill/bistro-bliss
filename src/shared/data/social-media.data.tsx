import {
	TbBrandX,
	TbBrandFacebookFilled,
	TbBrandInstagram,
	TbBrandLinkedin,
} from "react-icons/tb";

import { ISocialMedia } from "../interfaces/SocialMedia.interface";

export const socialMedia: ISocialMedia[] = [
	{
		platform: "X",
		url: "https://www.x.com",
		image: <TbBrandX />,
		description: "Follow us on X",
	},
	{
		platform: "Facebook",
		url: "https://www.facebook.com",
		image: <TbBrandFacebookFilled />,
		description: "Connect with us on Facebook",
	},
	{
		platform: "Instagram",
		url: "https://www.instagram.com",
		image: <TbBrandInstagram />,
		description: "See our latest updates on Instagram",
	},
	{
		platform: "LinkedIn",
		url: "https://www.linkedin.com",
		image: <TbBrandLinkedin />,
		description: "Join our network on LinkedIn",
	},
];
