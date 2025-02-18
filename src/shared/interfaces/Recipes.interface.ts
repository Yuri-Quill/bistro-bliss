export interface IRecipes {
	_id: string; 
	id?: number; 
	title: string;
	description: string;
	article: string;
	image: string;
	prepTime: string | number;
	cookTime: string | number;
	servings: string | number;
	ingredients: string[];
	instructions: string[];
	updatedAt: string | Date;
}
