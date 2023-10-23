import Image from "next/image";
import Link from "next/link";

const Footer = ({ isText }) => {
	return (
		<section className="bg-primary max-w-full p-10 flex flex-col justify-between gap-20">
			<div className="flex flex-col sm:flex-row items-center justify-around gap-10">
				<div className="">
					{isText ? (
						<h1 className="text-center text-secondary text-5xl font-black uppercase">
							THE <br /> PODCAST <br /> GUESTLIST
						</h1>
					) : (
						<Image
							src={"/images/tpg.png"}
							width={213}
							height={90}
							alt="Pow image"
						/>
					)}
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
					<div className="flex flex-col gap-2 justify-start">
						<h1 className="capitalize text-success text-xl font-medium">
							Features
						</h1>
						<ul className="flex flex-col justify-start">
							<li className="capitalize text-white text-base font-medium">
								<Link href={"#"} className="">
									New Podcasts
								</Link>
							</li>
							<li className="capitalize text-white text-base font-medium">
								<Link href={"#"} className="">
									Best Episodes
								</Link>
							</li>
							<li className="capitalize text-white text-base font-medium">
								<Link href={"#"} className="">
									Best Podcasts
								</Link>
							</li>
							<li className="capitalize text-white text-base font-medium">
								<Link href={"#"} className="">
									Invite Guest
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-2 justify-start">
						<h1 className="capitalize text-success text-xl font-medium">
							Account
						</h1>
						<ul className="flex flex-col justify-start">
							<li className="capitalize text-white text-base font-medium">
								<Link href={"#"} className="">
									Account Settings
								</Link>
							</li>
							<li className="capitalize text-white text-base font-medium">
								<Link href={"#"} className="">
									User Profile
								</Link>
							</li>
							<li className="capitalize text-white text-base font-medium">
								<Link href={"#"} className="">
									Manage My Podcasts
								</Link>
							</li>
							<li className="capitalize text-white text-base font-medium">
								<Link href={"#"} className="">
									Manage My Guests
								</Link>
							</li>
						</ul>
					</div>

					<div className="flex flex-col gap-2 justify-start">
						<h1 className="capitalize text-success text-xl font-medium">
							Resources
						</h1>
						<ul className="flex flex-col justify-start">
							<li className="capitalize text-white text-base font-medium">
								<Link href={"#"} className="">
									Help Center
								</Link>
							</li>
							<li className="capitalize text-white text-base font-medium">
								<Link href={"#"} className="">
									Blog
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row justify-between items-center">
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
	);
};

export default Footer;
