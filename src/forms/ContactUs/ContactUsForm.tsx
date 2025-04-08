import { Formik, Field, Form, ErrorMessage } from "formik";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	clearContactUs,
	sendContactUsRequest,
	IContactUs,
} from "../../app/slices/contactUsSlice";
import {
	contactUsInitialState,
	contactUsValidationSchema,
} from "../validations/contactUs.validation";
import Loading from "../../Components/Loading/Loading";
import "./ContactUsForm.scss";
import { toast, ToastContainer } from "react-toastify";

import { useNavigate } from "react-router-dom";

const ContactUsForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { loading, error } = useAppSelector((state) => state.contactUs);

	const sendFormRequest = async (
		value: IContactUs,
		setSubmitting: (isSubmitting: boolean) => void,
		resetForm: () => void
	) => {
		try {
			await dispatch(sendContactUsRequest(value)).unwrap();
			resetForm();
			dispatch(clearContactUs());

			// Show success toast
			toast.success("Thank you for your message! We'll get back to you soon.", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				style: {
					borderRadius: "8px",
					padding: "16px",
					fontFamily: "inherit",
					boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
				},
			});

			// Redirect to homepage after 3 seconds
			setTimeout(() => {
				navigate("/");
			}, 3000);
		} catch (err) {
			console.error("Failing send request contacts us", err);
			toast.error("Something went wrong. Please try again later.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<>
			<ToastContainer />
			<Formik
				initialValues={contactUsInitialState}
				validationSchema={contactUsValidationSchema}
				onSubmit={(value, { setSubmitting, resetForm }) => {
					sendFormRequest(value, setSubmitting, resetForm);
				}}
			>
				{({ isSubmitting }) => (
					<Form className="contact-us-form">
						{error && <h4 className="contact-us-form__server-error">{error}</h4>}
						<fieldset
							className="contact-us-form__field-group"
							disabled={isSubmitting || loading}
						>
							<div className="contact-us-form__field-wrapper">
								<label htmlFor="name" className="contact-us-form__label">
									Name
								</label>
								<Field
									className="contact-us-form__input"
									type="name"
									name="name"
									placeholder="Name"
									disabled={isSubmitting || loading}
								/>
								<ErrorMessage
									className="contact-us-form__error"
									name="name"
									component="span"
								/>
							</div>

							<div className="contact-us-form__field-wrapper">
								<label htmlFor="email" className="contact-us-form__label">
									Email
								</label>
								<Field
									className="contact-us-form__input"
									type="email"
									name="email"
									placeholder="Email"
									disabled={isSubmitting || loading}
								/>
								<ErrorMessage
									className="contact-us-form__error"
									name="email"
									component="span"
								/>
							</div>
						</fieldset>

						<div className="contact-us-form__field-wrapper">
							<label htmlFor="subject" className="contact-us-form__label">
								Subject
							</label>
							<Field
								className="contact-us-form__input"
								type="text"
								name="subject"
								placeholder="Subject"
								disabled={isSubmitting || loading}
							/>
							<ErrorMessage
								className="contact-us-form__error"
								name="subject"
								component="span"
							/>
						</div>

						<div className="contact-us-form__field-wrapper">
							<label htmlFor="message" className="contact-us-form__label">
								Message
							</label>
							<Field
								className="contact-us-form__input contact-us-form__input--textarea"
								name="message"
								placeholder="Message"
								as="textarea"
								disabled={isSubmitting || loading}
							/>
							<ErrorMessage
								className="contact-us-form__error"
								name="message"
								component="span"
							/>
						</div>

						<button
							className="contact-us-form__button"
							type="submit"
							disabled={isSubmitting || loading}
						>
							{loading || isSubmitting ? <Loading /> : "Send"}
						</button>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default ContactUsForm;
