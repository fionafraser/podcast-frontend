import React from "react";

import { HiLocationMarker } from "react-icons/hi";

const Location = ({ city, country }) => {
	return (
		<div className="text-grey-100 flex flex-row gap-2 items-center justify-start">
			<HiLocationMarker size={20} color="#FF67C4" />
			<p className="capitalize font-light text-sm">
				{city}, {country}
			</p>
		</div>
	);
};

export default Location;
