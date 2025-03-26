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

export interface IMenuInterface {
	_id: string;
	vegetarian: IMenuItemInterface[];
	meat: IMenuItemInterface[];
	fish: IMenuItemInterface[];
	desserts: IMenuItemInterface[];
	drinks: IMenuItemInterface[];
	appetizers: IMenuItemInterface[];
	__v: number;
}
