import classNames from "classnames";

import { socialMedia } from "../../shared/data/social-media.data";

import "./SocialMedia.scss";

type SocialMediaProps = {
	isActive?: boolean;
	className: string
};

const SocialMedia = ({ isActive,className }: SocialMediaProps) => {
	return (
		<ul
			className={classNames(`${className}__social-media-list social-media__list`, { "social-media--active": isActive })}
		>
			{socialMedia.map((item, index) => (
				<li
					className={classNames(`${className}__item  social-media__item`, {
						"social-media__item--active": isActive,
					})}
					key={index}
				>
					<a
						className={classNames(`${className}__link social-media__link`, {
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
