import { getMenu, getMenuByCategory } from "../../app/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Loading from "../../Components/Loading/Loading";
import {
	IMenuInterface,
	IMenuItemInterface,
} from "../../shared/interfaces/menu.interface";

const MenuPage = () => {
	const dispatch = useAppDispatch();
	const { menu, menuCategory, loading, error } = useAppSelector(
		(state) => state.menu
	);

	const [searchParams, setSearchParams] = useSearchParams();
	const currentCategory = searchParams.get("category");

	// Типизация категорий как ключей IMenuInterface
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
	}, [dispatch, currentCategory]);

	const handleGetAllMenu = () => {
		setSearchParams({});
		dispatch(getMenu());
	};

	const handleCategoryClick = (category: keyof IMenuInterface) => {
		setSearchParams({ category });
		dispatch(getMenuByCategory(category));
	};

	// Отображение всех блюд из всех категорий
	const renderAllMenu = () => {
		if (!menu) return null;
		return (
			<>
				{categories.map((category) => {
					const items = menu[category];
					// Проверяем, что items — это массив
					if (!Array.isArray(items)) return null;
					return (
						<div key={category}>
							<h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
							<ul>
								{items.map((item: IMenuItemInterface) => (
									<li key={item._id}>
										{item.name} - {item.price} руб.
									</li>
								))}
							</ul>
						</div>
					);
				})}
			</>
		);
	};

	// Отображение блюд текущей категории
	const renderCategoryMenu = () => {
		if (!menuCategory) return null;
		return (
			<ul>
				{menuCategory.map((item: IMenuItemInterface) => (
					<li key={item._id}>
						{item.name} - {item.price} руб.
					</li>
				))}
			</ul>
		);
	};

	return (
		<Container>
			<h1>Меню ресторана</h1>

			<div style={{ marginBottom: "20px" }}>
				<button
					onClick={handleGetAllMenu}
					style={{ marginRight: "10px" }}
					disabled={loading || !currentCategory}
				>
					Показать всё меню
				</button>
				{categories.map((category) => (
					<button
						key={category}
						onClick={() => handleCategoryClick(category)}
						style={{ marginRight: "10px" }}
						disabled={loading || currentCategory === category}
					>
						{category.charAt(0).toUpperCase() + category.slice(1)}
					</button>
				))}
			</div>

			{loading && <Loading />}
			{error && <p>Ошибка: {error}</p>}

			{!loading && !error && (
				<>
					{currentCategory ? (
						<>
							<h2>
								{currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}
							</h2>
							{renderCategoryMenu()}
						</>
					) : (
						renderAllMenu()
					)}
				</>
			)}
		</Container>
	);
};

export default MenuPage;
