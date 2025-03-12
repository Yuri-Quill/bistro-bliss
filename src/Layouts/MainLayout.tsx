import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Loading from "../Components/Loading/Loading";
import TopBar from "../Components/TopBar/TopBar";
import Header from "../Components/Header/Header";

const MainLayout = () => {
	return (
		<>
			<TopBar />
			<Header/>


			<main className="main">
				<Suspense fallback={<Loading fullScreen />}>
					<Outlet />
				</Suspense>
			</main>

			<footer>footer</footer>
		</>
	);
};

export default MainLayout;
