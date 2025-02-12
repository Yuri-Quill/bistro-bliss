import Sophire from "../../assets/icons/testimonials/sophire-robson.png";
import Matt from "../../assets/icons/testimonials/matt-cannon.png";
import Andy from "../../assets/icons/testimonials/andy-smith.png";

import { ITestimonials } from "../interfaces/Testimonials.interface";

export const testimonialsData: ITestimonials[] = [
	{
		id: 1,
		name: "Sophire Robson",
		address: "Los Angeles, CA",
		title: "The best restaurant",
		body:
			"Last night, we dined at place and were simply blown away. From the moment we stepped in, we were enveloped in an inviting atmosphere and greeted with warm smiles.",
		image: Sophire,
	},
	{
		id: 2,
		name: "Matt Cannon",
		address: "San Diego, CA",
		title: "Simply delicious",
		body:
			"Place exceeded my expectations on all fronts. The ambiance was cozy and relaxed, making it a perfect venue for our anniversary dinner. Each dish was prepared and beautifully presented.",
		image: Matt,
	},
	{
		id: 3,
		name: "Andy Smith",
		address: "San Francisco, CA",
		title: "One of a kind restaurant",
		body:
			"The culinary experience at place is first to none. The atmosphere is vibrant, the food - nothing short of extraordinary. The food was the highlight of our evening. Highly recommended.",
		image: Andy,
	},
];
