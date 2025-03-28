import { getMenu} from "../../app/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Loading from "../../Components/Loading/Loading";
import {
	IMenuItemInterface,
} from "../../shared/interfaces/menu.interface";
import "./MenuPage.scss";

const MenuPage = () => {
	const dispatch = useAppDispatch();
	const { menu, loading, error } = useAppSelector((state) => state.menu);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentCategory = searchParams.get("category");

	useEffect(() => {
		if (!menu && !loading) {
			dispatch(getMenu());
		}
		// setCurrentPage(1);
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

	const menuItems = getMenuItemsByCategory();
	console.log("Menu Items:", menuItems);



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
						{menuCategories.map((category, index) => (
							<li key={index}>
								<NavLink to={`/menu?category=${category}`}>
									{category.charAt(0).toUpperCase() + category.slice(1)}
								</NavLink>
							</li>
						))}
					</ul>
				</nav>

				<ul className="menu__items-list">
					{menuItems.map((item: IMenuItemInterface, index: number) => (
						<li key={index}>
							<img src={item.picture} alt="" />
						</li>
					))}
				</ul>

				<div className="menu__pagenetio">
					<button>{"<"}</button>
					<button>{">"}</button>
				</div>
			</Container>
		</section>
	);
};

export default MenuPage;
