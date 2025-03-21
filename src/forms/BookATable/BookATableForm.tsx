import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import dayjs from "dayjs";
import {
	sendBookingRequest,
	IBooking,
	clearBooking,
} from "../../app/slices/bookATableSlice";
import Loading from "../../Components/Loading/Loading";
import {
	bookingInitialValues,
	bookingValidationSchema,
} from "../validations/bookATable.validation";
import "./BookATableForm.scss";
import { MuiTelInput } from "mui-tel-input";
import Container from "../../Components/Container/Container";

const BookATableForm = () => {
	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector((state) => state.booking);

	const sendBooking = async (
		values: IBooking,
		setSubmitting: (isSubmitting: boolean) => void,
		resetForm: () => void
	) => {
		try {
			await dispatch(sendBookingRequest(values)).unwrap();
			resetForm();
			dispatch(clearBooking());
		} catch (err) {
			console.error("Booking failed:", err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={bookingInitialValues}
			validationSchema={bookingValidationSchema}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				sendBooking(values, setSubmitting, resetForm);
			}}
		>
			{({ isSubmitting, setFieldValue, values }) => (
			
				<Form className="book-table-form">
					{error && <h4 className="book-table-form__server-error">{error}</h4>}

					<div className="book-table-form__field-group">
						<div className="book-table-form__field-wrapper">
							<label className="book-table-form__field-label" htmlFor="date">
								Date
							</label>

							<Field
								className="book-table-form__field"
								type="date"
								name="date"
								min={dayjs().format("YYYY-MM-DD")}
							/>

							<ErrorMessage
								className="book-table-form__error-field"
								name="date"
								component="span"
							/>
						</div>

						<div className="book-table-form__field-wrapper">
							<label className="book-table-form__field-label" htmlFor="time">
								Time
							</label>

							<Field
								className="book-table-form__field"
								type="time"
								name="time"
								min="09:00"
								max="22:00"
							/>

							<ErrorMessage
								className="book-table-form__error-field"
								name="time"
								component="span"
							/>
						</div>
					</div>

					<div className="book-table-form__field-group">
						<div className="book-table-form__field-wrapper">
							<label className="book-table-form__field-label" htmlFor="name">
								Name
							</label>

							<Field
								className="book-table-form__field"
								type="text"
								name="name"
								placeholder="Put your name"
							/>

							<ErrorMessage
								className="book-table-form__error-field"
								name="name"
								component="span"
							/>
						</div>

						<div className="book-table-form__field-wrapper">
							<label className="book-table-form__field-label" htmlFor="phone">
								Phone number
							</label>

							<Field
								className="book-table-form__field"
								name="phone"
								component={MuiTelInput}
								defaultCountry="US"
								variant="outlined"
								value={values.phone}
								fullWidth
								onChange={(value: string) => setFieldValue("phone", value)}
							/>

							<ErrorMessage
								className="book-table-form__error-field"
								name="phone"
								component="span"
							/>
						</div>
					</div>

					<div className="book-table-form__field-wrapper">
						<label className="book-table-form__field-label" htmlFor="totalPerson">
							Total person
						</label>

						<Field
							className="book-table-form__field"
							type="number"
							name="totalPerson"
							min="1"
							max="10"
						/>

						<ErrorMessage
							className="book-table-form__error-field"
							name="totalPerson"
							component="span"
						/>
					</div>

					<button
						className="book-table-form__button"
						type="submit"
						disabled={loading || isSubmitting}
					>
						{loading ? <Loading /> : "Book a Table"}
					</button>
				</Form>
				
			)}
		</Formik>
	);
};

export default BookATableForm;
