"use client";
import React from "react";
import { DropDown } from "./icons/dropdown";
import useDropDown from "@/app/hooks/questions/comments/useDropDown";

const Dropdown = ({ children}: { children: React.ReactNode }) => {
const{isOpen,toggleDropdown,dropdownRef,closeDropdown} = useDropDown()

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <DropDown />
      </button>

      {isOpen && (
        <div id="dropdown-comment" className=" comment absolute right-0 mt-0 w-[10rem] bg-white rounded border ">
          <div className="flex flex-col " >
            {children}
            </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
