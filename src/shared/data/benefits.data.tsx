import MultiCuisineIcon from "../../assets/icons/benefits/multi-cuisine.svg";
import EasyToOrderIcon from "../../assets/icons/benefits/easy-to-order.svg";
import FastDeliveryIcon from "../../assets/icons/benefits/fast-delivery.svg";
import { IBenefits } from "../interfaces/benefits.interface";

export const benefitsData: IBenefits[] = [
	{
		id: 1,
		title: "Multi Cuisine",
		body:
			"We serve a wide variety of dishes including Mexican, Italian, Indian, Chinese, and American. Our menu is designed to satisfy any craving you may have.",
		image: MultiCuisineIcon,
	},
	{
		id: 2,
		title: "Easy To Order",
		body:
			"Our online ordering system is quick and easy to use. Simply select the items you want and follow the prompts to complete your order.",
		image: EasyToOrderIcon,
	},
	{
		id: 3,
		title: "Fast Delivery",
		body:
			"We offer fast delivery service to ensure that your food is delivered hot and fresh to your doorstep. Our delivery drivers are friendly and courteous.",
		image: FastDeliveryIcon,
	},
];
