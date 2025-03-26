import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
	IMenuInterface,
	IMenuItemInterface,
} from "../../shared/interfaces/menu.interface";

const URL = "https://quill-server-fksr.onrender.com/api/menu";

interface IMenuState {
	menu: IMenuInterface | null; // Весь объект меню
	menuItem: IMenuItemInterface | null; // Отдельный элемент меню
	menuCategory: IMenuItemInterface[] | null; // Массив блюд из одной категории
	loading: boolean;
	error: string | null;
}

const initialState: IMenuState = {
	menu: null,
	menuItem: null,
	menuCategory: null, // Добавлено для хранения данных категории
	loading: false,
	error: null,
};

// Получение всего меню
export const getMenu = createAsyncThunk<
	IMenuInterface,
	void,
	{ rejectValue: string }
>("menu/fetchMenu", async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(URL);
		return data[0]; // Предполагается, что сервер возвращает массив с одним объектом
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Неизвестная ошибка при получении меню!");
	}
});

// Получение конкретного элемента по ID и категории
export const getMenuItemById = createAsyncThunk<
	IMenuItemInterface,
	{ id: string; category: string },
	{ rejectValue: string }
>("menu/getMenuItemById", async ({ id, category }, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(`${URL}/${category}/${id}`);
		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Неизвестная ошибка при получении элемента меню!");
	}
});

// Новый thunk для получения всех блюд из категории
export const getMenuByCategory = createAsyncThunk<
	IMenuItemInterface[],
	string, // Категория передаётся как строка
	{ rejectValue: string }
>("menu/fetchMenuByCategory", async (category, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(`${URL}/${category}`);
		return data; // Ожидаем массив блюд
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Неизвестная ошибка при получении категории меню!");
	}
});

const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			// Обработка запроса всего меню
			.addCase(getMenu.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				getMenu.fulfilled,
				(state, action: PayloadAction<IMenuInterface>) => {
					state.loading = false;
					state.error = null;
					state.menu = action.payload;
				}
			)
			.addCase(
				getMenu.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = false;
					state.error = action.payload || "Произошла ошибка";
				}
			)

			// Обработка запроса конкретного блюда
			.addCase(getMenuItemById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				getMenuItemById.fulfilled,
				(state, action: PayloadAction<IMenuItemInterface>) => {
					state.loading = false;
					state.error = null;
					state.menuItem = action.payload;
				}
			)
			.addCase(
				getMenuItemById.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = false;
					state.error = action.payload || "Произошла ошибка";
				}
			)

			// Обработка запроса всех блюд из категории
			.addCase(getMenuByCategory.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				getMenuByCategory.fulfilled,
				(state, action: PayloadAction<IMenuItemInterface[]>) => {
					state.loading = false;
					state.error = null;
					state.menuCategory = action.payload;
				}
			)
			.addCase(
				getMenuByCategory.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = false;
					state.error = action.payload || "Произошла ошибка";
				}
			);
	},
});

export default menuSlice.reducer;
