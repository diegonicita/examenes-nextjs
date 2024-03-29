// icon:flag | Fontawesome https://fontawesome.com/ | Fontawesome
import * as React from "react";

function IconFlag(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			viewBox="0 0 512 512"
			fill="currentColor"
			height="1em"
			width="1em"
			{...props}
		>
			<title>reportFlag</title>
			<path d="M64 32v448c0 17.7-14.3 32-32 32S0 497.7 0 480V32C0 14.3 14.3 0 32 0s32 14.3 32 32zm40.8 302.8c-3 .9-6 1.7-8.8 2.6V13.5C121.5 6.4 153 0 184 0c36.5 0 68.3 9.1 95.6 16.9l1.3.4C309.4 25.4 333.3 32 360 32c26.8 0 52.9-6.8 73-14.1 9.9-3.6 17.9-7.2 23.4-9.8 2.7-1.3 4.8-2.4 6.2-3.1.7-.4 1.1-.6 1.4-.8l.2-.1c9.9-5.6 22.1-5.6 31.9.2S512 20.6 512 32v256c0 12.1-6.8 23.2-17.7 28.6L480 288l14.3 28.6h-.1l-.2.1-.7.4c-.6.3-1.5.7-2.5 1.2-2.2 1-5.2 2.4-9 4-7.7 3.3-18.5 7.6-31.5 11.9-25.8 8.7-61.5 17.8-98.3 17.8-37 0-65.2-9.4-89-17.3l-1-.3c-24-8-43.7-14.4-70-14.4-27.5 0-60.1 7-87.2 14.8z" />
		</svg>
	);
}

export default IconFlag;
