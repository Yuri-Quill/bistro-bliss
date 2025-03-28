import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
	IMenuItemInterface,
	IMenuCategory,
	IMenuState,
} from "../../shared/interfaces/menu.interface";

const URL = "https://quill-server-fksr.onrender.com/api/menu";

// Обновлённое состояние: добавляем поле selectedItem для конкретного элемента
const initialState: IMenuState = {
	categories: [], // Массив категорий
	loading: false,
	error: null,
	selectedItem: null, // Выбранный элемент (опционально)
};

// Получение всего меню
export const getMenu = createAsyncThunk<
	IMenuCategory[], // Тип возвращаемого значения
	void,
	{ rejectValue: string }
>("menu/fetchMenu", async (_, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(URL);
		const rawMenu = data[0]; // Получаем массив с одним объектом
	
		// Преобразуем объект в массив категорий
		const categories: IMenuCategory[] = Object.keys(rawMenu)
			.filter((key) => !["_id", "__v"].includes(key)) // Убираем служебные поля
			.map((category) => ({
				category, // Название категории ("meat", "vegetarian", и т.д.)
				items: rawMenu[category].filter((item: IMenuItemInterface) =>
					Boolean(item)
				), // Фильтруем элементы
			}));

		return categories;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Unknown error occurred while fetching menu!");
	}
});

// Получение конкретного элемента по ID и категории
export const getMenuItemById = createAsyncThunk<
	IMenuItemInterface, // Тип возвращаемого значения
	{ id: string; category: string }, // Аргументы
	{ rejectValue: string }
>("menu/getMenuItemById", async ({ category, id}, { rejectWithValue }) => {
	try {
		const { data } = await axios.get(`${URL}/${category}/${id}`);
		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Unknown error occurred while fetching menu item!");
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
				(state, action: PayloadAction<IMenuCategory[]>) => {
					state.loading = false;
					state.error = null;
					state.categories = action.payload; // Сохраняем массив категорий
				}
			)
			.addCase(
				getMenu.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = false;
					state.error = action.payload || "Oops something went wrong";
				}
			)
			// Обработка запроса конкретного элемента
			.addCase(getMenuItemById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				getMenuItemById.fulfilled,
				(state, action: PayloadAction<IMenuItemInterface>) => {
					state.loading = false;
					state.error = null;
					state.selectedItem = action.payload; // Сохраняем выбранный элемент
				}
			)
			.addCase(
				getMenuItemById.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = false;
					state.error = action.payload || "Oops something went wrong";
				}
			);
	},
});

export default menuSlice.reducer;
