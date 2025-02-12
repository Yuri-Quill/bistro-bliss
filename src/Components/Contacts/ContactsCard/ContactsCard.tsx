import Contacts from "../Contacts";

import { contactsData } from "../../../shared/data/contacts.data";

import "./ContactsCard.scss";

type ContactsCardProps = {
	className: string;
};

const ContactsCard = ({ className }: ContactsCardProps) => {
	return (
		<article className={`${className} contacts-card`}>
			<h3 className="contacts-card__title">Come and visit us</h3>
			<ul className="contacts-card__list">
				{contactsData.map((contact) => (
					<Contacts data={contact} className="contacts-card__" key={contact.id} />
				))}
			</ul>
		</article>
	);
};

export default ContactsCard;
