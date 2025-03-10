import { configureStore } from "@reduxjs/toolkit";

import recipesReducer from "../features/recipes/RecipesSlice";
import reservationReducer from '../features/reservation/reservationsSlice'

export const store = configureStore({
	reducer: {
		recipes: recipesReducer,
		reservation : reservationReducer
	},
});

// Выведение типов `RootState` и `AppDispatch` из хранилища
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
