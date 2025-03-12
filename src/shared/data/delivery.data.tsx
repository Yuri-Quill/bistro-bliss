import { PiReceipt, PiClock, PiShoppingCart } from "react-icons/pi";

interface IDelivery {
	body: string;
	image: React.ReactElement;
}

const deliveryData: IDelivery[] = [
	{
		body: "Delivery within 30 minutes",
		image: <PiClock />,
	},
	{
		body: "Best Offer & Prices",
		image: <PiReceipt />,
	},
	{
		body: "Online Services Available",
		image: <PiShoppingCart />,
	},
];

export default deliveryData;
