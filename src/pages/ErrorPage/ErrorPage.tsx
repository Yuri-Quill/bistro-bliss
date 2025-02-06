import { useRouteError, Link } from "react-router-dom";
import { useEffect } from "react";

import "./ErrorPage.scss";

interface ErrorType {
	status: number;
	statusText: string;
	message: string;
	error: Error;
}

const ErrorPage = () => {
	const error = useRouteError() as ErrorType;

	useEffect(() => {
		console.error("Routing Error:", error);
	}, [error]);

	return (
		<section className="error-page">
			<h1 className="error-page__title">Oops! Something went wrong</h1>
			<h4 className="error-page__status">Error {error.status}</h4>
			<p className="error-page__message">{error.statusText || error.message}</p>

			<Link to="/" className="error-page__home-link">
				Return to Home
			</Link>
		</section>
	);
};

export default ErrorPage;
