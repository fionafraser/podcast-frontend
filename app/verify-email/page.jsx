"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const Verifyemail = () => {
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

	const handleResend = async () => {
		setCounting(true);
		setNum(59);

		let mail = localStorage.getItem("podcastMail");
		await axios
			.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/resend-mail`, {
				email: mail,
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<main className="flex min-h-screen bg-verified bg-center bg-contain bg-full flex-col justify-around">
			<section className="w-full flex flex-col items-center justify-center gap-10">
				<Image
					src={"/images/tpg.png"}
					width={213}
					height={90}
					className=""
					alt="Pow image"
				/>
				<div className="text-white text-center flex flex-col items-center gap-5 w-full">
					<h1 className="text-2xl font-bold">Create your account</h1>
					<div className="flex flex-col items-center bg-white bg-opacity-10 w-5/6 sm:w-106 h-80 p-10 rounded-lg">
						<Image
							src={"/svgs/mail.svg"}
							width={60}
							height={40}
							className=""
							alt="mail svg"
						/>
						<h1 className="text-2xl font-bold">Verify your email</h1>
						<p className="">
							We've sent you an mail to verify your email address and finish
							creating your account.
						</p>
						<h1 className="text-lg font-bold mt-14">Email not recieved</h1>
						<button
							type="button"
							onClick={handleResend}
							className={counting ? "text-success" : "underline text-success"}
						>
							{counting ? `00 : ${num < 10 ? "0" + num : num}` : "Resend Email"}
						</button>
					</div>
				</div>
			</section>

			<section className="flex flex-col lg:flex-row justify-between items-center px-10">
				<p className="text-white text-center sm:text-left">
					Copyright©thepodcastexpert.co.uk 2023. All rights reserved.
				</p>
				<div className="flex flex-row items-center justify-between gap-3 text-white">
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

export default Verifyemail;
