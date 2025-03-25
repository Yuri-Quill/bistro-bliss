import * as Yup from "yup";

export const bookingInitialValues = {
	date: "",
	time: "",
	name: "",
	phone: "",
	totalPerson: "1",
};

export const bookingValidationSchema = Yup.object({
	date: Yup.string().required("Date is required"),
	time: Yup.string().required("Time is required"),
	phone: Yup.string().min(10).max(20).required("Phone is required"),
	name: Yup.string().required("Name is required"),
	totalPerson: Yup.number()
		.min(1)
		.max(10)
		.required("Number of person is required"),
});
