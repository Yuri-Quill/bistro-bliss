import { BsTelephone, BsEnvelope,BsPinMap } from "react-icons/bs";

import { ContactsTypes } from "../interfaces/contacts.interface";

const addressOnMap =
	"https://www.google.com/maps?q=837+W.+Marshall+Lane+Marshalltown,+IA+50158,+Los+Angeles";

export const contacts: ContactsTypes[] = [
	{
		name: "Phone number",
		image: <BsTelephone />,
		info: "(414) 857 - 0107",
		href: "tel:+14148570107",
		description: "Phone number for reservations and take-out orders",
	},
	{
		name: "Email address",
		image: <BsEnvelope/>,
		info: "yummy@bistrobliss",
		href: "mailto:yummy@bistrobliss",
		description:
			"Email us for take-out orders, reservations, or any other questions",
	},
	{
		name: "Address",
		image: <BsPinMap/>,
		info: "837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles",
		href: addressOnMap,
		description: "Visit us at our restaurant location",
	},
];

