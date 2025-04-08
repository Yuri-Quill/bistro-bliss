import { useAppSelector } from "../../app/hooks";

import ButtonLink from "../ButtonLink/ButtonLink";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import RecipesPeekCard from "./RecipesPeekCard/RecipesPeekCard";
import "./RecipesPeekSection.scss";

const RecipesPeekSection = () => {
	const { loading, recipes } = useAppSelector((state) => state.recipes);

	const mainPageRecipes = recipes.slice(0,5)

	if (loading) {
		return (
			<section className="recipes-peek">
				<Loading />
			</section>
		);
	}
	return (
		<section className="recipes-peek">
			<Container>
				<header className="recipes-peek__header">
					<h2 className="recipes-peek__title">Our Recipes & Articles</h2>
					<ButtonLink
						className="recipes-peek__btn recipes-peek__btn--header"
						href={"/recipes?page=1&limit=8"}
						aria="Read all recipes button link"
						isActive={true}
					>
						Read All Recipes
					</ButtonLink>
				</header>

				
					<ul className="recipes-peek__list">
						{mainPageRecipes.map((recipes) => (
							<li className="recipes-peek__item" key={recipes._id}>
						
								<RecipesPeekCard data={recipes} />
							
							</li>
						))}
					</ul>
					<ButtonLink
						className="recipes-peek__btn recipes-peek__btn--footer"
						href={"/recipes"}
						aria="Read all recipes button link"
						isActive={true}
					>
						Read All Recipes
					</ButtonLink>
			</Container>
		</section>
	);
};
export default RecipesPeekSection;
