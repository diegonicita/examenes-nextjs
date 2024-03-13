export default function IconArrowUpCircle(
	props: React.SVGProps<SVGSVGElement>,
) {
	return (
		<svg
			fill="currentColor"
			viewBox="0 0 16 16"
			height="1em"
			width="1em"
			className="invisible md:invisible md:group-hover/item:visible "
			{...props}
		>
			<title>presiona para enviar</title>
			<path
				fillRule="evenodd"
				d="M1 8a7 7 0 1014 0A7 7 0 001 8zm15 0A8 8 0 110 8a8 8 0 0116 0zm-7.5 3.5a.5.5 0 01-1 0V5.707L5.354 7.854a.5.5 0 11-.708-.708l3-3a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8.5 5.707V11.5z"
			/>
		</svg>
	);
}
