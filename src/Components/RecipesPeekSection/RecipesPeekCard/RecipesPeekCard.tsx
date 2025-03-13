import "./RecipesPeekCard.scss";

import IRecipes from "../../../shared/interfaces/recipes.interface";

interface IRecipesPeekCardProps {
	data: IRecipes;
}

const RecipesPeekCard = ({ data }: IRecipesPeekCardProps) => {
	const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});


	return (
		<figure className="recipes-card">
			<img
				className="recipes-card__image"
				src={data.image}
				alt={`Image for ${data.title}`}
				loading="lazy"
				width={306}
				height={200}
			/>
			<figcaption className="recipes-card__caption">
				<time className="recipes-card__date" dateTime={data.createdAt}>
					{formattedDate}
				</time>
				<h3 className="recipes-card__title">{data.title}</h3>
				<p className="recipes-card__text">{data.description}</p>
			</figcaption>
		</figure>
	);
};

export default RecipesPeekCard;
