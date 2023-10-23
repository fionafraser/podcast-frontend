import React from "react";

import { MdOutlineRemoveCircleOutline } from "react-icons/md";

const Tag = ({ text, handleRemove, edit }) => {
	return (
		<div className="bg-grey-200 rounded-2xl py-2 px-3 flex justify-between gap-2">
			<p className="text-grey-100 text-center text-sm font-light">{text}</p>
			{edit && (
				<button
					type="button"
					onClick={() => {
						handleRemove(text);
					}}
				>
					<MdOutlineRemoveCircleOutline size={18} color="#868686" />
				</button>
			)}
		</div>
	);
};

export default Tag;
