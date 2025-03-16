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

// State interface
export interface IRecipesState {
    mainPageRecipes: IRecipes[];
    paginatedRecipes: IPaginatedRecipes;
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: IRecipesState = {
    mainPageRecipes: [],
    paginatedRecipes: {
        recipes: [],
        page: 1,
        limit: 8,
        total: 0,
    },
    loading: false,
    error: null,
};

// Thunk to fetch recipes
export const fetchRecipes = createAsyncThunk<
    IPaginatedRecipes & { forMainPage: boolean },
    { page: number; limit: number; forMainPage: boolean },
    { rejectValue: string }
>(
    "recipes/fetchRecipes",
    async ({ page, limit, forMainPage }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get<IPaginatedRecipes>(`${URL}/recipes`, {
                params: { page, limit },
            });
            return { ...data, forMainPage };
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Unknown error occurred");
        }
    }
);

// Slice
const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.paginatedRecipes.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
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
                        forMainPage: boolean;
                    }>
                ) => {
                    state.loading = false;
                    state.error = null;
                    if (action.payload.forMainPage) {
                        state.mainPageRecipes = action.payload.recipes;
                    } else {
                        state.paginatedRecipes.recipes = action.payload.recipes;
                        state.paginatedRecipes.page = action.payload.page;
                        state.paginatedRecipes.limit = action.payload.limit;
                        state.paginatedRecipes.total = action.payload.total;
                    }
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

export const { setPage } = recipesSlice.actions;
export default recipesSlice.reducer;