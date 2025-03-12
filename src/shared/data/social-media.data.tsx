import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import ISocialMedia from "../interfaces/social-media.interface";

const socialMediaData: ISocialMedia[] = [
	{
		name: "Instagram",
		image: <FaInstagram />,
		href: "https://www.instagram.com",
		body: "Follow us on Instagram for the latest updates.",
	},
	{
		name: "Facebook",
		image: <FaFacebook />,
		href: "https://www.facebook.com",
		body: "Like our Facebook page to stay informed.",
	},
	{
		name: "LinkedIn",
		image: <FaLinkedin />,
		href: "https://www.linkedin.com",
		body: "Connect with us on LinkedIn for professional insights.",
	},
	{
		name: "X",
		image: <FaTwitter />,
		href: "https://www.x.com",
		body: "Join us on X for more information.",
	},
];

export default socialMediaData;
