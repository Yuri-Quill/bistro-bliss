import "./ReservationForm.scss";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ReservationSchema = Yup.object().shape({
	date: Yup.string().required("Required"),
	time: Yup.string().required("Required"),
	name: Yup.string().required("Required"),
	phone: Yup.string().required("Required"),
	totalPerson: Yup.number()
		.typeError("Must be a number")
		.positive("Must be a positive number")
		.required("Required"),
});

const initialReservationValues = {
	date: "",
	time: "",
	name: "",
	phone: "",
	totalPerson: "",
};

const API_URL = "http://localhost:5000/api/email/reservation";

const ReservationForm = () => {
	return (
		<Formik
			initialValues={initialReservationValues}
			validationSchema={ReservationSchema}
			onSubmit={async (values, { setSubmitting }) => {
				try {
					const response = await axios.post(API_URL, values);
					console.log(response);
				} catch (error) {
					console.log(error);
				} finally {
					setSubmitting(false);
				}
			}}
		>
			{({ isSubmitting }) => (
				<Form className="reservation-form">
					<div className="reservation-form__row">
						<Field type="date" name="date" className="reservation-form__input" />
						<ErrorMessage
							name="date"
							component="div"
							className="reservation-form__error"
						/>

						<Field type="time" name="time" className="reservation-form__input" />
						<ErrorMessage
							name="time"
							component="div"
							className="reservation-form__error"
						/>
					</div>
					<div className="reservation-form__row">
						<Field
							type="text"
							name="name"
							className="reservation-form__input"
							placeholder="name"
						/>
						<ErrorMessage
							name="name"
							component="div"
							className="reservation-form__error"
						/>

						<Field
							type="text"
							name="phone"
							className="reservation-form__input"
							placeholder="phone"
						/>
						<ErrorMessage
							name="phone"
							component="div"
							className="reservation-form__error"
						/>
					</div>

					<Field
						type="text"
						name="totalPerson"
						className="reservation-form__input"
						placeholder="persons"
					/>
					<ErrorMessage
						name="totalPerson"
						component="div"
						className="reservation-form__error"
					/>
					<button
						type="submit"
						disabled={isSubmitting}
						className="reservation-form__button"
					>
						{isSubmitting ? "Loading..." : "Book A Table"}
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default ReservationForm;
