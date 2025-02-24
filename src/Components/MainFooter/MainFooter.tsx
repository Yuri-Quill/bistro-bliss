import { Link } from "react-router-dom";
import Container from "../Container/Container";

import LogoFooter from "../../assets/bistro-bliss-logo-footer.svg";
import { socialMediaData } from "../../shared/data/social-media.data";
import "./MainFooter.scss";
import SocialMedia from "../SocialMedia/SocialMedia";

const MainFooter = () => {
	return (
		<footer className="footer">
			<Container>
				<nav className="footer-nav">
					<Link className="footer-logo" to={"/"}>
						<img
							className="footer-logo__img"
							src={LogoFooter}
							alt="Bistro Bliss logo"
							width={56}
							height={55}
						/>
						<h2 className="footer-logo__title">Bistro Bliss</h2>
					</Link>
					<ul className="footer-list">
						{socialMediaData.map((item) => (
							<SocialMedia
								className="footer-social-media"
								data={item}
								isActive={true}
							/>
						))}
					</ul>
				</nav>
				<span className="footer-copyrights">
					Copyright © 2025 Yuri Quill. All Rights Reserved.
				</span>
			</Container>
		</footer>
	);
};

export default MainFooter;
