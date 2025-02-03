import { AnchorHTMLAttributes } from "react";

import "./HealthyFoodInfoCard.scss";

interface HealthyFoodInfoData {
	image: React.ReactElement;
	href: string;
	name: string;
	description: string;
	info: string;
}

interface HealthyFoodinfoCardProps
	extends AnchorHTMLAttributes<HTMLAnchorElement> {
	data: HealthyFoodInfoData[];
}

const HEALTHY_FOOD_INFO_CARD = "healthy-food__info-card";

const HealthyFoodInfoCard = ({
	data,
	title,
	...props
}: HealthyFoodinfoCardProps) => {
	return (
		<article className={`${HEALTHY_FOOD_INFO_CARD}`}>
			<h3 className={`${HEALTHY_FOOD_INFO_CARD}-title`}>{title}</h3>

			<ul className={`${HEALTHY_FOOD_INFO_CARD}-list`}>
				{data.map((item, index) => (

						<li className={`${HEALTHY_FOOD_INFO_CARD}-item`} key={index}>
							{item.image}
							<a
								className={`${HEALTHY_FOOD_INFO_CARD}-link`}
								href={item.href}
								title={item.name}
								target="_blank"
								aria-label={item.description}
								{...props}
							>
								{item.info}
							</a>
						</li>

				))}
			</ul>
		</article>
	);
};

export default HealthyFoodInfoCard;
