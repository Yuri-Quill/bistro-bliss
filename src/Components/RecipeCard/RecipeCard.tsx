import "./RecipeCard.scss";
import { IRecipes } from "../../shared/interfaces/Recipes.interface";

interface RecipeCardProps {
	data: IRecipes;
}

const RecipeCard = ({ data }: RecipeCardProps) => {
	const updatedAtDate = new Date(data.updatedAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const isoDate = new Date(data.updatedAt).toISOString();

	return (
		<li className="recipe-card">
			<figure className="recipe-card__figure">
				<img
					className="recipe-card__image"
					src={data.image}
					alt={data.title}
					width={300}
					height={200}
                    loading="lazy"
				/>

				<figcaption className="recipe-card__caption">
					<time className="recipe-card__date" dateTime={isoDate}>
						{updatedAtDate}
					</time>
					<h3 className="recipe-card__title">{data.title}</h3>
					<p className="recipe-card__description">{data.description}</p>
				</figcaption>
			</figure>
		</li>
	);
};

export default RecipeCard;
