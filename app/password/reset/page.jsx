"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useSelector } from "react-redux";

import Progress from "@components/Progress";

const Reset = () => {
	const { email } = useSelector((state) => state.auth);
	const router = useRouter();

	const firstInput = useRef();
	const secondInput = useRef();
	const thirdInput = useRef();
	const fourthInput = useRef();
	const fifthInput = useRef();

	const [mail, setMail] = useState();
	const [otp, setOtp] = useState({
		first: "",
		second: "",
		third: "",
		fourth: "",
		fifth: "",
	});

	const [counting, setCounting] = useState(true);
	const [num, setNum] = useState(59);

	useEffect(() => {
		const counter = () => {
			let number = num;

			if (counting) {
				const interval = setInterval(() => {
					if (number <= 0) {
						setCounting(false);
						setNum(59);
						clearInterval(interval);
					}
					setNum(--number);
				}, 1000);
			}
		};
		counter();
	}, [counting]);

	useEffect(() => {
		const email = localStorage.getItem("podcastMail");
		setMail(email);
	}, []);

	const handleResend = async () => {
		setCounting(true);
		setNum(59);

		let mail = localStorage.getItem("podcastMail");
		await axios
			.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/password/forgot`, {
				email: mail,
			})
			.then((res) => {
				// console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleSubmit = async (e) => {
		const code = otp.first + otp.second + otp.third + otp.fourth + otp.fifth;

		if (code.length === 5) {
			await axios
				.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/password/reset`, {
					email,
					code,
				})
				.then((res) => {
					// console.log(res);
					if (res.status === 200) router.push("/password/create");
				})
				.catch((err) => {
					alert("Invalid reset code!");
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
					<Link href={"/password/forgot"} className="">
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

				<div className="self-start mt-5">
					<h1 className="text-primary text-3xl font-black">Reset password?</h1>
					<p className="text-primary text-sm font-light">
						We sent your a code to{" "}
						<span className="text-success font-semibold">
							{email ? email : mail}
						</span>
					</p>
				</div>

				<div className="flex self-start items-start my-10">
					<Progress numOfPosition={2} />
				</div>

				<div className="flex flex-col w-full items-center">
					<div className="flex flex-col gap-20 sm:w-125 w-full">
						<div className="flex flex-row gap-3 items-center justify-around">
							<input
								type="text"
								placeholder="-"
								value={otp.first}
								maxLength={1}
								required
								ref={firstInput}
								onChange={(e) => {
									setOtp({ ...otp, first: e.target.value });
									e.target.value && secondInput.current.focus();
								}}
								className="h-10 sm:h-14 w-10 sm:w-14 border-2 border-grey-100 focus:border-blue-500 placeholder:text-2xl placeholder:text-center text-center text-xl font-bold text-primary rounded-xl flex items-center justify-center"
							/>
							<input
								type="text"
								placeholder="-"
								value={otp.second}
								maxLength={1}
								required
								ref={secondInput}
								onChange={(e) => {
									setOtp({ ...otp, second: e.target.value });
									e.target.value
										? thirdInput.current.focus()
										: firstInput.current.focus();
								}}
								className="h-10 sm:h-14 w-10 sm:w-14 border-2 border-grey-100 focus:border-blue-500 placeholder:text-2xl placeholder:text-center text-center text-xl font-bold text-primary rounded-xl flex items-center justify-center"
							/>
							<input
								type="text"
								placeholder="-"
								value={otp.third}
								maxLength={1}
								required
								ref={thirdInput}
								onChange={(e) => {
									setOtp({ ...otp, third: e.target.value });
									e.target.value
										? fourthInput.current.focus()
										: secondInput.current.focus();
								}}
								className="h-10 sm:h-14 w-10 sm:w-14 border-2 border-grey-100 focus:border-blue-500 placeholder:text-2xl placeholder:text-center text-center text-xl font-bold text-primary rounded-xl flex items-center justify-center"
							/>
							<input
								type="text"
								placeholder="-"
								value={otp.fourth}
								maxLength={1}
								required
								ref={fourthInput}
								onChange={(e) => {
									setOtp({ ...otp, fourth: e.target.value });
									e.target.value
										? fifthInput.current.focus()
										: thirdInput.current.focus();
								}}
								className="h-10 sm:h-14 w-10 sm:w-14 border-2 border-grey-100 focus:border-blue-500 placeholder:text-2xl placeholder:text-center text-center text-xl font-bold text-primary rounded-xl flex items-center justify-center"
							/>
							<input
								type="text"
								placeholder="-"
								value={otp.fifth}
								maxLength={1}
								required
								ref={fifthInput}
								onChange={(e) => {
									setOtp({ ...otp, fifth: e.target.value });
									!e.target.value && fourthInput.current.focus();
								}}
								className="h-10 sm:h-14 w-10 sm:w-14 border-2 border-grey-100 focus:border-blue-500 placeholder:text-2xl placeholder:text-center text-center text-xl font-bold text-primary rounded-xl flex items-center justify-center"
							/>
						</div>

						<div className="">
							<button
								type="button"
								className="w-full h-14 bg-success text-primary text-lg font-extrabold rounded-lg"
								onClick={(e) => handleSubmit(e)}
							>
								Continue
							</button>

							<p className="text-grey-100 text-base text-center mt-5">
								Didn't receive email?{" "}
								<span className="text-success">
									<button type="button" onClick={handleResend} className="">
										{counting
											? `00 : ${num < 10 ? "0" + num : num}`
											: "Click to resend"}
									</button>
								</span>
							</p>
						</div>
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
					src="/images/resetii.png"
					width={370}
					height={365}
					alt="Woman speaking to microphone"
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

export default Reset;
