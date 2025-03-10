import { Outlet, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

import "./RecipeDetail.scss";

const RecipeDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const recipes = useAppSelector((state) => state.recipes.recipes);
	const recipe = recipes.find((r) => r._id === id);

	if (!recipe) return <p>Recipe not found</p>;
	return (
		<article className="recipe-detail">
			<header className="recipe-detail__header">
				<figure className="recipe-detail__image-container">
					<img
						src={recipe.image}
						alt={recipe.title}
						className="recipe-detail__image"
						loading="lazy"
					/>
					<figcaption className="recipe-detail__caption">{recipe.title}</figcaption>
				</figure>
				<h1 className="recipe-detail__title">{recipe.title}</h1>
			</header>
			<main className="recipe-detail__content">
				<section className="recipe-detail__intro">
					<p className="recipe-detail__description">{recipe.description}</p>
					<div className="recipe-detail__meta">
						<time className="recipe-detail__time">Prep: {recipe.prepTime}</time>
						<time className="recipe-detail__time">Cook: {recipe.cookTime}</time>
						<span className="recipe-detail__servings">Serves: {recipe.servings}</span>
					</div>
				</section>
				<section className="recipe-detail__ingredients">
					<h2 className="recipe-detail__subtitle">Ingredients</h2>
					<ul className="recipe-detail__list">
						{recipe.ingredients.map((ingredient, index) => (
							<li key={index} className="recipe-detail__item">
								{ingredient}
							</li>
						))}
					</ul>
				</section>
				<section className="recipe-detail__instructions">
					<h2 className="recipe-detail__subtitle">Instructions</h2>
					<ol className="recipe-detail__list">
						{recipe.instructions.map((step, index) => (
							<li key={index} className="recipe-detail__item">
								{step}
							</li>
						))}
					</ol>
				</section>
				<section className="recipe-detail__article">
					<h2 className="recipe-detail__subtitle">About This Recipe</h2>
					<p className="recipe-detail__text">{recipe.article}</p>
				</section>
			</main>
		</article>

		
	);
};

export default RecipeDetail;
