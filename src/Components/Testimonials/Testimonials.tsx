import Container from "../Container/Container";
import TestimonialsCard from "./TestimonialsCard/TestimonialsCard";

import { testimonialsData } from "../../shared/data/testimonials.data";

import "./Testimonials.scss";

const Testimonials = () => {
	return (
		<section className="testimonials">
			<Container>
				<h2 className="testimonials__title">What Our Customers Say</h2>
				<ul className="testimonials__list">
					{testimonialsData.map((item) => (
						<TestimonialsCard
							data={item}
							className="testimonials__item"
							key={item.id}
						/>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default Testimonials;
