import Container from "../Container/Container";

import FeedbackCard from "./FeedbackCard/FeedbackCard";

import feedbackData from "../../shared/data/feedback.data";

import "./FeedbackSection.scss";

const FeedbackSection = () => {
	return (
		<section className="feedback">
			<Container>
				<h2 className="feedback__title">What Our Customers Say</h2>

				<ul className="feedback__list">
					{feedbackData.map((item, index) => (
						<li className="feedback__item" key={index}>
							<FeedbackCard data={item} />
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default FeedbackSection;
