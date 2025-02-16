import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchRecipes,
	fetchRecipeById,
	createRecipe,
	updateRecipe,
	deleteRecipe,
} from "./RecipesAPI";

import { IRecipes } from "../../shared/interfaces/Recipes.interface";

interface RecipesState {
	recipes: IRecipes[];
	loading: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
}

const initialState: RecipesState = {
	recipes: [],
	loading: "idle",
	error: null,
};

export const fetchRecipesAsync = createAsyncThunk<
	IRecipes[],
	void,
	{ rejectValue: string }
>("recipes/fetchRecipes", async (_, { rejectWithValue }) => {
	try {
		const recipes = await fetchRecipes();
		return recipes;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue("Error with fetching recipes");
	}
});

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

export const deleteRecipeAsync = createAsyncThunk<
	{ success: boolean },
	string,
	{ rejectValue: string }
>("recipes/deleteRecipe", async (id, { rejectWithValue }) => {
	try {
		const deletedRecipe = await deleteRecipe(id);
		return deletedRecipe;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}

		return rejectWithValue("Error with deleting recipe");
	}
});

const recipesSlice =  createSlice({
    name:'recipes',
    initialState,
    reducers:{},
    extraReducers: (builder)=> {
        builder
        .addCase(fetchRecipesAsync.pending, (state)=>{
            state.loading='pending'
        })
        .addCase(fetchRecipesAsync.fulfilled, (state, action: PayloadAction<IRecipes[]>)=>{
            state.loading = "succeeded"
            state.recipes = action.payload
        })
        .addCase(fetchRecipesAsync.rejected, (state,action)=>{
            state.loading = 'failed'
            state.error = action.payload as string | "Failed to load recipes. Please, try again later."
        })
    }
}

)


export default recipesSlice.reducer;