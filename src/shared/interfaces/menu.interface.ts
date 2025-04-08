export interface IMenuItemInterface {
	_id: string;
	name: string;
	picture: string;
	price: number;
	ingredients: string[];
	calories: number;
	preparation_time: number;
	meal_type: string[];
	alcohol_content?: boolean;
}

export interface IMenuCategory {
	category: string; // "meat", "vegetarian", и т.д.
	items: IMenuItemInterface[];
}

export interface IMenuState {
	categories: IMenuCategory[];
	loading: boolean;
	error: string | null;
	selectedItem: IMenuItemInterface | null;
}
