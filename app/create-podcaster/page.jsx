"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
	setAge,
	setBio,
	setCategory,
	setCity,
	setCountry,
	setGender,
	setHeadline,
	setImage,
	setInterviews,
	setLanguage,
	setName,
	setWebsite,
} from "@app/redux/features/podcaster/podcasterSlice";
import axios from "axios";

import { AiOutlineLeft } from "react-icons/ai";

import Input from "@components/Input";
import Dropdown from "@components/Dropdown";

import {
	age_options,
	category_options,
	country_options,
	gender_options,
	language_options,
} from "@utils/data";

const CreatePodcaster = () => {
	const {
		name,
		headline,
		bio,
		image,
		info: { age, gender, country, city, language },
		categories,
		website,
		interviews,
	} = useSelector((state) => state.podcaster);

	const inputFile = useRef(null);

	const [newlink, setNewlink] = useState("");

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

				<div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
					<Link href={"/create-profile"} className="">
						<div>
							<AiOutlineLeft size={22} className="text-primary" />
						</div>
					</Link>
					<p className="text-primary text-base font-normal">Back</p>
				</div>

				<div className="text-primary lg:hidden ml-10">
					<h1 className="text-primary text-left text-4xl font-black">
						Create a podcaster <span className="text-success">profile</span>
					</h1>
					<p className="text-primary text-left text-sm font-normal -mt-1">
						Tell guests a little More about you
					</p>
				</div>

				<div className="flex flex-col lg:flex-row gap-5 lg:gap-28">
					<div className="w-full lg:w-1/4 flex flex-col items-center justify-start gap-5">
						<div className="w-44 sm:w-60 h-44 sm:h-60 rounded-xl bg-success items-center justify-center flex">
							{image ? (
								<img
									src={image}
									id="img"
									alt="image"
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

					<div className="w-full lg:w-3/4 flex justify-center lg:justify-normal">
						<div className="w-11/12 overflow-hidden">
							<div className="text-primary hidden lg:block">
								<h1 className="text-primary text-left text-4xl font-black">
									Create a podcaster <span className="text-success">profile</span>
								</h1>
								<p className="text-primary text-left text-sm flex-wrap font-normal -mt-1">
									Please ensure you fill in all sections of your profile and give
									the best impression. Don’t be shy, this is the time to show off
									about all the wonderful things you have achieved!
								</p>
							</div>

							<div className="flex flex-col gap-7 items-center overflow-hidden w-full">
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
										Podcast details
									</h2>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<Input
											onChangeValue={(e) => {
												dispatch(setName(e.target.value));
											}}
											value={name}
											type="text"
											placeholder={"Podcast Title"}
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
											<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-light absolute left-5 top-1">
												Personal headline
											</span>
										</div>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										About me
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Tell us all about you and your podcast and what are aims for it are so others can help you get there.
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
											<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-light absolute left-5 top-1">
												About me
											</span>
										</div>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Categories
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
														dispatch(setCategory(tempArr));
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
												dispatch(setCategory(newArr));
											}}
											isArray
											text
											value={categories}
											placeholder={"Category"}
											options={category_options}
										/>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Your contact details
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Your email address where podcast, press and industry can contact you
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="flex flex-col gap-2 mt-3">
										<Input
											onChangeValue={(e) => {
												dispatch(setWebsite(e.target.value));
											}}
											value={website}
											type="url"
											placeholder={"Podcast Title"}
										/>
									</div>
								</div>

								<div className="w-full mt-5">
									<h2 className="text-primary text-2xl font-bold text-left">
										Include links to key episodes below
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Your link to your key episodes
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

									<div className="overflow-hidden w-full flex flex-col gap-2 mt-3">
										{interviews.map((link, index) => (
											<div
												key={index}
												className="flex flex-row items-center justify-between overflow-hidden h-12 p-2 rounded-md max-w-full bg-white border px-3 border-grey-100"
											>
												<p className="text-base font-medium truncate break-words">
													{link}
												</p>

												<button
													type="button"
													className="bg-lightgreen p-1.5 z-10 rounded-md self-end"
													onClick={() => {
														const tempArr = [...interviews];
														tempArr.splice(index, 1);
														dispatch(setInterviews(tempArr));
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
										<input
											type="url"
											name=""
											id=""
											value={newlink}
											onChange={(e) => {
												setNewlink(e.target.value);
											}}
											placeholder="Enter link"
											className="h-12 w-full mt-5 rounded-md peer bg-white border flex items-end border-grey-100 px-6 text-sm outline
											outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
										/>
									</div>
									<button
										type="button"
										onClick={() => {
											dispatch(setInterviews([...interviews, newlink]));
											setNewlink("");
										}}
										disabled={newlink === ""}
										className="w-full h-12 mt-5 flex flex-row items-center justify-center gap-2 bg-success disabled:bg-grey-300 rounded-md text-primary disabled:text-grey-100 text-base font-semibold"
									>
										<svg
											width="15"
											height="15"
											viewBox="0 0 12 12"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M6.75 1C6.75 0.585786 6.41421 0.25 6 0.25C5.58579 0.25 5.25 0.585786 5.25 1V5.25H1C0.585787 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585787 6.75 1 6.75H5.25V11C5.25 11.4142 5.58579 11.75 6 11.75C6.41421 11.75 6.75 11.4142 6.75 11V6.75H11C11.4142 6.75 11.75 6.41421 11.75 6C11.75 5.58579 11.4142 5.25 11 5.25H6.75V1Z"
												fill={newlink === "" ? "#868686" : "#232E60"}
											/>
										</svg>
										Add Link
									</button>
								</div>

								<button
									type="submit"
									onClick={() => {
										router.push("/create-podcaster/step-two");
									}}
									className="w-full h-12 mt-10 bg-success rounded-md text-primary text-base font-semibold"
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

export default CreatePodcaster;
