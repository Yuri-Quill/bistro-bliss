import Container from "../Container/Container";
import HealthyFoodImg from "../../assets/healthy-food-section/healthy-food-img.png";
import HealthyFoodInfoCard from "./HealthyFoodContactsCard/HealthyFoodInfoCard";
import { ButtonLink } from "../Buttons/Buttons";

import { contacts } from "../../shared/data/contacts.data";

import "./HealthyFoodSection.scss";

const HEALTHY_FOOD_PREFIX = "healthy-food";

const HealthyFoodSection = () => {
	const infoCardTitle = "Come and visit us";

	return (
		<section className={`${HEALTHY_FOOD_PREFIX}__section`}>
			<Container>
				<div className={`${HEALTHY_FOOD_PREFIX}__image-overlay`}>
					<img
						className={`${HEALTHY_FOOD_PREFIX}__image`}
						src={HealthyFoodImg}
						alt="Healthy food image"
						loading="lazy"
						width={599}
						height={566}
					/>

					<HealthyFoodInfoCard data={contacts} title={infoCardTitle} />
				</div>

				<div className={`${HEALTHY_FOOD_PREFIX}__text-wrap`}>
					<h2 className={`${HEALTHY_FOOD_PREFIX}__title`}>
						We provide healthy food for your family.
					</h2>
					<p className={`${HEALTHY_FOOD_PREFIX}__text`}>
						Our story began with a vision to create a unique dining experience that
						merges fine dining, exceptional service, and a vibrant ambiance. Rooted in
						city's rich culinary culture, we aim to honor our local roots while
						infusing a global palate.
					</p>
					<span className={`${HEALTHY_FOOD_PREFIX}__highlight`}>
						At place, we believe that dining is not just about food, but also about
						the overall experience. Our staff, renowned for their warmth and
						dedication, strives to make every visit an unforgettable event.
					</span>

					<ButtonLink to="/about-us" className={`${HEALTHY_FOOD_PREFIX}__link`}>
						More About Us
					</ButtonLink>
				</div>
			</Container>
		</section>
	);
};

export default HealthyFoodSection;
