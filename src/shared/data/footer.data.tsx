import Symphony from "../../assets/footer/symphony.webp";
import Pairings from "../../assets/footer/wine-pairings.webp";
import Comfort from "../../assets/footer/comfort.jpg";
import JoinUs from "../../assets/footer/join-us.jpg";

import IFooter from "../interfaces/footer.interfaec";

const footerData: IFooter[] = [
	{
		title: "A Symphony of Flavors",
		image: Symphony,
		body:
			"Each dish on our menu is crafted with the finest ingredients, bringing together tradition and innovation. From elegant appetizers to mouthwatering main courses and decadent desserts, every bite is a celebration of taste.",
	},
	{
		title: "Perfect Pairings",
		image: Pairings,
		body:
			"Enhance your dining experience with our carefully curated wine selection, crafted cocktails, and freshly brewed artisanal coffee. Whether you`re here for a quick brunch, a romantic dinner, or a casual gathering, we have the perfect pairing for your meal.",
	},
	{
		title: "An Atmosphere of Comfort",
		image: Comfort,
		body:
			"Bistro Bliss is designed to make you feel at home while indulging in the luxury of fine dining. The warm lighting, sophisticated decor, and relaxing music create an ambiance that is both inviting and stylish.",
	},
	{
		title: "Join Us & for the Moment",
		image: JoinUs,
		body:
			"Reserve your table today and let us take you on a journey of culinary delight. Because at Bistro Bliss, every meal is a moment to cherish.",
	},
];
export default footerData;
