import Container from "../Container/Container";
import FeaturedMenuCard from "./FeaturedMenuCard/FeaturedMenuCard";

import { featuredMenuData } from "../../shared/data/featured-menu.data";

import "./FeaturedMenu.scss";

const FeaturedMenu = () => {
	return (
		<section className="featured-menu">
			<Container>
				<h2 className="featured-menu__title">Browse Our Menu</h2>

				<ul className="featured-menu__list">
					{featuredMenuData.map((item) => (
						<FeaturedMenuCard data={item} className="featured-menu__list-item" />
					))}
				</ul>
			</Container>
		</section>
	);
};

export default FeaturedMenu;
