import { useState, useEffect } from "react";

const Indicator = ({ mode }) => {
	const [color, setColor] = useState("secondary");

	useEffect(() => {
		const checkAndSet = () => {
			switch (mode) {
				case "online":
					setColor("pinky");
					break;
				case "offline":
					setColor("secondary");
					break;
				default:
					setColor("pinky");
					break;
			}
		};

		checkAndSet();
	}, [mode]);

	return (
		<div className="flex flex-row gap-0.5 items-center mb-1">
			<div className={`bg-${color} w-2 h-2 rounded-full`} />{" "}
			<p className="text-grey-100 text-sm font-light capitalize">{mode}</p>
		</div>
	);
};

export default Indicator;
