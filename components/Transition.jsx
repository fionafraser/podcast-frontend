import React from "react";

const Transition = ({ numOfPosition = 1 }) => {
	return (
		<div className="flex flex-row gap-2">
			<div
				className="h-1 rounded-xl"
				style={{
					width: numOfPosition === 1 ? "45px" : "5px",
					backgroundColor: numOfPosition == 1 ? "#FF67C4" : "#FFFFFF",
				}}
			/>
			<div
				className="h-1 rounded-xl"
				style={{
					width: numOfPosition === 2 ? "45px" : "5px",
					backgroundColor: numOfPosition == 2 ? "#00CCBB" : "#FFFFFF",
				}}
			/>
			<div
				className="h-1 rounded-xl"
				style={{
					width: numOfPosition === 3 ? "45px" : "5px",
					backgroundColor: numOfPosition == 3 ? "#FFDE59" : "#FFFFFF",
				}}
			/>
		</div>
	);
};

export default Transition;
