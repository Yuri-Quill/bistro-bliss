import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Loading from "../Components/Loading/Loading";

const MainLayout = () => {
	return (
		<>
			<header className="header">header</header>
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
