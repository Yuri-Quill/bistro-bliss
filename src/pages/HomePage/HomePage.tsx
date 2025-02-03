import BrowseMenuSection from "../../Components/BrowseMenuSection/BrowseMenuSection";
import HealthyFoodSection from "../../Components/HealthyFoodSection/HealthyFoodSection";
import HeroSection from "../../Components/HeroSection/HeroSection";

const HomePage = () => {
	return (
		<>
			<HeroSection />
			<BrowseMenuSection />
			<HealthyFoodSection/>
		</>
	);
};

export default HomePage;
