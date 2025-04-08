import DeliverySection from "../../Components/DeliverySection/DeliverySection";
import FeedbackSection from "../../Components/FeedBackSection/FeedbackSection";
import HeroSection from "../../Components/HeroSection/HeroSection";
import MeetUsSection from "../../Components/MeetUsSection/MeetUsSection";
import MenuPeekSection from "../../Components/MenuPeekSection/MenuPeekSection";
import RecipesPeekSection from "../../Components/RecipesPeekSection/RecipesPeekSection";
import ServicesSection from "../../Components/ServicesSection/ServicesSection";

import MeetUsSectionPic from "../../assets/about-us/meet-us-banner.png";

const HomePage = () => {
	return (
		<>
			<HeroSection />
			<MenuPeekSection />
			<MeetUsSection image={MeetUsSectionPic} />
			<ServicesSection />
			<DeliverySection/>
			<FeedbackSection/>
			<RecipesPeekSection/>
		</>
	);
};

export default HomePage;
