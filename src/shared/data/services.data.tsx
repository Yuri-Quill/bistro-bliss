import Caterings from "../../assets/services/catering.jpg";
import Birthdays from "../../assets/services/birthday.jpg";
import Weddings from "../../assets/services/weddings.webp";
import Events from "../../assets/services/events.jpg";

import IServices from "../interfaces/services.interface";

const servicesData: IServices[] = [
	{
		name: "Caterings",
		body:
			"We offer catering services for corporate events, parties and other social gatherings.",
		image: Caterings,
		description:
			"Catering services for corporate events, parties and other social gatherings",
	},
	{
		name: "Birthdays",
		body:
			"We offer special birthday packages that include a delicious meal, a celebratory dessert and a special birthday message.",
		image: Birthdays,
		description:
			"Special birthday packages that include a delicious meal, a celebratory dessert and a special birthday message.",
	},
	{
		name: "Weddings",
		body:
			"We offer special wedding packages that include a delicious meal, a celebratory dessert and a special wedding message.",
		image: Weddings,
		description:
			"Special wedding packages that include a delicious meal, a celebratory dessert and a special wedding message.",
	},
	{
		name: "Events",
		body:
			"We offer special event packages that include a delicious meal, a celebratory dessert and a special event message.",
		image: Events,
		description:
			"Special event packages that include a delicious meal, a celebratory dessert and a special event message.",
	},
];

export default servicesData;
