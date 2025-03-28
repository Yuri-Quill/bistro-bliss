import { getMenu } from "../../app/slices/menuSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { useSearchParams, NavLink } from "react-router-dom";
import Container from "../../Components/Container/Container";
import Loading from "../../Components/Loading/Loading";
import { IMenuItemInterface, IMenuInterface } from "../../shared/interfaces/menu.interface";
import "./MenuPage.scss";

// Определяем тип категорий, исключая служебные поля _id и __v
type MenuCategory = keyof Omit<IMenuInterface, "_id" | "__v">;

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

  const menuCategories: MenuCategory[] = menu
    ? (Object.keys(menu).filter((category) => !["_id", "__v"].includes(category)) as MenuCategory[])
    : [];

  console.log("Categories:", menuCategories);

  const getMenuItemsByCategory = () => {
    if (!menu) return [];
    // Проверяем, что currentCategory — допустимая категория
    if (currentCategory && menuCategories.includes(currentCategory as MenuCategory)) {
      return menu[currentCategory as MenuCategory].filter(
        (item): item is IMenuItemInterface => Boolean(item)
      );
    }
    // Если нет категории, возвращаем все элементы
    return menuCategories
      .flatMap((category) => (Array.isArray(menu[category]) ? menu[category] : []))
      .filter((item): item is IMenuItemInterface => Boolean(item));
  };

  const menuItems = getMenuItemsByCategory();

  const getPaginatedItems = () => {
    const totalItems = menuItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    return {
      paginatedItems: menuItems.slice(startIndex, startIndex + itemsPerPage),
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
          We consider all the drivers of change gives you the components you need to
          change to create a truly happens.
        </p>

        <nav className="menu__nav">
          <ul className="menu__nav-list">
            <li className="menu__nav-list-item">
              <NavLink
                className={({ isActive }) =>
                  `menu__list-link ${isActive && !currentCategory ? "menu__list-link--active" : ""}`
                }
                to="/menu"
              >
                All
              </NavLink>
            </li>
            {menuCategories.map((category) => (
              <li className="menu__nav-list-item" key={category}>
                <NavLink
                  className={({ isActive }) =>
                    `menu__list-link ${isActive && currentCategory === category ? "menu__list-link--active" : ""}`
                  }
                  to={`/menu?category=${category}`}
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
                  <img src={item.picture} alt={item.name} className="menu__item-image" />
                  <div className="menu__item-content">
                    <h3 className="menu__item-title">{item.name}</h3>
                    <p className="menu__item-ingredients">{item.ingredients.join(", ")}</p>
                    <p className="menu__item-price">${item.price}</p>
                  </div>
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