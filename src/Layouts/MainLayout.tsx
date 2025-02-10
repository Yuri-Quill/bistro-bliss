import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Loading from "../Components/Loading/Loading";
import MainHeader from "../Components/MainHeader/MainHeader";

const MainLayout = () => {
	return (
		<>
			<MainHeader />
			<main className="main">
				<Suspense fallback={<Loading fullScreen />}>
					<Outlet />
				</Suspense>
			</main>

			<footer className="footer">footer</footer>
		</>
	);
};

export default MainLayout;
