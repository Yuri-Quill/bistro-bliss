import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import router from "./router";
import { store } from "./app/store";

import "./helpers/reset.scss";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
