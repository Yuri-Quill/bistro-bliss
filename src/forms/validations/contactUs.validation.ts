import * as Yup from "yup";

export const contactUsInitialState = {
	name: "",
	email: "",
	subject: "",
	message: "",
};

export const contactUsValidationSchema = Yup.object({
	name: Yup.string()
		.min(2, "Name must be at least 2 characters")
		.required("Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	subject: Yup.string()
		.min(5, "Subject must be at least 5 characters")
		.max(20, "Subject can be 20 characters")
		.required("Subject is required"),
	message: Yup.string()
		.min(10, "Message must be at least 10 characters")
		.max(350, "Message can be only 350 characters")
		.required("Message is required"),
});
