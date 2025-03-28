import { getMenu } from "../../app/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, NavLink, useLocation } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Loading from "../../Components/Loading/Loading";
import {
	IMenuItemInterface,
	IMenuInterface,
} from "../../shared/interfaces/menu.interface";

import MenuItemCard from "../../Components/MenuItemCard/MenuItemCard";

import "./MenuPage.scss";

type MenuCategory = keyof Omit<IMenuInterface, "_id" | "__v">;

const MenuPage = () => {
	const dispatch = useAppDispatch();
	const { menu, loading, error } = useAppSelector((state) => state.menu);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentCategory = searchParams.get("category");
	const pageFromUrl = searchParams.get("page");
	const itemsPerPage = 8;

	const [currentPage, setCurrentPage] = useState(() => {
		const pageNum = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
		return isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;
	});

	const location = useLocation();
	const currentSearchParams = new URLSearchParams(location.search);
	const activeCategory = currentSearchParams.get("category") || "";

	useEffect(() => {
		if (!menu && !loading) {
			dispatch(getMenu());
		}
	}, [dispatch, menu, loading]);

	// Синхронизируем URL с порядком category → page
	useEffect(() => {
		const params = new URLSearchParams();
		if (currentCategory) {
			params.set("category", currentCategory); // Сначала category
		}
		params.set("page", currentPage.toString()); // Затем page
		setSearchParams(params, { replace: true });
	}, [currentPage, currentCategory, setSearchParams]);

	const menuCategories: MenuCategory[] = menu
		? (Object.keys(menu).filter(
				(category) => !["_id", "__v"].includes(category)
		  ) as MenuCategory[])
		: [];

	console.log("Categories:", menuCategories);

	const getMenuItemsByCategory = () => {
		if (!menu) return [];
		if (
			currentCategory &&
			menuCategories.includes(currentCategory as MenuCategory)
		) {
			return menu[currentCategory as MenuCategory].filter(
				(item): item is IMenuItemInterface => Boolean(item)
			);
		}
		return menuCategories
			.flatMap((category) => (Array.isArray(menu[category]) ? menu[category] : []))
			.filter((item): item is IMenuItemInterface => Boolean(item));
	};

	const menuItems = getMenuItemsByCategory();

	const getPaginatedItems = () => {
		const totalItems = menuItems.length;
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		const startIndex = (currentPage - 1) * itemsPerPage;
		const paginatedItems = menuItems.slice(startIndex, startIndex + itemsPerPage);
		return {
			paginatedItems,
			totalPages,
		};
	};

	const { paginatedItems, totalPages } = getPaginatedItems();

	const handlePrevPage = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	return (
		<section className="menu">
			<Container>
				<h2 className="menu__title">Our Menu</h2>
				<p className="menu__text">
					Our menu is designed to give you the flexibility to create a truly
					personalized dining experience. With a wide range of dishes to choose from,
					you're sure to find something that suits your taste.
				</p>

				<nav className="menu__nav">
					<ul className="menu__nav-list">
						<li className="menu__nav-list-item">
							<NavLink
								className={() =>
									activeCategory === ""
										? "menu__nav-list-link menu__nav-list-link--active"
										: "menu__nav-list-link"
								}
								to="/menu?page=1"
								end
							>
								All
							</NavLink>
						</li>
						{menuCategories.map((category) => (
							<li className="menu__nav-list-item" key={category}>
								<NavLink
									className={() =>
										activeCategory === category
											? "menu__nav-list-link menu__nav-list-link--active"
											: "menu__nav-list-link"
									}
									to={`/menu?category=${category}&page=1`}
									end
								>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				{loading ? (
					<Loading />
				) : error ? (
					<p className="menu__error">Error: {error}</p>
				) : (
					<>
						<ul className="menu__items-list">
							{paginatedItems.map((item: IMenuItemInterface) => (
								<li key={item._id} className="menu__item">
									<MenuItemCard data={item} categories={currentCategory} />
								</li>
							))}
						</ul>

						<div className="menu__pagination">
							<button
								className="menu__pagination-button"
								onClick={handlePrevPage}
								type="button"
								disabled={currentPage === 1}
							>
								{"<"}
							</button>
							<span className="menu__pagination-info">
								{currentPage} / {totalPages}
							</span>
							<button
								className="menu__pagination-button"
								onClick={handleNextPage}
								type="button"
								disabled={currentPage === totalPages}
							>
								{">"}
							</button>
						</div>
					</>
				)}
			</Container>
		</section>
	);
};

export default MenuPage;
