import { ButtonLink } from "../Buttons/Buttons";
import Container from "../Container/Container";
import "./HeroSection.scss";

const HERO_SECTION_PREFIX: string = "hero-section__";

const HeroSection = () => {
	return (
		<section className="hero-section">
			<Container>
				<h1 className={`${HERO_SECTION_PREFIX}title`}>Best food for your taste</h1>
				<p className={`${HERO_SECTION_PREFIX}text`}>
					Discover delectable cuisine and unforgettable moments in our welcoming,
					culinary haven.
				</p>

				<div className={`${HERO_SECTION_PREFIX}btn-wrap`}>
					<ButtonLink
						className={`${HERO_SECTION_PREFIX}btn`}
						to="/book-a-table"
						variant="active"
						aria-label="Book A Table"
					>
						Book A Table
					</ButtonLink>

					<ButtonLink
						className={`${HERO_SECTION_PREFIX}btn`}
						to="/menu"
						aria-label="Explore Menu"
					>
						Explore Menu
					</ButtonLink>
				</div>
			</Container>
		</section>
	);
};

export default HeroSection;
