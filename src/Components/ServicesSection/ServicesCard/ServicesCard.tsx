import "./ServicesCard.scss";

import IServices from "../../../shared/interfaces/services.interface";

interface IServicesCardProps {
	data: IServices;
	className?: string;
}

const ServicesCard = ({ data }: IServicesCardProps) => {
	return (
		<figure className="services-card" aria-label={`${data.description}`}>
			<img
				className="services-card__image"
				src={data.image}
				alt={`${data.name} service image`}
                width={306}
                height={320}
			/>

			<figcaption className="services-card__caption">
				<h3 className="services-card__title">{data.name}</h3>
				<p className="services-card__text">{data.body}</p>
			</figcaption>
		</figure>
	);
};

export default ServicesCard;
