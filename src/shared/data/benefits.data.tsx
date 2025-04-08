import MultiCuisine from "../../assets/icons/benefits/multi-cuisine.png";
import EasyToOrder from "../../assets/icons/benefits/easy-to-order.png";
import FastDelivery from "../../assets/icons/benefits/fast-delivery.png";

import IBenefits from "../interfaces/benefits.interface";

const benefitsData: IBenefits[] = [
	{
		title: "Multi Cuisine",
		body:
			"Explore a variety of cuisines from around the world, all in one place.",
		image: MultiCuisine,
	},
	{
		title: "Easy To Order",
		body: "Order your favorite meals with just a few clicks.",
		image: EasyToOrder,
	},
	{
		title: "Fast Delivery",
		body: "Enjoy quick and reliable delivery services to your doorstep.",
		image: FastDelivery,
	},
];

export default benefitsData;
