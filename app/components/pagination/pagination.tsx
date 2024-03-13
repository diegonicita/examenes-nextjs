"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const Pagination = ({ totalQuestions }: { totalQuestions: number }) => {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get("page")) || 1;
	const createPageUrl = (page: string | number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", page.toString());
		return `${pathName}?${params.toString()}`;
	};
	return (
		<div className="join w-full mx-auto items-center justify-center gap-1 mb-4">
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
				>
					Siguiente
				</Link>
			)}
		</div>
	);
};

export default Pagination;
