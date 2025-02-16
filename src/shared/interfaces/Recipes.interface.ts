export interface IRecipes {
	id: number | string;
	title: string;
	description: string;
	article: string;
	image: string;
	prepTime: string;
	cookTime: string;
	servings: number | string;
	ingredients: string[];
	instructions: string[];
}
