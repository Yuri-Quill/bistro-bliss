import Container from "../Container/Container";
import deliveryData from "../../shared/data/delivery.data";

import Chef from "../../assets/delivery/cooking-chef.avif";
import Carbonara from "../../assets/delivery/carbonara.jpg";
import Beef from "../../assets/delivery/beef.jpg";

import "./DeliverySection.scss";

const DeliverySection = () => {
	return (
		<section className="delivery">
			<Container>
				<figure className="delivery__gallery">
					<img
						className="delivery__gallery-image delivery__gallery-image--chef"
						src={Chef}
						alt="Cooking chef picture"
						width={430}
						height={600}
						loading="lazy"
					/>
					<img
						className="delivery__gallery-image delivery__gallery-image--carbonara"
						src={Carbonara}
						alt="Carbonara dishes"
						width={290}
						height={330}
						loading="lazy"
					/>
					<img
						className="delivery__gallery-image delivery__gallery-image--beef"
						src={Beef}
						alt="Beef dishes"
						width={290}
						height={240}
						loading="lazy"
					/>
				</figure>

				<article className="delivery__content">
					<h2 className="delivery__content-title">Fastest Food Delivery in City</h2>
					<p className="delivery__content-text">
						Experience the fastest, most reliable food delivery service in the city.
						We prioritize freshness, safety, and customer satisfaction in every order.
						Join us in redefining convenience and quality.
					</p>
					<ul className="delivery__content-list">
						{deliveryData.map((item, index) => (
							<li className="delivery__content-item" key={index}>
								<div className="delivery__content-image">{item.image}</div>
                                
								<span className="delivery__content-subtext">{item.body}</span>
							</li>
						))}
					</ul>
				</article>
			</Container>
		</section>
	);
};

export default DeliverySection;
