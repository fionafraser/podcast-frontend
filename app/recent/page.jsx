"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Featured from "@components/Featured";
import Loader from "@components/Loader";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Recent() {
	const [id, setId] = useState([]);
	const [recent, setRecent] = useState([]);
	const [favorite, setFavorite] = useState([]);
	const [isLoaded, setIsLoaded] = useState(true);

	const pathname = usePathname()

	useEffect(() => {
		const token =
			localStorage.getItem("podcastToken") === undefined ||
				localStorage.getItem("podcastToken") === null
				? ""
				: localStorage.getItem("podcastToken");
		const mail =
			localStorage.getItem("podcastMail") === undefined ||
				localStorage.getItem("podcastMail") === null
				? ""
				: localStorage.getItem("podcastMail");
		const id =
			localStorage.getItem("podcastId") === undefined ||
				localStorage.getItem("podcastId") === null
				? ""
				: localStorage.getItem("podcastId");

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const handleMakePayment = async (data) => {
			await axios
				.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/payment`, { id, verified: false })
				.then((res) => {
					window.location.href = res.data
				})
				.catch((err) => console.log(err));
		};

		const checks = async () => {
			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config)
				.then((res) => {
					if (
						res.data?.user?.paid !== true &&
						pathname !== "/login" &&
						pathname !== "/signup" &&
						pathname !== "/verify-email" &&
						pathname !== "/verified" &&
						pathname !== "/payment" &&
						pathname !== "/admin" &&
						pathname !== "/admin/details" &&
						pathname !== "/admin/create" &&
						pathname !== "/password/completed" &&
						pathname !== "/password/create" &&
						pathname !== "/password/forgot" &&
						pathname !== "/password/reset" &&
						pathname !== "/create-guest" &&
						pathname !== "/create-guest/step-two" &&
						pathname !== "/create-podcaster" &&
						pathname !== "/create-podcaster/step-two"
					) {

						handleMakePayment()
					}
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setIsLoaded(false));
		};

		checks();
	}, []);

	useEffect(() => {
		const getRecents = async () => {
			const token = localStorage.getItem("podcastToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile/recents`, config)
				.then((res) => {
					// console.log(res.data);
					setRecent(res.data);
				})
				.catch((err) => console.log(err));
		};

		getRecents();
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
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
					config
				)
				.then((res) => {
					console.log(res.data.user.saved_list);
					setFavorite(res.data.user.saved_list);
				})
				.catch((err) => console.log(err))
				.finally(() => { setIsLoaded(false); });
		};

		getUserDetails();
	}, []);

	if (isLoaded) {
		return <Loader template={true} numOfTemplate={20} />
	}

	return (
		<div className="flex flex-col h-full w-full p-3">
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

			<div className="bg-grey w-full h-full p-3 flex flex-col gap-7">
				<p className="text-primary text-5xl font-black">Recents</p>
				{recent.length > 0 ? (
					<div className="grid grid-cols-2 sm:grid-cols-3 min-[1120px]:grid-cols-4 gap-5">
						{recent.map(({ image, name, _id, profile_type }, index) => (
							<div key={index} className="h-80 w-full">
								<Featured
									key={index}
									image={image}
									name={name}
									type={profile_type}
									id={_id}
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
	);
}
