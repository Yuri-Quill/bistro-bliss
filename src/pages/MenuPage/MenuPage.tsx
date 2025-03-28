import { getMenu, getMenuByCategory } from "../../app/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Loading from "../../Components/Loading/Loading";
import {
	IMenuInterface,
	IMenuItemInterface,
} from "../../shared/interfaces/menu.interface";
import "./MenuPage.scss";

const MenuPage = () => {
	const dispatch = useAppDispatch();
	const { menu, menuCategory, loading, error } = useAppSelector(
		(state) => state.menu
	);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentCategory = searchParams.get("category");

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	const categories = menu
		? (Object.keys(menu).filter((key) => !["_id", "__v"].includes(key)) as Array<
				keyof IMenuInterface
		  >)
		: [];

	useEffect(() => {
		if (!currentCategory) {
			dispatch(getMenu());
		} else {
			dispatch(getMenuByCategory(currentCategory));
		}
		setCurrentPage(1);
	}, [dispatch, currentCategory]);

	const handleGetAllMenu = () => {
		setSearchParams({});
		dispatch(getMenu());
	};

	const truncateIngredients = (ingredients: string[]) => {
		const joined = ingredients.join(", ");
		const lines = joined.split(" ").reduce(
			(acc, word) => {
				const lastLine = acc[acc.length - 1];
				if ((lastLine + " " + word).length > 40 && acc.length < 2) {
					acc.push(word);
				} else {
					acc[acc.length - 1] = lastLine ? `${lastLine} ${word}` : word;
				}
				return acc;
			},
			[""]
		);
		return lines.length > 2 ? `${lines[0]} ${lines[1]}...` : joined;
	};

	const renderAllMenu = () => {
		if (!menu) return null;

		const allItems = categories
			.flatMap((category) => {
				const items = menu[category];
				return Array.isArray(items) ? items : [];
			})
			.filter(Boolean);

		const totalItems = allItems.length;
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		const startIndex = (currentPage - 1) * itemsPerPage;
		const paginatedItems = allItems.slice(startIndex, startIndex + itemsPerPage);

		return (
			<div className="menu-page__grid">
				{paginatedItems.map((item: IMenuItemInterface) => (
					<div key={item._id} className="menu-page__card">
						<img
							src={item.picture}
							alt={item.name}
							className="menu-page__card-image"
						/>
						<div className="menu-page__card-content">
							<h3 className="menu-page__card-title">{item.name}</h3>
							<p className="menu-page__card-ingredients">
								{truncateIngredients(item.ingredients)}
							</p>
							<p className="menu-page__card-price">${item.price}</p>
						</div>
					</div>
				))}
				{renderPagination(totalPages)}
			</div>
		);
	};

	const renderCategoryMenu = () => {
		if (!menuCategory) return null;

		const totalItems = menuCategory.length;
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		const startIndex = (currentPage - 1) * itemsPerPage;
		const paginatedItems = menuCategory.slice(
			startIndex,
			startIndex + itemsPerPage
		);

		return (
			<div className="menu-page__grid">
				{paginatedItems.map((item: IMenuItemInterface) => (
					<div key={item._id} className="menu-page__card">
						<img
							src={item.picture}
							alt={item.name}
							className="menu-page__card-image"
						/>
						<div className="menu-page__card-content">
							<h3 className="menu-page__card-title">{item.name}</h3>
							<p className="menu-page__card-ingredients">
								{truncateIngredients(item.ingredients)}
							</p>
							<p className="menu-page__card-price">${item.price}</p>
						</div>
					</div>
				))}
				{renderPagination(totalPages)}
			</div>
		);
	};

	const renderPagination = (totalPages: number) => {
		if (totalPages <= 1) return null;

		return (
			<div className="menu-page__pagination">
				<button
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					disabled={currentPage === 1}
					className="menu-page__pagination-btn menu-page__pagination-btn--prev"
				>
					&lt;
				</button>
				<span className="menu-page__pagination-info">
					{currentPage} / {totalPages}
				</span>
				<button
					onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
					disabled={currentPage === totalPages}
					className="menu-page__pagination-btn menu-page__pagination-btn--next"
				>
					&gt;
				</button>
			</div>
		);
	};

	return (
		<Container>
			<h1 className="menu-page__title">Меню ресторана</h1>

			<nav className="menu-page__nav">
				<NavLink
					to="/menu"
					onClick={handleGetAllMenu}
					className={({ isActive }) =>
						`menu-page__nav-link ${
							isActive && !currentCategory ? "menu-page__nav-link--active" : ""
						}`
					}
				>
					Показать всё меню
				</NavLink>
				{categories.map((category) => (
					<NavLink
						key={category}
						to={`/menu?category=${category}`}
						onClick={() => {
							setSearchParams({ category });
							dispatch(getMenuByCategory(category));
						}}
						className={({ isActive }) =>
							`menu-page__nav-link ${
								isActive && currentCategory === category
									? "menu-page__nav-link--active"
									: ""
							}`
						}
					>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</NavLink>
				))}
			</nav>

			{loading && <Loading />}
			{error && <p className="menu-page__error">Ошибка: {error}</p>}

			{!loading && !error && (
				<div className="menu-page__content">
					{currentCategory ? (
						<>
							<h2 className="menu-page__subtitle">
								{currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
							</h2>
							{renderCategoryMenu()}
						</>
					) : (
						renderAllMenu()
					)}
				</div>
			)}
		</Container>
	);
};

export default MenuPage;
