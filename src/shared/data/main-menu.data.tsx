import { IMainMenu } from "../interfaces/MainMenu.interface";

export const mainMenuData: IMainMenu[] = [
	{
		id: 1,
		name: "Home",
		url: "/",
		description: "Welcome to Bistro Bliss",
	},
	{
		id: 2,
		name: "About",
		url: "/about",
		description: "Learn more about our restaurant",
	},
	{
		id: 3,
		name: "Menu",
		url: "/menu",
		description: "Browse our delicious menu items",
	},
	{
		id: 4,
		name: "Recipes",
		url: "/recipes",
		description: "Explore our Recipes",
	},
	{
		id: 5,
		name: "Contact",
		url: "/contact",
		description: "Get in touch with us",
	},
];
