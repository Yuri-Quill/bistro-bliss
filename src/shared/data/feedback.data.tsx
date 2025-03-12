import SophireRobson from "../../assets/feedback/sophire-robson.avif";
import MattCannon from "../../assets/feedback/mat-cannon.webp";
import AndySmith from "../../assets/feedback/andy-smith.jpg";

import IFeedback from "../interfaces/feedback.interface";

const feedbackData: IFeedback[] = [
	{
		name: "Sophire Robson",
		address: "Los Angeles, CA",
		title: "The best restaurant",
		body:
			"Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.",
		image: SophireRobson,
	},
	{
		name: "Matt Cannon",
		address: "San Diego, CA",
		title: "Simply delicious",
		body:
			"Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented.",
		image: MattCannon,
	},
	{
		name: "Andy Smith",
		address: "San Francisco, CA",
		title: "One of a kind restaurant",
		body:
			"The culinary experience at place is first to none. The atmosphere is vibrant, the food - nothing short of extraordinary. The food was the highlight of our evening. Highly recommended.",
		image: AndySmith,
	},
];

export default feedbackData;
