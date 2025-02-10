import Contacts from "../Contacts/Contacts";
import Container from "../Container/Container";
import SocialMedia from "../SocialMedia/SocialMedia";
import "./TopBar.scss";

const TopBar = () => {
	const notIncluded = "address"; // can be an array or a string

	return (
		<section className="top-bar">
			<Container>
				<Contacts filterByName={notIncluded} className="top-bar" />
				<SocialMedia  className="top-bar" />
			</Container>
		</section>
	);
};

export default TopBar;
