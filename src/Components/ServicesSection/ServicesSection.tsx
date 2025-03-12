import Container from "../Container/Container";

import ServicesCard from "./ServicesCard/ServicesCard";

import servicesData from "../../shared/data/services.data";

import "./ServicesSection.scss";
const ServicesSection = () => {
	return (
		<section className="services">
			<Container>
				<h2 className="services__title">
					We also offer unique services for your events
				</h2>

				<ul className="services__list">
					{servicesData.map((item) => (
						<li className="services__item" key={item.name}>
							<ServicesCard data={item} />
						</li>
					))}
				</ul>
			</Container>
		</section>
	);
};

export default ServicesSection;
