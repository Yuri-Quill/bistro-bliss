import { getMenu } from "../../app/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useSearchParams, NavLink, useNavigate } from "react-router-dom";

import Container from "../../Components/Container/Container";
import Loading from "../../Components/Loading/Loading";
import MenuItemCard from "../../Components/MenuItemCard/MenuItemCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { IMenuItemInterface } from "../../shared/interfaces/menu.interface";

import "./MenuPage.scss";

const MenuPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { categories, loading, error } = useAppSelector((state) => state.menu);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentCategory = searchParams.get("category") || null;
	const pageFromUrl = searchParams.get("page") || "1"; // По умолчанию 1
	const itemsPerPage = 8;

	// Парсим текущую страницу из URL
	const currentPage = Math.max(1, parseInt(pageFromUrl, 10) || 1);

	// Загрузка данных
	useEffect(() => {
		if (categories.length === 0 && !loading) {
			dispatch(getMenu());
		}
	}, [dispatch, categories, loading]);

	// Получение элементов для отображения
	const getMenuItems = (): IMenuItemInterface[] => {
		if (!categories.length) return [];
		if (currentCategory) {
			const category = categories.find((cat) => cat.category === currentCategory);
			return category ? category.items : [];
		}
		return categories.flatMap((cat) => cat.items);
	};

	const menuItems = getMenuItems();

	// Пагинация
	const getPaginatedItems = () => {
		const totalItems = menuItems.length;
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		// Ограничиваем currentPage максимальным количеством страниц
		const safePage = Math.min(Math.max(1, currentPage), totalPages || 1);
		const startIndex = (safePage - 1) * itemsPerPage;
		const paginatedItems = menuItems.slice(startIndex, startIndex + itemsPerPage);
		return { paginatedItems, totalPages };
	};

	const { paginatedItems, totalPages } = getPaginatedItems();

	// Обработчики переключения страниц
	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", newPage.toString());
		if (currentCategory) {
			params.set("category", currentCategory);
		}
		setSearchParams(params, { replace: true });
	};

	const handlePrevPage = () => {
		handlePageChange(Math.max(currentPage - 1, 1));
	};

	const handleNextPage = () => {
		handlePageChange(Math.min(currentPage + 1, totalPages));
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
				{loading ? (
					<Loading />
				) : error ? (
					<p className="menu__error">Error: {error}</p>
				) : (
					<>
						<nav className="menu__nav">
							<ul className="menu__nav-list">
								<li className="menu__nav-list-item">
									<NavLink
										className={({ isActive }) =>
											`menu__nav-list-link ${
												isActive && currentCategory === null
													? "menu__nav-list-link--active"
													: ""
											}`
										}
										to="/menu?page=1"
										end
									>
										All
									</NavLink>
								</li>
								{categories.map((cat) => (
									<li className="menu__nav-list-item" key={cat.category}>
										<NavLink
											className={({ isActive }) =>
												`menu__nav-list-link ${
													isActive && cat.category === currentCategory
														? "menu__nav-list-link--active"
														: ""
												}`
											}
											to={`/menu?category=${cat.category}&page=1`}
										>
											{cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
										</NavLink>
									</li>
								))}
							</ul>
							
						</nav>

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
