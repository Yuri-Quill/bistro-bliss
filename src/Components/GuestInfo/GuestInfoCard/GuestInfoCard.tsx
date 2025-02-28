import { guestInfoType } from "../../../shared/interfaces/guest-info.type";
import "./GuestInfoCard.scss";

type guestInfoCardProps = {
	data: guestInfoType;
	className?: string;
};
const GuestInfoCard = ({ data, className }: guestInfoCardProps) => {
	return (
		<li className={`guest-info__card ${className}`} key={data.id}>
			<h3 className="guest-info__card-title">{data.title}</h3>
			<p className="guest-info__card-text">{data.body}</p>
		</li>
	);
};

export default GuestInfoCard;
