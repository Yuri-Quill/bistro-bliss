import { ButtonLink } from "../Buttons/Buttons";
import ContactsCard from "../Contacts/ContactsCard/ContactsCard";
import Container from "../Container/Container";
import "./MeetUs.scss";


interface MeetUpProps {
	image: string;
	className:string
}

const MeetUs = ({ image, className }: MeetUpProps) => {
	return (
		<section className={`${className} meet-us`}>
			<Container>
				<article className="meet-us__article">
					<img
						className="meet-us__image"
						src={image}
						alt="Dishes picture"
						width={599}
						height={566}
						loading="lazy"
					/>
					<ContactsCard className="meet-us__contacts-card" />
				</article>

				<div className="meet-us__content">
					<h2 className="meet-us__title">
						We provide healthy food for your family.
					</h2>

					<p className="meet-us__text">
						Our story began with a vision to create a unique dining experience that
						merges fine dining, exceptional service, and a vibrant ambiance. Rooted in
						city's rich culinary culture, we aim to honor our local roots while
						infusing a global palate.
					</p>

					<p className="meet-us__subtext">
						At place, we believe that dining is not just about food, but also about
						the overall experience. Our staff, renowned for their warmth and
						dedication, strives to make every visit an unforgettable event.
					</p>

					<ButtonLink className="meet-us__link" to="/about" isPrimary={true}>
						More About Us
					</ButtonLink>
				</div>
			</Container>
		</section>
	);
};

export default MeetUs;
