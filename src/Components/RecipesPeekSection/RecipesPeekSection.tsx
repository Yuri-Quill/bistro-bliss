import ButtonLink from "../ButtonLink/ButtonLink";
import Container from "../Container/Container";
import "./RecipesPeekSection.scss";

const RecipesPeekSection = () => {
	return (
		<section className="recipes-peek">
			<Container>
				<h2 className="recipes-peek__title">Our Recipes & Articles</h2>
				<ButtonLink
					className="recipes-peek__btn"
					href={"/recipes"}
					aria="Read all recipes button link"
				>
					Read All Recipes
				</ButtonLink>
                <article className="recipes-peek__article">
                    <ul className="recipes-peek__list">
                        {

                        }
                    </ul>
                </article>
			</Container>
		</section>
	);
};
export default RecipesPeekSection;
