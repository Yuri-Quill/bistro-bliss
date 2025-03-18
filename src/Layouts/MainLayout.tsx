import { Suspense, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAppDispatch} from "../app/hooks";
import { fetchRecipes } from "../app/slices/recipesSlice";
import Loading from "../Components/Loading/Loading";
import TopBar from "../Components/TopBar/TopBar";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { useSearchParams } from "react-router-dom";

const MainLayout = () => {
	const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

	const currentPage = Number(searchParams.get("page") || 1);
    const currentLimit = Number(searchParams.get("limit") || 8); 

    useEffect(() => {
        dispatch(fetchRecipes({ page: currentPage, limit: currentLimit}));
    }, [dispatch, currentPage, currentLimit]);


	return (
		<>
			<ScrollRestoration />

			<TopBar />
			<Header />
			<main className="main">
				<Suspense fallback={<Loading fullScreen />}>
					<Outlet />
				</Suspense>
			</main>
			<Footer />
		</>
	);
};

export default MainLayout;
