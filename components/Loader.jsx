import Image from "next/image";
import React from "react";

const Loader = ({ template, numOfTemplate }) => {
	const templates = [...Array.apply(null, Array(numOfTemplate)).map(function (x, i) { return i; })]

	return (
		<main className="w-full h-full flex flex-col items-center justify-center gap-5">
			{!template ? (
				<>
					<Image
						src={"/gifs/loading.gif"}
						className="object-contain"
						width={100}
						height={100}
						alt="loader"
					/>
					<p className="text-primary text-lg font-semibold text-center capitalize">
						Loading...
					</p>
				</>
			) : (
				<div className="w-full pt-106 flex flex-col items-start">
					<p className="text-primary text-2xl pl-5 font-bold w-full text-left">
						Featured <span className="text-pinky">Podcasts</span>
					</p>
					<div className="grid min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-5 w-full h-fit p-4">
						{templates.map((i) => (
							<div key={i} className="w-full h-60 hover:shadow p-0.5 rounded-lg bg-slate-100">
								<div className="rounded-xl h-40 w-full overflow-hidden transition-all animate-pulse bg-slate-200" />

								<div className="mt-1 flex flex-col gap-1">
									<p className="rounded-xl w-32 xl:w-52 h-5 transition-all animate-pulse bg-slate-200" />
									<p className="rounded-xl w-20 xl:w-40 h-3 transition-all animate-pulse bg-slate-200" />
									<p className="rounded-xl w-20 xl:w-40 h-3 transition-all animate-pulse bg-slate-200" />
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</main>
	);
};

export default Loader;
