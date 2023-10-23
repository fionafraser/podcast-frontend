"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateSearch } from "@app/redux/features/search/searchSlice";

import { FiMenu } from "react-icons/fi";

const Topbar = ({ handleClick, componentRef, refreshRef }) => {
	const { searched } = useSelector((state) => state.search);
	const [user, setUser] = useState({ name: "", image: "" });
	const [toggleDropdown, setToggleDropdown] = useState(false);

	const dispatch = useDispatch();

	const router = useRouter();

	const logOut = async () => {
		localStorage.removeItem("podcastMail");
		localStorage.removeItem("podcastId");
		localStorage.removeItem("podcastToken");

		await axios
			.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`)
			.then((res) => {
				if (res.status === 204) router.push("/login");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		const getUserDetails = async () => {
			const token = localStorage.getItem("podcastToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config)
				.then((res) => {
					setUser({ name: res.data.user.name, image: res.data.user.image });
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, [refreshRef.currrent]);

	return (
		<div className="sticky top-0 flex flex-row w-full bg-white p-5 justify-between z-50">
			<div className="flex flex-row gap-2 w-full items-center">
				<button
					type="button"
					onClick={handleClick}
					ref={componentRef}
					className="flex lg:hidden"
				>
					<FiMenu size={30} />
				</button>
				<label className="bg-grey p-1.5 px-2 rounded-md flex flex-row items-center w-full lg:w-[563px] outline-0 focus:outline-0">
					<input
						type="text"
						name="search"
						id="search"
						value={searched}
						onChange={(e) => {
							dispatch(updateSearch(e.target.value));
						}}
						placeholder="search"
						className="bg-grey w-full outline-0 focus:outline-0"
					/>
					{/* <button
						type="button"
						className="bg-lightgreen p-1.5 rounded-md"
						onClick={() => {}}
					>
						<Image
							src={"/svgs/search.svg"}
							width={15}
							height={15}
							alt="Search icon"
						/>
					</button> */}
				</label>
			</div>

			<div className="flex flex-row gap-5 items-center w-2/5 sm:w-full justify-end mr-5">
				<p className="text-primary font-bold capitalize hidden sm:block text-right">
					<span className="text-black">Hello!</span> {user?.name}
				</p>
				{/* <Link href={"/profile"}> */}
				<div className="relative cursor-default">
					<div
						className="rounded-full h-10 w-10"
						onClick={() => setToggleDropdown((prev) => !prev)}
					>
						{user?.image === "" ? (
							<div className="rounded-full bg-green-500 text-primary uppercase h-10 w-10 font-bold flex items-center justify-center">
								{user.name.charAt(0)}
							</div>
						) : (
							<div className="relative h-10 w-10 flex items-center justify-center">
								<Image
									src={user?.image}
									id="img"
									alt="image"
									fill
									className="rounded-full h-10 w-10 flex items-center justify-center"
								/>
							</div>
						)}
					</div>
					{/* {toggleDropdown && (
						<div
							ref={optiion}
							className="absolute right-0 top-full mt-2 w-40 p-5 rounded-lg bg-white shadow shadow-black min-w-[210px] flex flex-col gap-2 justify-end items-end"
						>
							<Link
								href={"/profile"}
								className="text-sm text-primary hover:text-white hover:bg-blue-500 font-medium w-full p-1 pr-3 rounded-xl text-right"
								onClick={() => setToggleDropdown(false)}
							>
								My Profile
							</Link>
							<Link
								href={"/notification"}
								className="text-sm text-primary hover:text-white hover:bg-blue-500 font-medium w-full p-1 pr-3 rounded-xl text-right"
								onClick={() => setToggleDropdown(false)}
							>
								My Notification
							</Link>
							<Link
								href={"#"}
								className="text-sm text-primary hover:text-white hover:bg-blue-500 font-medium w-full p-1 pr-3 rounded-xl text-right"
								onClick={() => setToggleDropdown(false)}
							>
								My Settings
							</Link>
							<button
								type="button"
								onClick={() => {
									setToggleDropdown(false);
									logOut();
								}}
								className="mt-3 w-full rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm flex items-center justify-center"
							>
								Sign Out
							</button>
						</div>
					)} */}
				</div>
				{/* </Link> */}
			</div>
		</div>
	);
};

export default Topbar;
