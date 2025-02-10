import { contacts } from "../../shared/data/contacts.data";

import "./Contacts.scss";

interface ContactsProps {
	filterByName?: string | string[];
	className: string;
}

const Contacts = ({ filterByName, className }: ContactsProps) => {
	const filteredContacts = filterByName
		? contacts.filter((contact) => {
				const contactName = contact.name.toLowerCase();

				if (Array.isArray(filterByName)) {
					/*  ещё один способ если массив большой
					
				const lowerCaseFilter = new Set(filterByName.map((item) => item.toLowerCase()));
				return !lowerCaseFilter.has(contactName); */

					const lowerCaseFilter = filterByName.map((item) => item.toLowerCase());

					return !lowerCaseFilter.includes(contactName);
				}

				return contactName !== filterByName.toLowerCase();
		  })
		: contacts;

	return (
		<ul className={`${className}__contacts-list contacts-list`}>
			{filteredContacts.map((contact, index) => (
				<li className={`${className}__contacts-item contacts-item`} key={index}>
					<a
						className={`${className}__contacts-link contacts-link`}
						href={contact.url}
						title={contact.name}
						aria-label={contact.description}
						target="_blank"
						rel="noopener noreferrer"
					>
						{contact.image}
						{contact.info}
					</a>
				</li>
			))}
		</ul>
	);
};

export default Contacts;
