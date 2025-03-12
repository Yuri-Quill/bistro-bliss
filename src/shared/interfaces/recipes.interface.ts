interface IRecipes {
	_id: string;

	title: string;

	description: string;

	article: string;

	image: string;

	prepTime: string;

	cookTime: string;

	servings: number;

	ingredients: Array<string>;

	instructions: Array<string>;

	createdAt: Date;
	updatedAt: Date;
}

export default IRecipes;
