
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchRecipesAsync } from "../../features/recipes/RecipesSlice";
import RecipeCard from "../../RecipeCard/RecipeCard";
import { Outlet } from "react-router-dom";
import "./RecipesPage.scss";

const RecipesPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const recipes = useAppSelector((state) => state.recipes.recipes);
	const loading = useAppSelector((state) => state.recipes.loading);
	const error = useAppSelector((state) => state.recipes.error);
	const { currentPage, limit, totalPages } = useAppSelector(
		(state) => state.recipes
	);


	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			dispatch(fetchRecipesAsync({ page: newPage, limit }));
		}
	};

	if (loading === "pending") return <p>Loading recipes...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<section className="recipes-page">
			<header className="recipes-page__header">
				<h1 className="recipes-page__title">Our Recipes</h1>
				<p className="recipes-page__subtitle">
					Discover delicious dishes for every taste!
				</p>
			</header>
			<main className="recipes-page__content">
				{recipes.length === 0 ? (
					<p>No recipes found.</p>
				) : (
					<div className="recipes-page__grid">
						{recipes.map((recipe) => (
							<RecipeCard key={recipe._id} recipe={recipe} />
						))}
					</div>
				)}
			</main>
			<footer className="recipes-page__footer">
				<div className="recipes-page__pagination">
					<button
						className="recipes-page__pagination-btn"
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}
					>
						Previous
					</button>
					<span className="recipes-page__pagination-info">
						Page {currentPage} of {totalPages}
					</span>
					<button
						className="recipes-page__pagination-btn"
						onClick={() => handlePageChange(currentPage + 1)}
						disabled={currentPage === totalPages}
					>
						Next
					</button>
				</div>
			</footer>
			<Outlet /> {/* Для отображения RecipeDetail при вложенном маршруте */}
		</section>
	);
};

export default RecipesPage;
