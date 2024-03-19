export interface MedicineData {
	id: number;
	title: string;
}
export const randomData = (array: MedicineData[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export const data = [
	{ id: 1, title: "Neumonia" },
	{ id: 2, title: "Fiebre" },
	{ id: 3, title: "Gripe" },
	{ id: 4, title: "Cefalea" },
	{ id: 5, title: "Fatiga" },
	{ id: 6, title: "Mialgias" },
	{ id: 7, title: "Disnea" },
	{ id: 8, title: "vdrl" },
];
