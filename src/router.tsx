import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/HomePage/HomePage";

const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const MenuPage = lazy(() => import("./pages/MenuPage/MenuPage"));
const RecipesPage = lazy(() => import("./pages/RecipesPage/RecipesPage"));
const RecipeDetailPage = lazy(
	() => import("./pages/RecipeDetailPage/RecipeDetailPage")
);
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));
const BookingPage = lazy(() => import("./pages/BookingPage/BookingPage"));

const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		errorElement: <ErrorPage />,

		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "/about",
				element: <AboutPage />,
			},
			{
				path: "/menu",
				element: <MenuPage />,
			},
			{
				path: "/recipes",
				element: <RecipesPage />,
			},
			{
				path: "/recipes/:id",
				element: <RecipeDetailPage />,
			},
			{
				path: "/contact",
				element: <ContactPage />,
			},
			{
				path: "/book-a-table",
				element: <BookingPage />,
			},
		],
	},
]);

export default router;
