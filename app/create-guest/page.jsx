"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	setAge,
	setBio,
	setCategories,
	setCity,
	setCountry,
	setGender,
	setHeadline,
	setImage,
	setLanguage,
	setMission,
} from "@app/redux/features/guest/guestSlice";

import { AiOutlineLeft } from "react-icons/ai";

import Input from "@components/Input";
import Dropdown from "@components/Dropdown";

import {
	age_options,
	category_options,
	country_options,
	dropdown_options,
	gender_options,
	language_options,
} from "@utils/data";

const CreateGuest = () => {
	const {
		headline,
		bio,
		categories,
		mission,
		info: { age, gender, country, city, language },
		image,
	} = useSelector((state) => state.guest);

	const inputFile = useRef(null);

	const router = useRouter();
	const dispatch = useDispatch();

	const onButtonClick = () => {
		// `current` points to the mounted file input element
		inputFile.current.click();
	};

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
				return;
			})
			.catch((err) => console.log(err));
	};

	return (
		<main className="bg-grey bg-center bg-contain">
			<div className="w-screen h-full p-5 lg:p-16 flex flex-col gap-7">
				<div className="mb-5 self-center">
					<Image
						src={"/images/tpg.png"}
						width={150}
						height={50}
						className="self-end"
						alt="Pow image"
					/>
				</div>

				<div className="flex flex-row items-center gap-5 justify-start self-start">
					<Link href={"/create-profile"} className="">
						<div>
							<AiOutlineLeft size={22} className="text-primary" />
						</div>
					</Link>
					<p className="text-primary text-base font-normal">Back</p>
				</div>

				<div className="text-primary lg:hidden">
					<h1 className="text-primary text-left text-4xl font-black">
						Create a <span className="text-pinky">guest</span> profile
					</h1>
					<p className="text-primary text-left text-sm font-normal -mt-1">
						More about you
					</p>
				</div>

				<div className="flex flex-col lg:flex-row gap-5 lg:gap-28">
					<div className="w-full lg:w-1/4 flex flex-col items-center justify-start gap-5">
						<div className="w-44 sm:w-60 h-44 sm:h-60 rounded-xl relative bg-success items-center justify-center flex">
							{image ? (
								<Image
									src={image}
									id="img"
									alt="image"
									fill
									className="rounded-lg h-full w-full flex items-center justify-center"
								/>
							) : (
								<Image
									src={"/svgs/profile.svg"}
									width={100}
									height={100}
									alt="profile icon"
									className=""
								/>
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
										dispatch(setImage(imageUrl.url))
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

					<div className="w-full lg:w-3/4">
						<div className="w-full lg:w-11/12 px-4">
							<div className="text-primary hidden lg:block">
								<h1 className="text-primary text-left text-4xl font-black">
									Create a <span className="text-pinky">guest</span> profile
								</h1>
								<p className="text-primary text-left text-sm font-normal -mt-1">
									More about you
								</p>
							</div>

							<div className="flex flex-col gap-7 items-center w-full">
								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Personal details
									</h2>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<p className="text-primary text-xs">*Type in gender if not in dropdown</p>
										<Dropdown
											onChangeValue={(e) => {
												dispatch(setGender(e));
											}}
											text
											value={gender}
											placeholder={"Gender"}
											options={gender_options}
										/>
										<Dropdown
											onChangeValue={(e) => {
												dispatch(setAge(e));
											}}
											value={age}
											placeholder={"Age"}
											options={age_options}
										/>
										{/* <Input
											onChangeValue={(e) => {
												dispatch(setCountry(e.target.value));
											}}
											value={country}
											type="text"
											placeholder={"Country"}
										/> */}
										<Dropdown
											onChangeValue={(e) => {
												dispatch(setCountry(e));
											}}
											value={country}
											placeholder={"Country"}
											options={country_options}
										/>
										<Input
											onChangeValue={(e) => {
												dispatch(setCity(e.target.value));
											}}
											value={city}
											type="text"
											placeholder={"City"}
										/>
										{/* 
										<Dropdown
											onChangeValue={(e) => {
												dispatch(setCity(e));
											}}
											value={city}
											placeholder={"City"}
											options={dropdown_options}
										/> */}
										<Dropdown
											onChangeValue={(e) => {
												dispatch(setLanguage(e));
											}}
											value={language}
											placeholder={"Language"}
											options={language_options}
										/>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Podcast Bio
									</h2>
									<p className="text-primary text-sm font-light text-left">
										This is your podcast elevator pitch to get people excited.
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<div className="relative w-full">
											<textarea
												cols="30"
												rows="5"
												maxLength={120}
												value={headline}
												onChange={(e) => {
													dispatch(setHeadline(e.target.value));
												}}
												className="w-full rounded-md peer bg-white border flex items-end border-grey-100 px-6 pt-4
												text-sm outline outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
											></textarea>
											<p className="text-sm font-medium text-right">
												{headline.length}/120
											</p>
											<span className="peer-focus:text-blue-500 text-xs font-light absolute left-5 top-1">
												Personal headline
											</span>
										</div>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										My podcast mission
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Why I want to be a great guest.
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<div className="relative w-full">
											<textarea
												cols="30"
												rows="10"
												maxLength={2000}
												value={mission}
												onChange={(e) => {
													dispatch(setMission(e.target.value));
												}}
												className="w-full rounded-md peer bg-white border flex items-end border-grey-100 px-6 pt-4
												text-sm outline outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
											></textarea>
											<p className="text-sm font-medium text-right">
												{mission.length}/2000
											</p>
											<span className="peer-focus:text-blue-500 text-xs font-light absolute left-5 top-1">
												Podcast Mission
											</span>
										</div>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										About me
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Tell others about yourself, your experience and the value
										you can bring to a conversation.
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<div className="relative w-full">
											<textarea
												cols="30"
												rows="10"
												maxLength={1000}
												value={bio}
												onChange={(e) => {
													dispatch(setBio(e.target.value));
												}}
												className="w-full rounded-md peer bg-white border flex items-end border-grey-100 px-6 pt-4
												text-sm outline outline-0	transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
											></textarea>
											<p className="text-sm font-medium text-right">
												{bio.length}/1000
											</p>
											<span className="peer-focus:text-blue-500 text-xs font-light absolute left-5 top-1">
												About me
											</span>
										</div>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										My expert subjects
									</h2>
									<p className="text-primary text-sm font-light text-left">
										What areas would you like to talk about?
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										{categories.map((category, index) => (
											<div
												key={index}
												className="flex flex-row items-center justify-between overflow-hidden h-12 p-2 rounded-md max-w-full bg-white border px-3 border-grey-100"
											>
												<p className="text-base font-medium truncate break-words">
													{category}
												</p>
												<button
													type="button"
													className="bg-lightgreen p-1.5 z-10 rounded-md self-end"
													onClick={() => {
														const tempArr = [...categories];
														tempArr.splice(index, 1);
														dispatch(setCategories(tempArr));
													}}
												>
													<Image
														src={"/svgs/cancel.svg"}
														width={15}
														height={15}
														alt="Search icon"
													/>
												</button>
											</div>
										))}
										<Dropdown
											onChangeValue={(e) => {
												const newArr = [...categories, e];
												dispatch(setCategories(newArr));
											}}
											isArray
											text
											value={categories}
											placeholder={"Category"}
											options={category_options}
										/>
									</div>
								</div>

								<button
									type="submit"
									onClick={() => {
										router.push("/create-guest/step-two");
									}}
									className="w-full h-12 mt-10 bg-success rounded-md text-primary"
								>
									Continue
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CreateGuest;
