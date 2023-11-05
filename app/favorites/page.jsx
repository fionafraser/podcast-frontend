"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Featured from "@components/Featured";
import axios from "axios";
import Podcasts from "@components/Podcasts";
import Loader from "@components/Loader";

const Favorites = () => {
	const [id, setId] = useState();
	const [data, setData] = useState([]);
	const [favorite, setFavorite] = useState([]);
	const [isLoaded, setIsLoaded] = useState(true);


	useEffect(() => {
		setId(localStorage.getItem("podcastId"));
		const token =
			localStorage.getItem("podcastToken") === undefined ||
				localStorage.getItem("podcastToken") === null
				? ""
				: localStorage.getItem("podcastToken");

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const getUserDetails = async () => {
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config
				)
				.then((res) => {
					setFavorite(res.data.user.saved_list);
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);

	useEffect(() => {
		setId(localStorage.getItem("podcastId"));
		const getUserDetails = async () => {
			setId(localStorage.getItem("podcastId"));
			const token = localStorage.getItem("podcastToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/favorites`,
					config
				)
				.then((res) => {
					setData(res.data);
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setIsLoaded(false);
				});
		};

		getUserDetails();
	}, []);

	if (isLoaded) {
		return <Loader template={true} numOfTemplate={20} />
	}

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

				<div className="h-full">
					<p className="text-primary text-5xl font-black">Favourites</p>
					{data.length > 0 ? (
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 relative">
							{data.map(({ image, name, email, _id, profile_type }, index) => (
								<div key={index} className="h-80 w-full">
									<Featured
										key={index}
										image={image}
										name={name}
										type={profile_type}
										id={_id}
										handleClick={() => { }}
										favorite={favorite}
									/>
								</div>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center w-full h-full gap-4 ">
							<Image
								src={"/images/cloud.png"}
								width={225}
								height={225}
								className=""
								alt="No data image"
							/>
							<p className="text-center text-primary font-semibold text-lg">
								No data found
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Favorites;
