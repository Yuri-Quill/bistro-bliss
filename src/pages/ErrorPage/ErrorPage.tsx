import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.scss";

interface ErrorResponse {
	status?: number;
	statusText?: string;
	message?: string;
}

const ErrorPage = () => {
	const error = useRouteError() as ErrorResponse;

	const status = error.status || 500;
	const message = error.message || error.statusText || "An unexpected error occurred";

	
	return (
		<section className="error">
			<h1 className="error__title">Oops, something went wrong</h1>
			<h2 className="error__subtitle">{status}</h2>
			<p className="error__text">{message}</p>
			<Link className="error__link" to="/">
				Return to Home
			</Link>
		</section>
	);
};

export default ErrorPage;
