import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getRecipeByID } from "../../app/slices/recipesSlice";
import cn from "classnames";
import Loading from "../../Components/Loading/Loading";
import Container from "../../Components/Container/Container";
import "./RecipeDetailPage.scss";

const RecipeDetailPage = () => {
	const dispatch = useAppDispatch();

	const { recipeByID, loading, error } = useAppSelector(
		(state) => state.recipes
	);

	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			dispatch(getRecipeByID(id));
		}
	}, [dispatch, id]);

	const [openAccordion, setOpenAccordion] = useState<Record<string, boolean>>({
		ingredients: false,
		instructions: false,
	});

	if (loading) return <Loading fullScreen />;
	if (!recipeByID)
		return (
			<div className="error-message">Error: {error|| "Recipe not found."}</div>
		);

	const toggleAccordion = (accordion: string) => {
		setOpenAccordion((prev) => ({
			...prev,
			[accordion]: !prev[accordion],
		}));
	};

	const ingredientsClass = cn("recipe-detail__accordion-list", {
		"recipe-detail__accordion-list--open": openAccordion.ingredients,
	});

	const instructionsClass = cn("recipe-detail__accordion-list", {
		"recipe-detail__accordion-list--open": openAccordion.instructions,
	});

	return (
		<section className="recipe-detail" aria-label="Recipe detail section">
			<Container>
				<h2 className="recipe-detail__title" aria-label="Recipe title">
					{recipeByID.title}
				</h2>
				<p className="recipe-detail__description" aria-label="Recipe description">
					{recipeByID.description}
				</p>

				<figure className="recipe-detail__content" aria-label="Recipe content">
					<img
						src={recipeByID.image}
						alt={`Image for ${recipeByID.title}`}
						className="recipe-detail__image"
						width={500}
						height={500}
					/>
					<figcaption className="recipe-detail__caption" aria-label="Recipe caption">
						<p className="recipe-detail__caption-text">{recipeByID.article}</p>
					</figcaption>
				</figure>

				<section
					className="recipe-detail__info-block"
					aria-label="Recipe information block"
				>
					<div className="recipe-detail__info">
						<h4 className="recipe-detail__info-item">
							Preparing time:{" "}
							<span
								className="recipe-detail__info-value"
								aria-label="Preparation time"
							>
								{recipeByID.prepTime}
							</span>
						</h4>
						<h4 className="recipe-detail__info-item">
							Cooking time:{" "}
							<span className="recipe-detail__info-value" aria-label="Cooking time">
								{recipeByID.cookTime}
							</span>
						</h4>
					</div>

					<section
						className="recipe-detail__accordion"
						aria-label="Recipe accordion sections"
					>
						<article
							className="recipe-detail__accordion-section"
							onClick={() => toggleAccordion("ingredients")}
							aria-label="Ingredients section"
						>
							<h3 className="recipe-detail__accordion-title">Ingredients</h3>
							<ul className={ingredientsClass} aria-label="Ingredients list">
								{recipeByID.ingredients.map((item, index) => (
									<li className="recipe-detail__accordion-item" key={index}>
										<span className="recipe-detail__accordion-text">{item}</span>
									</li>
								))}
							</ul>
						</article>

						<article
							className="recipe-detail__accordion-section"
							onClick={() => toggleAccordion("instructions")}
							aria-label="Instructions section"
						>
							<h3 className="recipe-detail__accordion-title">Instructions</h3>
							<ul className={instructionsClass} aria-label="Instructions list">
								{recipeByID.instructions.map((item, index) => (
									<li className="recipe-detail__accordion-item" key={index}>
										<span className="recipe-detail__accordion-text">{item}</span>
									</li>
								))}
							</ul>
						</article>
					</section>
				</section>
			</Container>
		</section>
	);
};

export default RecipeDetailPage;
