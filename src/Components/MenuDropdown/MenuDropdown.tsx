import { useNavigate } from "react-router-dom";
import "./MenuDropdown.scss";
import { IMenuItemInterface } from "../../shared/interfaces/menu.interface";
interface IMenuCategory {
	category: string;
	items: IMenuItemInterface[];
}

interface MenuDropdownProps {
	categories: IMenuCategory[];
	currentCategory: string | null;
	currentPage: number;
}

const MenuDropdown = ({
	categories,
	currentCategory,
	currentPage,
}: MenuDropdownProps) => {
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		navigate(e.target.value);
	};

	return (
		<select
			className="menu-dropdown"
			onChange={handleChange}
			value={
				currentCategory
					? `/menu?category=${currentCategory}&page=${currentPage}`
					: `/menu?page=${currentPage}`
			}
			aria-label="Select menu category"
		>
			<option
				className="menu-dropdown__option"
				value={`/menu?page=${currentPage}`}
			>
				All
			</option>
			{categories.map((cat) => (
				<option
					key={cat.category}
					className="menu-dropdown__option"
					value={`/menu?category=${cat.category}&page=${currentPage}`}
				>
					{cat.category.charAt(0).toUpperCase() + cat.category.slice(1)}
				</option>
			))}
		</select>
	);
};

export default MenuDropdown;
