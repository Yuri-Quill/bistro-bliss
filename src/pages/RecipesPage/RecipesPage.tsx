import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useSearchParams } from "react-router-dom";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { setPage } from "../../app/slices/recipesSlice";

import Loading from "../../Components/Loading/Loading";
import Container from "../../Components/Container/Container";
import RecipesPeekCard from "../../Components/RecipesPeekSection/RecipesPeekCard/RecipesPeekCard";

import "./RecipesPage.scss";

const RecipesPage = () => {
	const dispatch = useAppDispatch();
	const [searchParams, setSearchParams] = useSearchParams();
	const { loading, recipes, total } = useAppSelector((state) => state.recipes);

	const currentPage = Number(searchParams.get("page") || 1);
	const currentLimit = Number(searchParams.get("limit") || 10);

	const totalPages = total > 0 ? Math.ceil(total / currentLimit) : 1;


	const nextPage = () => {
		const newPage = currentPage + 1;
		setSearchParams({
			page: String(newPage),
			limit: String(currentLimit),
		});

		dispatch(setPage(newPage));
	};

	const prevPage = () => {
		const newPage = Math.max(1, currentPage - 1);

		setSearchParams({
			page: String(newPage),
			limit: String(currentLimit),
		});

		dispatch(setPage(newPage));
	};

	return (
		<section className="recipes-page">
			<Container>
				<h2 className="recipes-page__title">Our Recipes & Articles</h2>
				<p className="recipes-page__text">
					We consider all the drivers of change gives you the components you need to
					change to create a truly happens.
				</p>

				<ul className="recipes-page__list">
					{loading ? (
						<Loading />
					) : (
						recipes.map((item) => (
							<li className="recipes-page__item" key={item._id}>
								<Link className="recipes-page__link" to={`/recipes/${item._id}`}>
									<RecipesPeekCard data={item} />
								</Link>
							</li>
						))
					)}
				</ul>

				<nav className="recipes-page__pagination-nav">
					<button
						type="button"
						className="recipes-page__pagination-btn recipes-page__pagination-btn--prev"
						onClick={prevPage}
						disabled={currentPage === 1}
					>
						<FaChevronLeft />
					</button>
					<span className="recipes-page__pagination-current">
						Page {currentPage} of {totalPages}
					</span>
					<button
						type="button"
						className="recipes-page__pagination-btn recipes-page__pagination-btn--next"
						onClick={nextPage}
						disabled={currentPage >= totalPages}
					>
						<FaChevronRight />
					</button>
				</nav>
			</Container>
		</section>
	);
};

export default RecipesPage;
