"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { FiSettings } from "react-icons/fi";
import { IoReturnDownBackOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { BsPersonFillAdd } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

const AdminNav = ({ mobile, isOpen, setIsOpen }) => {
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
		<section className="w-56 h-screen absolute lg:sticky top-0 bg-primary">
			<nav className="sticky top-0 w-full p-5">
				{mobile && (
					<button onClick={() => { setIsOpen(!isOpen) }} title="Home" className="self-end flex justify-end w-full">
						<RxCross2 color="#00CCBB" size={25} />
					</button>
				)}

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

				<div className="w-full mt-8 flex flex-col gap-3">
					<Link
						href={"/admin"}
						className={
							pathname !== "/admin"
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
						href={"/admin/create-user"}
						className={
							pathname !== "/admin/create-user"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<BsPersonFillAdd size={20} color="#00CCBB" />
						<p className="text-white text-center">Create user</p>
					</Link>
					<Link
						href={"/"}
						className={
							pathname !== "/"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<IoReturnDownBackOutline size={20} color="#00CCBB" />
						<p className="text-white text-center">Leave Admin</p>
					</Link>
					<hr className="mt-2" />

					{/* <Link
						href={"/admin/settings"}
						className={
							pathname !== "/admin/settings"
								? "flex flex-row p-2 gap-5 items-center justify-start rounded hover:bg-white hover:text-white hover:bg-opacity-10"
								: "flex flex-row p-2 gap-5 items-center justify-start rounded bg-white text-white bg-opacity-10"
						}
					>
						<FiSettings size={20} color="#00CCBB" />
						<p className="text-white text-center">Settings</p>
					</Link>
					<hr className="mt-2" /> */}

					<div className="w-full mt-12">
						<button
							onClick={() => {
								// setToggleDropdown(false);
								logOut();
							}}
							className="w-full flex flex-row p-2 gap-5 items-center justify-start rounded text-white hover:bg-white hover:bg-opacity-10"
						>
							<BiLogOut size={20} color="#00CCBB" />
							<p className="text-white text-center">Sign Out</p>
						</button>
					</div>
				</div>
			</nav>
		</section>
	);
};

export default AdminNav;
