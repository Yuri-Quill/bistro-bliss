import Container from "../Container/Container";


import aboutUsData from "../../shared/data/about-us.data";

import AboutUsImg from '../../assets/about-us/about-us-section-img.png'

import "./AboutUsSection.scss";

const AboutUsSection = () => {
	return (
		<section className="about-us">
			<Container>
				<article className="about-us__content">
					<h2 className="about-us__title">
						A little information for our valuable guest
					</h2>
					<p className="about-us__text">
						At place, we believe that dining is not just about food, but also about
						the overall experience. Our staff, renowned for their warmth and
						dedication, strives to make every visit an unforgettable event.
					</p>
					<ul className="about-us__list">
						{aboutUsData.map((item, index) => (
							<li className="about-us__item" key={index}>
								<h3 className="about-us__item-title">{item.title}</h3>
								<p className="about-us__item-text">{item.body}</p>
							</li>
						))}
					</ul>
				</article>
				<img className="about-us__image" src={AboutUsImg} alt="Image with cooking ingredients" width={555} height={680} />
			</Container>
		</section>
	);
};

export default AboutUsSection;
