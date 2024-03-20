import React from "react";
import Hero from "@/app/(pages)/home/components/hero/hero";
import Review from "@/app/(pages)/home/components/reviews";
import LeftColumn from "./components/consults/leftColumn";
import ConsultForm from "@/app/components/form/consult/container";
import Prices from "./components/plans/plans";
import Faq from "./components/faq/faq";
import InputHome from "./components/inputHome/inputHome";

const Home = () => {
	return (
		<>
			<Hero />
			<div className="mx-auto max-w-[55rem] mb-8">
				<InputHome />
				<Prices />
				<Faq />
				<div className="flex flex-col items-center mt-14">
					<h2 className="text-3xl font-bold">
						<i className="fa-solid fa-circle-question text-primary"></i>
						Envíanos una consulta
					</h2>
					<span className="px-4 mt-1 text-center text-balance">
						Cualquier problema o sugerencia, nos pondremos en contacto contigo
					</span>
				</div>
				<div className="flex mt-4">
					<LeftColumn />
					<ConsultForm />
				</div>
				{/* <Review /> */}
			</div>
		</>
	);
};

export default Home;

export const metadata = {
	title: "Home Page",
};
