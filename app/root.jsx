"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Topbar from "@components/Topbar";
import Loader from "@components/Loader";
import MobileNav from "@components/MobileNav";

export default function Root({ children }) {
	const pathname = usePathname();
	const router = useRouter();

	const navbarRef = useRef(null);
	const menuRef = useRef(null);
	const childrenRef = useRef(null);
	const paymentButton = useRef(null)

	const [user, setUser] = useState({ name: "", image: "" });
	const [isLoaded, setIsLoaded] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const token =
			localStorage.getItem("podcastToken") === undefined ||
				localStorage.getItem("podcastToken") === null
				? ""
				: localStorage.getItem("podcastToken");
		const mail =
			localStorage.getItem("podcastMail") === undefined ||
				localStorage.getItem("podcastMail") === null
				? ""
				: localStorage.getItem("podcastMail");
		const id =
			localStorage.getItem("podcastId") === undefined ||
				localStorage.getItem("podcastId") === null
				? ""
				: localStorage.getItem("podcastId");

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const handleMakePayment = async (data) => {
			await axios
				.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/payment`, { id, verified: false })
				.then((res) => {
					window.location.href = res.data
				})
				.catch((err) => console.log(err));
		};

		const checks = async () => {
			 axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config)
				.then((res) => {
					if (
						res.data.user.email_verified !== true &&
						pathname !== "/login" &&
						pathname !== "/signup" &&
						pathname !== "/verify-email" &&
						pathname !== "/verified" &&
						pathname !== "/create-profile" &&
						pathname !== "/password/completed" &&
						pathname !== "/password/create" &&
						pathname !== "/password/forgot" &&
						pathname !== "/password/reset"
					) {
						router.push(`/verify-email`);
					} else if (
						res.data?.user?.paid !== true 
						&&
						pathname !== "/login" &&
						pathname !== "/signup" &&
						pathname !== "/verify-email" &&
						pathname !== "/verified" &&
						pathname !== "/payment" &&
						pathname !== "/admin" &&
						pathname !== "/admin/details" &&
						pathname !== "/admin/create" &&
						pathname !== "/admin/create-user" &&
						pathname !== "/admin/featured" &&
						pathname !== "/password/completed" &&
						pathname !== "/password/create" &&
						pathname !== "/password/forgot" &&
						pathname !== "/password/reset" &&
						pathname !== "/create-guest" &&
						pathname !== "/create-guest/step-two" &&
						pathname !== "/create-podcaster" &&
						pathname !== "/create-podcaster/step-two"
					) {

						handleMakePayment()
					} else if (
						res.data.user.createdProfile !== true &&
						pathname !== "/login" &&
						pathname !== "/signup" &&
						pathname !== "/verify-email" &&
						pathname !== "/verified" &&
						pathname !== "/create-profile" &&
						pathname !== "/password/completed" &&
						pathname !== "/password/create" &&
						pathname !== "/password/forgot" &&
						pathname !== "/password/reset" &&
						pathname !== "/create-guest" &&
						pathname !== "/create-guest/step-two" &&
						pathname !== "/create-podcaster" &&
						pathname !== "/create-podcaster/step-two"
					) {
						router.push(`/create-profile`);
					}
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setIsLoaded(false));
		};

		const checkUserExists = async () => {
			if (
				token === "" &&
				mail === "" && id === "" &&
				pathname !== "/login" &&
				pathname !== "/signup" &&
				pathname !== "/verify-email" &&
				pathname !== "/verified" &&
				pathname !== "/password/completed" &&
				pathname !== "/password/create" &&
				pathname !== "/password/forgot" &&
				pathname !== "/password/reset"
			) {
				setIsLoaded(false);
				return router.push(`/login?return=${pathname}`);
			}
			if (
				pathname !== "/login" &&
				pathname !== "/signup" &&
				pathname !== "/verify-email" &&
				pathname !== "/verified" &&
				pathname !== "/password/completed" &&
				pathname !== "/password/create" &&
				pathname !== "/password/forgot" &&
				pathname !== "/password/reset"
			) {
				await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/exists/${mail}`)
					.then((res) => {
						// console.log("checks: ", res)
						if (res.data.exists === true) {
							checks()
						} else {
							setIsLoaded(false);
							localStorage.removeItem("podcastMail");
							localStorage.removeItem("podcastId");
							localStorage.removeItem("podcastToken");
							return router.push(`/signup`);
						}
					})
					.catch((err) => { console.log(err?.message) })
					.finally(() => setIsLoaded(false));
			}
			setIsLoaded(false)
		}

		checkUserExists();
	}, []);

	const handleClickOutsideComponent = (event) => {
		if (
			isOpen &&
			!navbarRef.current?.contains(event.target) &&
			!menuRef.current?.contains(event.target)
		) {
			setIsOpen(false);
		}
	};

	if (typeof window !== "undefined") {
		// browser code
		window.addEventListener("click", handleClickOutsideComponent);
	}

	if (isLoaded) {
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<Loader template={false} numOfTemplate={16} />
			</div>
		)
	}

	return (
		<>
			{pathname !== "/login" &&
				pathname !== "/signup" &&
				pathname !== "/verify-email" &&
				pathname !== "/verified" &&
				pathname !== "/payment" &&
				pathname !== "/create-profile" &&
				pathname !== "/password/completed" &&
				pathname !== "/password/create" &&
				pathname !== "/password/forgot" &&
				pathname !== "/password/reset" &&
				pathname !== "/create-guest" &&
				pathname !== "/create-guest/edit" &&
				pathname !== "/create-guest/step-two" &&
				pathname !== "/create-podcaster" &&
				pathname !== "/create-podcaster/edit" &&
				pathname !== "/create-podcaster/step-two" &&
				pathname !== "/create-press" &&
				pathname !== "/create-press/edit" &&
				pathname !== "/admin" &&
				pathname !== "/admin/create-user" &&
				pathname !== "/admin/featured" &&
				pathname !== "/admin/create" &&
				pathname !== "/admin/details" ? (
				<main className="bg-grey h-screen w-screen">
					<section className="flex flex-row w-full h-full">
						<Nav />
						{/*   */}

						<section className="w-full h-full relative overflow-x-hidden">
							<Topbar
								refreshRef={childrenRef}
								componentRef={menuRef}
								handleClick={() => {
									setIsOpen(!isOpen);
								}}
							/>
							<div ref={childrenRef} className="w-full h-full flex flex-row">
								{isOpen && (
									<MobileNav
										handleClick={() => setIsOpen(false)}
										navRef={navbarRef}
									/>
								)}
								{children}
							</div>
						</section>
					</section>
				</main>
			) : (
				children
			)}
			<button type="button" className="hidden" ref={paymentButton} onClick={async () => {
				await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-mail`, { id, verified: false })
			}} />
		</>
	);
}
