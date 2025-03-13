import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import IRecipes from "../../shared/interfaces/recipes.interface";

const URL = "https://quill-server-fksr.onrender.com/api";

// ! ✅  Интерфейс ответа от сервера

interface IRecipesResponse {
	recipes: IRecipes[];
	page: number ;
	limit: number ;
	total: number;
}

// ! ✅  Интерфейс состояния

interface IRecipesState extends IRecipesResponse {
	loading: boolean;
	error: string | null;
}

// ! ✅  Начальное состояние

const initialState: IRecipesState = {
	recipes: [],
	page: 1,
	limit: 10,
	total: 0,
	loading: false,
	error: null,
};

// ! Интерфейс для экшена редьюсера
interface SetPageLimitPayload {
    page: number;
    limit: number;
}

// ! ✅  Асинхронный экшен с учётом пагинации

export const fetchRecipes = createAsyncThunk<
	IRecipesResponse, // ! 👈  Используем готовый интерфейс для ответа
	{ page: number; limit: number }, // ! 👈 Передаём параметры
	{ rejectValue: string }
>("recipes/fetchRecipes", async ({ page, limit }, { rejectWithValue }) => {
	try {
		
		const { data } = await axios.get<IRecipesResponse>(`${URL}/recipes`, {
			params: { page, limit }, // ! 👈 Автоматически подставляет ?page=1&limit=10
		});
		return data;
	} catch (error: unknown) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Unknown error occurred");
	}
});

// ✅ Создаём slice
const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {setPageLimit: (state, action: PayloadAction<SetPageLimitPayload>) => {
        state.page = action.payload.page;
        state.limit = action.payload.limit;
    },},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRecipes.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				fetchRecipes.fulfilled,
				(state, action: PayloadAction<IRecipesResponse>) => {
					state.loading = false;
					state.recipes = action.payload.recipes;
					state.page = action.payload.page;
					state.limit = action.payload.limit;
					state.total = action.payload.total;
					state.error = null;
				}
			)
			.addCase(
				fetchRecipes.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.loading = false;
					state.error = action.payload || "An error occurred";
				}
			);
	},
});
export const { setPageLimit } = recipesSlice.actions;
export default recipesSlice.reducer;
