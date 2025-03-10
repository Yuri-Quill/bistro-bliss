import React from "react";
import { IRecipes } from "../shared/interfaces/Recipes.interface";
import "./RecipeCard.scss";
import { Link } from "react-router-dom";

interface RecipeCardProps {
	recipe: IRecipes;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }: RecipeCardProps) => {
	return (
		<article className="recipe-card">
			<header className="recipe-card__header">
				<figure className="recipe-card__image-container">
					<img
						src={recipe.image}
						alt={recipe.title}
						className="recipe-card__image"
						loading="lazy"
					/>
				</figure>
				<h3 className="recipe-card__title">{recipe.title}</h3>
			</header>
			<section className="recipe-card__content">
				<p className="recipe-card__description">{recipe.description}</p>
				<div className="recipe-card__meta">
					<time className="recipe-card__time">
						Prep: {recipe.prepTime} | Cook: {recipe.cookTime}
					</time>
					<span className="recipe-card__servings">Serves: {recipe.servings}</span>
				</div>
			</section>
			<footer className="recipe-card__footer">
				<Link to={`/recipes/${recipe._id}`} className="recipe-card__button">
					View Recipe
				</Link>
			</footer>
		</article>
	);
};

export default RecipeCard;
