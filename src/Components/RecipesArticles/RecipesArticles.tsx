import { ButtonLink } from "../Buttons/Buttons";
import Container from "../Container/Container";
import "./RecipesArticles.scss";
import { useAppSelector } from "../../app/hooks";
import RecipeCard from "../RecipeCard/RecipeCard";

const RecipesArticles = () => {
	const { recipes } = useAppSelector((state) => state.recipes);

	return (
		<section className="recipes-articles">
			<Container>
				<header className="recipes-articles__header">
					<h2 className="recipes-articles__title">Recipes & Articles</h2>
					<ButtonLink
						className="recipes-articles__link"
						to="/recipes"
						isActive={true}
					>
						Read All Articles
					</ButtonLink>
				</header>

				<ul className="recipes-articles__list">
					{recipes.slice(0, 5).map((recipe) => (
						<RecipeCard data={recipe} key={recipe._id} />
					))}
				</ul>
			</Container>
		</section>
	);
};

export default RecipesArticles;
