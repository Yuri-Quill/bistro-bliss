import { useRouteError, Link } from "react-router-dom";

import "./ErrorPage.scss";

interface IErrorPage {
	status: number;
	statusText: string;
	message: string;
}

const ErrorPage = () => {
	const error = useRouteError() as IErrorPage;

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
