import "./OurServicesCard.scss";
import { IOurServices } from "../../../shared/interfaces/OurServices.interface";

interface OurServicesCardProps {
	data: IOurServices;
	className?: string;
}

const OurServicesCard = ({ data, className="" }: OurServicesCardProps) => {
	return (
		<li className={`${className} our-services__item`}>
			<figure className="our-services__card">
				<img
					className="our-services__card-img"
					src={data.image}
					alt={`Service ${data.name} image`}
				/>
				<figcaption className="our-services__card-caption">
					<h3 className="our-services__card-title">{data.name}</h3>
					<p className="our-services__card-text">{data.body}</p>
				</figcaption>
			</figure>
		</li>
	);
};

export default OurServicesCard;
