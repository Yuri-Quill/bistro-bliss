import { TbMail, TbPhone, TbMapPin2 } from "react-icons/tb";

import { IContacts } from "../interfaces/Contacts.interface";

export const contacts: IContacts[] = [
	{
		name: "Phone number",
		info: "(414) 857 - 0107",
		url: "tel:+14148570107",
		image: <TbPhone />,
		description: "You can call us at",
	},
	{
		name: "Email",
		info: "yummy@bistrobliss",
		url: "mailto:yummy@bistrobliss",
		image: <TbMail />,
		description: "Contact us via email at",
	},
	{
		name: "Address",
		info: "837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles",
		url: "https://maps.google.com/?q=837+W+Marshall+Lane+Marshalltown+IA+50158+Los+Angeles",
		image: <TbMapPin2 />,
		description: "Visit us at",
	},
];
