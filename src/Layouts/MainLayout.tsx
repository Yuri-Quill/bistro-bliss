import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";

import Loading from "../Components/Loading/Loading";
import MainHeader from "../Components/MainHeader/MainHeader";
import { fetchRecipesAsync } from "../features/recipes/RecipesSlice";

const MainLayout = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchRecipesAsync());
	}, [dispatch]);

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
