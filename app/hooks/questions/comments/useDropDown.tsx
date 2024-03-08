"use client";
import { useEffect, useRef, useState, useContext, createContext } from "react";
const dropdowninitialstate = {
	dropdownRef: null,
	isOpen: false,
	closeDropdown: () => {},
	toggleDropdown: () => {},
};
interface dropdown {
	dropdownRef: React.RefObject<HTMLDivElement> | null;
	isOpen: boolean;
	closeDropdown: () => void;
	toggleDropdown: () => void;
}
const DropDownContext = createContext<dropdown>(dropdowninitialstate);

function useDropDownContext() {
	const context = useContext(DropDownContext);
	if (!context) {
		throw new Error(
			"useDropDownContext must be used within a DropDownContext.Provider",
		);
	}
	return context;
}

function UseDropDown({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const toggleDropdown = () => {
		setIsOpen((prevOpen) => !prevOpen);
	};
	const closeDropdown = () => {
		setIsOpen(false);
	};

	return (
		<DropDownContext.Provider
			value={{
				dropdownRef,
				isOpen,
				closeDropdown,
				toggleDropdown,
			}}
		>
			{children}
		</DropDownContext.Provider>
	);
}
export { DropDownContext, UseDropDown, useDropDownContext };
