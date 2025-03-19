// TimePicker.tsx
import "./TimePicker.scss";
import { useState } from "react";
import { FieldProps } from "formik";

interface TimePickerProps extends FieldProps {
	min?: string; // Формат "HH:MM" (например, "09:00")
	max?: string; // Формат "HH:MM" (например, "22:00")
	format?: "12h" | "24h"; // Формат времени: 12-часовой или 24-часовой
}

const TimePicker: React.FC<TimePickerProps> = ({
	field,
	form,
	min,
	max,
	format = "12h",
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedHour, setSelectedHour] = useState<number>(
		format === "12h" ? 12 : 0
	);
	const [selectedMinute, setSelectedMinute] = useState<number>(0);
	const [period, setPeriod] = useState<"AM" | "PM">("PM");
	const [showMinutes, setShowMinutes] = useState<boolean>(false);

	const togglePicker = () => setIsOpen(!isOpen);

	const parseTime = (time: string): { hour: number; minute: number } => {
		const [hour, minute] = time.split(":").map(Number);
		return { hour, minute };
	};

	const minTime = min ? parseTime(min) : { hour: 0, minute: 0 };
	const maxTime = max ? parseTime(max) : { hour: 23, minute: 59 };

	const isHourValid = (hour: number): boolean => {
		const hour24 =
			format === "12h"
				? period === "PM" && hour !== 12
					? hour + 12
					: hour === 12 && period === "AM"
					? 0
					: hour
				: hour; // Для 24h используем час как есть
		return hour24 >= minTime.hour && hour24 <= maxTime.hour;
	};

	const isMinuteValid = (minute: number): boolean => {
		const hour24 =
			format === "12h"
				? period === "PM" && selectedHour !== 12
					? selectedHour + 12
					: selectedHour === 12 && period === "AM"
					? 0
					: selectedHour
				: selectedHour;
		if (hour24 === minTime.hour) return minute >= minTime.minute;
		if (hour24 === maxTime.hour) return minute <= maxTime.minute;
		return true;
	};

	const handleHourSelect = (hour: number) => {
		if (isHourValid(hour)) {
			setSelectedHour(hour);
			setShowMinutes(true);
		}
	};

	const handleMinuteSelect = (minute: number) => {
		if (isMinuteValid(minute)) {
			setSelectedMinute(minute);
			updateFieldValue(selectedHour, minute, period);
			setIsOpen(false);
		}
	};

	const handlePeriodToggle = (e: React.MouseEvent) => {
		e.stopPropagation();
		const newPeriod = period === "AM" ? "PM" : "AM";
		setPeriod(newPeriod);
		updateFieldValue(selectedHour, selectedMinute, newPeriod);
	};

	const handleBackToHours = () => {
		setShowMinutes(false);
	};

	const updateFieldValue = (
		hour: number,
		minute: number,
		period: "AM" | "PM"
	) => {
		const timeString =
			format === "12h"
				? `${hour.toString().padStart(2, "0")}:${minute
						.toString()
						.padStart(2, "0")} ${period}`
				: `${hour.toString().padStart(2, "0")}:${minute
						.toString()
						.padStart(2, "0")}`;
		form.setFieldValue(field.name, timeString);
	};

	const renderClock = () => {
		if (format === "12h") {
			const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
			const radius = 90;
			const center = 110;

			return (
				<div className="clock">
					{numbers.map((num) => {
						const angle = (num - 3) * 30;
						const rad = (angle * Math.PI) / 180;
						const x = center + radius * Math.cos(rad);
						const y = center + radius * Math.sin(rad);
						const isDisabled = !isHourValid(num);
						return (
							<div
								key={num}
								className={`clock-number ${selectedHour === num ? "selected" : ""} ${
									isDisabled ? "disabled" : ""
								}`}
								style={{ left: `${x}px`, top: `${y}px` }}
								onClick={() => !isDisabled && handleHourSelect(num)}
							>
								{num}
							</div>
						);
					})}
					<div
						className="clock-hand"
						style={{
							transform: `rotate(${selectedHour * 30}deg)`,
						}}
					/>
				</div>
			);
		} else {
			// 24h с двойным циферблатом
			const outerNumbers = Array.from({ length: 12 }, (_, i) => i); // 0-11
			const innerNumbers = Array.from({ length: 12 }, (_, i) => i + 12); // 12-23
			const outerRadius = 90;
			const innerRadius = 60;
			const center = 110;

			return (
				<div className="clock">
					{outerNumbers.map((num) => {
						const angle = (num - 3) * 30;
						const rad = (angle * Math.PI) / 180;
						const x = center + outerRadius * Math.cos(rad);
						const y = center + outerRadius * Math.sin(rad);
						const isDisabled = !isHourValid(num);
						return (
							<div
								key={num}
								className={`clock-number outer ${
									selectedHour === num ? "selected" : ""
								} ${isDisabled ? "disabled" : ""}`}
								style={{ left: `${x}px`, top: `${y}px` }}
								onClick={() => !isDisabled && handleHourSelect(num)}
							>
								{num}
							</div>
						);
					})}
					{innerNumbers.map((num) => {
						const angle = (num - 15) * 30; // Смещение для 12 вверху
						const rad = (angle * Math.PI) / 180;
						const x = center + innerRadius * Math.cos(rad);
						const y = center + innerRadius * Math.sin(rad);
						const isDisabled = !isHourValid(num);

						return (
							<div
								key={num}
								className={`clock-number inner ${
									selectedHour === num ? "selected" : ""
								} ${isDisabled ? "disabled" : ""}`}
								style={{ left: `${x}px`, top: `${y}px` }}
								onClick={() => !isDisabled && handleHourSelect(num)}
							>
								{num}
							</div>
						);
					})}

					<div
						className="clock-hand"
						style={{
							transform: `rotate(${
								selectedHour < 12 ? selectedHour * 30: (selectedHour - 12) * 30
							}deg)`,
							height: selectedHour < 12 ? "90px" : "60px", // Длина для внешнего и внутреннего кругов
							top: selectedHour < 12 ? "20px" : "50px", // Смещение для внутреннего круга
						}}
					/>
				</div>
			);
		}
	};

	const renderMinutes = () => {
		const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // 0, 5, 10, ..., 55
		const radius = 90;
		const center = 110;

		return (
			<div className="clock">
				{minutes.map((min) => {
					const angle = (min / 5 - 3) * 30;
					const rad = (angle * Math.PI) / 180;
					const x = center + radius * Math.cos(rad);
					const y = center + radius * Math.sin(rad);
					const isDisabled = !isMinuteValid(min);
					return (
						<div
							key={min}
							className={`clock-number ${selectedMinute === min ? "selected" : ""} ${
								isDisabled ? "disabled" : ""
							}`}
							style={{ left: `${x}px`, top: `${y}px` }}
							onClick={() => !isDisabled && handleMinuteSelect(min)}
						>
							{min.toString().padStart(2, "0")}
						</div>
					);
				})}
				<div
					className="clock-hand"
					style={{
						transform: `rotate(${(selectedMinute / 5) * 30}deg)`,
					}}
				/>
			</div>
		);
	};

	return (
		<div className="time-picker-wrapper">
			<input
				type="text"
				readOnly
				value={
					format === "12h"
						? `${selectedHour.toString().padStart(2, "0")}:${selectedMinute
								.toString()
								.padStart(2, "0")} ${period}`
						: `${selectedHour.toString().padStart(2, "0")}:${selectedMinute
								.toString()
								.padStart(2, "0")}`
				}
				onClick={togglePicker}
				className="time-input"
			/>
			{isOpen && (
				<div className="time-picker-modal">
					<div className="time-display" onClick={handleBackToHours}>
						{selectedHour.toString().padStart(2, "0")}:
						{selectedMinute.toString().padStart(2, "0")}
						{format === "12h" && (
							<button onClick={handlePeriodToggle} className="period-button">
								{period}
							</button>
						)}
					</div>
					{showMinutes ? renderMinutes() : renderClock()}
					<button onClick={togglePicker} className="close-button">
						OK
					</button>
				</div>
			)}
		</div>
	);
};

export default TimePicker;
