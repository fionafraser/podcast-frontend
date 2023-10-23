import React from "react";

const Progress = ({ numOfPosition = 1 }) => {
	return (
		<div className="flex flex-row gap-2">
			<div
				className="h-1.5 rounded-xl"
				style={{
					width: numOfPosition === 1 ? "45px" : "6px",
					backgroundColor: numOfPosition >= 1 ? "#232E60" : "#868686",
				}}
			/>
			<div
				className="h-1.5 rounded-xl"
				style={{
					width: numOfPosition === 2 ? "45px" : "6px",
					backgroundColor: numOfPosition >= 2 ? "#232E60" : "#868686",
				}}
			/>
			<div
				className="h-1.5 rounded-xl"
				style={{
					width: numOfPosition === 3 ? "45px" : "6px",
					backgroundColor: numOfPosition >= 3 ? "#232E60" : "#868686",
				}}
			/>
			<div
				className="h-1.5 rounded-xl"
				style={{
					width: numOfPosition === 4 ? "45px" : "6px",
					backgroundColor: numOfPosition >= 4 ? "#232E60" : "#868686",
				}}
			/>
		</div>
	);
};

export default Progress;
