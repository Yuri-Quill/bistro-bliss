import { Link } from "react-router-dom";
import Container from "../Container/Container";

import FooterLogo from "../../assets/footer-logo.svg";

import socialMediaData from "../../shared/data/social-media.data";
import footerData from "../../shared/data/footer.data";
import "./Footer.scss";

const Footer = () => {
	return (
		<footer className="footer">
			<Container>
				<article className="footer__content">
					<h2 className="footer__content-title">
						Bistro Bliss{" "}
						<span className="footer__content-subtitle">
							Where Flavor Meets Elegance
						</span>
					</h2>
					<p className="footer__content-text">
						Welcome to Bistro Bliss, a place where passion for food and warm
						hospitality come together. Our bistro offers a perfect blend of refined
						flavors, cozy ambiance, and impeccable service to create a truly memorable
						dining experience.
					</p>
					<ul className="footer__content-list">
						{footerData.map((item, index) => (
							<li className="footer__content-item" key={index}>
								<h4 className="footer__content-item-title">{item.title}</h4>
                                <img className="footer__content-item-img" src={item.image} alt={`${item.title} picture`} width={290} height={300}/>
								<p className="footer__content-item-text">{item.body}</p>
							</li>
						))}
					</ul>

					<q className="footer__content-quote">Taste the Bliss, Savor the Moment.</q>
				</article>

				<nav className="footer__nav">
					<Link className="footer__logo" to="/" aria-label="Bistro Bliss homepage">
						<img
							className="footer__logo-img"
							src={FooterLogo}
							alt="Bistro Bliss logo"
                            width={56}
                            height={56}
						/>
						Bistro Bliss
					</Link>
					<ul className="footer__nav-list">
						{socialMediaData.map((item) => (
							<li className="footer__nav-item" key={item.name}>
								<a
									className="footer__nav-link"
									href={item.href}
									target="_blank"
									title={item.name}
									aria-label={item.body}
									rel="noopener noreferrer"
								>
									{item.image}
								</a>
							</li>
						))}
					</ul>
				</nav>
				<span className="footer__copy">
					&copy; 2025 Bistro Bliss by Yuri Quill. All Rights Reserved.
				</span>
			</Container>
		</footer>
	);
};

export default Footer;
