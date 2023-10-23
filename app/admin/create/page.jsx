"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Input from "@components/Input";
import axios from "axios";

const CreateAdmin = ({ searchParams }) => {
	const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
	const [clicked, setClicked] = useState(false);

	const router = useRouter();

	const changeEmail = (e) => {
		setLoginInfo({ ...loginInfo, email: e.target.value });
	};
	const changePassword = (e) => {
		setLoginInfo({ ...loginInfo, password: e.target.value });
	};

	// Google handler function
	// const handleGoogleSignIn = async () => {
	// 	signIn("google", { callbackUrl: "/" });
	// };

	// Credentials handler function
	const handleSubmit = async (e) => {
		e.preventDefault();

		setClicked(true);

		if (loginInfo.email !== "" && loginInfo.password !== "") {
			await axios
				.post(`${process.env.NEXT_PUBLIC_BASE_URL}/admin`, {
					email: loginInfo.email,
					password: loginInfo.password,
				})
				.then((res) => {
					// console.log(res);
					if (res.status === 200) router.push("/admin");
				})
				.catch((err) => {
					if (err.response.status === 401)
						alert("Incorrect user email or password");
					console.log(err);
				});
		} else {
			alert("Please fill all field");
		}
	};

	return (
		<main className="flex min-h-screen flex-row lg:overflow-hidden">
			{/* Form part */}
			<section className="w-full h-screen bg-white flex flex-col items-center p-10">
				<div className="mb-5 lg:hidden">
					<Image
						src={"/images/tpg.png"}
						width={150}
						height={50}
						className="self-end"
						alt="Pow image"
					/>
				</div>
				<div className="self-start">
					<h1 className="text-primary text-3xl font-black">Create Admin</h1>
					<p className="text-primary text-sm font-light">
						Enter your user email and password to make account admin
					</p>
				</div>
				<div className="flex flex-col items-center gap-3 mt-5 sm:mt-3 w-full">
					<form
						onSubmit={(e) => handleSubmit(e)}
						className="w-full mt-10 flex flex-col items-center"
					>
						<div className="flex flex-col gap-5 w-full sm:w-125">
							<Input
								placeholder={"Email"}
								onChangeValue={changeEmail}
								value={loginInfo.email}
								type="email"
							/>
							<Input
								placeholder={"Password"}
								onChangeValue={changePassword}
								value={loginInfo.password}
								type="text"
								secureText
							/>

							<button
								type="submit"
								className="w-full h-14 bg-success text-primary text-lg font-extrabold rounded-lg mt-10"
							>
								{clicked ? "Creating admin..." : "login"}
							</button>
						</div>

						{/* <div className="flex flex-row gap-3 items-center w-full justify-center mt-3">
							<hr className="bg-grey-100 w-52 h-0.5 rounded-md" />
							<p className="text-grey-100 font-light text-lg">Or</p>
							<hr className="bg-grey-100 w-52 h-0.5 rounded-md" />
						</div>

						<button
							disabled
							type="button"
							// onClick={handleGoogleSignIn}
							className="flex flex-row items-center justify-center gap-3 w-full mt-3 border bg-white hover:bg-slate-100 border-grey-100 rounded-md h-12"
						>
							<span>Sign in with Google</span>
							<Image
								src={"/svgs/googleii.svg"}
								width={20}
								height={20}
								alt="Google icon"
								className=""
							/>
						</button> */}
					</form>
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
		</main>
	);
};

export default CreateAdmin;
