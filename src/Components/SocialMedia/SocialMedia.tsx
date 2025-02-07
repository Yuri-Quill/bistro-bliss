import classNames from "classnames";

import { socialMedia } from "../../shared/data/social-media.data";

import "./SocialMedia.scss";

type SocialMediaProps = {
	isActive: boolean;
};

const SocialMedia = ({ isActive }: SocialMediaProps) => {
	return (
		<ul
			className={classNames("social-media", { "social-media--active": isActive })}
		>
			{socialMedia.map((item, index) => (
				<li
					className={classNames("social-media__item", {
						"social-media__item--active": isActive,
					})}
					key={index}
				>
					<a
						className={classNames("social-media__link", {
							"social-media__link--active": isActive,
						})}
						href={item.url}
						title={item.platform}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={item.description}
					>
						{item.image}
					</a>
				</li>
			))}
		</ul>
	);
};

export default SocialMedia;
