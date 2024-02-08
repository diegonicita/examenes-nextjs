"use client"
import React, { useState, useRef, useEffect } from 'react';
import DeleteComments from './deleteComment/deleteComment';
import { DropDown } from './icons/dropdown';
import EditComment from './editComment/editComment';

interface DropdownProps {
  id:number
  onclick:() => void
}

const Dropdown: React.FC<DropdownProps> = ({id,onclick}) => {
  console.log(id)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const closeDropdown = () => {
    setIsOpen(false);
  }
  const closeDropdownEdit = () => {
    setIsOpen(false);
    onclick()
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
      >
        <DropDown />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-0 w-[10rem] bg-white rounded border ">
          <div  className='flex flex-col '>
          <DeleteComments onclick={closeDropdown} id={id} />
          <EditComment closedropdown={closeDropdownEdit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
