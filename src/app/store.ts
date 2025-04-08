import { configureStore } from "@reduxjs/toolkit";

import recipesReducer from "./slices/recipesSlice";
import bookingReducer from "./slices/bookATableSlice";
import contactUsReducer from "./slices/contactUsSlice";
import menuReducer from './slices/menuSlice'

export const store = configureStore({
	reducer: {
		recipes: recipesReducer,
		booking: bookingReducer,
		contactUs: contactUsReducer,
		menu: menuReducer
	},
});

// ! Выведение типов `RootState` и `AppDispatch` из хранилища

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
