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

const ContactUsForm = () => {
	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector((state) => state.contactUs);

	const sendFormRequest = async (
		value: IContactUs,
		setSubmitting: (isSubmitting: boolean) => void,
		resetForm: () => void
	) => {
		try {
			dispatch(sendContactUsRequest(value)).unwrap();
			resetForm();
			dispatch(clearContactUs());
		} catch (err) {
			console.error("Failing send request contacts us", err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
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
					<fieldset className="contact-us-form__field-group">
						<div className="contact-us-form__field-wrapper">
							<label htmlFor="name" className="contact-us-form__label">
								Name
							</label>
							<Field
								className="contact-us-form__input"
								type="name"
								name="name"
								placeholder="Name"
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
							required
							name="message"
							placeholder="Message"
                            as="textarea"
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
	);
};

export default ContactUsForm;
