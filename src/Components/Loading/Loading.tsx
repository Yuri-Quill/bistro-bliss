import classNames from "classnames";
import "./Lodaing.scss";

interface LoadingProps {
	size?: "small" | "medium" | "large";
	color?: string;
	fullScreen?: boolean;
	className?: string;
}

const Loading = ({
	size = "medium",
	color = "#66d9b7",
	fullScreen = false,
	className,
}: LoadingProps) => {
	const containerClasses = classNames(
		"loading-container",
		{
			[size]: true,
			"full-screen": fullScreen,
		},
		className
	);

	return (
		<div className={containerClasses} data-testid="loading-component">
			<div className="loading-spinner" style={{ borderTopColor: color }}></div>
		</div>
	);
};

export default Loading;
