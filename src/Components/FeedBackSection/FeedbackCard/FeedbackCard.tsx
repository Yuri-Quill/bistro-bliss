import IFeedback from "../../../shared/interfaces/feedback.interface";

import "./FeedbackCard.scss";

interface FeedbackCardProps {
	data: IFeedback;
}


const FeedbackCard = ({ data }: FeedbackCardProps) => {
	return (
		<article className="feedback-card">
			<q className="feedback-card__title">
				{data.title}
			</q>
			<p className="feedback-card__text">{data.body}</p>

			<figure className="feedback-card__figure">
				<img
					className="feedback-card__image"
					src={data.image}
					alt={`${data.name} picture`}
					width={70}
					height={70}
				/>

				<figcaption className="feedback-card__caption">
					<h4 className="feedback-card__caption-title">{data.name}</h4>
					<address className="feedback-card__caption-address">
						{data.address}
					</address>
				</figcaption>
			</figure>
		</article>
	);
};

export default FeedbackCard;
