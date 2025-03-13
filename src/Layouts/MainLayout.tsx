import { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchRecipes } from "../app/slices/recipesSlice";
import Loading from "../Components/Loading/Loading";
import TopBar from "../Components/TopBar/TopBar";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {
	const dispatch = useAppDispatch();
	const { page, limit } = useAppSelector((state) => state.recipes);

	useEffect(() => {
		dispatch(fetchRecipes({ page, limit }));
	}, [dispatch, page, limit]);

	return (
		<>
			<TopBar />
			<Header />
			<main className="main">
				<Suspense fallback={<Loading fullScreen />}>
					<Outlet />
				</Suspense>
			</main>
			<Footer/>
		</>
	);
};

export default MainLayout;
