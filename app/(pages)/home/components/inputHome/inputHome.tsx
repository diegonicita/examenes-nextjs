"use client";
import { randomData, data } from "@/app/utils/randomData/randomData";
import { useEffect, useState } from "react";
export default function InputHome() {
	const [randomword, setRandomWord] = useState("neumonia");
	const [displayedText, setDisplayedText] = useState("");
	const [currentCharIndex, setCurrentCharIndex] = useState(0);

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
				setDisplayedText((prevText) => {
					if (prevText.endsWith(" ")) {
						return prevText + randomword[currentCharIndex];
					}
					return `${prevText} ${randomword[currentCharIndex]}`;
				});
				setCurrentCharIndex((prevIndex) => prevIndex + 1);
			}, 300); // Adjust typing speed as needed

			return () => clearInterval(charInterval);
		}
	}, [randomword, currentCharIndex]);
	return (
		<section>
			<input
				type="text"
				placeholder={displayedText}
				className="input input-bordered input-accent"
			/>
		</section>
	);
}
