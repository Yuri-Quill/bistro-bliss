import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchRecipes,
	fetchRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe,
} from "./RecipesAPI";

import { IRecipes } from "../../shared/interfaces/Recipes.interface";

// Определение интерфейса состояния с учетом пагинации
interface RecipesState {
	recipes: IRecipes[];
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
	currentPage: number;
	totalPages: number;
	totalRecipes: number;
	limit: number;
}

const initialState: RecipesState = {
	recipes: [],
	loading: "idle",
	error: null,
	currentPage: 1,
	totalPages: 1,
	totalRecipes: 0,
	limit: 10, // ограничение на количество рецептов на страницу
};

// Асинхронное действие для получения рецептов с пагинацией
export const fetchRecipesAsync = createAsyncThunk<
	{ recipes: IRecipes[]; total: number; pages: number }, // структура возвращаемого объекта
	{ page: number; limit: number }, // параметры пагинации
	{ rejectValue: string }
>("recipes/fetchRecipes", async ({ page, limit }, { rejectWithValue }) => {
	try {
		// Получаем рецепты с сервером с учетом пагинации
		const { recipes, total, pages } = await fetchRecipes(page, limit);
		return { recipes, total, pages }; // возвращаем данные
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Error with fetching recipes");
	}
});

// Асинхронное действие для получения рецепта по ID
export const fetchRecipeByIdAsync = createAsyncThunk<
	IRecipes,
	string,
	{ rejectValue: string }
>("recipes/fetchRecipesById", async (id, { rejectWithValue }) => {
	try {
		const recipe = await fetchRecipeById(id);
		return recipe;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Error with fetching by id");
	}
});

// Асинхронное действие для создания нового рецепта
export const createRecipeAsync = createAsyncThunk<
	IRecipes,
	IRecipes,
	{ rejectValue: string }
>("recipes/createRecipe", async (recipeData, { rejectWithValue }) => {
	try {
		const newRecipe = await createRecipe(recipeData);
		return newRecipe;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Error with creating new recipe!");
	}
});

// Асинхронное действие для обновления рецепта
export const updateRecipeAsync = createAsyncThunk<
	IRecipes,
	{ id: string; updatedData: IRecipes },
	{ rejectValue: string }
>("recipes/updateRecipe", async ({ id, updatedData }, { rejectWithValue }) => {
	try {
		const updatedRecipe = await updateRecipe(id, updatedData);
		return updatedRecipe;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Error with update data");
	}
});

// Асинхронное действие для удаления рецепта
export const deleteRecipeAsync = createAsyncThunk<
	{ success: boolean; id: string }, // Теперь возвращаем id рецепта, который удален
	string,
	{ rejectValue: string }
>("recipes/deleteRecipe", async (id, { rejectWithValue }) => {
	try {
		const deletedRecipe = await deleteRecipe(id);
		return { success: deletedRecipe.success, id }; // Возвращаем id удаленного рецепта
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Error with deleting recipe");
	}
});

// Слайс для рецептов
const recipesSlice = createSlice({
	name: "recipes",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Пендниг состояние (ожидание ответа)
		builder.addCase(fetchRecipesAsync.pending, (state) => {
			state.loading = "pending";
		});

		// Успешный ответ (данные получены)
		builder.addCase(
			fetchRecipesAsync.fulfilled,
			(
				state,
				action: PayloadAction<{ recipes: IRecipes[]; total: number; pages: number }>
			) => {
				state.loading = "succeeded";
				// Обновляем состояние с учетом пагинации
				state.recipes = action.payload.recipes;
				state.totalRecipes = action.payload.total;
				state.totalPages = action.payload.pages;
			}
		);

		// Ошибка (не удалось получить данные)
		builder.addCase(fetchRecipesAsync.rejected, (state, action) => {
			state.loading = "failed";
			state.error = action.payload as
				| string
				| "Failed to load recipes. Please, try again later.";
		});

		// Для создания нового рецепта
		builder.addCase(createRecipeAsync.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(
			createRecipeAsync.fulfilled,
			(state, action: PayloadAction<IRecipes>) => {
				state.loading = "succeeded";
				state.recipes.push(action.payload); // Добавляем новый рецепт в массив
			}
		);
		builder.addCase(createRecipeAsync.rejected, (state, action) => {
			state.loading = "failed";
			state.error = action.payload as string;
		});

		// Для обновления рецепта
		builder.addCase(updateRecipeAsync.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(
			updateRecipeAsync.fulfilled,
			(state, action: PayloadAction<IRecipes>) => {
				state.loading = "succeeded";
				const index = state.recipes.findIndex(
					(recipe) => recipe._id === action.payload._id
				);
				if (index !== -1) {
					state.recipes[index] = action.payload; // Обновляем рецепт
				}
			}
		);
		builder.addCase(updateRecipeAsync.rejected, (state, action) => {
			state.loading = "failed";
			state.error = action.payload as string;
		});

		// Для удаления рецепта
		builder.addCase(deleteRecipeAsync.pending, (state) => {
			state.loading = "pending";
		});
		builder.addCase(
			deleteRecipeAsync.fulfilled,
			(state, action: PayloadAction<{ success: boolean; id: string }>) => {
				state.loading = "succeeded";
				if (action.payload.success) {
					state.recipes = state.recipes.filter(
						(recipe) => recipe._id !== action.payload.id
					); // Используем id для удаления рецепта
				}
			}
		);
		builder.addCase(deleteRecipeAsync.rejected, (state, action) => {
			state.loading = "failed";
			state.error = action.payload as string;
		});
	},
});

export default recipesSlice.reducer;
