import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/HomePage/HomePage";


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
		],
	},
]);

export default router;

