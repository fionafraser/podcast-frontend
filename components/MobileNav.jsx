"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsMic } from "react-icons/bs";

const MobileNav = ({ handleClick, navRef }) => {
	const pathname = usePathname();
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

	return (
		<section
			ref={navRef}
			onClick={() => { }}
			className="w-1/2 sm:w-2/6 fixed top-0 min-h-screen lg:hidden flex-grow bg-primary z-30"
		>
			{/* <section className="w-1/6 h-full bg-primary"> */}
			<nav className="w-full sticky top-0 flex flex-col pt-5 px-3 items-center">
				<Link href={"#"} className="flex items-center justify-center">
					<div className="">
						<Image
							src={"/images/tpg.png"}
							width={143.32}
							height={60.29}
							alt="Pow image"
							className=""
						/>
					</div>
				</Link>
				{/* <button
					type="button"
					className="text-white text-center bg-success w-full flex flex-row items-center justify-center gap-3 p-2 rounded-sm mt-2"
				>
					<Image
						src={"/svgs/plus.svg"}
						width={15}
						height={15}
						alt="Plus icon"
					/>
					Create list
				</button> */}

				<div className="w-full mt-8">
					<Link
						href={"/"}
						className={
							pathname !== "/"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<Image
							src={"/svgs/podcaster.svg"}
							width={15}
							height={15}
							alt="Podcaster icon"
						/>
						<p className="text-white text-center">Home</p>
					</Link>
					<Link
						href={"/profile"}
						className={
							pathname !== "/profile"
								? "flex flex-row p-2 -ml-1 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 -ml-1 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<AiOutlineUser size={20} color="#00CCBB" />
						<p className="text-white text-center">Profile</p>
					</Link>
					<hr className="mt-2" />
				</div>

				<div className="w-full mt-4">
					<p className="text-white text-left uppercase text-sm font-normal">
						MENU
					</p>
					<Link
						href={"/find-podcast"}
						className={
							pathname !== "/find-podcast"
								? "flex flex-row p-2 -ml-0.5 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 -ml-0.5 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<BsMic size={25} color="#00CCBB" />
						<p className="text-white text-center">Find podcast</p>
					</Link>
					<Link
						href={"/find-guests"}
						className={
							pathname !== "/find-guests"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<Image
							src={"/svgs/person.svg"}
							width={15}
							height={15}
							alt="Person icon"
						/>
						<p className="text-white text-center">Find guests</p>
					</Link>
					<hr className="mt-2" />
				</div>

				<div className="w-full mt-4">
					<p className="text-white text-left uppercase text-sm font-normal">
						LIBRARY
					</p>
					<Link
						href={"/favorites"}
						className={
							pathname !== "/favorites"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<Image
							src={"/svgs/favorite.svg"}
							width={15}
							height={15}
							alt="favorite icon"
						/>
						<p className="text-white text-center">Favorites</p>
					</Link>
					<Link
						href={"/recent"}
						className={
							pathname !== "/recent"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<Image
							src={"/svgs/recent.svg"}
							width={15}
							height={15}
							alt="Recent icon"
						/>
						<p className="text-white text-center">Recents</p>
					</Link>
					<hr className="mt-2" />
				</div>

				<div className="w-full mt-4">
					<button
						onClick={() => {
							// setToggleDropdown(false);
							logOut();
						}}
						className="w-full flex flex-row p-2 gap-5 items-center justify-start rounded text-white hover:bg-white hover:bg-opacity-10"
					>
						<BiLogOut size={20} color="#00CCBB" />
						<p className="text-white text-center">Log Out</p>
					</button>
				</div>

				{/* <div className="w-full mt-6">
					<div className="w-full rounded-lg flex flex-row bg-pinky p-3">
						<div className="flex flex-col">
							<p className="text-primary text-left">
								Join the facebook community
							</p>
							<Link
								href={"#"}
								className="rounded-md w-fit h-fit p-1 bg-primary"
							>
								<p className="text-white text-center">Join now</p>
							</Link>
						</div>
						<div className="flex flex-col justify-end">
							<h1 className="text-primary font-extrabold text-7xl">f</h1>
						</div>
					</div>
				</div> */}
			</nav>
		</section>
	);
};

export default MobileNav;
