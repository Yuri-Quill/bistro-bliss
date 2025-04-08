import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import IRecipes from "../../shared/interfaces/recipes.interface";

const URL = "https://quill-server-fksr.onrender.com/api";

// Interface for paginated recipes
interface IPaginatedRecipes {
    recipes: IRecipes[];
    page: number;
    limit: number;
    total: number;
}

// State interface (updated to allow recipeByID to be null)
export interface IRecipesState extends IPaginatedRecipes {
    recipeByID: IRecipes | null; // Changed from IRecipes to IRecipes | null
    loading: boolean;
    error: string | null;
}

// Initial state (updated recipeByID to null)
const initialState: IRecipesState = {
    recipeByID: null, // Changed from [] to null
    recipes: [],
    page: 1,
    limit: 8,
    total: 0,
    loading: false,
    error: null,
};

// Thunk to fetch paginated recipes
export const fetchRecipes = createAsyncThunk<
    IPaginatedRecipes,
    { page: number; limit: number },
    { rejectValue: string }
>("recipes/fetchRecipes", async ({ page, limit }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get<IPaginatedRecipes>(`${URL}/recipes`, {
            params: { page, limit },
        });
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Unknown error occurred");
    }
});

// Thunk to fetch a single recipe by ID
export const getRecipeByID = createAsyncThunk<
    IRecipes,
    string,
    { rejectValue: string }
>("recipesId/getRecipeByID", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get<IRecipes>(`${URL}/recipes/${id}`);
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
        }
        return rejectWithValue("Unknown error occurred");
    }
});

// Slice
const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchRecipes
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchRecipes.fulfilled,
                (
                    state,
                    action: PayloadAction<{
                        recipes: IRecipes[];
                        page: number;
                        limit: number;
                        total: number;
                    }>
                ) => {
                    state.loading = false;
                    state.error = null;
                    state.recipes = action.payload.recipes;
                    state.page = action.payload.page;
                    state.limit = action.payload.limit;
                    state.total = action.payload.total;
                }
            )
            .addCase(
                fetchRecipes.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "An error occurred";
                }
            )
            // Handle getRecipeByID (new extra reducers)
            .addCase(getRecipeByID.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getRecipeByID.fulfilled,
                (state, action: PayloadAction<IRecipes>) => {
                    state.loading = false;
                    state.error = null;
                    state.recipeByID = action.payload;
                }
            )
            .addCase(
                getRecipeByID.rejected,
                (state, action: PayloadAction<string | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "An error occurred";
                }
            );
    },
});

export const { setPage } = recipesSlice.actions;
export default recipesSlice.reducer;