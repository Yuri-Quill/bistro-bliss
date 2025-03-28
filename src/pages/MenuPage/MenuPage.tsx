import { getMenu } from "../../app/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Loading from "../../Components/Loading/Loading";
import { IMenuItemInterface } from "../../shared/interfaces/menu.interface";
import "./MenuPage.scss";

const MenuPage = () => {
	const dispatch = useAppDispatch();
	const { menu, loading, error } = useAppSelector((state) => state.menu);

	const [searchParams, setSearchParams] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(1);

	const currentCategory = searchParams.get("category");
	const itemsPerPage = 8;

	useEffect(() => {
		if (!menu && !loading) {
			dispatch(getMenu());
		}
		setCurrentPage(1);
	}, [dispatch, currentCategory, menu, loading]);

	const menuCategories = menu
		? Object.keys(menu).filter((category) => !["_id", "__v"].includes(category))
		: [];

	console.log("Categories:", menuCategories);

	const getMenuItemsByCategory = () => {
		// Если категория выбрана, берём только элементы этой категории
		if (currentCategory && menu[currentCategory]) {
			return menu[currentCategory].filter((item): item is IMenuItemInterface =>
				Boolean(item)
			);
		}

		// Если категория не выбрана, собираем все элементы из всех категорий
		return menuCategories
			.flatMap((category) => (Array.isArray(menu[category]) ? menu[category] : []))
			.filter((item): item is IMenuItemInterface => Boolean(item));
	};

	const getPaginatedItems = () => {
		const totalItems = menuItems.length;
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		const startIndex = (currentPage - 1) * itemsPerPage;
		return {
			paginatedItems: menuItems.slice(startIndex, startIndex + itemsPerPage),
			totalPages,
		};
	};

	const menuItems = getMenuItemsByCategory();
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
					We consider all the drivers of change gives you the components you need to
					change to create a truly happens.
				</p>

				<nav className="menu__nav">
					<ul className="menu__nav-list">
						<li className="menu__list-item">
							<NavLink className="menu__list-link" to={"/menu"}>
								All
							</NavLink>
						</li>
						{menuCategories.map((category, index) => (
							<li className="menu__nav-list-item" key={index}>
								<NavLink className="menu__list-link" to={`/menu?category=${category}`}>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				<ul className="menu__items-list">
					{paginatedItems.map((item: IMenuItemInterface, index: number) => (
						<li key={index}>
							<img src={item.picture} alt="" />
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
					<button
						className="menu__pagination-button"
						onClick={handleNextPage}
						type="button"
						disabled={currentPage === totalPages}
					>
						{">"}
					</button>
				</div>
			</Container>
		</section>
	);
};

export default MenuPage;
