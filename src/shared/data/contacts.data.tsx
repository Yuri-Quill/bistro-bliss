import { BsTelephone, BsEnvelope, BsMap } from "react-icons/bs";
import IContacts from "../interfaces/contacts.interface";

const contactsData: IContacts[] = [
	{
		name: "phone number",
		image: <BsTelephone />,
		body: "(414) 857 - 0107",
		href: "tel:4148570107",
		description: "Please call us for reservations or carry out orders."
	},
	{
		name: "email",
		image: <BsEnvelope />,
		body: "yummy@bistrobliss",
		href: "mailto:yummy@bistrobliss",
		description: "Please email us for questions or comments."
	},
	{
		name: "address",
		image: <BsMap />,
		body: "837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles",
		href:
			"https://www.google.com/maps/place/Marshalltown,+IA+50158,+USA/@42.0380279,-92.915525,13.29z/data=!4m6!3m5!1s0x87efa530badb1481:0xf015a2c84b2c1be4!8m2!3d42.0494674!4d-92.9080375!16zL20vMHQxY20?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D",
		description: "We are located in the heart of Marshalltown, Iowa."
	},
];

export default contactsData;

