import "./TestimonialsCard.scss";
import { ITestimonials } from "../../../shared/interfaces/Testimonials.interface";

interface TestimonialsCardProps {
	data: ITestimonials;
	className?: string;
}

const TestimonialsCard = ({ data, className = "" }: TestimonialsCardProps) => {
	return (
		<li
			className={`testimonials-card ${className}`}
			aria-label={`Testimonial by ${data.name} from ${data.address}`}
		>
			<blockquote className="testimonials-card__content">
				<q className="testimonials-card__quote">{data.title}</q>
				<p className="testimonials-card__text">{data.body}</p>
			</blockquote>

			<figure className="testimonials-card__profile">
				<img
					className="testimonials-card__image"
					src={data.image}
					alt={`Photo of ${data.name}, a satisfied customer from ${data.address}`}
					width={70}
					height={70}
				/>
				<figcaption className="testimonials-card__author">
					<h4 className="testimonials-card__name">{data.name}</h4>
					<address className="testimonials-card__address">{data.address}</address>
				</figcaption>
			</figure>
		</li>
	);
};

export default TestimonialsCard;
