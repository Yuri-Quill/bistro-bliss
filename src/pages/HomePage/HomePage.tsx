import HeroSection from "../../Components/HeroSection/HeroSection";
import MeetUsSection from "../../Components/MeetUsSection/MeetUsSection";
import MenuPeekSection from "../../Components/MenuPeekSection/MenuPeekSection";


import MeetUsSectionPic from '../../assets/about-us/meet-us-banner.png'

const HomePage = () => {
	return (
		<>
			<HeroSection />
			<MenuPeekSection/>
			<MeetUsSection image={MeetUsSectionPic}/>
		</>
	);
};

export default HomePage;
