import DeliverySection from "../../Components/DeliverySection/DeliverySection";
import FeedbackSection from "../../Components/FeedBackSection/FeedbackSection";
import HeroSection from "../../Components/HeroSection/HeroSection";
import MeetUsSection from "../../Components/MeetUsSection/MeetUsSection";
import MenuPeekSection from "../../Components/MenuPeekSection/MenuPeekSection";
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
		</>
	);
};

export default HomePage;
