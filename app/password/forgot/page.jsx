"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useDispatch } from "react-redux";
import { updateEmail } from "@app/redux/features/auth/authSlice";

import Input from "@components/Input";
import Progress from "@components/Progress";
import axios from "axios";
import { useRouter } from "next/navigation";

const Forgot = () => {
	const [email, setEmail] = useState("");

	const router = useRouter();
	const dispatch = useDispatch();

	const changeEmail = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		dispatch(updateEmail(email));
		localStorage.setItem("podcastMail", email);
		if (email.trim() !== "") {
			await axios
				.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/password/forgot`, {
					email,
				})
				.then((res) => {
					if (res.status === 200) router.push("/password/reset");
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("Please fill all field");
		}
	};

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

				<div className="flex flex-row items-center gap-10 justify-start self-start">
					<button type="button" onClick={() => router.back()}>
						<Image
							src={"/svgs/leftarrow.svg"}
							width={10}
							height={10}
							alt="Left arrow to go back"
							className=""
						/>
					</button>
					<p className="text-primary text-base font-normal">Back</p>
				</div>

				<div className="self-start mt-5">
					<h1 className="text-primary text-3xl font-black">Forgot password?</h1>
					<p className="text-primary text-sm font-light">
						Sorry pal, no re-entry…jokes!
					</p>
				</div>

				<div className="flex self-start items-start my-10">
					<Progress numOfPosition={1} />
				</div>

				<div className="flex flex-col w-full items-center">
					<div className="flex flex-col gap-20 sm:w-125 w-full">
						<Input
							placeholder={"Email"}
							onChangeValue={changeEmail}
							value={email}
							type="email"
							required
						/>
						<button
							type="button"
							className="w-full h-14 bg-success text-primary text-lg font-extrabold rounded-lg"
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
					src="/images/reseti.png"
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

export default Forgot;
