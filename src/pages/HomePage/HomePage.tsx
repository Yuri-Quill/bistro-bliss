import FeaturedMenu from "../../Components/FeaturedMenu/FeaturedMenu";
import Hero from "../../Components/Hero/Hero";
import MeetUs from "../../Components/MeetUs/MeetUs";
import OurDelivery from "../../Components/OurDelivery/OurDelivery";
import OurServices from "../../Components/OurServices/OurServices";
import Testimonials from "../../Components/Testimonials/Testimonials";
import RecipesArticles from "../../Components/RecipesArticles/RecipesArticles";

import MeetUsKebab from '../../assets/meet-us-section/meet-us-kebab.png'

const HomePage = () => {
	return (
		<>
			<Hero />
			<FeaturedMenu />
			<MeetUs image={MeetUsKebab}/>
			<OurServices/>
			<OurDelivery/>
			<Testimonials/>
			<RecipesArticles/>
		</>
	);
};

export default HomePage;
