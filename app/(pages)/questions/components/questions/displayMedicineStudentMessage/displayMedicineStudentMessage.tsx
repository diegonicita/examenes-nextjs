"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
	useEffect(() => {
		// Generate random medicine data on the client side
		const randomizedData = randomData(data);
		setRandomMedicine(randomizedData);
	}, []);

	return (
		<section className="mx-auto max-w-[75ch] mt-8">
			<h1>Bienvinido a la seccion de busqueda </h1>
			<p className="break-normal ">
				Mientras exploras las preguntas Si te encuentras con algún término
				médico o necesitas orientación sobre las pruebas, no dudes en ponerte en
				contacto, te dejaremos palabras claves con las que puedes iniciar tu
				busqueda
			</p>
			{randomMedicine.slice(0, 4).map((item) => (
				<div
					key={item.id}
					className="card w-60 bg-neutral text-neutral-content"
				>
					<div className="card-body items-center text-center">
						<Link
							href={{
								pathname: pathname,
								query: {
									query: item.title,
									page: 1,
								},
							}}
							className="card-title"
						>
							{item.title}
						</Link>
					</div>
				</div>
			))}
		</section>
	);
}
