"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import IconArrowUpCircle from "./icons/iconArrow";
interface MedicineData {
	id: number;
	title: string;
}

export default function DisplayMedicineStudentMessage() {
	const pathname = usePathname();
	const [randomMedicine, setRandomMedicine] = useState<MedicineData[]>([]);

	const randomData = (array: MedicineData[]) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	const data = [
		{ id: 1, title: "neumonia" },
		{ id: 2, title: "fiebre" },
		{ id: 3, title: "gripa" },
		{ id: 4, title: "dolor de cabeza" },
		{ id: 5, title: "fatiga" },
		{ id: 6, title: "dolor muscular" },
		{ id: 7, title: "falta de respiracion" },
		{ id: 8, title: "perdida del olfalto o paladar" },
	];
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Generate random medicine data on the client side
		const randomizedData = randomData(data);
		setRandomMedicine(randomizedData);
	}, []);

	return (
		<section className="max-w-[75ch] mt-8 mx-auto">
			<h1 className="text-center font-bold">
				Bienvenido a la seccion de busqueda{" "}
			</h1>
			<p className="break-normal font-semibold p-3 ">
				Mientras exploras las preguntas Si te encuentras con algún término
				médico o necesitas orientación sobre las pruebas, no dudes en ponerte en
				contacto, te dejaremos palabras claves con las que puedes iniciar tu
				busqueda
			</p>
			<div className="grid grid-cols-1  md:grid-cols-2  max-w-full gap-y-3 gap-x-3 mt-2 justify-items-center">
				{randomMedicine.slice(0, 4).map((item, index) => (
					<div
						key={item.id}
						className={`${
							index < 2 ? "hidden md:block" : "block"
						} " rounded-lg w-[318px] group/item "`}
					>
						<Link
							href={{
								pathname: pathname,
								query: {
									query: item.title,
									page: 1,
								},
							}}
							className="flex flex-row items-center font-semibold active:bg-stone-500 hover:bg-stone-300  text-gray-800 justify-between p-3  bg-stone-200 w-full"
						>
							{item.title}
							<IconArrowUpCircle />
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}
