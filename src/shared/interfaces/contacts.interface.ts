import { ReactElement } from "react";

export interface IContacts {
	name: string;
	image: ReactElement;
	body: string;
	href: string;
	description: string
}
