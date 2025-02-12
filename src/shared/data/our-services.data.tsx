import Caterings from "../../assets/our-services/caterings.png";
import Birthdays from "../../assets/our-services/birthdays.png";
import Weddings from "../../assets/our-services/weddings.png";
import Events from "../../assets/our-services/events.png";

import { IOurServices } from "../interfaces/OurServices.interface";

export const ourServicesData: IOurServices[] = [
	{
		id: 1,
		name: "Caterings",
		body:
			"We offer a customized catering service for all types of events. From corporate events to weddings, we have the expertise and resources to make your event a success.",
		image: Caterings,
	},
	{
		id: 2,
		name: "Birthdays",
		body:
			"Let us help you celebrate your special day with a delicious meal and a personalized service. We offer a variety of options to make your birthday party a memorable one.",
		image: Birthdays,
	},
	{
		id: 3,
		name: "Weddings",
		body:
			"Make your wedding day a culinary success with our customized wedding catering service. We will work with you to create a menu that suits your style and budget.",
		image: Weddings,
	},
	{
		id: 4,
		name: "Events",
		body:
			"Whether you are hosting a corporate event, a holiday party, or any other type of event, we have the experience and resources to make it a success.",
		image: Events,
	},
];
