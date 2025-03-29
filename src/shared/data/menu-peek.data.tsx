import Breakfast from "../../assets/icons/menu-peek/breakfast.png";
import MainDishes from "../../assets/icons/menu-peek/main-dishes.png";
import Drinks from "../../assets/icons/menu-peek/drinks.png";
import Desserts from "../../assets/icons/menu-peek/deserts.png";

import IMenuPeek from "../interfaces/menu-peek.interface";

const menuPeekData: IMenuPeek[] = [
	{
		name: "Appetizers",
		body:
			"Indulge in our delicious appetizers options, from fluffy pancakes to savory omelets.",
		image: Breakfast,
		description: "Appetizers menu",
		href: "/menu?category=appetizers&page=1",
	},
	{
		name: "Meat Dishes",
		body:
			"Our menu features a variety of mouth-watering dishes, from classic burgers to gourmet stakes.",
		image: MainDishes,
		description: "Main dishes menu",
		href: "/menu?category=meat&page=1",
	},
	{
		name: "Drinks",
		body:
			"Quench your thirst with our refreshing drinks, from coffee to cocktails.",
		image: Drinks,
		description: "Drinks menu",
		href: "/menu?category=drinks&page=1",
	},
	{
		name: "Desserts",
		body:
			"Satisfy your sweet tooth with our decadent desserts, from classic cakes to innovative treats.",
		image: Desserts,
		description: "Desserts menu",
		href: "/menu?category=desserts&page=1",
	},
];

export default menuPeekData;
