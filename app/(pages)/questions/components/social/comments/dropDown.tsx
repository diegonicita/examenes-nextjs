import React, { useState, useRef, useEffect } from 'react';
import DeleteComments from './deleteComment/deleteComment';
import { DropDown } from './icons/dropdown';

interface DropdownProps {
  id:number
}

const Dropdown: React.FC<DropdownProps> = ({id}) => {
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
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
      >
        <DropDown />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-0 ">
          <div  className=''>
          <DeleteComments onclick={closeDropdown} id={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
