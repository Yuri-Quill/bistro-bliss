// BookATableForm.tsx
import "./BookATableForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TimePicker from "../../Components/TimePicker/TimePicker";

const BookATableForm: React.FC = () => {
	const validationSchema = Yup.object({
		date: Yup.date().required("Дата обязательна"),
		time: Yup.string().required("Время обязательно"),
	});

	return (
		<Formik
			initialValues={{ date: "", time: "12:00 PM" }}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<fieldset>
						<legend>Date & Time</legend>
						<Field type="date" name="date" className="date-input" />
						<ErrorMessage name="date" component="span" className="error" />

						<Field
							name="time"
							component={TimePicker}
							min="09:00"
							max="22:00"
							// format="24h"
						/>
						<ErrorMessage name="time" component="span" className="error" />
					</fieldset>

					<button type="submit" disabled={isSubmitting}>
						Зарегистрироваться
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default BookATableForm;
