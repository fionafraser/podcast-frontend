import React from "react";
import Image from "next/image";
import Link from "next/link";

const Saved = ({ image, date, title, podcaster, length, link }) => {
	return (
		<Link href={link} className="">
			<div className="w-full border-t-2 border-black border-opacity-5 flex flex-row justify-between items-center mt-5 p-5">
				<div className="flex flex-row gap-5">
					<Image
						src={image}
						width={120}
						height={150}
						alt="Podcast Image"
						className="object-contain rounded-lg"
					/>
					<div className="flex flex-col justify-start items-start">
						<p className="text-grey-100 text-sm text-left">{date}</p>
						<h1 className="text-primary text-xl text-left font-semibold capitalize">
							{title}
						</h1>
						<p className="text-primary text-left capitalize">{podcaster}</p>
						<div className="flex flex-row gap-1 justify-center items-center mt-3 text-primary">
							<Image
								src={"/svgs/clock.svg"}
								width={15}
								height={15}
								alt="clock icon"
								className="text-primary"
							/>
							<p className="self-end text">{length}</p>
						</div>
					</div>
				</div>

				<div className="flex flex-row items-center gap-2">
					<button
						type="button"
						className="h-10 w-10 rounded-full hover:bg-grey-200 flex items-center justify-center"
						onClick={() => {}}
					>
						<Image
							src={"/svgs/saved.svg"}
							width={17}
							height={17}
							alt="Save icon"
							className=""
						/>
					</button>
					<button
						type="button"
						className="h-10 w-10 rounded-full hover:bg-grey-200 flex items-center justify-center"
						onClick={() => {}}
					>
						<Image
							src={"/svgs/download.svg"}
							width={17}
							height={17}
							alt="Download icon"
							className=""
						/>
					</button>
				</div>
			</div>
		</Link>
	);
};

export default Saved;
