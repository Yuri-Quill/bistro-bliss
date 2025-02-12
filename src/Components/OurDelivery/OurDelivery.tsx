import Container from "../Container/Container";

import Chef from "../../assets/our-delivery/chef.png";
import FriedShrimp from "../../assets/our-delivery/fried-shrimp.png";
import Bbq from "../../assets/our-delivery/bbq.png";

import Clock from "../../assets/icons/our-delivery/clock.png";
import Bill from "../../assets/icons/our-delivery/bill.png";
import Cart from "../../assets/icons/our-delivery/cart.png";
import "./OurDelivery.scss";

const OurDelivery = () => {
	return (
		<section className="our-delivery">
			<Container>
				<article className="our-delivery__article">
					<img
						className="our-delivery__image our-delivery__image--chef"
						src={Chef}
						alt="Cooking chef"
						width={431}
						height={600}
					/>
					<img
						className="our-delivery__image our-delivery__image--fried-shrimp"
						src={FriedShrimp}
						alt="Fried shrimp on plate"
						width={290}
						height={333}
					/>
					<img
						className="our-delivery__image our-delivery__image--bbq"
						src={Bbq}
						alt="bbq assorted"
						width={290}
						height={240}
					/>
				</article>

				<div className="our-delivery__content">
					<h2 className="our-delivery__title">Fastest Food Delivery in City</h2>
					<p className="our-delivery__text">
						Order food online from Bistro Bliss! Fast delivery, easy online ordering
						and a wide range of menu items.
					</p>

					<ul className="our-delivery__list">
						<li className="our-delivery__item">
							<img
								className="our-delivery__image"
								src={Clock}
								alt="clock icon"
								width={30}
								height={30}
							/>
							<h4 className="our-delivery__image-title">Delivery within 30 minutes</h4>
						</li>
						<li className="our-delivery__item">
							<img
								className="our-delivery__image"
								src={Bill}
								alt="bill icon"
								width={30}
								height={30}
							/>
							<h4 className="our-delivery__image-title">Best Offer & Prices</h4>
						</li>
						<li className="our-delivery__item">
							<img
								className="our-delivery__image"
								src={Cart}
								alt="cart icon"
								width={30}
								height={30}
							/>
							<h4 className="our-delivery__image-title">Online Services Available</h4>
						</li>
					</ul>
				</div>
			</Container>
		</section>
	);
};

export default OurDelivery;
