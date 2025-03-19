import AboutUsSection from "../../Components/AboutUsSection/AboutUsSection";
import FeedbackSection from "../../Components/FeedBackSection/FeedbackSection";
import FeelTheTasteSection from "../../Components/FeelTheTasteSection/FeelTheTasteSection";
import MeetUsSection from "../../Components/MeetUsSection/MeetUsSection";
import OurBenefitsSection from "../../Components/OurBenefitsSection/OurBenefitsSection";
import ABoutUsImg from "../../assets/about-us/about-us-img.avif";
import "./AboutPage.scss";
const AboutPage = () => {
	return (
		<>
			<MeetUsSection image={ABoutUsImg} className="about-page__meet-us" />
			<FeelTheTasteSection />
			<OurBenefitsSection />
			<AboutUsSection/>
			<FeedbackSection />
		</>
	);
};

export default AboutPage;
