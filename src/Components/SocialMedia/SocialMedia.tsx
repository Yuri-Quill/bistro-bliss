import classNames from "classnames";

import { ISocialMedia } from "../../shared/interfaces/SocialMedia.interface";

import "./SocialMedia.scss";

interface SocialMediaProps {
	data: ISocialMedia;
	isActive?: boolean;
	className: string;
}

const SocialMedia = ({ data, isActive, className }: SocialMediaProps) => {
	return (
		<li
			className={classNames(`${className}item  social-media__item`, {
				"social-media__item--active": isActive,
			})}
			
		>
			<a
				className={classNames(`${className}link social-media__link`, {
					"social-media__link--active": isActive,
				})}
				href={data.url}
				title={data.platform}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={data.description}
			>
				{data.image}
			</a>
		</li>
	);
};

export default SocialMedia;
