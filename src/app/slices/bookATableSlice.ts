import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"; //  ! Импортируем утилиты Redux Toolkit для создания thunk и слайсов!
import axios from "axios"; //  ! Импортируем axios для выполнения HTTP-запросов!


const URL = "https://quill-server-fksr.onrender.com/api/email/reservation"; //  ! Конечная точка API для отправки запросов на бронирование!

//  ! Интерфейс, определяющий структуру объекта бронирования!
export interface IBooking {
	name: string; //  ! Имя человека, делающего бронирование!
	phone: string; //  ! Номер телефона человека!
	totalPerson: string; //  ! Общее количество человек (строка, можно сделать числом, если API ожидает)!
	date: string; //  ! Дата бронирования в формате строки (например, "YYYY-MM-DD")!
	time:string; //  ! Время бронирования как объект Dayjs!
}

//  ! Асинхронный thunk для отправки запросов на бронирование в API!
export const sendBookingRequest = createAsyncThunk<
	IBooking, //  ! Тип данных, возвращаемых при успехе!
	IBooking, //  ! Тип аргумента (values), передаваемого в thunk!
	{ rejectValue: string } //  ! Конфигурация для типа значения при отклонении!
>(
	"booking/sendBookingRequest", //  ! Строка типа действия для обновления состояния Redux!
	async (values, { rejectWithValue }) => {
		//  ! Асинхронная функция с значениями и утилитами thunkAPI!
		try {
			//  ! Пытаемся выполнить запрос к API!
			const response = await axios.post(URL, values); //  ! Отправляем POST-запрос с данными бронирования!
			return response.data; //  ! Возвращаем данные ответа API (предполагается, что они соответствуют IBooking)!
		} catch (error) {
			//  ! Ловим любые ошибки запроса!
			if (axios.isAxiosError(error) && error.response) {
				//  ! Проверяем, является ли это ошибкой Axios с ответом!
				return rejectWithValue(
					error.response.data.message ||
						"Не удалось отправить запрос на бронирование" //  ! Возвращаем пользовательское сообщение об ошибке!
				);
			}
			return rejectWithValue("Произошла непредвиденная ошибка"); //  ! Запасная ошибка для неожиданных проблем!
		}
	}
);

//  ! Создаем слайс Redux для управления состоянием бронирования!
const bookingSlice = createSlice({
	name: "booking", //  ! Имя слайса для хранилища Redux!
	initialState: {
		//  ! Начальное состояние для слайса бронирования!
		booking: null as IBooking | null, //  ! Хранит данные бронирования или null, если их нет!
		loading: false, //  ! Отслеживает, выполняется ли запрос!
		error: null as string | null, //  ! Хранит сообщения об ошибках или null, если ошибок нет!
	},
	reducers: {
		//  ! Синхронные редюсеры для обновления состояния!
		clearBooking: (state) => {
			//  ! Редюсер для очистки данных бронирования и ошибок!
			state.booking = null; //  ! Сбрасываем бронирование в null!
			state.error = null; //  ! Очищаем любые сообщения об ошибках!
		},
	},
	extraReducers: (builder) => {
		//  ! Обрабатываем действия асинхронного thunk!
		builder
			.addCase(sendBookingRequest.pending, (state) => {
				//  ! Когда запрос начинается!
				state.loading = true; //  ! Устанавливаем loading в true!
				state.error = null; //  ! Очищаем предыдущие ошибки!
			})
			.addCase(
				sendBookingRequest.fulfilled, //  ! Когда запрос успешно завершен!
				(state, action: PayloadAction<IBooking>) => {
					//  ! Действие с полезной нагрузкой!
					state.loading = false; //  ! Устанавливаем loading в false!
					state.booking = action.payload; //  ! Сохраняем данные бронирования из ответа!
				}
			)
			.addCase(sendBookingRequest.rejected, (state, action) => {
				//  ! Когда запрос отклонен!
				state.loading = false; //  ! Устанавливаем loading в false!
				state.error = action.payload || "Что-то пошло не так"; //  ! Устанавливаем сообщение об ошибке!
			});
	},
});

export const { clearBooking } = bookingSlice.actions; //  ! Экспортируем действия слайса!
export default bookingSlice.reducer; //  ! Экспортируем редюсер слайса по умолчанию!
