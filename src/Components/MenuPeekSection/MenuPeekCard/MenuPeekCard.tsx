import "./MenuPeekCard.scss";

import IMenuPeek from "../../../shared/interfaces/menu-peek.interface";
import { Link } from "react-router-dom";

type MenuPeekCardProps = {
	data: IMenuPeek;
	className?: string;
};

const MenuPeekCard = ({ data, className }: MenuPeekCardProps) => {
	return (
		<figure
			className={`${className} menu-peek__card`}
			aria-label={`${data.description} card`}
		>
			<img
				className="menu-peek__card-img"
				src={data.image}
				alt={`${data.name} category image`}
				width={100}
				height={100}
			/>
			<figcaption className="menu-peek__card-caption">
				<h3 className="menu-peek__card-title">{data.name}</h3>
				<p className="menu-peek__card-text">{data.body}</p>
			</figcaption>
			<Link
				className="menu-peek__card-link"
				to={data.href}
				aria-label={`${data.description} link`}
			>
				Explore Menu
			</Link>
		</figure>
	);
};

export default MenuPeekCard;
