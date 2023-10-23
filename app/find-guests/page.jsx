"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Dropdown from "@components/Dropdown";

import { category_options, new_options } from "@utils/data";
import { useSelector } from "react-redux";
import axios from "axios";
import Featured from "@components/Featured";
import Loader from "@components/Loader";

const Findpodcast = () => {
	const { searched } = useSelector((state) => state.search);

	const [category, setCategory] = useState("");
	const [location, setLocation] = useState("");
	const [locations, setLocations] = useState("");
	const [value, setValue] = useState("");
	const [profiles, setProfiles] = useState([]);
	const [id, setId] = useState("");
	const [recent, setRecent] = useState([]);
	const [favorite, setFavorite] = useState([]);
	const [search, setSearch] = useState([]);
	const [isLoaded, setIsLoaded] = useState(true);

	useEffect(() => {
		setId(localStorage.getItem("podcastId"));
		const getUserDetails = async () => {
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profiles?category=guest&location=${location}&topic=${category}`, { id }
				)
				.then((res) => {
					const prof = res?.data?.filter((i) => {
						return localStorage.getItem("podcastId") !== i.user._id;
					});
					// console.log("profiles: ", res);
					setProfiles(prof);
				})
				.catch((err) => console.log(err))
		};

		getUserDetails();
	}, [location, category]);

	useEffect(() => {
		setId(localStorage.getItem("podcastId"));
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

		const getUserDetails = async () => {
			await axios
				.get(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, config
				)
				.then((res) => {
					// console.log("user: ", res.data);
					setFavorite(res.data.user.saved_list);
					console.log(res.data.user.saved_list);
					setRecent(res.data.user.recent);
				})
				.catch((err) => console.log(err))
				.finally(() => {
					setIsLoaded(false);
				});
		};

		getUserDetails();
	}, []);

	// useEffect(() => {
	// 	const getLocations = async () => {
	// 		await axios
	// 			.get(
	// 				`${process.env.NEXT_PUBLIC_BASE_URL}/user/location`
	// 			)
	// 			.then((res) => {
	// 				setLocations(res.data.locations)
	// 			})
	// 			.catch((err) => console.log(err))
	// 	};

	// 	getLocations();
	// }, []);

	useEffect(() => {
		const getSearched = async () => {
			const categories = profiles?.filter((i) => {
				for (let index = 0; index < i.topic_categories.length; index++) {
					return searched === i?.topic_categories[index];
				}
			});
			const users = profiles?.filter((i) => {
				return i.user.name.includes(searched);
			});

			const prof = [...users, ...categories];
			setSearch(prof);
			// setProfiles(prof);
		};

		getSearched();
	}, [searched, profiles]);

	const handleAddRecent = async (id) => {
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

		if (!recent?.includes(id)) {
			await axios
				.patch(
					`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/recents`,
					{
						id: id,
						data: [...recent, id],
					},
					config
				)
				.then((res) => {
					return;
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	if (isLoaded) {
		return <Loader template={true} numOfTemplate={20} />
	}

	return (
		<>
			<div className="bg-grey w-full h-full p-5 flex flex-col gap-7">
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

				<div className="h-full">
					<p className="text-primary text-4xl font-black">
						Find <span className="text-success">Guests</span>
					</p>

					<div className="flex flex-row items-center justify-between my-3">
						<div className="flex flex-row items-center gap-3">
							<div className="w-48">
								<Dropdown
									options={category_options}
									value={category}
									onChangeValue={(e) => {
										setCategory(e);
									}}
									placeholder={"Categories"}
								/>
							</div>
							{/* <div className="w-48">
								<Dropdown
									options={locations}
									value={location}
									onChangeValue={(e) => {
										setLocation(e);
									}}
									placeholder={"Location"}
								/>
							</div> */}
							{/* <div className="w-48">
								<Dropdown
									options={new_options}
									value={value}
									onChangeValue={(e) => {
										setValue(e);
									}}
									placeholder={"New"}
								/>
							</div> */}
						</div>
						{/* <div className="w-48">
									<Filter />
								</div> */}
					</div>

					<div className="">
						<p className="text-pinky text-lg font-bold">
							Featured <span className="text-primary">guests</span>
						</p>
					</div>

					{profiles.length > 0 ? (
						<div className="grid min-[380px]:grid-cols-2 sm:grid-cols-3 min-[1120px]:grid-cols-4 2xl:grid-cols-6 gap-5">
							{searched ? (
								search.length !== 0 ? (
									search.map(
										(
											{
												user: { image, name, _id, profile_type },
												topic_categories,
											},
											index
										) => (
											<div key={index} className="h-80 w-full">
												<Featured
													key={index}
													image={image}
													name={name}
													type={profile_type}
													id={_id}
													handleClick={handleAddRecent}
													categories={topic_categories}
													favorite={favorite}
												/>
											</div>
										)
									)
								) : (
									<div className="flex flex-col items-center justify-center w-full h-full gap-4 ">
										<Image
											src={"/images/cloud.png"}
											width={225}
											height={225}
											className=""
											alt="No data image"
										/>
										<p className="text-center text-primary font-semibold text-lg">
											No data found
										</p>
									</div>
								)
							) : (
								profiles.map(
									(
										{
											user: { image, name, _id, profile_type },
											topic_categories,
										},
										index
									) => (
										<div key={index} className="h-80 w-full">
											<Featured
												key={index}
												image={image}
												name={name}
												type={profile_type}
												id={_id}
												handleClick={handleAddRecent}
												categories={topic_categories}
												favorite={favorite}
											/>
										</div>
									)
								)
							)}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center w-full h-full gap-4 ">
							<Image
								src={"/images/cloud.png"}
								width={225}
								height={225}
								className=""
								alt="No data image"
							/>
							<p className="text-center text-primary font-semibold text-lg">
								No data found
							</p>
						</div>
					)}

					{/* <div className="w-40">
						<Dropdown
							options={dropdown_options}
							value={value}
							onChangeValue={setOption}
							placeholder={"Gender"}
						/>
					</div> */}
				</div>
			</div>
		</>
	);
};

export default Findpodcast;
