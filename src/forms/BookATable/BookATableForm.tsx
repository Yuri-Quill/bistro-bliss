import { useAppDispatch, useAppSelector } from "../../app/hooks"; // Импортируем хуки Redux для работы с диспетчером и селектором состояния!
import { Formik, Form, Field, ErrorMessage } from "formik"; // Импортируем компоненты Formik для управления формой!
import dayjs from "dayjs"; // Импортируем библиотеку Dayjs для работы с датами и временем!

import {
	sendBookingRequest,
	IBooking,
	clearBooking,
} from "../../app/slices/bookATableSlice"; // Импортируем thunk, интерфейс и действие из слайса бронирования!

import Loading from "../../Components/Loading/Loading"; // Импортируем компонент загрузки!

import {
	bookingInitialValues,
	bookingValidationSchema,
} from "../validations/bookATable.validation"; // Импортируем начальные значения и схему валидации формы!

import "./BookATableForm.scss"; // Импортируем стили для формы!
import { MuiTelInput } from "mui-tel-input";
// Компонент формы для бронирования стола!
const BookATableForm = () => {
	const dispatch = useAppDispatch(); // Получаем функцию dispatch для отправки действий в Redux!
	const { loading, error } = useAppSelector((state) => state.booking); // Извлекаем состояние загрузки и ошибки из Redux!

	// Функция для отправки данных бронирования!
	const sendBooking = async (
		values: IBooking, // Данные формы, соответствующие интерфейсу IBooking!
		setSubmitting: (isSubmitting: boolean) => void, // Функция Formik для управления состоянием отправки!
		resetForm: () => void // Функция Formik для сброса формы!
	) => {
		try {
			// Пытаемся отправить запрос!
			await dispatch(sendBookingRequest(values)).unwrap(); // Отправляем thunk и ждем результата!
			resetForm(); // Сбрасываем форму после успешной отправки!
			dispatch(clearBooking()); // Очищаем данные бронирования и ошибки в Redux!
		} catch (err) {
			// Ловим ошибки при отправке!
			console.error("Booking failed:", err); // Выводим ошибку в консоль!
		} finally {
			// Выполняется всегда после попытки!
			setSubmitting(false); // Отключаем состояние отправки формы!
		}
	};

	// Рендерим форму с использованием Formik!
	return (
		<Formik
			initialValues={bookingInitialValues} // Устанавливаем начальные значения формы!
			validationSchema={bookingValidationSchema} // Устанавливаем схему валидации!
			onSubmit={(values, { setSubmitting, resetForm }) => {
				// Обработчик отправки формы!
				sendBooking(values, setSubmitting, resetForm); // Вызываем функцию отправки!
			}}
		>
			{(
				{ isSubmitting, setFieldValue, values } // Рендерим содержимое формы с доступом к состоянию Formik!
			) => (
				<Form className="form">
					{/*Компонент формы с классом для стилей!" */}
					{error && <h4 className="server-error">{error}</h4>}{" "}
					{/* Показываем ошибку сервера, если она есть!*/}
					<div className="form__field-group">
						{/*Группа полей формы для даты и времени! */}
						<label className="form__field-label" htmlFor="date">
							{/* Метка для поля даты! Date // Текст метки!*/}
							Date
							<Field
								className="form-field" // Класс стилей для поля!
								type="date" // Тип поля - дата!
								name="date" // Имя поля для Formik!
								min={dayjs().format("YYYY-MM-DD")} // Минимальная дата - текущий день!
							/>
						</label>
						<ErrorMessage className="error" name="date" component="span" />{" "}
						{/* Сообщение об ошибке валидации для даты!*/}
						<label className="form__field-label" htmlFor="time">
							{/*  Метка для поля времени! Time // Текст метки! */}
							Time
							<Field
								className="form-field" // Класс стилей для поля!
								type="time" // Тип поля - время!
								name="time" // Имя поля для Formik!
								min="09:00" // Минимальное время - 09:00!
								max="22:00" // Максимальное время - 22:00!
							/>
						</label>
						<ErrorMessage className="error" name="time" component="span" />{" "}
						{/* Сообщение об ошибке валидации для имени! */}
					</div>
					<div className="form__field-group">
						{/* Группа полей для имени и телефона!*/}
						<label className="form__field-label" htmlFor="name">
							{/* Метка для поля имени! Name // Текст метки!*/}
							Name
							<Field
								className="form-field" // Класс стилей для поля!
								type="text" // Тип поля - текст!
								name="name" // Имя поля для Formik!
								placeholder="Put your name" // Подсказка в поле!
							/>
						</label>
						<ErrorMessage className="error" name="name" component="span" />{" "}
						{/* Сообщение об ошибке валидации для имени! */}
						<label className="form__field-label" htmlFor="phone">
							{/* Метка для поля телефона! Phone number // Текст метки! */}
							Phone number
							<Field
								className="form-field"
								name="phone"
								component={MuiTelInput}
								defaultCountry="US"
								variant="outlined"
								value={values.phone}
								fullWidth
								onChange={(value: string) => setFieldValue("phone", value)} // Важно!
								
							/>
						</label>
						<ErrorMessage className="error" name="phone" component="span" />{" "}
						{/* Сообщение об ошибке валидации для имени! */}
					</div>
					<div className="form__field-group">
						{/* Группа полей для имени и телефона!*/}
						<label className="form__field-label" htmlFor="totalPerson">
							{/* * Метка для поля количества человек! Total person // Текст метки! */}
							Total person
							<Field
								className="form-field" // Класс стилей для поля!
								type="number" // Тип поля - число!
								name="totalPerson" // Имя поля для Formik!
								min="1" // Минимальное значение - 1!
								max="10" // Максимальное значение - 10!
							/>
						</label>
						<ErrorMessage className="error" name="totalPerson" component="span" />{" "}
						{/* Сообщение об ошибке валидации для имени! */}
					</div>
					<button
						className="form-button" // Класс стилей для кнопки!
						type="submit" // Тип кнопки - отправка формы!
						disabled={loading || isSubmitting} // Отключаем кнопку при загрузке или отправке!
					>
						{loading ? <Loading /> : "Book a Table"}{" "}
						{/* Показываем загрузку или текст в зависимости от состояния!*/}
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default BookATableForm; // Экспортируем компонент формы по умолчанию!
