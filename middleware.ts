import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
	let authCookieServer = request.cookies.get("auth");
	let authPayload = null;
	const secret = process.env.JWT_SECRET;

	if (authCookieServer) {
		try {
			const { payload } = await jwtVerify(
				authCookieServer?.value,
				new TextEncoder().encode(secret),
			);
			authPayload = payload;
			const currentTime = Date.now();
			const currentTimeInSeconds = Math.floor(currentTime / 1000);
			// console.log(currentTimeInSeconds)
			// console.log(authPayload.exp)

			if (authPayload.exp && currentTimeInSeconds >= authPayload?.exp) {
				console.log("El token ha caducado.");
				authPayload = null;
				authCookieServer = undefined;
				const response = NextResponse.next();
				response.cookies.delete("auth");
				return response;
			} else {
				// console.log('El token está vigente.')
			}
		} catch (error) {
			authCookieServer = undefined;
			authPayload = null;
			console.log("Error al verificar el token:", error);
			const response = NextResponse.next();
			response.cookies.delete("auth");
			return response;
		}
	}
}
