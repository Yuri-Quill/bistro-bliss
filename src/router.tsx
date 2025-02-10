import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/HomePage/HomePage";


const AboutPage = lazy(() => import("./pages/AboutPage/AboutPage"));
const MenuPage = lazy(() => import("./pages/MenuPage/MenuPage"));
const PagesPage = lazy(() => import("./pages/PagesPage/PagesPage"));
const ContactPage = lazy(() => import("./pages/ContactPage/ContactPage"));

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
				path: "/pages",
				element: <PagesPage />,
			},
			{
				path: "/contact",
				element: <ContactPage />,
			},
		],
	},
]);

export default router;
