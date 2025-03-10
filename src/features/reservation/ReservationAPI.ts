import axios from "axios";

export interface IReservation {
	date: string;
	time: string;
	name: string;
	phone: string;
	totalPerson: number;
}

const API_URL = "http://localhost:5000/api/email/reservation";

export const createReservation = async (
	values: IReservation
): Promise<IReservation> => {
	const response = await axios.post(API_URL, values);
	return response.data;
};
