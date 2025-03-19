import Container from "../Container/Container";
import "./OurBenefitsSection.scss";

import benefitsData from "../../shared/data/benefits.data";
import OurBenefitsCard from "./OurBenefitsCard/OurBenefitsCard";

const OurBenefitsSection = () => {
	return (
		<section className="our-benefits">
			<Container>
				<ul className="our-benefits__list">
					{benefitsData.map((item, index) => (
						<li className="our-benefits__item" key={index}>
							<OurBenefitsCard data={item} />
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default OurBenefitsSection;
