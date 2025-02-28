import MeetUs from "../../Components/MeetUs/MeetUs";
import Benefits from "../../Components/Benefits/Benefits";
import GuestInfo from "../../Components/GuestInfo/GuestInfo";
import TasteVideoSection from "../../Components/TasteVideoSection/TasteVideoSection";
import Testimonials from "../../Components/Testimonials/Testimonials";

import MeetUsRisotto from "../../assets/meet-us-section/meet-us-risotto.png";

import "./AboutPage.scss";
const AboutPage = () => {
	return (
		<>
			<MeetUs image={MeetUsRisotto} className="about-page__meet-us" />
			<TasteVideoSection />
			<Benefits />
			<GuestInfo />
			<Testimonials/>
		</>

	);
};

export default AboutPage;
