import { IBenefits } from "../../../shared/interfaces/benefits.interface";

import "./BenefitsCard.scss";

interface IBenefitsCardProps {
	data: IBenefits;
	className?: string;
}

const BenefitsCard = ({ data, className }: IBenefitsCardProps) => {
	return (
		<li className={`${className}`} key={data.id}>
			<figure className="benefits-card">
				<img
					className="benefits-card__img"
					src={data.image}
					alt={`${data.title} icon`}
					width={48}
					height={48}
				/>
				<figcaption className="benefits-card__caption">
					<h3 className="benefits-card__title">{data.title}</h3>
					<p className="benefits-card__text">{data.body}</p>
				</figcaption>
			</figure>
		</li>
	);
};

export default BenefitsCard;
