"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Filter from "@components/Filter";
import Podcasts from "@components/Podcasts";
import Dropdown from "@components/Dropdown";

import { dropdown_options, podcastList } from "@utils/data";

const Settings = () => {
	const [category, setCategory] = useState("");
	const [location, setLocation] = useState("");
	const [value, setValue] = useState("");

	const handleScroll = (event) => {
		const container = event.target;
		const scrollAmount = event.deltaY;
		container.scrollTo({
			top: 0,
			left: container.scrollLeft + scrollAmount,
			behavior: "smooth",
		});
	};

	return (
		<>
			<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
				<div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
					<Link href={"/"} className="">
						<div>
							<Image
								src={"/svgs/leftarrow.svg"}
								width={10}
								height={10}
								alt="Left arrow to go back"
								className=""
							/>
						</div>
					</Link>
					<p className="text-primary text-base font-normal">Back</p>
				</div>

				
			</div>
		</>
	);
};

export default Settings;
