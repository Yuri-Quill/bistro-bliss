import { ButtonLink } from "../Buttons/Buttons";
import Container from "../Container/Container";
import "./Hero.scss";

const Hero = () => {
	return (
		<section className="hero">
			<Container>
				<h1 className="hero-title">Best food for your taste</h1>
				<p className="hero-text">
					Discover delectable cuisine and unforgettable moments in our welcoming,
					culinary haven.
				</p>

				<div className="hero-btn__wrap">
					<ButtonLink
						className="hero-btn hero-btn--book-a-table"
						to={"/book-a-table"}
						isActive={true}
					>
						Book A Table
					</ButtonLink>
					<ButtonLink
						className="hero-btn hero-btn--explore-menu"
						to={"/menu"}
						isPrimary={true}
					>
						Explore Menu
					</ButtonLink>
				</div>
			</Container>
		</section>
	);
};

export default Hero;
