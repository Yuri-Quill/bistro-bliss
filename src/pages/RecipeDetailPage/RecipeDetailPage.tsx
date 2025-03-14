import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import "./RecipeDetailPage.scss";
import Loading from "../../Components/Loading/Loading";
import Container from "../../Components/Container/Container";

const RecipeDetailPage = () => {
	const { recipes, loading } = useAppSelector((state) => state.recipes);
	const { id } = useParams();

	const recipe = recipes.find((item) => item._id === id);

	if (loading) return <Loading fullScreen />;

	if (!recipe) return <div>Error</div>;

	return (
		<section className="recipe-details">
			<Container>
				<h3 className="recipe-details__title">{recipe.title}</h3>

			</Container>
		</section>
	);
};

export default RecipeDetailPage;
