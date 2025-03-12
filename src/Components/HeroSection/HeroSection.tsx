import ButtonLink from "../ButtonLink/ButtonLink";
import Container from "../Container/Container";
import "./HeroSection.scss";

const HeroSection = () => {
	return (
		<section className="hero-section">
			<Container>
				<h1
					className="hero-section__title"
					aria-label="Bistro Bliss restaurant title"
				>
					Best food for your taste
				</h1>
				<p
					className="hero-section__text"
					aria-label="Bistro Bliss restaurant description"
				>
					Discover delectable cuisine and unforgettable moments in our welcoming,
					culinary haven.
				</p>

				<nav className="hero-section__nav" aria-label="Hero section navigation">
				<ButtonLink
					className="hero-section__btn-link"
					href="/book-a-table"
					isActive
					aria="Book a table at Bistro Bliss"
				>
					Book A Table
				</ButtonLink>
				<ButtonLink
					className="hero-section__btn-link"
					href="/menu"
					aria="Explore menu at Bistro Bliss"
				>
					Explore Menu
				</ButtonLink>
				</nav>
			</Container>
		</section>
	);
};

export default HeroSection;
