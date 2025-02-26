import { useState } from "react";
import classNames from "classnames";
import ReactPlayer from "react-player";
import video from "./taste-video-section.webm";
import PlayButtonIcon from "../../assets/icons/taste-video-button/taste-video-button.svg";
import "./TasteVideoSection.scss";

const TasteVideoSection = () => {
	const [playing, setIsPlaying] = useState(false);

	const handleTogglePlaying = () => {
		setIsPlaying((prev) => !prev);
	};

	const contentClass = classNames("taste-video__content", {
		"taste-video__content--hidden": playing,
	});

	return (
		<section className="taste-video__section">
			<div className="taste-video__player-wrapper" onClick={handleTogglePlaying}>
				<ReactPlayer
					url={video}
					playing={playing}
					loop={true}
					muted={false}
					width="100%"
					height="100%"
				/>
			</div>

			<div className={contentClass}>
				<button
					className="taste-video__button"
					onClick={handleTogglePlaying}
					type="button"
				>
					<img
						className="taste-video__button-img"
						src={PlayButtonIcon}
						alt="Play/Pause"
						width={106}
						height={106}
					/>
				</button>

				<h2 className="taste-video__title">
					Feel the authentic & original taste from us
				</h2>
			</div>
		</section>
	);
};

export default TasteVideoSection;
