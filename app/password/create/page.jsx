"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import Input from "@components/Input";
import Progress from "@components/Progress";

const Create = () => {
	const [password, setPassword] = useState("");
	const [cPassword, setCPassword] = useState("");
	const router = useRouter();

	const changePassword = (e) => {
		setPassword(e.target.value);
	};
	const changeCPassword = (e) => {
		setCPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		const id = localStorage.getItem("podcastId");

		if (password === cPassword) {
			await axios
				.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/password/create`, {
					id,
					password,
				})
				.then((res) => {
					console.log(res);
					if (res.status === 200) router.push("/password/completed");
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("Password and confirm password field");
		}
	};

	// $2b$10$p3X8C08.l08Gt0ajstM.ket2fcuHQZOUkvfP5DU4hnOeqF1MiVdSe

	return (
		<main className="flex min-h-screen flex-row lg:overflow-hidden bg-password bg-right bg-contain">
			{/* Form part */}
			<section className="lg:w-3/5 w-full h-screen bg-white flex flex-col items-center p-10">
				<div className="mb-5 lg:hidden">
					<Image
						src={"/images/tpg.png"}
						width={150}
						height={50}
						className="self-end"
						alt="Pow image"
					/>
				</div>

				<div className="self-start mt-5">
					<h1 className="text-primary text-3xl font-black">
						Create new password
					</h1>
					<p className="text-primary text-sm font-light">
						Set up your new password below, Must be at least 8 characters and
						must be different from the previous password.
					</p>
				</div>

				<div className="flex self-start items-start my-10">
					<Progress numOfPosition={3} />
				</div>

				<div className="flex flex-col w-full items-center">
					<div className="flex flex-col gap-5 sm:w-125 w-full">
						<Input
							placeholder={"Password"}
							onChangeValue={changePassword}
							value={password}
							required
							secureText
						/>
						<Input
							placeholder={"Confirm Password"}
							onChangeValue={changeCPassword}
							value={cPassword}
							required
							secureText
						/>
						<button
							type="button"
							className="w-full h-14 bg-success text-primary text-lg font-extrabold rounded-lg mt-5"
							onClick={(e) => handleSubmit(e)}
						>
							Reset Password
						</button>
					</div>
				</div>

				<div className="flex flex-row items-center gap-3 text-primary fixed bottom-3">
					<Link href={"#"} className="">
						<p className="">Terms and Conditions</p>
					</Link>
					<p className="text-2xl font-semibold text-success">|</p>
					<Link href={"#"} className="">
						<p className="">Privacy Policy</p>
					</Link>
				</div>
			</section>

			{/* Image part */}
			<section className="lg:w-2/5 h-screen hidden lg:flex flex-col items-center justify-around py-6 px-20">
				<Image
					src={"/images/tpg.png"}
					width={150}
					height={70}
					alt="Pow image"
					className=""
				/>
				<Image
					src="/images/resetiii.png"
					width={370}
					height={365}
					alt="Man speaking to microphone"
					className="rounded-lg mt-5"
				/>

				<div className="mt-5">
					<p className="text-white font-light text-left text-xl">
						The exclusive{" "}
						<span className="text-pinky font-bold">
							podcast guest matching service
						</span>{" "}
						you've been waiting for.
					</p>
					<p className="text-white font-light text-left">
						Never look for great guests again.
					</p>
				</div>
			</section>
		</main>
	);
};

export default Create;
