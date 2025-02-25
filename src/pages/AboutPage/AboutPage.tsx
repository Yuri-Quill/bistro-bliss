import MeetUs from "../../Components/MeetUs/MeetUs";
import MeetUsRisotto from '../../assets/meet-us-section/meet-us-risotto.png'
import './AboutPage.scss'
const AboutPage = () => {
	return (
		<>
		<MeetUs image={MeetUsRisotto} className="about-page__meet-us"/>
		</>
	);
};

export default AboutPage;
