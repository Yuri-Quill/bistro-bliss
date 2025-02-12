import { Link } from "react-router-dom";
import { IFeaturedMenu } from "../../../shared/interfaces/FeaturedMenu.interface";
import "./FeaturedMenuCard.scss";

type FeaturedMenuCardProps = {
	data: IFeaturedMenu;
	className: string;
};

const FeaturedMenuCard = ({ data, className }: FeaturedMenuCardProps) => {
	return (
		<li className={`${className} featured-menu__card`} key={data.id}>
			<figure className="featured-menu__card-figure">
				<img
					className="featured-menu__card-image"
					src={data.image}
					alt={`${data.name} icon`}
                    width={100}
                    height={100}
				/>

				<figcaption className="featured-menu__card-caption">
					<h3 className="featured-menu__card-title">{data.name}</h3>
					<p className="featured-menu__card-text">{data.body}</p>
				</figcaption>
			</figure>

			<Link
				className="featured-menu__card-link"
				to={`/menu/${data.url}`}
			>
				Explore Menu
			</Link>
		</li>
	);
};

export default FeaturedMenuCard;
