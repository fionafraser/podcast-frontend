"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

import { MdDeleteForever, MdPayment } from "react-icons/md";
import { CgDanger } from "react-icons/cg";

import { category_options } from "@utils/data";

import Loader from "@components/Loader";
import Tag from "@components/Tag";
import Dropdown from "@components/Dropdown";
import Indicator from "@components/Indicator";
import Location from "@components/Location";
import { uploadImage } from "@utils/functions";
import { FaXTwitter } from "react-icons/fa6";

const Guest = () => {
	const router = useRouter();

	const [isLoaded, setIsLoaded] = useState(true);
	const [copied, setCopied] = useState(false);
	const [showAddCat, setShowAddCate] = useState(false);
	const [tab, setTab] = useState(1);
	const [id, setId] = useState("");
	const [data, setData] = useState({});
	const [category, setCategory] = useState("");
	const [image, setImage] = useState();

	const pathname = usePathname()

	const inputFile = useRef(null);

	const onButtonClick = () => {
		// `current` points to the mounted file input element
		inputFile.current.click();
	};

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
			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config)
				.then((res) => {
					if (
						res.data?.user?.paid !== true &&
						pathname !== "/login" &&
						pathname !== "/signup" &&
						pathname !== "/verify-email" &&
						pathname !== "/verified" &&
						pathname !== "/payment" &&
						pathname !== "/admin" &&
						pathname !== "/admin/details" &&
						pathname !== "/admin/create" &&
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
					}
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => setIsLoaded(false));
		};

		checks();
	}, []);

	useEffect(() => {
		const getUserDetails = async () => {
			setId(localStorage.getItem("podcastId"));
			const token = localStorage.getItem("podcastToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/my-profile`,
					config
				)
				.then((res) => {
					// console.log(res.data);
					setData(res.data);
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setIsLoaded(false);
				});
		};

		getUserDetails();
	}, []);

	const handleImageChange = async (data) => {
		const token = localStorage.getItem("podcastToken");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		await axios
			.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/image`,
				{ image: data },
				config
			)
			.then((res) => {
				location.reload()
			})
			.catch((err) => console.log(err));
	};

	const handleChangeImage = async (e) => {
		e.preventDefault();

		const file = e.target.files?.[0];

		if (!file) return;

		if (!file.type.includes("image")) {
			return alert("Please upload an image file");
		}

		const reader = new FileReader();

		reader.readAsDataURL(file);
		reader.onload = async () => {
			const result = reader.result;

			const imageUrl = await uploadImage(result);
			setImage(imageUrl.url);
			await handleImageChange(imageUrl.url);
		};
	};

	const handleAddCategory = async () => {
		if (!data.topic_categories.includes(category)) {
			data.topic_categories = [...data.topic_categories, category];
		}

		const token = localStorage.getItem("podcastToken");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		await axios
			.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/category`,
				{ category: data.topic_categories },
				config
			)
			.then((res) => {
				router.refresh();
			})
			.catch((err) => console.log(err));
	};

	const handleRemoveCategory = async (i) => {
		const categories = [...data.topic_categories];
		categories.splice(categories.indexOf(i), 1);
		data.topic_categories = [...categories];
		router.refresh();

		const token = localStorage.getItem("podcastToken");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		await axios
			.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/category`,
				{ category: data.topic_categories },
				config
			)
			.then((res) => {
				console.log(res);
				console.log("Done");
			})
			.catch((err) => console.log(err));
	};

	const handleDeleteAccount = async (data) => {
		const id = localStorage.getItem("podcastId");
		const token = localStorage.getItem("podcastToken");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				"content-type": "multipart/form-data",
			},
		};
		await axios
			.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${id}`, config)
			.then((res) => {
				router.push("/login");
			})
			.catch((err) => console.log(err));
	};

	const handleMakePayment = async (data) => {
		await axios
			.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/payment`, { id, verified: true })
			.then((res) => {
				window.location.href = res.data
			})
			.catch((err) => console.log(err));
	};

	if (isLoaded) {
		return <Loader />;
	}

	return (
		<>
			{data?.user?.profile_type === "Guest" && (
				<div className="bg-grey w-full h-full p-5 flex flex-col gap-7 relative">
					<div className="flex flex-row items-center gap-10 justify-start self-start lg:ml-5">
						<Link href={"/"} className="">
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

					<div className="flex flex-col md:flex-row gap-5">
						<div className="flex flex-col items-center">
							<div className="rounded-lg relative h-40 sm:h-60 w-52 sm:w-60">
								{data?.user?.image ? (
									<Image
										src={image ? image : data?.user?.image}
										id="img"
										alt="profile image"
										width={210}
										height={210}
										quality={100}
										className="rounded-lg object-cover flex items-center justify-center"
									/>
								) : (
									<div className="rounded-lg bg-green-500 text-primary uppercase h-full w-full text-7xl sm:text-9xl font-bold flex items-center justify-center">
										{data?.user?.name.charAt(0)}
									</div>
								)}
							</div>
							<input
								type="file"
								id="file"
								ref={inputFile}
								accept="image/*"
								style={{ display: "none" }}
								onChange={(e) => {
									e.preventDefault();

									const file = e.target.files?.[0];

									if (!file) return;
									if (!file.type.includes("image")) {
										return alert("Please upload an image file");
									}

									const reader = new FileReader();

									reader.readAsDataURL(file);
									reader.onload = async () => {
										const result = reader.result;

										try {
											const response = await fetch(`/api/upload`, {
												method: "POST",
												body: JSON.stringify({ path: result }),
											});
											const imageUrl = await response.json()
											setImage(imageUrl.url)
											console.log(imageUrl.url)
											await handleImageChange(imageUrl.url);
										} catch (error) {
											console.log(error);
											throw error;
										}
									};
								}}
							/>
							<button
								type="button"
								onClick={onButtonClick}
								className="bg-success flex flex-row gap-3 justify-center items-center rounded-lg p-2 self-center my-2"
							>
								<Image
									src={"/svgs/upload.svg"}
									width={15}
									height={15}
									alt="upload image"
									className=""
								/>
								<p className="text-primary font-semibold">Change Avatar</p>
							</button>
							<p className="text-primary text-xs">File must not be above 1MB</p>
						</div>

						<div className="flex-col flex justify-between gap-3 md:gap-1">
							<div className="flex flex-col w-full">
								<div className="w-full">
									<h1 className="text-primary text-5xl font-black text-center md:text-left capitalize flex flex-col md:flex-row items-center justify-end md:items-end md:justify-start md:gap-2 ">
										{data?.user?.name} <span><Indicator mode={"online"} /></span>
									</h1>
								</div>

								<p className="text-grey-100 text-sm text-center md:text-left font-semibold w-full">
									{data?.user?.email}
								</p>
							</div>

							{data?.short_bio && (
								<p className="text-primary text-sm font-medium text-center md:text-left">
									{data?.short_bio}
								</p>
							)}

							<div className="w-full flex justify-center md:justify-start">
								<Location
									city={data?.user?.info?.city}
									country={data?.user?.info?.country}
								/>
							</div>

							<div className="flex flex-wrap flex-row gap-3 items-center justify-center md:justify-start relative mb-5 sm:mb-0 w-full">
								{data?.topic_categories.map((cate, index) => (
									<Tag
										key={index}
										text={cate}
										edit
										handleRemove={handleRemoveCategory}
									/>
								))}
								<div className="relative">
									<button
										type="button"
										onClick={() => {
											setShowAddCate((prev) => !prev);
										}}
										className="bg-success rounded-2xl py-2 px-3 flex flex-row gap-3 items-center justify-center"
									>
										<Image
											src={"/svgs/add.svg"}
											width={15}
											height={15}
											alt="add icon"
											className=""
										/>
										<p className="text-primary text-center text-sm font-light">
											add
										</p>
									</button>
									{showAddCat && (
										<div className="absolute top-10 right-0.5 sm:right-0 rounded-lg shadow shadow-slate-800 w-60 p-3 bg-white">
											<h1 className="text-primary font-semibold text-lg text-center">
												Add new category
											</h1>
											<div className="w-full">
												<Dropdown
													onChangeValue={(e) => {
														setCategory(e);
													}}
													options={category_options}
													placeholder={"category"}
													value={category}
												/>
											</div>
											<div className="w-full flex flex-row gap-2 mt-3">
												<button
													className="w-1/2 bg-red-500 rounded-lg p-3 text-center text-primay font-semibold"
													onClick={() => {
														setShowAddCate(false);
														setCategory("");
													}}
													type="button"
												>
													Cancel
												</button>
												<button
													className="w-1/2 bg-success rounded-lg p-3 text-center text-primay font-semibold"
													onClick={() => {
														setShowAddCate(false);
														setCategory("");
														handleAddCategory();
													}}
													type="button"
												>
													Save
												</button>
											</div>
										</div>
									)}
								</div>
							</div>

							<div className="lg:flex flex-row gap-5 justify-center md:justify-start hidden">
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(location.href);
										setCopied(true);
										setTimeout(() => {
											setCopied(false);
										}, 5000);
									}}
									className="bg-lightgreen border border-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
								>
									<Image
										src={"/svgs/share.svg"}
										width={15}
										height={15}
										alt="share icon"
										className=""
									/>
									<p className="text-primary font-semibold">
										{!copied ? "Share profile" : "link copied!"}
									</p>
								</button>
								<Link href={"/create-guest/edit"}>
									<div className="bg-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5">
										<Image
											src={"/svgs/edit.svg"}
											width={15}
											height={15}
											alt="Edit icon"
											className=""
										/>
										<p className="text-primary font-semibold">Edit profile</p>
									</div>
								</Link>
							</div>
						</div>
					</div>

					<div className="flex flex-row gap-5 justify-center lg:hidden w-full">
						<button
							type="button"
							onClick={() => {
								navigator.clipboard.writeText(location.href);
								setCopied(true);
								setTimeout(() => {
									setCopied(false);
								}, 5000);
							}}
							className="bg-lightgreen border border-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
						>
							<Image
								src={"/svgs/share.svg"}
								width={15}
								height={15}
								alt="share icon"
								className=""
							/>
							<p className="text-primary font-semibold">
								{!copied ? "Share profile" : "link copied!"}
							</p>
						</button>
						<Link href={"/create-guest/edit"}>
							<div className="bg-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5">
								<Image
									src={"/svgs/edit.svg"}
									width={15}
									height={15}
									alt="Edit icon"
									className=""
								/>
								<p className="text-primary font-semibold">Edit profile</p>
							</div>
						</Link>
					</div>

					<div className="mt-5 w-full">
						<div className="flex flex-row gap-4 justify-center md:justify-start w-full">
							<button
								type="button"
								className={
									tab === 1
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(1)}
							>
								<p className="font-semibold capitalize">About Me</p>
							</button>
							<button
								type="button"
								className={
									tab === 2
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(2)}
							>
								<p className="font-semibold capitalize">Availability</p>
							</button>
							<button
								type="button"
								className={
									tab === 3
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(3)}
							>
								<p className="font-semibold capitalize">Links</p>
							</button>
						</div>
						{tab === 1 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
								<h1 className="text-primary text-xl font-bold">Experience</h1>
								<p className="text-primary text-sm font-medium text-left">
									{data?.headline}
								</p>
								<h1 className="text-primary text-xl font-bold">Gender</h1>
								<p className="text-primary text-sm font-medium text-left">
									{data?.user?.info.gender}
								</p>
								<h1 className="text-primary text-xl font-bold">Language</h1>
								<p className="text-primary text-sm font-medium text-left">
									{data?.user?.info.language}
								</p>
								<h1 className="text-primary text-xl font-bold">Mission</h1>
								<p className="text-primary text-sm font-medium text-left">
									{data?.mission}
								</p>
								<h1 className="text-primary text-xl font-bold">
									Recording preference
								</h1>
								<ul className="text-primary text-sm font-medium text-left">
									{data?.record_preference.map((pref, index) => (
										<li
											key={index}
											className="flex flex-row items-center gap-2"
										>
											<span className="text-sm">{index + 1}.</span> {pref}
										</li>
									))}
								</ul>
								<div className="flex flex-row gap-5 items-center">
									<h1 className="text-primary text-xl font-bold">
										Own Podcast
									</h1>
									<p className="text-primary text-base font-medium text-left">
										{data?.own_podcast ? "Yes" : "No"}
									</p>
								</div>
								<div className="flex flex-row gap-5 items-center">
									<h1 className="font-bold text-xl text-primary">Contact me</h1>
									<p className="text-primary">
										{data?.contact_me ? "Yes" : "No"}
									</p>
								</div>
							</div>
						)}
						{tab === 2 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
								<h1 className="text-primary text-xl font-bold">
									I'm open for any recording opportunity
								</h1>
							</div>
						)}
						{tab === 3 && (
							<div className="flex flex-col gap-3 pt-5 pl-2">
								{data?.social_media.facebook &&
									data?.social_media.instagram &&
									data?.social_media.linkedin &&
									data?.social_media.twitter &&
									data?.social_media.youtube && (
										<h1 className="text-primary text-xl font-bold">
											Social Media
										</h1>
									)}
								<ul className="flex flex-col gap-3">
									{data?.social_media.facebook && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/facebookii.svg"}
												width={30}
												height={30}
												alt="Facebook icon"
												className=""
											/>
											<a
												href={data?.social_media.facebook}
												className="text-primary text-left text-base font-normal"
											>
												{data?.social_media.facebook}
											</a>
										</li>
									)}
									{data?.social_media.instagram && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/instagram.svg"}
												width={30}
												height={30}
												alt="Instagram icon"
												className=""
											/>
											<a
												href={data?.social_media.instagram}
												target="_blank"
												className="text-primary text-left text-base font-normal"
											>
												{data?.social_media.instagram}
											</a>
										</li>
									)}
									{data?.social_media.linkedin && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/linkedin.svg"}
												width={30}
												height={30}
												alt="LinkedIn icon"
												className=""
											/>
											<a
												href={data?.social_media.linkedin}
												className="text-primary text-left text-base font-normal"
											>
												{data?.social_media.linkedin}
											</a>
										</li>
									)}
									{data?.social_media.twitter && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<div className="bg-pinky flex justify-center items-center rounded-full h-7 w-7">
												<FaXTwitter size={16} color="yellow" />
											</div>
											<a
												href={data?.social_media.twitter}
												className="text-primary text-left text-base font-normal"
											>
												{data?.social_media.twitter}
											</a>
										</li>
									)}
									{data?.social_media.youtube && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/youtube.svg"}
												width={30}
												height={30}
												alt="Youtube icon"
												className=""
											/>
											<a
												href={data?.social_media.youtube}
												className="text-primary text-left text-base font-normal"
											>
												{data?.social_media.youtube}
											</a>
										</li>
									)}
								</ul>

								<h1 className="text-primary text-xl font-bold">
									Previous Interviews
								</h1>
								<ul className="text-primary text-base font-medium text-left mb-5">
									{data?.interview_links.map((interview, index) => (
										<li
											key={index}
											className="flex flex-row items-center gap-2"
										>
											<span className="text-base">{index + 1}.</span>{" "}
											{interview}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					<div className="text-primary">
						<h1 className="text-center w-full text-2xl font-bold capitalize">
							Advanced Options
						</h1>
						<div className="">
							<p className="font-semibold text-lg">
								Do you want to change your password or you forgot you password
							</p>
							<Link
								href={"/password/forgot"}
								className="bg-success flex flex-row gap-3 justify-center w-fit items-center rounded-lg p-2 self-center my-2"
							>
								Change Password
							</Link>
						</div>
						<div className="">
							<p className="flex text-primary font-semibold text-lg items-center">
								Make payment for your podcast subscription
							</p>
							<button
								type="button"
								onClick={handleMakePayment}
								className="bg-success text-primary flex flex-row gap-3 justify-center w-fit items-center capitalize rounded-lg p-2 self-center my-2"
							>
								<MdPayment size={20} />
								Make Payment
							</button>
						</div>
						<div className="">
							<p className="flex text-red-600 font-semibold text-lg items-center">
								<span>
									<CgDanger size={20} />
								</span>
								Danger. Delete Account
							</p>
							<button
								type="button"
								onClick={handleDeleteAccount}
								className="bg-red-500 text-white flex flex-row gap-3 justify-center w-fit items-center capitalize rounded-lg p-2 self-center my-2"
							>
								<MdDeleteForever size={20} />
								Delete Account
							</button>
						</div>
					</div>
				</div>
			)}

			{data?.user?.profile_type === "Podcaster" && (
				<div className="bg-grey w-full h-full p-5 flex flex-col gap-7 relative">
					<div className="flex flex-row items-center gap-10 justify-start self-start lg:ml-5">
						<Link href={"/"} className="">
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

					<div className="flex flex-col md:flex-row gap-5">
						<div className="flex flex-col items-center">
							<div className="rounded-lg relative h-40 sm:h-60 w-52 sm:w-60">
								{data?.user?.image ? (
									<Image
										src={image ? image : data?.user?.image}
										id="img"
										alt="profile image"
										width={210}
										height={210}
										quality={100}
										className="rounded-lg object-cover flex items-center justify-center"
									/>
								) : (
									<div className="rounded-lg bg-green-500 text-primary uppercase h-full w-full text-7xl sm:text-9xl font-bold flex items-center justify-center">
										{data?.user?.name.charAt(0)}
									</div>
								)}
							</div>
							<input
								type="file"
								id="file"
								ref={inputFile}
								accept="image/*"
								style={{ display: "none" }}
								onChange={(e) => {
									e.preventDefault();

									const file = e.target.files?.[0];

									if (!file) return;
									if (!file.type.includes("image")) {
										return alert("Please upload an image file");
									}

									const reader = new FileReader();

									reader.readAsDataURL(file);
									reader.onload = async () => {
										const result = reader.result;

										try {
											const response = await fetch(`/api/upload`, {
												method: "POST",
												body: JSON.stringify({ path: result }),
											});
											const imageUrl = await response.json()
											setImage(imageUrl.url)
											console.log(imageUrl.url)
											await handleImageChange(imageUrl.url);
										} catch (error) {
											console.log(error);
											throw error;
										}
									};
								}}
							/>
							<button
								type="button"
								onClick={onButtonClick}
								className="bg-success flex flex-row gap-3 justify-center items-center rounded-lg p-2 self-center my-2"
							>
								<Image
									src={"/svgs/upload.svg"}
									width={15}
									height={15}
									alt="upload image"
									className=""
								/>
								<p className="text-primary font-semibold">Change Avatar</p>
							</button>
						</div>

						<div className="flex-col flex justify-between gap-3 md:gap-1">
							<div className="flex flex-col text-center md:text-left">
								<div className="w-full">
									<h1 className="text-primary text-5xl font-black text-center md:text-left capitalize flex flex-col md:flex-row items-center justify-end md:items-end md:justify-start md:gap-2">
										{data?.user?.name} <span><Indicator mode={"online"} /></span>
									</h1>
								</div>

								<p className="text-grey-100 text-sm font-semibold">
									{data?.user?.email}
								</p>
							</div>

							{data?.bio && (
								<p className="text-primary text-sm font-medium text-center md:text-left">
									{data?.bio}
								</p>
							)}

							<div className="w-full flex justify-center md:justify-start">
								<Location
									city={data?.user?.info?.city}
									country={data?.user?.info?.country}
								/>
							</div>

							<div className="flex flex-wrap flex-row gap-3 items-center justify-center md:justify-start relative mb-5 sm:mb-0 w-full">
								{data?.topic_categories.map((cate, index) => (
									<Tag
										key={index}
										text={cate}
										edit
										handleRemove={handleRemoveCategory}
									/>
								))}
								<div className="relative">
									<button
										type="button"
										onClick={() => {
											setShowAddCate(true);
										}}
										className="bg-success rounded-2xl py-2 px-3 flex flex-row gap-3 items-center justify-center"
									>
										<Image
											src={"/svgs/add.svg"}
											width={15}
											height={15}
											alt="add icon"
											className=""
										/>
										<p className="text-primary text-center text-sm font-light">
											add
										</p>
									</button>
									{showAddCat && (
										<div className="absolute top-10 right-0.5 sm:right-0 rounded-lg shadow shadow-slate-800 w-60 p-3 bg-white">
											<h1 className="text-primary font-semibold text-lg text-center">
												Add new category
											</h1>
											<div className="w-full">
												<Dropdown
													onChangeValue={(e) => {
														setCategory(e);
													}}
													options={category_options}
													placeholder={"category"}
													value={category}
												/>
											</div>
											<div className="w-full flex flex-row gap-2 mt-3">
												<button
													className="w-1/2 bg-red-500 rounded-lg p-3 text-center text-primay font-semibold"
													onClick={() => {
														setShowAddCate(false);
														setCategory("");
													}}
													type="button"
												>
													Cancel
												</button>
												<button
													className="w-1/2 bg-success rounded-lg p-3 text-center text-primay font-semibold"
													onClick={() => {
														setShowAddCate(false);
														setCategory("");
														handleAddCategory();
													}}
													type="button"
												>
													Save
												</button>
											</div>
										</div>
									)}
								</div>
							</div>

							<div className="lg:flex flex-row gap-5 justify-center md:justify-start hidden w-full">
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(location.href + `${id}`);
										setCopied(true);
										setTimeout(() => {
											setCopied(false);
										}, 5000);
									}}
									className="bg-lightgreen border border-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
								>
									<Image
										src={"/svgs/share.svg"}
										width={15}
										height={15}
										alt="share icon"
										className=""
									/>
									<p className="text-primary font-semibold">
										{copied ? "Link copied!" : "Share profile"}
									</p>
								</button>
								<Link href={"/create-podcaster/edit"}>
									<div className="bg-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5">
										<Image
											src={"/svgs/edit.svg"}
											width={15}
											height={15}
											alt="Edit icon"
											className=""
										/>
										<p className="text-primary font-semibold">Edit profile</p>
									</div>
								</Link>
							</div>
						</div>
					</div>

					<div className="flex flex-row gap-5 justify-center md:justify-start lg:hidden w-full">
						<button
							type="button"
							onClick={() => {
								navigator.clipboard.writeText(location.href);
								setCopied(true);
								setTimeout(() => {
									setCopied(false);
								}, 5000);
							}}
							className="bg-lightgreen border border-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
						>
							<Image
								src={"/svgs/share.svg"}
								width={15}
								height={15}
								alt="share icon"
								className=""
							/>
							<p className="text-primary font-semibold">
								{copied ? "Link copied!" : "Share profile"}
							</p>
						</button>
						<Link href={"/create-podcaster/edit"}>
							<div className="bg-success flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5">
								<Image
									src={"/svgs/edit.svg"}
									width={15}
									height={15}
									alt="Edit icon"
									className=""
								/>
								<p className="text-primary font-semibold">Edit picture</p>
							</div>
						</Link>
					</div>

					<div className="mt-5 w-full">
						<div className="flex flex-row gap-4 justify-center md:justify-start w-full">
							<button
								type="button"
								className={
									tab === 1
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(1)}
							>
								<p className="font-semibold capitalize">About Me</p>
							</button>
							<button
								type="button"
								className={
									tab === 2
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(2)}
							>
								<p className="font-semibold capitalize">Availability</p>
							</button>
							<button
								type="button"
								className={
									tab === 3
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(3)}
							>
								<p className="font-semibold capitalize">Links</p>
							</button>
						</div>
						{tab === 1 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
								<h1 className="font-bold text-lg text-primary">Headline</h1>
								<p className="text-primary text-base font-medium text-left">
									{data?.headline}
								</p>
								<h1 className="text-primary text-xl font-bold">
									Recording preference
								</h1>
								<ul className="text-primary text-base font-medium text-left">
									{data?.record_preference.map((pref, index) => (
										<li
											key={index}
											className="flex flex-row items-center gap-2"
										>
											<span className="text-base">{index + 1}.</span> {pref}
										</li>
									))}
								</ul>
							</div>
						)}
						{tab === 2 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
								<h1 className="text-primary text-lg font-semibold">
									{data?.recording
										? "I'm open for any recording opportunity"
										: "I'm not open for any recording opportunity"}
								</h1>
								<h1 className="text-primary text-xl font-bold">Podcast Name</h1>
								<p className="text-primary text-base font-medium text-left">
									{data?.podcast_name}
								</p>
								<h1 className="text-primary text-xl font-bold">Contact me</h1>
								<p className="text-primary text-base font-medium text-left">
									{data?.contact_me ? "Yes" : "No"}
								</p>
							</div>
						)}
						{tab === 3 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
								<h1 className="text-primary text-xl font-bold">Social Media</h1>
								<ul className="flex flex-col gap-3">
									{data?.social_media.facebook && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/facebookii.svg"}
												width={30}
												height={30}
												alt="Facebook icon"
												className=""
											/>
											<a
												href={data?.social_media.facebook}
												className="text-primary text-left text-base font-normal"
											>
												{data?.social_media.facebook}
											</a>
										</li>
									)}
									{data?.social_media.instagram && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/instagram.svg"}
												width={30}
												height={30}
												alt="Instagram icon"
												className=""
											/>
											<a
												href={data?.social_media.instagram}
												target="_blank"
												className="text-primary text-left text-base font-normal"
											>
												{data?.social_media.instagram}
											</a>
										</li>
									)}
									{data?.social_media.linkedin && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/linkedin.svg"}
												width={30}
												height={30}
												alt="LinkedIn icon"
												className=""
											/>
											<a
												href={data?.social_media.linkedin}
												className="text-primary text-left text-base font-normal"
											>
												{data?.social_media.linkedin}
											</a>
										</li>
									)}
									{data?.social_media.twitter && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<div className="bg-pinky flex justify-center items-center rounded-full h-7 w-7">
												<FaXTwitter size={16} color="yellow" />
											</div>
											<a
												href={data?.social_media.twitter}
												className="text-primary text-left text-base font-normal"
											>
												{data?.social_media.twitter}
											</a>
										</li>
									)}
									{data?.social_media.youtube && (
										<li className="flex flex-row gap-3 items-center hover:underline">
											<Image
												src={"/svgs/youtube.svg"}
												width={30}
												height={30}
												alt="Youtube icon"
												className=""
											/>
											<a
												href={data?.social_media.youtube}
												className="text-primary text-left text-base font-normal"
											>
												{data?.social_media.youtube}
											</a>
										</li>
									)}
								</ul>
								<h1 className="text-primary text-xl font-bold">
									Previous Episodes
								</h1>
								<ul className="text-primary text-base font-medium text-left">
									{data?.interviews.map((interview, index) => (
										<li
											key={index}
											className="flex flex-row items-center gap-2"
										>
											<span className="text-base">{index + 1}.</span>{" "}
											{interview}
										</li>
									))}
								</ul>
								{data?.url && (
									<h1 className="text-primary text-xl font-bold">Website</h1>
								)}
								<p className="text-primary text-base font-medium text-left">
									{data?.url}
								</p>
							</div>
						)}
					</div>

					<div className="text-primary">
						<h1 className="text-center w-full text-2xl font-bold capitalize">
							Advanced Options
						</h1>
						<div className="">
							<p className="font-semibold text-lg">
								Do you want to change your password or you forgot you password
							</p>
							<Link
								href={"/password/forgot"}
								className="bg-success flex flex-row gap-3 justify-center w-fit items-center rounded-lg p-2 self-center my-2"
							>
								Change Password
							</Link>
						</div>
						<div className="">
							<p className="flex text-primary font-semibold text-lg items-center">
								Make payment for your podcast subscription
							</p>
							<button
								type="button"
								onClick={handleMakePayment}
								className="bg-success text-primary flex flex-row gap-3 justify-center w-fit items-center capitalize rounded-lg p-2 self-center my-2"
							>
								<MdPayment size={20} />
								Make Payment
							</button>
						</div>
						<div className="">
							<p className="flex text-red-600 font-semibold text-lg items-center">
								<span>
									<CgDanger size={20} />
								</span>
								Danger. Delete Account
							</p>
							<button
								type="button"
								onClick={handleDeleteAccount}
								className="bg-red-500 text-white flex flex-row gap-3 justify-center w-fit items-center capitalize rounded-lg p-2 self-center my-2"
							>
								<MdDeleteForever size={20} />
								Delete Account
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Guest;
