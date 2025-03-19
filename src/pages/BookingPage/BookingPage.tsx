import FormPageTemplate from "../../Components/FormPageTemplate/FormPageTemplate";
import BookATableForm from "../../forms/BookATable/BookATableForm";

const BookingPage = () => {
	return (
		<FormPageTemplate
			title="Book A Table"
			body="We consider all the drivers of change gives you the components you need to change to create a truly happens."
			form={<BookATableForm />}
		/>
	);
};

export default BookingPage;
