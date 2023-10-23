"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import { AiOutlineLeft } from "react-icons/ai";

import Input from "@components/Input";

const CreatePodcaster = () => {
	const router = useRouter();

	const [bio, setBio] = useState("");
	const [experience, setExperience] = useState("");
	const [social, setSocial] = useState({
		facebook: "",
		instagram: "",
		linkedin: "",
		twitter: "",
		youtube: "",
	});
	const [interview, setInterview] = useState("");
	const [own, setOwn] = useState("");
	const [contact, setContact] = useState(null);

	const { facebook, instagram, linkedin, twitter, youtube } = social;

	const changeTwitter = (e) => {
		setSocial({ ...social, twitter: e.target.value });
	};
	const changeFacebook = (e) => {
		setSocial({ ...social, facebook: e.target.value });
	};
	const changeYoutube = (e) => {
		setSocial({ ...social, youtube: e.target.value });
	};
	const changeInstagram = (e) => {
		setSocial({ ...social, instagram: e.target.value });
	};
	const changeLinkedin = (e) => {
		setSocial({ ...social, linkedin: e.target.value });
	};

	const handleSave = async () => {
		const token = localStorage.getItem("podcastToken");
		const id = localStorage.getItem("podcastId");
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		await axios
			.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/add`,
				{
					profile_type: "Press",
					user: id,
					short_bio: bio,
					experience: experience,
					social_media: social,
					interview_links: interview,
					own_podcast: own,
					contact_me: contact,
					podcast_alert: true,
				},
				config
			)
			.then((res) => {
				if (res.status === 201) {
					router.push("/");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		const getUserDetails = async () => {
			const token = localStorage.getItem("podcastToken");
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			await axios
				.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config)
				.then((res) => {
					localStorage.setItem("podcastId", res.data.user._id);
				})
				.catch((err) => console.log(err));
		};

		getUserDetails();
	}, []);

	return (
		<main className="bg-create-profile bg-center bg-contain">
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

				<div className="flex flex-row items-center gap-10 justify-start self-start lg:ml-5">
					<Link href={"/create-profile"} className="">
						<div>
							<AiOutlineLeft size={22} className="text-primary" />
						</div>
					</Link>
					<p className="text-primary text-base font-normal">Back</p>
				</div>

				<div className="text-primary self-center text-center mb-5 w-full">
					<h1 className="text-primary text-left text-4xl font-black w-full">
						Create Press <span className="text-success">profile</span>
					</h1>
					<p className="text-primary text-left text-sm font-normal -mt-1 w-full">
						Tell guests a little More about you
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-10">
					<div className="w-full sm:w-1/2 flex flex-col gap-5">
						<div>
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Short Bio about yourself
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="relative w-full mt-3">
								<textarea
									cols="30"
									rows="10"
									maxLength={2000}
									onChange={(e) => {
										setBio(e.target.value);
									}}
									value={bio}
									className="w-full rounded-md peer bg-white border flex items-end border-grey-100 px-6 pt-4 
												text-sm outline outline-0	transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
								></textarea>
								<p className="text-sm font-medium text-right text-primary">
									{bio.length}/2000
								</p>
								<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-light absolute left-5 top-1">
									short bio
								</span>
							</div>
						</div>

						<div className="w-full">
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Interview Link
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="mt-3">
								<Input
									onChangeValue={(e) => {
										setInterview(e.target.value);
									}}
									placeholder={"interview link"}
									value={interview}
									type="url"
								/>
							</div>
						</div>

						<div>
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Short Bio about your experience
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="relative w-full mt-3">
								<textarea
									cols="30"
									rows="10"
									maxLength={2000}
									onChange={(e) => {
										setExperience(e.target.value);
									}}
									value={experience}
									className="w-full rounded-md peer bg-white border flex items-end border-grey-100 px-6 pt-4 
												text-sm outline outline-0	transition-all focus:border-2 focus:border-blue-500 focus:outline-0"
								></textarea>
								<p className="text-sm font-medium text-right text-primary">
									{experience.length}/2000
								</p>
								<span className="peer-focus:text-blue-500 text-grey-100 text-xs font-light absolute left-5 top-1">
									experience
								</span>
							</div>
						</div>
					</div>

					<div className="w-full sm:w-1/2 flex flex-col gap-8">
						<div className="w-full flex flex-col items-start">
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Social media
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="flex flex-col w-full gap-2 mt-3">
								<div className="w-full flex flex-row gap-5 items-center justify-between">
									<Image
										src={"/svgs/twitter.svg"}
										width={40}
										height={40}
										alt="Facebook icon"
										className=""
									/>
									<div className="w-11/12">
										<Input
											onChangeValue={changeTwitter}
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
											onChangeValue={changeFacebook}
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
											onChangeValue={changeYoutube}
											value={youtube}
											type="url"
											inputholder={"youtube.com/"}
										/>
									</div>
								</div>
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
											onChangeValue={changeInstagram}
											value={instagram}
											type="url"
											inputholder={"instagram.com/"}
										/>
									</div>
								</div>
								<div className="w-full flex flex-row gap-5 items-center justify-between">
									<Image
										src={"/svgs/linkedin.svg"}
										width={40}
										height={40}
										alt="Facebook icon"
										className=""
									/>
									<div className="w-11/12">
										<Input
											onChangeValue={changeLinkedin}
											value={linkedin}
											type="url"
											inputholder={"linkedin.com/in/"}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="w-full flex flex-col items-start mt-5">
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Do you own a podcast?
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="flex flex-col w-full gap-2 mt-3">
								<div className="flex flex-row items-center gap-3">
									<input
										type="radio"
										value={true}
										onChange={(e) => {
											setOwn(true);
										}}
										checked={own === true}
									/>
									<span className="text-primary text-base font-semibold">
										Yes, I do
									</span>
								</div>
								<div className="flex flex-row items-center gap-3">
									<input
										type="radio"
										value={false}
										onChange={(e) => {
											setOwn(false);
										}}
										checked={own === false}
									/>
									<span className="text-primary text-base font-semibold">
										No, I don't
									</span>
								</div>
							</div>
						</div>

						<div className="w-full flex flex-col items-start mt-5">
							<div className="w-11/12">
								<h2 className="text-primary text-2xl font-bold text-left">
									Can people contact you?
								</h2>
								<hr className="h-0.5 w-full rounded-lg bg-grey-300" />
							</div>

							<div className="flex flex-col w-full gap-2 mt-3">
								<div className="flex flex-row items-center gap-3">
									<input
										type="radio"
										value={true}
										onChange={(e) => {
											setContact(true);
										}}
										checked={contact == true}
									/>
									<span className="text-primary text-base font-semibold">
										Yes
									</span>
								</div>
								<div className="flex flex-row items-center gap-3">
									<input
										type="radio"
										value={false}
										onChange={(e) => {
											setContact(false);
										}}
										checked={contact == false}
									/>
									<span className="text-primary text-base font-semibold">
										No
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full flex justify-end">
					<button
						type="button"
						onClick={() => {
							handleSave();
						}}
						className="self-end mt-10 w-32 h-12 bg-primary rounded-md text-success"
					>
						Save
					</button>
				</div>
			</div>
		</main>
	);
};

export default CreatePodcaster;
