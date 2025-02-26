import MeetUs from "../../Components/MeetUs/MeetUs";
import TasteVideoSection from "../../Components/TasteVideoSection/TasteVideoSection";
import MeetUsRisotto from "../../assets/meet-us-section/meet-us-risotto.png";
import "./AboutPage.scss";
const AboutPage = () => {
	return (
		<>
			<MeetUs image={MeetUsRisotto} className="about-page__meet-us" />
			<TasteVideoSection />
		</>
	);
};

export default AboutPage;
