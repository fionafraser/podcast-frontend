"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";

import Loader from "@components/Loader";
import Tag from "@components/Tag";
import Indicator from "@components/Indicator";
import Location from "@components/Location";
import { FaXTwitter } from "react-icons/fa6";

const Guest = () => {
	const params = useParams();

	const [isLoaded, setIsLoaded] = useState(true);
	const [copied, setCopied] = useState(false);
	const [tab, setTab] = useState(1);
	const [id, setId] = useState("");
	const [data, setData] = useState({});
	const [text, setText] = useState("");
	const [submit, setSubmit] = useState("");
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		const getUserDetails = async () => {
			setId(localStorage.getItem("podcastId"));
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/${params.id}`
				)
				.then((res) => {
					// console.log(res.data);
					setData(res.data);
				})
				.finally(() => {
					setIsLoaded(false);
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);

	const handleSendMail = async (e) => {
		setSubmitting(true);
		e.preventDefault();

		const email = localStorage.getItem("podcastMail");
		const token =
			localStorage.getItem("podcastToken") === undefined ||
				localStorage.getItem("podcastToken") === null
				? ""
				: localStorage.getItem("podcastToken");

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		await axios
			.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/send-mail`,
				{
					email: data?.user?.email,
					text,
					sender: email,
				},
				config
			)
			.then((res) => {
				// console.log(res.data);
				setText("");
				setSubmitting(false);
				setSubmit("Sent");
				setTimeout(() => {
					setSubmit("");
				}, 10000);
			})
			.catch((err) => {
				console.log(err);
				setSubmitting(false);
			});
	};

	if (isLoaded) {
		return <Loader />;
	}

	return (
		<>
			{data?.user?.profile_type === "Guest" && (
				<div className="bg-grey w-full h-full p-5 flex flex-col gap-7 relative mb-24 z-0">
					<div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
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
							<div className="rounded-lg relative h-40 sm:h-60 w-52 sm:w-72">
								{data?.user?.image ? (
									<Image
										src={data?.user?.image}
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
						</div>

						<div className="flex-col flex justify-between gap-5 md:gap-1">
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

							{data?.short_bio && (
								<p className="text-primary text-sm font-medium text-center md:text-left">
									{data?.short_bio}
								</p>
							)}

							<div className="w-full flex justify-center md:justify-start">
								<Location
									city={data?.user?.info?.city}
									country={data?.user?.info?.city}
								/>
							</div>

							<div className="flex flex-wrap flex-row gap-3 items-center justify-center md:justify-start relative mb-5 sm:mb-0 w-full">
								{data?.topic_categories.map((cate, index) => (
									<Tag key={index} text={cate} />
								))}
							</div>

							<div className="flex flex-row gap-5 w-full justify-center md:justify-start">
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(location.href);
										setCopied(true);
										setTimeout(() => {
											setCopied(false);
										}, 5000);
									}}
									className="bg-lightgreen border border-success w-full sm:w-fit flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
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
							</div>
						</div>
					</div>

					<div className="flex flex-row justify-between">
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
									<p className="text-xs md:text-base font-semibold capitalize">
										About Me
									</p>
								</button>
								{/* <button
									type="button"
									className={
										tab === 4
											? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
											: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
									}
									onClick={() => setTab(4)}
								>
									<p className="font-semibold capitalize">Availability</p>
								</button> */}
								<button
									type="button"
									className={
										tab === 2
											? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
											: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
									}
									onClick={() => setTab(2)}
								>
									<p className="text-sm md:text-base font-semibold capitalize">
										Links
									</p>
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
									<p className="text-sm md:text-base font-semibold capitalize">
										Message
									</p>
								</button>
							</div>
							{tab === 1 && (
								<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
									<h1 className="text-primary text-xl font-bold">Experience</h1>
									<p className="text-primary text-sm font-medium text-left">
										{data?.experience_bio}
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
										<h1 className="font-bold text-xl text-primary">
											Contact me
										</h1>
										<p className="text-primary">
											{data?.contact_me ? "Yes" : "No"}
										</p>
									</div>
								</div>
							)}
							{tab === 2 && (
								<div className="flex flex-col gap-3 pt-5 pl-2">
									<h1 className="text-primary text-xl font-bold">
										Social Media
									</h1>
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
							{tab === 3 && (
								<div className="pt-5">
									<form
										onSubmit={(e) => handleSendMail(e)}
										className="relative w-full h-72 flex flex-col justify-between p-3 bg-primary rounded-md"
									>
										<div className="relative w-full ">
											<textarea
												cols="30"
												rows="10"
												value={text}
												onChange={(e) => {
													setText(e.target.value);
												}}
												className="w-full rounded-md bg-white border flex items-end border-grey-100 px-6 pt-4 
												text-sm outline outline-0	transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
											></textarea>
										</div>

										<button
											type="submit"
											className="w-full rounded-md bg-success text-primary p-2"
										>
											{submit === ""
												? submitting
													? "sending"
													: "send"
												: submit}
										</button>
									</form>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{data?.user?.profile_type === "Podcaster" && (
				<div className="bg-grey w-full h-full p-5 flex flex-col gap-7 relative">
					<div className="flex flex-row items-center gap-10 justify-start self-start ml-5">
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

					<div className="flex flex-col sm:flex-row gap-5 items-center">
						<div className="rounded-lg relative h-40 sm:h-60 w-52 sm:w-72">
							{data?.user?.image ? (
								<Image
									src={data?.user?.image}
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

						<div className="flex-col flex justify-between w-full gap-5 h-full">
							<div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full">
								<div className="w-full">
									<h1 className="text-primary text-5xl font-black text-center sm:text-left capitalize flex flex-col md:flex-row items-center justify-end sm:items-end sm:justify-start md:gap-2 ">
										{data?.user?.name} <span><Indicator mode={"online"} /></span>
									</h1>
								</div>

								<p className="text-grey-100 text-center md:text-left text-sm font-semibold">
									{data?.user?.email}
								</p>
							</div>

							{data?.bio && (
								<p className="text-primary text-sm font-medium text-center sm:text-left">
									{data?.bio}
								</p>
							)}

							<div className="w-full flex justify-center sm:justify-start">
								<Location
									city={data?.user?.info?.city}
									country={data?.user?.info?.country}
								/>
							</div>

							<div className="flex flex-wrap flex-row gap-3 items-center justify-center sm:justify-start relative mb-5 sm:mb-0 w-full">
								{data?.topic_categories.map((cate, index) => (
									<Tag key={index} text={cate} />
								))}
							</div>

							<div className="flex flex-row gap-5 ">
								<button
									type="button"
									onClick={() => {
										navigator.clipboard.writeText(location.href);
										setCopied(true);
										setTimeout(() => {
											setCopied(false);
										}, 5000);
									}}
									className="bg-lightgreen border border-success w-full sm:w-fit flex flex-row items-center justify-center gap-3 rounded-lg py-3 px-5"
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
							</div>
						</div>
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
								<p className="text-sm md:text-base font-semibold capitalize">
									About Me
								</p>
							</button>
							{/* <button
								type="button"
								className={
									tab === 4
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(4)}
							>
								<p className="font-semibold capitalize">Availability</p>
							</button> */}
							<button
								type="button"
								className={
									tab === 2
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(2)}
							>
								<p className="text-sm md:text-base font-semibold capitalize">
									podcast
								</p>
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
								<p className="text-sm md:text-base font-semibold capitalize">
									Links
								</p>
							</button>
							<button
								type="button"
								className={
									tab === 4
										? "bg-success text-primary duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
										: "bg-grey-300 text-grey-100 duration-300 flex flex-row items-center justify-center gap-3 rounded-lg py-3 w-40"
								}
								onClick={() => setTab(4)}
							>
								<p className="text-sm md:text-base font-semibold capitalize">
									Message
								</p>
							</button>
						</div>
						{tab === 1 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
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
							</div>
						)}
						{tab === 2 && (
							<div className="flex flex-col gap-3 pt-5 pl-2 mb-5">
								<div className="flex flex-row gap-5 items-center">
									<h1 className="text-primary text-xl font-bold">
										Podcast Name
									</h1>
									<p className="text-primary text-base font-medium text-left">
										{data?.podcast_name}
									</p>
								</div>
								<div className="flex flex-row gap-5 items-center">
									<h1 className="text-primary text-xl font-bold">Need Guest</h1>
									<p className="text-primary text-base font-medium text-left">
										{data?.need_guest ? "Yes" : "No"}
									</p>
								</div>
								<h1 className="font-bold text-lg text-primary">
									Guest Expectation
								</h1>
								<p className="text-primary text-sm font-medium text-left">
									{data?.guest_bio ? data?.guest_bio : "Not available"}
								</p>
								<p className="text-primary">{data?.guest_bio}</p>
								<div className="flex flex-row gap-5 items-center">
									<h1 className="font-bold text-lg text-primary">
										Expect guest to promo
									</h1>
									<p className="text-primary">
										{data?.promo_expect ? "Yes" : "No"}
									</p>
								</div>
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
							</div>
						)}
						{tab === 4 && (
							<div className="pt-5">
								<form
									onSubmit={(e) => handleSendMail(e)}
									className="relative w-full h-72 flex flex-col justify-between p-3 bg-primary rounded-md"
								>
									<div className="relative w-full ">
										<textarea
											cols="30"
											rows="10"
											value={text}
											onChange={(e) => {
												setText(e.target.value);
											}}
											className="w-full rounded-md bg-white border flex items-end border-grey-100 px-6 pt-4 
										text-sm outline outline-0	transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
										></textarea>
									</div>

									<button
										type="submit"
										className="w-full rounded-md bg-success text-primary p-2"
									>
										{submit === ""
											? submitting
												? "sending..."
												: "send"
											: submit}
									</button>
								</form>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Guest;
