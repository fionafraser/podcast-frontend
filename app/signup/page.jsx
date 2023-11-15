"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { useDispatch, useSelector } from "react-redux";
import { updateEmail } from "@app/redux/features/auth/authSlice";

import Input from "@components/Input";
import Transition from "@components/Transition";
import axios from "axios";
import Social from "@components/Social";

const Signup = () => {
	const { } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [position, setPosition] = useState(1);
	const [color, setColor] = useState("pinky");
	const [formInfo, setFormInfo] = useState({
		name: "",
		email: "",
		password: "",
		confirm: "",
	});
	const [check, setCheck] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const router = useRouter();

	const changeName = (e) => {
		setFormInfo({ ...formInfo, name: e.target.value });
	};
	const changeEmail = (e) => {
		setFormInfo({ ...formInfo, email: e.target.value });
	};
	const changePassword = (e) => {
		setFormInfo({ ...formInfo, password: e.target.value });
	};
	const changeCPassword = (e) => {
		setFormInfo({ ...formInfo, confirm: e.target.value });
	};

	var num = position;

	useEffect(() => {
		setInterval(() => {
			if (num >= 3) {
				setPosition(1);
				num = 1;
			} else {
				setPosition(++num);
			}
		}, 5000);
	}, []);

	useEffect(() => {
		switch (position) {
			case 1:
				setColor("pinky");
				break;
			case 2:
				setColor("success");
				break;
			case 3:
				setColor("secondary");
				break;
			default:
				setColor("pinky");
				break;
		}
	}, [position]);

	// Google handler function
	const handleGoogleSignIn = async () => {
		signIn("google");
	};

	// Credentials handler function
	const handleSubmit = async (e) => {
		setSubmitting(true);
		e.preventDefault();

		if (
			formInfo.email !== "" &&
			formInfo.name !== "" &&
			formInfo.password !== "" &&
			formInfo.confirm !== ""
		) {
			if (formInfo.password === formInfo.confirm) {
				if (check) {
					dispatch(updateEmail(formInfo.email));
					localStorage.setItem("podcastMail", formInfo.email);
					await axios
						.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
							email: formInfo.email,
							name: formInfo.name,
							password: formInfo.password,
						})
						.then((res) => {
							if (res.status === 201) {
								router.push("/login");
							}
						})
						.catch((err) => {
							console.log(err);
							if (err.response.status === 401) {
								alert("Email already taken. Enter a unique email to continue!");
							}
						});
				} else {
					setSubmitting(false);
					alert("Please agree to our Privacy policy and Terms and conditions");
				}
			} else {
				setSubmitting(false);
				alert("Password and Confirm password not the same");
			}
		} else {
			setSubmitting(false);
			alert("Please fill all field");
		}
	};

	return (
		<main className="flex min-h-screen flex-row lg:overflow-hidden bg-signup bg-contain">
			<section className="lg:w-2/5 hidden h-screen lg:flex flex-col items-center justify-around py-6 px-20">
				<Image
					src={"/images/tpg.png"}
					width={150}
					height={70}
					className="self-end"
					alt="Pow image"
				/>

				<div>
					<Transition numOfPosition={position} />
					<Image
						src={`/images/image${position}.png`}
						width={370}
						height={365}
						className={`rounded-lg border border-b-4 border-r-4 border-${color} mt-5`}
						alt={`Image ${position}`}
					/>
				</div>

				<div className="mt-5">
					<p className="text-white font-light text-left text-xl">
						The exclusive{" "}
						<span className={`text-${color} font-bold`}>
							podcast promotion platform the
						</span>{" "}
						industry has been waiting for.
					</p>
					<p className="text-white text-xs font-light text-left">
						Never look for great guests again.
					</p>
				</div>
			</section>

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
				<div className="self-start">
					<h1 className="text-primary text-3xl font-black">Secret Sign Up</h1>
					<p className="text-primary text-sm font-light">
						Oh well hello there! Congrats on finding the secret{" "}
						<br className="hidden sm:block" />
						sign up page, you lucky thing!
					</p>
				</div>
				<div className="flex flex-col items-center justify-center gap-3 w-full self-center h-full">
					{/* <Social /> */}
					{/* <div className="flex flex-row items-center justify-center gap-3">
						<hr className="w-44 bg-grey h-0.5" />
						<p className="text-center text-sm font-light text-primary">Or</p>
						<hr className="w-44 bg-grey h-0.5" />
					</div> */}
					<form onSubmit={(e) => handleSubmit(e)} className="w-full mt-2 flex flex-col items-center">
						<div className="flex flex-col gap-3 sm:w-125 w-full">
							<Input
								placeholder={"Full Name"}
								onChangeValue={changeName}
								value={formInfo.name}
							/>
							<Input
								placeholder={"Email"}
								onChangeValue={changeEmail}
								value={formInfo.email}
							/>
							<Input
								placeholder={"Password"}
								onChangeValue={changePassword}
								value={formInfo.password}
								secureText
							/>
							<Input
								placeholder={"Confirm Password"}
								onChangeValue={changeCPassword}
								value={formInfo.confirm}
								secureText
							/>

							<div className="flex flex-row gap-3 items-center">
								<input
									type="checkbox"
									onChange={(e) => {
										setCheck(!check);
									}}
									checked={check === true}
									className="border-primary h-5 w-5"
								/>
								<label
									htmlFor="check"
									className="text-primary text-xs flex-wrap"
								>
									I agree with By continuing, you agree to our{" "}
									<span className="text-success underline">
										Terms of Service
									</span>{" "}
									and acknowledge you have read the{" "}
									<span className="text-success underline">
										Privacy Policy.
									</span>
								</label>
							</div>
							<button
								type="submit"
								className="w-full h-12 bg-success text-primary text-lg font-extrabold rounded-lg"
							>
								{!submitting ? "Sign Up" : "Signing Up..."}
							</button>

							<p className="text-grey-100 text-base text-center">
								Already have an account?{" "}
								<span className="text-success">
									<Link href={"/login"} className="">
										sign in
									</Link>
								</span>
							</p>
						</div>

						{/* <div className="flex flex-row gap-3 items-center w-full justify-center">
							<hr className="bg-grey-100 w-52 h-0.5 rounded-md" />
							<p className="text-grey-100 font-light text-lg">Or</p>
							<hr className="bg-grey-100 w-52 h-0.5 rounded-md" />
						</div>

						<button
							// disabled
							type="button"
							onClick={handleGoogleSignIn}
							className="flex flex-row items-center justify-center gap-3 w-full border bg-white hover:bg-slate-100 border-grey-100 rounded-md h-12"
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

				<div className="text-primary lg:fixed bottom-3 self-center">
					<div className="flex flex-row items-center gap-3 w-full">
						<Link href={"#"} className="">
							<p className="">Terms and Conditions</p>
						</Link>
						<p className="text-2xl font-semibold text-success">|</p>
						<Link href={"#"} className="">
							<p className="">Privacy Policy</p>
						</Link>
					</div>
					<p className="flex justify-center text-center items-center w-full">&copy; POW PR LTD</p>
				</div>
			</section>
		</main>
	);
};

export default Signup;
