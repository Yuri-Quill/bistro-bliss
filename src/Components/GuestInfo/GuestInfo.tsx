import Container from "../Container/Container";
import GuestInfoImage from '../../assets/guest-info/guest-info-img.png'

import { guestInfoData } from "../../shared/data/guest-info.data";

import "./GuestInfo.scss";
import GuestInfoCard from "./GuestInfoCard/GuestInfoCard";

const GuestInfo = () => {
	return (
		<section className="guest-info">
			<Container>
				<article className="guest-info__article">
					<h2 className="guest-info__title">
						A little information for our valuable guest
					</h2>
					<p className="guest-info__text">
						At place, we believe that dining is not just about food, but also about
						the overall experience. Our staff, renowned for their warmth and
						dedication, strives to make every visit an unforgettable event.
					</p>
					<ul className="guest-info__list">
						{guestInfoData.map((item) => (
							<GuestInfoCard data={item} className="guest-info__item" />
						))}
					</ul>
				</article>
				<img className="guest-info__img" src={GuestInfoImage} alt="Chef cocking" width={558} height={680}/>
			</Container>
		</section>
	);
};

export default GuestInfo;
