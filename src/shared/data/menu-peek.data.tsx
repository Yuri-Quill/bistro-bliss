import Breakfast from "../../assets/icons/menu-peek/breakfast.png";
import MainDishes from "../../assets/icons/menu-peek/main-dishes.png";
import Drinks from "../../assets/icons/menu-peek/drinks.png";
import Desserts from "../../assets/icons/menu-peek/deserts.png";

import IMenuPeek from "../interfaces/menu-peek.interface";

const menuPeekData: IMenuPeek[] = [
	{
		name: "Breakfast",
		body:
			"Indulge in our delicious breakfast options, from fluffy pancakes to savory omelets.",
		image: Breakfast,
		description: "Breakfast menu",
		href: "/menu/breakfast",
	},
	{
		name: "Main Dishes",
		body:
			"Our menu features a variety of mouth-watering dishes, from classic burgers to gourmet salads.",
		image: MainDishes,
		description: "Main dishes menu",
		href: "/menu/main-dishes",
	},
	{
		name: "Drinks",
		body:
			"Quench your thirst with our refreshing drinks, from coffee to cocktails.",
		image: Drinks,
		description: "Drinks menu",
		href: "/menu/drinks",
	},
	{
		name: "Desserts",
		body:
			"Satisfy your sweet tooth with our decadent desserts, from classic cakes to innovative treats.",
		image: Desserts,
		description: "Desserts menu",
		href: "/menu/desserts",
	},
];

export default menuPeekData;
