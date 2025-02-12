import Container from "../Container/Container";
import "./OurServices.scss";

import { ourServicesData } from "../../shared/data/our-services.data";
import OurServicesCard from "./OurServicesCard/OurServicesCard";

const OurServices = () => {
	return (
		<section className="our-services">
			<Container>
				<h2 className="our-services__title">We also offer unique services for your events</h2>

				<ul className="our-services__list">
					{ourServicesData.map((item) => (
						<OurServicesCard data={item} key={item.id} />
					))}
				</ul>
			</Container>
		</section>
	);
};

export default OurServices;
