import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "../features/recipes/RecipesSlice";

export const store = configureStore({
	reducer: {
		recipes: recipesReducer
	},
});

// Выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
