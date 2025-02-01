import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../Components/Header/MainHeader";

const MainLayout = () => {
	return (
		<>
			<MainHeader />
			<main>
				<Suspense fallback={<p>Loading..</p>}>
					<Outlet />
				</Suspense>
			</main>

			<footer>footer</footer>
		</>
	);
};

export default MainLayout;
