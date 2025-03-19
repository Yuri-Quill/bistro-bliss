import Container from "../Container/Container";
import "./FormPageTemplate.scss";

interface IFormPageTemplateProps {
	title: string;
	body: string;
	className?: string;
	form?: React.ReactNode;
}

const FormPageTemplate = ({
	title,
	body,
	form,
	className,
}: IFormPageTemplateProps) => {
	return (
		<section className={`form-page ${className}`}>
			<Container>
			<h2 className={`form-page__title ${className}`}>{title}</h2>
			<p className={`form-page__text ${className}`}>{body}</p>
			{form}
			</Container>
		</section>
	);
};

export default FormPageTemplate;
