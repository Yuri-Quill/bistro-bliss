import { Link } from "react-router-dom";
import "./BrowseMenuCard.scss";

interface MenuItemData {
	img: string;
	title: string;
	body: string;
}

interface BrowseMenuCardProps {
	data: MenuItemData;
	to: string;
	className: string;
	width: number;
	height:number;
}

const BROWSE_MENU_PREFIX = "browse-menu__card";

const getClass = (suffix: string) => `${BROWSE_MENU_PREFIX}-${suffix}`;

const BrowseMenuCard = ({ data, to, className, width,height }: BrowseMenuCardProps) => {
	return (
		<li className={`${BROWSE_MENU_PREFIX} ${className}`}>
			<figure className={getClass("figure")}>
				<img
					className={getClass("image")}
					src={data.img}
					alt={`Illustration of ${data.title}`}
					loading="lazy"
					width={width}
					height={height}
					role="presentation"
				/>

				<figcaption className={getClass("caption")}>
					<h3 className={getClass("title")}>{data.title}</h3>
					<p className={getClass("text")}>{data.body}</p>
				</figcaption>
			</figure>
			<Link
				className={getClass("link")}
				to={to}
				aria-label={`Explore ${data.title} menu`}
			>
				Explore Menu
			</Link>
		</li>
	);
};

export default BrowseMenuCard;
