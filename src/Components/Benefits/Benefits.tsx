import Container from "../Container/Container";
import { benefitsData } from "../../shared/data/benefits.data";
import BenefitsCard from "./BenefitsCard/BenefitsCard";
import "./Benefits.scss";

const Benefits = () => {
	return (
		<section className="benefits">
			<Container>
				<ul className="benefits-list">
					{benefitsData.map((item) => (
						<BenefitsCard data={item} className="benefits-item"/>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default Benefits;
