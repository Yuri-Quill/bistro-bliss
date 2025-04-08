import { useRef, useState } from "react";
import BistroBlissVideo from "../../assets/video/bistro-bliss-video.webm";
import PlayButton from "../../assets/icons/play-button.svg";
import "./FeelTheTasteSection.scss";
import cn from "classnames";

const FeelTheTasteSection = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

    const contentClass = cn("feel-the-taste__content",{"feel-the-taste__content--active" : isPlaying}) 

	const playingToggleHandler = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying((prev) => !prev);
		}
	};

	return (
		<section className="feel-the-taste">
			<video
				ref={videoRef}
				className="feel-the-taste__video"
				loop
				playsInline
                onClick={playingToggleHandler}
			>
				<source src={BistroBlissVideo} type="video/webm" />
			</video>

			<div className={contentClass}>
				<button
					className="feel-the-taste__button"
					type="button"
					onClick={playingToggleHandler}
				>
					<img src={PlayButton} alt="Play/Pause" width={106} height={106} />
				</button>

				<h2 className="feel-the-taste__title">
					Feel the authentic & original taste from us
				</h2>
			</div>
		</section>
	);
};

export default FeelTheTasteSection;
