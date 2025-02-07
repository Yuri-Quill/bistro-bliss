export default interface IErrorPage {
	status: number;
	statusText: string;
	message: string;
	error: Error;
}
