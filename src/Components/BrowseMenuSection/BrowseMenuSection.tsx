import Container from "../Container/Container";
import BrowseMenuCard from "./BrowseMenuCard/BrowseMenuCard";

import Breakfast from "../../assets/icons/browse-menu/breakfast-icon.png";
import MainDishes from "../../assets/icons/browse-menu/main-dishes-icon.png";
import Drinks from "../../assets/icons/browse-menu/drinks-icon.png";
import Desserts from "../../assets/icons/browse-menu/desserts-icon.png";

const BrowseMenuCategory = [
	{
		title: "Breakfast",
		body: "Start your day with a delicious and energizing breakfast.",
		img: `${Breakfast}`,
	},
	{
		title: "Main Dishes",
		body: "Satisfy your hunger with our flavorful and hearty main dishes.",
		img: `${MainDishes}`,
	},
	{
		title: "Drinks",
		body: "Refresh yourself with a variety of hot and cold beverages.",
		img: `${Drinks}`,
	},
	{
		title: "Desserts",
		body: "Indulge in sweet treats to complete your meal.",
		img: `${Desserts}`,
	},
];

import "./BrowseMenuSection.scss";

const BrowseMenuSection = () => {
	return (
		<section className="browse-menu__section">
			<Container>
				<h2 className="browse-menu__section-title">Browse Our Menu</h2>
				<ul className="browse-menu__section-list">
					{BrowseMenuCategory.map((category) => (
						<BrowseMenuCard
							className="browse-menu__section-item"
							data={category}
							to={`/menu${category.title.toLowerCase()}`}
							key={category.title}
							width={100}
							height={100}
						/>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default BrowseMenuSection;
