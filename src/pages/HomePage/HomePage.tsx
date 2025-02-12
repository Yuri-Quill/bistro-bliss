import FeaturedMenu from "../../Components/FeaturedMenu/FeaturedMenu";
import Hero from "../../Components/Hero/Hero";
import MeetUs from "../../Components/MeetUs/MeetUs";
import OurServices from "../../Components/OurServices/OurServices";

import MeetUsKebab from '../../assets/meet-us-section/meet-us-kebab.png'

const HomePage = () => {
	return (
		<>
			<Hero />
			<FeaturedMenu />
			<MeetUs image={MeetUsKebab}/>
			<OurServices/>
		</>
	);
};

export default HomePage;
