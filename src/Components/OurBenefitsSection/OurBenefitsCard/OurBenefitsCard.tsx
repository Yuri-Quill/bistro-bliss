import "./OurBenefitsCard.scss";
import IBenefits from "../../../shared/interfaces/benefits.interface";

interface OurBenefitsCardProps {
	data: IBenefits;
	className?: string;
}
const OurBenefitsCard = ({ data, className }: OurBenefitsCardProps) => {
	return (
		<figure className={`our-benefits__card ${className}`}>
			<img
				className="our-benefits__card-image"
				src={data.image}
				alt={`${data.title} icon`}
                width={48}
                height={48}
			/>

			<figcaption className="our-benefits__card-caption">
				<h3 className="our-benefits__card-title">{data.title}</h3>
				<p className="our-benefits__card-text">{data.body}</p>
			</figcaption>
		</figure>
	);
};

export default OurBenefitsCard;
