"use client";
import type { UserType } from "@/app/models/User";
import Link from "next/link";
import {
	usePathname,
	useSearchParams,
	redirect,
	useRouter,
} from "next/navigation";
import ModalPayment from "../modalpayment/modalpayment";
import { useEffect } from "react";

const Pagination = ({
	totalQuestions,
	currentUser,
}: { totalQuestions: number; currentUser: UserType | null }) => {
	const pathName = usePathname();
	const route = useRouter();
	const searchParams = useSearchParams();

	const currentPage = Number(searchParams.get("page")) || 1;
	const createPageUrl = (page: string | number) => {
		const params = new URLSearchParams(searchParams);
		const paramsvalues = Array.from(params.values());
		console.log(paramsvalues[0]);
		params.set("page", page.toString());
		if (currentUser?.role === "user" && currentPage !== 1) {
			useEffect(() => {
				if (pathName) {
					redirect(`${pathName}?page=1`);
				}
			}, []);
		}
		return `${pathName}?${params.toString()}`;
	};

	const handleCurrentUser = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (currentUser?.role === "user") {
			e.preventDefault();
			const modal = document.getElementById(
				"modal_payment",
			) as HTMLDialogElement;
			if (modal) {
				modal.showModal();
			}
		}
	};
	return (
		<div className="join w-full mx-auto items-center justify-center gap-1 mb-4">
			{currentUser && <ModalPayment name={currentUser.username} />}
			{currentPage === 1 ? (
				<button
					type="button"
					disabled={currentPage === 1}
					className="btn btn-disabled "
				>
					Anterior
				</button>
			) : (
				<Link
					href={createPageUrl(currentPage - 1)}
					className="join-item btn btn-outline"
				>
					{" "}
					Anterior
				</Link>
			)}
			{currentPage >= totalQuestions ? (
				<button
					type="button"
					disabled={currentPage >= totalQuestions}
					className="btn btn-disabled"
				>
					Siguiente
				</button>
			) : (
				<Link
					href={createPageUrl(currentPage + 1)}
					className="join-item btn btn-outline"
					onClick={handleCurrentUser}
				>
					Siguiente
				</Link>
			)}
		</div>
	);
};

export default Pagination;
