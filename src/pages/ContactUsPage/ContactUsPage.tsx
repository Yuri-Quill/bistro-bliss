import FormPageTemplate from "../../Components/FormPageTemplate/FormPageTemplate";
import ContactUsForm from "../../forms/ContactUs/ContactUsForm";

const ContactUsPage = () => {
	return (
		<FormPageTemplate
			title="Contact Us"
			body="We consider all the drivers of change gives you the components you need to change to create a truly happens."
			form={<ContactUsForm />}
		/>
	);
};

export default ContactUsPage;
