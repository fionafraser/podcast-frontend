"use client";

import { useState } from "react";
import Image from "next/image";

const Input = ({
	pattern,
	placeholder,
	inputholder,
	onChangeValue,
	value,
	secureText,
	type = "text",
	required = false,
}) => {
	const [show, setShow] = useState(secureText);

	const onChangeShow = () => {
		setShow((prevState) => !prevState);
	};

	return (
		<label htmlFor="" className="relative w-full group">
			<input
                  pattern={pattern}
				autoComplete={show ? "password" : type}
				type={show ? "password" : type}
				className="h-12 w-full rounded-md peer bg-white border flex items-end border-grey-100 px-6 text-sm outline outline-0 
									transition-all focus:border-2 group-focus:border-2 focus:border-blue-500 group-focus:border-blue-500 focus:outline-0"
				style={{ paddingTop: !placeholder ? 0 : 8 }}
				placeholder={inputholder && inputholder}
				onChange={onChangeValue}
				value={value}
				required={required}
			/>
			{placeholder && (
				<span className="peer-focus:text-blue-500 group-focus:text-blue-500 text-grey-100 text-xs font-normal absolute left-5 top-1">
					{placeholder}
				</span>
			)}
			{secureText && (
				<button
					type="button"
					onClick={onChangeShow}
					className="absolute right-5 top-4"
				>
					<Image
						src={!show ? "/svgs/eyecross.svg" : "/svgs/eye.svg"}
						width={25}
						height={25}
						alt={!show ? "Hide password" : "Show password"}
						className="self-center grou"
					/>
				</button>
			)}
		</label>
	);
};

export default Input;
