import Breakfast from "../../assets/icons/featured-menu/breakfast-icon.png";
import MainDishes from "../../assets/icons/featured-menu/main-dishes-icon.png";
import Drinks from "../../assets/icons/featured-menu/drinks-icon.png";
import Desserts from "../../assets/icons/featured-menu/desserts-icon.png";

import { IFeaturedMenu } from "../interfaces/FeaturedMenu.interface";

export const featuredMenuData: IFeaturedMenu[] = [
	{
		id: 1,
		name: "Breakfast",
		body:
			"Indulge in our signature breakfast dishes, carefully crafted to start your day off right.",
		image: Breakfast,
		url: "breakfast"
	},

	{
		id: 2,
		name: "Main Dishes",
		body:
			"Savor our mouthwatering main dishes, made with the freshest ingredients and cooked to perfection.",
		image: MainDishes,
		url: "main-dishes"
	},

	{
		id: 3,
		name: "Drinks",
		body:
			"Quench your thirst with our refreshing drinks, from classic cocktails to specialty coffee.",
		image: Drinks,
		url: "drinks"
	},

	{
		id: 4,
		name: "Desserts",
		body:
			"Treat yourself to our decadent desserts, crafted to satisfy your sweet tooth.",
		image: Desserts,
		url: "desserts"
	},
];
