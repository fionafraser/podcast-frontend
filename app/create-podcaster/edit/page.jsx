"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
	setAge,
	setBio,
	setCity,
	setContact,
	setCountry,
	setGender,
	setHeadline,
	setInterviews,
	setLanguage,
	setName,
	setPrefers,
	setSocial,
	setRecording,
	setWebsite,
	setNextRec,
	setDate,
	setDetails,
	setFacebook,
	setInstagram,
	setLinkedin,
	setTime,
	setTwitter,
	setYoutube,
} from "@app/redux/features/podcaster/podcasterSlice";

import { AiOutlineLeft } from "react-icons/ai";

import Input from "@components/Input";
import Loader from "@components/Loader";
import Dropdown from "@components/Dropdown";
import { age_options, country_options, gender_options, language_options } from "@utils/data";
import { FaXTwitter } from "react-icons/fa6";

const EditPodcaster = () => {
	const {
		name,
		headline,
		bio,
		categories,
		website,
		interviews,
		info,
		info: { age, city, country, gender, language },
		social,
		social: { facebook, instagram, linkedin, twitter, youtube },
		prefers,
		nextRec,
		nextRec: { detail, date, time },
		recording,
		contact_me,
	} = useSelector((state) => state.podcaster);

	const [id, setId] = useState(true);
	const [data, setData] = useState(true);
	const [isLoaded, setIsLoaded] = useState(true);
	const [newlink, setNewlink] = useState("");
	const [newPrefer, setNewPrefer] = useState("");

	const router = useRouter();
	const dispatch = useDispatch();

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
					dispatch(setName(res.data.podcast_name));
					dispatch(setWebsite(res.data.url));
					dispatch(setBio(res.data.bio));
					dispatch(setSocial(res.data.social_media));
					dispatch(setHeadline(res.data.headline));
					dispatch(setRecording(res.data.recording));
					dispatch(setContact(res.data.contact_me));
					dispatch(setInterviews(res.data.interviews));
					dispatch(setPrefers(res.data.record_preference));
					dispatch(setNextRec(res.data.next_transmission));
					dispatch(setInfo(res.data.user.info));
					setData(res.data);
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setIsLoaded(false);
				});
		};

		getUserDetails();
	}, []);

	const handleSave = async () => {
		const token = localStorage.getItem("podcastToken");
		const id = localStorage.getItem("podcastId");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		await axios
			.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/edit`,
				{
					profile_type: "Podcaster",
					user: id,
					info: info,
					podcast_name: name,
					topic_categories: data.topic_categories,
					url: website,
					bio: bio,
					highlights: data.highlights,
					social_media: social,
					next_transmission: nextRec,
					headline: headline,
					interview: interviews,
					record_preference: prefers,
					recording: recording,
					contact_me: contact_me,
				},
				config
			)
			.then((res) => {
				if (res.status === 201) {
					router.push("/profile");
				}
				// console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// if (isLoaded) return <Loader />;

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
					<Link href={"/profile"} className="">
						<div>
							<AiOutlineLeft size={22} className="text-primary" />
						</div>
					</Link>
					<p className="text-primary text-base font-normal">Back</p>
				</div>

				<div className="text-primary self-center mb-5">
					<h1 className="text-primary text-left text-4xl font-black">
						Edit <span className="text-success">profile</span>
					</h1>
				</div>

				<div className="w-full sm:w-3/4 lg:w-1/2 px-4 flex justify-center items-center self-center">
					<div className="flex flex-col gap-7 items-center overflow-hidden">
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
								{/* <Dropdown
									onChangeValue={(e) => {
										dispatch(setCountry(e));
									}}
									value={country}
									placeholder={"Country"}
									options={dropdown_options}
								/>
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
										{headline?.length}/120
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
										{bio?.length}/1000
									</p>
									<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-light absolute left-5 top-1">
										About me
									</span>
								</div>
							</div>
						</div>

						<div className="w-full mt-5">
							<h2 className="text-primary text-2xl font-bold text-left">
								Your contact details
							</h2>
							<p className="text-primary text-sm font-light text-left">
								Your email address where podcast, press and industry can contact you.
							</p>
							<hr className="h-0.5 w-full rounded-lg bg-grey-300" />

							<div className="flex flex-col gap-2 mt-3">
								<Input
									onChangeValue={(e) => {
										dispatch(setWebsite(e.target.value));
									}}
									value={website}
									type="url"
									placeholder={"Podcast Name"}
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

						<div className="flex flex-col gap-7 items-center w-full">
							<div className="w-full mt-5 flex flex-col items-end">
								<div className="w-full">
									<h2 className="text-primary text-2xl font-bold text-left">
										Social media
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Add up your social media links and allow potential
										collaborators to discover more.
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
								</div>

								<div className="flex flex-col w-full gap-2 mt-3">
									<div className="w-full flex flex-row gap-5 items-center justify-between">
										<Image
											src={"/svgs/instagram.svg"}
											width={40}
											height={40}
											alt="Instagram icon"
											className=""
										/>
										<div className="w-11/12">
											<Input
												onChangeValue={(e) => {
													dispatch(setInstagram(e.target.value));
												}}
												value={instagram}
												type="url"
												inputholder={"instagram.com/"}
											/>
										</div>
									</div>
									<div className="w-full flex flex-row gap-5 items-center justify-between">
										<div className="bg-pinky flex justify-center items-center rounded-full h-10 w-10">
											<FaXTwitter size={20} color="yellow" />
										</div>
										<div className="w-11/12">
											<Input
												onChangeValue={(e) => {
													dispatch(setTwitter(e.target.value));
												}}
												value={twitter}
												type="url"
												inputholder={"twitter.com/"}
											/>
										</div>
									</div>
									<div className="w-full flex flex-row gap-5 items-center justify-between">
										<Image
											src={"/svgs/facebookii.svg"}
											width={40}
											height={40}
											alt="Facebook icon"
											className=""
										/>
										<div className="w-11/12">
											<Input
												onChangeValue={(e) => {
													dispatch(setFacebook(e.target.value));
												}}
												value={facebook}
												type="url"
												inputholder={"facbook.com/"}
											/>
										</div>
									</div>
									<div className="w-full flex flex-row gap-5 items-center justify-between">
										<Image
											src={"/svgs/youtube.svg"}
											width={40}
											height={40}
											alt="Youtube icon"
											className=""
										/>
										<div className="w-11/12">
											<Input
												onChangeValue={(e) => {
													dispatch(setYoutube(e.target.value));
												}}
												value={youtube}
												type="url"
												inputholder={"youtube.com/"}
											/>
										</div>
									</div>
									<div className="w-full flex flex-row gap-5 items-center justify-between">
										<Image
											src={"/svgs/linkedin.svg"}
											width={40}
											height={40}
											alt="LinkedIn icon"
											className=""
										/>
										<div className="w-11/12">
											<Input
												onChange={(e) => {
													dispatch(setLinkedin(e.target.value));
												}}
												value={linkedin}
												type="url"
												inputholder={"linkedin.com/in/"}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="w-full flex flex-col items-end mt-5">
								<div className="w-full">
									<h2 className="text-primary text-2xl font-bold text-left">
										Recording preferences
									</h2>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
								</div>

								<div className="flex flex-col w-full gap-2 mt-3">
									<div className="flex flex-row items-center gap-3">
										<input
											type="checkbox"
											onChange={(e) => {
												if (prefers.includes("Only online")) {
													const tempArr = [...prefers];
													const index = tempArr.indexOf("Only online");
													tempArr.splice(index, 1);
													dispatch(setPrefers(tempArr));
												} else {
													dispatch(setPrefers([...prefers, "Only online"]));
												}
											}}
											value={"Only online"}
											checked={prefers.includes("Only online")}
											className="border-primary h-5 w-5"
										/>
										<span className="text-primary text-base font-semibold">
											Only online
										</span>
									</div>
									<div className="flex flex-row items-center gap-3">
										<input
											type="checkbox"
											onChange={(e) => {
												if (prefers.includes("In Person")) {
													const tempArr = [...prefers];
													const index = tempArr.indexOf("In Person");
													tempArr.splice(index, 1);
													dispatch(setPrefers(tempArr));
												} else {
													dispatch(setPrefers([...prefers, "In Person"]));
												}
											}}
											value={"In Person"}
											checked={prefers.includes("In Person")}
											className="border-primary h-5 w-5"
										/>
										<span className="text-primary text-base font-semibold">
											In Person
										</span>
									</div>

									{prefers.map((prefer, index) => (
										<div
											key={index}
											className="flex flex-row items-center justify-between overflow-hidden h-12 p-2 rounded-md max-w-full bg-white border px-3 border-grey-100"
										>
											<p className="text-base font-medium truncate break-words">
												{prefer}
											</p>
											<button
												type="button"
												className="bg-lightgreen p-1.5 z-10 rounded-md self-end"
												onClick={() => {
													const tempArr = [...prefers];
													tempArr.splice(index, 1);
													dispatch(setPrefers(tempArr));
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
										value={newPrefer}
										onChange={(e) => {
											setNewPrefer(e.target.value);
										}}
										placeholder="Your recording preference"
										className="h-12 w-full mt-5 rounded-md peer bg-white border flex items-end border-grey-100 px-6 text-sm outline
											outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
									/>
									<button
										type="button"
										onClick={() => {
											dispatch(setPrefers([...prefers, newPrefer]));
											setNewPrefer("");
										}}
										disabled={newPrefer === ""}
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
												fill={newPrefer === "" ? "#868686" : "#232E60"}
											/>
										</svg>
										Add Preference
									</button>
								</div>
							</div>

							<div className="w-full flex flex-col items-end mt-5">
								<div className="w-full">
									<h2 className="text-primary text-2xl font-bold text-left">
										Your recording schedule
									</h2>
									<p className="text-primary text-sm font-light text-left">
										Details on when you are next recording.
									</p>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
								</div>

								<div className="flex flex-col w-full gap-2 mt-3">
									<div className="relative w-full">
										<textarea
											cols="30"
											rows="5"
											value={detail && detail}
											maxLength={120}
											onChange={(e) => {
												dispatch(setDetails(e.target.value));
											}}
											className="w-full rounded-md peer bg-white border flex items-end border-grey-100 px-6 pt-4 
												text-sm outline outline-0 transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
										></textarea>
										<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-light absolute left-5 top-1">
											Please enter details
										</span>
									</div>
									<Input
										placeholder={"Day/Month/Year"}
										type="date"
										onChangeValue={(e) => {
											dispatch(setDate(e.target.value));
										}}
									/>
									<Input
										placeholder={"Time"}
										type="time"
										onChangeValue={(e) => {
											dispatch(setTime(e.target.value));
										}}
									/>
								</div>
							</div>

							<div className="w-full flex flex-col items-end mt-5">
								<div className="w-full">
									<h2 className="text-primary text-2xl font-bold text-left">
										I'm currently recording
									</h2>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
								</div>

								<div className="flex flex-col w-full gap-2 mt-3">
									<div className="flex flex-row items-center gap-3">
										<input
											type="radio"
											value={true}
											onChange={(e) => {
												dispatch(setRecording(true));
											}}
											checked={recording === true}
										/>
										<span className="text-primary text-base font-semibold">
											Yes, I am
										</span>
									</div>
									<div className="flex flex-row items-center gap-3">
										<input
											type="radio"
											value={false}
											onChange={(e) => {
												dispatch(setRecording(false));
											}}
											checked={recording === false}
										/>
										<span className="text-primary text-base font-semibold">
											No, I'm not
										</span>
									</div>
								</div>
							</div>

							<div className="w-full flex flex-col items-end mt-5">
								<div className="w-full">
									<h2 className="text-primary text-2xl font-bold text-left">
										Would you like to be contacted by the press?
									</h2>
									<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
								</div>

								<div className="flex flex-col w-full gap-2 mt-3">
									<div className="flex flex-row items-center gap-3">
										<input
											type="radio"
											value={true}
											onChange={(e) => {
												dispatch(setContact(true));
											}}
											checked={contact_me === true}
										/>
										<span className="text-primary text-base font-semibold">
											Yes, I would
										</span>
									</div>
									<div className="flex flex-row items-center gap-3">
										<input
											type="radio"
											value={false}
											onChange={(e) => {
												dispatch(setContact(false));
											}}
											checked={contact_me === false}
										/>
										<span className="text-primary text-base font-semibold">
											No, I wouldn't
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full flex justify-end">
					<button
						type="button"
						onClick={handleSave}
						className="self-end mt-10 w-32 h-12 bg-primary rounded-md text-success"
					>
						Save
					</button>
				</div>
			</div>
		</main>
	);
};

export default EditPodcaster;
