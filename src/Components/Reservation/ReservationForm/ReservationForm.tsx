import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createReservationAsync } from "../../../features/reservation/reservationsSlice";
import { useAppDispatch } from "../../../app/hooks";
import "./ReservationForm.scss";
import { IReservation } from "../../../features/reservation/ReservationAPI";

const ReservationSchema = Yup.object().shape({
	date: Yup.string().required("Date is required"),
	time: Yup.string().required("Time is required"),
	name: Yup.string().required("Name is required"),
	phone: Yup.string().required("Phone is required"),
	totalPerson: Yup.number()
		.typeError("Must be a number")
		.positive("Must be a positive number")
		.required("Number of persons is required"),
});

const initialReservationValues = {
	date: "",
	time: "",
	name: "",
	phone: "",
	totalPerson: 1,
};

const ReservationForm = () => {
	const dispatch = useAppDispatch();

	const createReservationHandler = async (values: IReservation) => {
		try {
			const result = await dispatch(createReservationAsync(values)).unwrap();
			console.log("Reservation created successfully:", result);
		} catch (error) {
			console.error("Failed to create reservation:", error);
		}
	};

	return (
		<div className="reservation-container">

			<Formik
				initialValues={initialReservationValues}
				validationSchema={ReservationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					createReservationHandler(values).finally(() => {
						setSubmitting(false);
						resetForm();
					});
				}}
			>
				{({ isSubmitting }) => (
					<Form className="reservation-form">
						<div className="reservation-form__grid">
							<div className="reservation-form__field">
								<label htmlFor="date" className="reservation-form__label">
									Date
								</label>
								<Field type="date" name="date" className="reservation-form__input" />
								<ErrorMessage
									name="date"
									component="span"
									className="reservation-form__error"
								/>
							</div>

							<div className="reservation-form__field">
								<label htmlFor="time" className="reservation-form__label">
									Time
								</label>
								<Field type="time" name="time" className="reservation-form__input" />
								<ErrorMessage
									name="time"
									component="span"
									className="reservation-form__error"
								/>
							</div>

							<div className="reservation-form__field">
								<label htmlFor="name" className="reservation-form__label">
									Full Name
								</label>
								<Field
									type="text"
									name="name"
									className="reservation-form__input"
									placeholder="Enter your name"
								/>
								<ErrorMessage
									name="name"
									component="span"
									className="reservation-form__error"
								/>
							</div>

							<div className="reservation-form__field">
								<label htmlFor="phone" className="reservation-form__label">
									Phone Number
								</label>
								<Field
									type="tel"
									name="phone"
									className="reservation-form__input"
									placeholder="Enter your phone"
								/>
								<ErrorMessage
									name="phone"
									component="span"
									className="reservation-form__error"
								/>
							</div>

							<div className="reservation-form__field reservation-form__field--full">
								<label htmlFor="totalPerson" className="reservation-form__label">
									Number of Persons
								</label>
								<Field
									type="number"
									name="totalPerson"
									className="reservation-form__input"
									placeholder="How many persons?"
								/>
								<ErrorMessage
									name="totalPerson"
									component="span"
									className="reservation-form__error"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="reservation-form__button"
						>
							{isSubmitting ? (
								<span className="reservation-form__spinner">Booking...</span>
							) : (
								"Reserve Now"
							)}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ReservationForm;
