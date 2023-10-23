import Image from "next/image";
import Link from "next/link";

import Progress from "@components/Progress";

const Completed = () => {
	return (
		<main className="flex min-h-screen flex-row lg:overflow-hidden bg-password bg-right bg-contain">
			{/* Form part */}
			<section className="lg:w-3/5 w-full h-screen bg-white flex flex-col items-center p-10">
				<div className="mb-5 lg:hidden">
					<Image
						src={"/images/tpg.png"}
						width={150}
						height={50}
						className="self-end"
						alt="Pow image"
					/>
				</div>

				<div className="self-start mt-5 p-3 lg:p-10">
					<h1 className="text-primary text-5xl font-black">
						Nice one, all done!
					</h1>
					<p className="text-primary text-sm font-light">
						Your password has been reset.
					</p>
					<div className="flex self-start items-start my-10">
						<Progress numOfPosition={4} />
					</div>
				</div>

				<div className="flex flex-col w-full items-center">
					<div className="flex flex-col gap-5 w-full sm:w-125">
						<Link
							href={"/login"}
							className="w-full h-14 text-center flex items-center justify-center bg-success text-primary text-lg font-extrabold rounded-lg mt-5"
						>
							Login
						</Link>
					</div>
				</div>

				<div className="flex flex-row items-center gap-3 text-primary fixed bottom-3">
					<Link href={"#"} className="">
						<p className="">Terms and Conditions</p>
					</Link>
					<p className="text-2xl font-semibold text-success">|</p>
					<Link href={"#"} className="">
						<p className="">Privacy Policy</p>
					</Link>
				</div>
			</section>

			{/* Image part */}
			<section className="lg:w-2/5 h-screen hidden lg:flex flex-col items-center justify-around py-6 px-20">
				<Image
					src={"/images/tpg.png"}
					width={150}
					height={70}
					alt="Pow image"
					className=""
				/>
				<Image
					src="/images/resetiv.png"
					width={370}
					height={365}
					alt="Man speaking to microphone"
					className="rounded-lg mt-5"
				/>

				<div className="mt-5">
					<p className="text-white font-light text-left text-xl">
						The exclusive{" "}
						<span className="text-pinky font-bold">
							podcast guest matching service
						</span>{" "}
						you've been waiting for.
					</p>
					<p className="text-white font-light text-left">
						Never look for great guests again.
					</p>
				</div>
			</section>
		</main>
	);
};

export default Completed;
