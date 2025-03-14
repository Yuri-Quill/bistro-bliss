import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import "./RecipeDetailPage.scss";
import Loading from "../../Components/Loading/Loading";
import Container from "../../Components/Container/Container";

const RecipeDetailPage = () => {
	const { recipes, loading } = useAppSelector((state) => state.recipes);
	const { id } = useParams();

	const recipe = recipes.find((item) => item._id === id);

	if (loading) return <Loading />;

	if (!recipe) return <div>Error</div>;

	return (
		<section className="recipe-details">
			<Container>
				<h3 className="recipe-details__title">{recipe.title}</h3>

				<p className="recipe-details__description">{recipe.description}</p>

				<figure className="recipe-details__figure">
					<img
						className="recipe-details__image"
						src={recipe.image}
						alt={`Image for ${recipe.title}`}
					/>

					<figcaption className="recipe-details__caption">
						<p className="recipe-details__text">{recipe.article}</p>

						<span className="recipe-details__prep-time">{`Preparation time: ${recipe.prepTime}`}</span>

						<span className="recipe-details__cook-time">{`Cooking time: ${recipe.cookTime}`}</span>

						<details className="recipe-details__details recipe__details--ingredients">
							<summary className="recipe-details__summary recipe__summary--ingredients">
								Ingredients:
							</summary>

							<ul className="recipe-details__details-list recipe__details-list--ingredients">
								{recipe.ingredients.map((item, index) => (
									<li
										className="recipe-details__details-item recipe__details-item--ingredients"
										key={index}
									>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</details>

						<details className="recipe-details__details recipe__details--instructions">
							<summary className="recipe-details__summary recipe__summary--instructions">
								Instructions:
							</summary>

							<ul className="recipe-details__details-list recipe__details-list--instructions">
								{recipe.instructions.map((item, index) => (
									<li
										className="recipe-details__details-item recipe__details-item--instructions"
										key={index}
									>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</details>
					</figcaption>
				</figure>
			</Container>
		</section>
	);
};

export default RecipeDetailPage;
