"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

import axios from "axios";

import { updateToken } from "@app/redux/features/auth/authSlice";

const Verified = ({ }) => {
	// const { id, token } = searchParams;
	const dispatch = useDispatch();
	const router = useRouter();
	const searchParams = useSearchParams();

	const id = searchParams.get("id");
	const token = searchParams.get("token");

	const paymentButton = useRef()

	const [stat, setStat] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		const verifyMail = async () => {
			await axios
				.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-mail`, {
					id,
					token,
				})
				.then((res) => {
					if (res.status === 200) {
						dispatch(updateToken(res.data.accessToken));
						localStorage.setItem("podcastToken", res.data.accessToken);
						setStat(true);
					}
				})
				.catch((err) => {
					setError(true);
					console.log(err);
				});
		};

		verifyMail();
	}, []);

	const handleMakePayment = async (data) => {
		await axios
			.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/payment`, { id, verified: false })
			.then((res) => {
				// console.log(res)
				window.location.href = res.data
			})
			.catch((err) => console.log(err));
	};

	// useEffect(() => {
	// 	const reDirect = async () => {
	// 		if (stat) {
	// 			setTimeout(() => {
	// 				paymentButton.current.click();
	// 			}, 2000);
	// 		}
	// 	};

	// 	reDirect();
	// }, [stat]);

	return (
		<main className="flex min-h-screen bg-verified bg-center bg-contain flex-col justify-around">
			<section className="w-full flex flex-col items-center justify-center gap-10">
				<Image
					src={"/images/tpg.png"}
					width={213}
					height={90}
					className="fixed top-10"
					alt="Pow image"
				/>
				<div className="text-white text-center flex flex-col items-center gap-5">
					<Image
						src={"/svgs/verified.svg"}
						width={200}
						height={200}
						className=""
						alt="Verified image"
					/>
					<h1 className="text-success text-center font-bold text-4xl">
						{error ? "Invalid Link" : stat ? "Verified" : "Verifying"}
					</h1>
				</div>
				<button type="button"
					className="w-1/3 bg-success text-primary text-sm font-semibold text-center py-2 rounded-lg"
					onClick={handleMakePayment}
				>
					Continue to Payment
				</button>
			</section>

			<section className="fixed bottom-10 w-full">
				<div className="flex flex-col lg:flex-row justify-between items-center px-10 w-full">
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
				</div>
			</section>

		</main>
	);
};

export default Verified;
