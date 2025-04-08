import Container from "../Container/Container";

import ButtonLink from "../ButtonLink/ButtonLink";

import contactsData from "../../shared/data/contacts.data";

import "./MeetUsSection.scss";

interface MeetUsSectionProps {
	image: string;
    className?:string
}

const MeetUsSection = ({ image, className }: MeetUsSectionProps) => {
	return (
		<section className={`meet-us ${className}`}>
			<Container>
				<figure className="meet-us__figure">
					<img
						className="meet-us__figure-image"
						src={image}
						alt="A photo of our signature dish"
						width={599}
						height={566}
					/>

					<figcaption className="meet-us__caption">
						<h3 className="meet-us__caption-title">Come and visit us</h3>

						<ul className="meet-us__caption-list">
							{contactsData.map((item) => (
								<li className="meet-us__caption-item" key={item.name}>
									{item.image}

									<a
										className="meet-us__caption-link"
										href={item.href}
										aria-label={item.description}
									>
										{item.body}
									</a>
								</li>
							))}
						</ul>
					</figcaption>
				</figure>

				<div className="meet-us__info">
					<h2 className="meet-us__info-title">
						We provide healthy food for your family.
					</h2>

					<p className="meet-us__info-text">
						Our story began with a vision to create a unique dining experience that
						merges fine dining, exceptional service, and a vibrant ambiance. Rooted in
						city's rich culinary culture, we aim to honor our local roots while
						infusing a global palate.
					</p>

					<span className="meet-us__info-subtext">
						At place, we believe that dining is not just about food, but also about
						the overall experience. Our staff, renowned for their warmth and
						dedication, strives to make every visit an unforgettable event.
					</span>

					<ButtonLink
						className="meet-us__info-btn"
						href="/about"
						aria="Link to learn more about us"
					>
						More About Us
					</ButtonLink>
				</div>
			</Container>
		</section>
	);
};

export default MeetUsSection;
