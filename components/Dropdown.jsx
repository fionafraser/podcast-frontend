import "@styles/dropdown.css";

import { useState, useEffect } from "react";
import Image from "next/image";

const Dropdown = ({ isArray, value, text, placeholder, options, onChangeValue }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [typedText, setTypedText] = useState('');

	const selectOption = (opt) => {
		onChangeValue(opt);
		setIsOpen(false);
	};

	return (
		<div className="flex flex-row justify-between gap-3 items-center min-w-full">
			<div className="relative w-full flex flex-col">
				{isArray ?
					(text ? (
						<>
							<div
								onClick={() => {
									setIsOpen(!isOpen);
								}}
								type="button"
								className="peer peer-active:border-2 peer-active:border-blue-500 peer-active:outline-0 
						flex flex-row items-center justify-between cursor-pointer h-12 text-left min-w-full rounded-md
					bg-white border duration-200 border-grey-100 px-6 pt-2 text-sm outline 
						outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
							>
								<input
									className="text-sm w-full h-full outline-0 outline-none capitalize"
									value={typedText}
									onChange={(e) => {
										setTypedText(e.target.value)
									}}
								/>
								<span className="flex items-center">
									{!isOpen ? (
										<Image
											src={"/svgs/downarrow.svg"}
											width={15}
											height={15}
											alt="Arrow Down"
											className=""
										/>
									) : (
										<Image
											src={"/svgs/uparrow.svg"}
											width={15}
											height={15}
											alt="Arrow Up"
											className=""
										/>
									)}
								</span>
							</div>
							<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-normal absolute left-5 top-1">
								{placeholder}
							</span>
						</>
					) : (
						<>
							<button
								onClick={() => {
									setIsOpen(!isOpen);
								}}
								type="button"
								className="peer peer-active:border-2 peer-active:border-blue-500 peer-active:outline-0 flex flex-row items-center justify-between
				cursor-pointer h-12 text-left min-w-full rounded-md bg-white border duration-200 border-grey-100 px-6 pt-2 text-sm outline 
				outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
							>
								<label className="text-sm">{value}</label>
								<span className="flex items-center">
									{!isOpen ? (
										<Image
											src={"/svgs/downarrow.svg"}
											width={15}
											height={15}
											alt="Arrow Down"
											className=""
										/>
									) : (
										<Image
											src={"/svgs/uparrow.svg"}
											width={15}
											height={15}
											alt="Arrow Up"
											className=""
										/>
									)}
								</span>
							</button>
							<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-normal absolute left-5 top-1">
								{placeholder}
							</span>
						</>
					)
					) : (
						text ? (
							<>
								<div
									onClick={() => {
										setIsOpen(!isOpen);
									}}
									type="button"
									className="peer peer-active:border-2 peer-active:border-blue-500 peer-active:outline-0 
						flex flex-row items-center justify-between cursor-pointer h-12 text-left min-w-full rounded-md
					bg-white border duration-200 border-grey-100 px-6 pt-2 text-sm outline 
						outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
								>
									<input
										className="text-sm w-full h-full outline-0 outline-none"
										value={value}
										onChange={(e) => selectOption(e.target.value)}
									/>
									<span className="flex items-center">
										{!isOpen ? (
											<Image
												src={"/svgs/downarrow.svg"}
												width={15}
												height={15}
												alt="Arrow Down"
												className=""
											/>
										) : (
											<Image
												src={"/svgs/uparrow.svg"}
												width={15}
												height={15}
												alt="Arrow Up"
												className=""
											/>
										)}
									</span>
								</div>
								<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-normal absolute left-5 top-1">
									{placeholder}
								</span>
							</>
						) : (
							<>
								<button
									onClick={() => {
										setIsOpen(!isOpen);
									}}
									type="button"
									className="peer peer-active:border-2 peer-active:border-blue-500 peer-active:outline-0 flex flex-row items-center justify-between
				cursor-pointer h-12 text-left min-w-full rounded-md bg-white border duration-200 border-grey-100 px-6 pt-2 text-sm outline 
				outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
								>
									<label className="text-sm">{value}</label>
									<span className="flex items-center">
										{!isOpen ? (
											<Image
												src={"/svgs/downarrow.svg"}
												width={15}
												height={15}
												alt="Arrow Down"
												className=""
											/>
										) : (
											<Image
												src={"/svgs/uparrow.svg"}
												width={15}
												height={15}
												alt="Arrow Up"
												className=""
											/>
										)}
									</span>
								</button>
								<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-normal absolute left-5 top-1">
									{placeholder}
								</span>
							</>
						))}

				{options.length !== 0 && isOpen && (
					<div
						onBlur={() => {
							setIsOpen(false);
						}}
						id="dropdown"
						className="peer absolute top-[3rem] flex flex-col flex-grow z-10 mt-2 max-h-60 whitespace-nowrap min-w-full overflow-y-auto scroll-smooth overflow-x-visible rounded-lg bg-white sm:text-sm border-2 border-blue-500"
					>
						{options.map(({ option }, index) => (
							<div
								key={index}
								onClick={() => selectOption(option)}
								className={
									value === option
										? "text-white bg-blue-500 rounded-md h-11 text-left relative cursor-default select-none py-2 pl-3 pr-9"
										: "text-gray-900 bg-white rounded-md hover:bg-slate-100 h-11 text-left relative cursor-default select-none py-2 pl-3 pr-9"
								}
							>
								{option}
							</div>
						))}
					</div>
				)}
			</div>

			{isArray && typedText && (
				<button
					type="button"
					className="flex items-center justify-center text-sm bg-success rounded-lg h-full p-2"
					onClick={() => {
						let newText = typedText[0].toUpperCase() + typedText.substring(1);
						selectOption(newText);
						setTypedText('');
					}}
				>
					add
				</button>
			)}
		</div>
	);
};

export default Dropdown;
