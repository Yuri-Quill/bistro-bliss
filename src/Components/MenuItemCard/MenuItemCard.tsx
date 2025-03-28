import { Link } from "react-router-dom";
import "./MenuItemCard.scss";
import { IMenuItemInterface } from "../../shared/interfaces/menu.interface";
import NoImage  from '../../assets/no-img.jpg'
interface IMenuItemCardProps {
	data: IMenuItemInterface;
	categories: string | null;
}

const MenuItemCard = ({ data, categories }: IMenuItemCardProps) => {
	return (
		<Link className="menu-card" to={`/menu/${categories}/${data._id}`}>
			<figure className="menu-card__figure">
				<img
					className="menu-card__image"
					src={data.picture}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null;
						currentTarget.src = NoImage;
					}}
					alt={`Picture of ${data.name}`}
					width={306}
					height={230}
				/>
				<figcaption className="menu-card__caption">
					<span className="menu-card__price">{`$ ${data.price}`}</span>
					<h3 className="menu-card__title">{data.name}</h3>
					<p className="menu-card__ingredients">{data.ingredients.join(", ")}</p>
				</figcaption>
			</figure>
		</Link>
	);
};
export default MenuItemCard;
