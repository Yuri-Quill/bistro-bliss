import { getMenu } from "../../app/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";

import Container from "../../Components/Container/Container";
import Loading from "../../Components/Loading/Loading";
import MenuItemCard from "../../Components/MenuItemCard/MenuItemCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { IMenuItemInterface } from "../../shared/interfaces/menu.interface";

import "./MenuPage.scss";

const MenuPage = () => {
	const dispatch = useAppDispatch();
	const { categories, loading, error } = useAppSelector((state) => state.menu);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentCategory = searchParams.get("category");
	const pageFromUrl = searchParams.get("page");
	const itemsPerPage = 8;

	const [currentPage, setCurrentPage] = useState(() => {
		const pageNum = pageFromUrl ? parseInt(pageFromUrl, 10) : 1;
		return isNaN(pageNum) || pageNum < 1 ? 1 : pageNum;
	});

	useEffect(() => {
		if (categories.length === 0 && !loading) {
			dispatch(getMenu());
		}
	}, [dispatch, categories, loading]);

	// Синхронизация URL с текущей страницей и категорией
	useEffect(() => {
		const params = new URLSearchParams();
		if (currentCategory) {
			params.set("category", currentCategory);
		}
		params.set("page", currentPage.toString());
		setSearchParams(params, { replace: true });
	}, [currentPage, currentCategory, setSearchParams]);



	// Получение элементов для отображения
	const getMenuItems = (): IMenuItemInterface[] => {
		if (!categories.length) return [];
		if (currentCategory) {
			const category = categories.find((cat) => cat.category === currentCategory);
			return category ? category.items : [];
		}
		return categories.flatMap((cat) => cat.items); // Все элементы из всех категорий
	};

	const menuItems = getMenuItems();

	// Пагинация
	const getPaginatedItems = () => {
		const totalItems = menuItems.length;
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		const startIndex = (currentPage - 1) * itemsPerPage;
		const paginatedItems = menuItems.slice(startIndex, startIndex + itemsPerPage);
		return { paginatedItems, totalPages };
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
								className="menu__nav-list-link"
								to="/menu?page=1"
							
							>
								All
							</NavLink>
						</li>
						{categories.map((cat) => (
							<li className="menu__nav-list-item" key={cat.category}>
								<NavLink
									className="menu__nav-list-link"
									to={`/menu?category=${cat.category}&page=1`}
								
								>
									{cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
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
							{paginatedItems.length > 0 ? (
								paginatedItems.map((item: IMenuItemInterface) => (
									<li key={item._id} className="menu__item">
										<MenuItemCard data={item} categories={currentCategory || "all"} />
									</li>
								))
							) : (
								<p>No items available</p>
							)}
						</ul>

						{totalPages > 1 && (
							<div className="menu__pagination">
								<button
									className="menu__pagination-button"
									onClick={handlePrevPage}
									type="button"
									disabled={currentPage === 1}
								>
									<FaChevronLeft />
								</button>
								<span className="menu__pagination-info">
									Page {currentPage} of {totalPages}
								</span>
								<button
									className="menu__pagination-button"
									onClick={handleNextPage}
									type="button"
									disabled={currentPage === totalPages}
								>
									<FaChevronRight />
								</button>
							</div>
						)}
					</>
				)}
			</Container>
		</section>
	);
};

export default MenuPage;
