import { IContacts } from "../../shared/interfaces/Contacts.interface";

interface ContactsProps {
	data: IContacts;
	className: string;
}

import "./Contacts.scss";

const Contacts = ({ data, className }: ContactsProps) => {
	return (
		<li className={`${className}item contacts-item`} >
			<a
				className={`${className}link contacts-link`}
				href={data.url}
				title={data.name}
				aria-label={data.description}
				target="_blank"
				rel="noopener noreferrer"
			>
				{data.image}
				{data.info}
			</a>
		</li>
	);
};

export default Contacts;

