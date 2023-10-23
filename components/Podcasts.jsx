import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { AiFillHeart } from "react-icons/ai";

const Podcasts = ({ image, name, email, type, id }) => {
	const router = useRouter();

	const handleUnfavorite = async () => {
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
			.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-type/unfavorites`,
				{ data: id },
				config
			)
			.then(() => {
				router.refresh();
				router.push("/favorites");
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="m-2	relative">
			<Link href={"/favorites"} className="">
				<div className="m-2">
					<div className="group rounded-2xl flex items-center justify-center overflow-hidden">
						<div className="rounded-xl h-40 w-full overflow-hidden">
							{image || image === undefined ? (
								<Image
									id="vidimage"
									src={image}
									width={280}
									height={200}
									alt="Podcaster Image"
									className="group-hover:scale-110 transition-transform ease-in duration-1000"
								/>
							) : (
								<div className="rounded-xl bg-green-500 text-primary uppercase h-full w-full text-9xl font-bold flex items-center justify-center">
									{name.charAt(0)}
								</div>
							)}
						</div>

						{/* <button
						id="playimage"
						type="button"
						onClick={() => {}}
						className="group-hover:visible group-hover:block invisible absolute top-24"
					>
						<Image
							src={"/svgs/play.svg"}
							width={60}
							height={60}
							alt="Play button"
							className=""
						/>
					</button> */}
					</div>

					<div className="flex flex-col">
						<h1 className="text-primary font-bold text-ellipsis whitespace-nowrap overflow-hidden text-left text-lg">
							<abbr title={name} className="no-underline">
								{name}
							</abbr>
						</h1>
						<p className="text-primary font-normal text-left text-sm">{type}</p>
					</div>
				</div>
			</Link>

			{/* <button
				type="button"
				onClick={handleUnfavorite}
				className="absolute top-3 left-3"
			>
				<AiFillHeart size={25} color="red" className="" />
			</button> */}
		</div>
	);
};

export default Podcasts;
