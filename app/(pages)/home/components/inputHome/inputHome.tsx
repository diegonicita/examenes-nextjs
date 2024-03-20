"use client";
import { randomData, data } from "@/app/utils/randomData/randomData";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
export default function InputHome() {
	const [randomword, setRandomWord] = useState("neumonia");
	const [displayedText, setDisplayedText] = useState("");
	const [currentCharIndex, setCurrentCharIndex] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const route = useRouter();

	useEffect(() => {
		const intervalId = setInterval(() => {
			const dataWords = randomData(data);

			if (dataWords.length > 0) {
				setRandomWord(dataWords[0].title);
				setCurrentCharIndex(0);
				setDisplayedText("");
			}
		}, 6000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		if (randomword && currentCharIndex < randomword.length) {
			const charInterval = setInterval(() => {
				setDisplayedText((prevText) => prevText + randomword[currentCharIndex]);
				setCurrentCharIndex((prevIndex) => prevIndex + 1);
			}, 300); // Adjust typing speed as needed

			return () => clearInterval(charInterval);
		}
	}, [randomword, currentCharIndex]);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue.length > 0) {
			route.push(`/questions?query=${inputValue}`);
			setErrorMessage("");
		} else {
			setErrorMessage("el input esta vacio");
		}
	};

	return (
		<section className=" flex flex-col items-center my-5 ">
			<label className="font-bold  text-xl text-center max-w-[300px] md:max-w-full ">
				¿Sobre que tema quieres practicar?
			</label>
			{/* <div className=" flex w-full max-w-[500px]"> */}
			<form
				onSubmit={handleSubmit}
				className="flex flex-col w-full max-w-[500px] px-10 relative "
			>
				<input
					type="text"
					placeholder={displayedText}
					className="input input-bordered input-accent  mt-4 "
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
				/>
				<label
					htmlFor={errorMessage}
					className="font-semibold text-error text-left ml-2 mt-[2px]"
				>
					{errorMessage}
				</label>
				<button
					className="absolute right-14 top-8 rounded-r text-xs font-medium uppercase leading-tight text-accent active:bg-primary-800 "
					type="submit"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="h-5 w-5 "
					>
						<title>buscar</title>
						<path
							fillRule="evenodd"
							d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</form>
			{/* </div> */}
		</section>
	);
}
