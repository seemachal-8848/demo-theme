import React, { useState, useRef, useEffect } from 'react';
import styles from '../../../styles/components/customDropdown.module.scss';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface CustomDropdownProps {
  sortBy: string;
  handleSortBy: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ sortBy, handleSortBy }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const optionLabels: Record<string, string> = {
    latest: 'Latest Products',
    oldest: 'Oldest Products',
    low_to_high: 'Low To High',
    high_to_low: 'High To Low',
  };

  // Default selected option
  useEffect(() => {
    if (sortBy) {
      setSelectedOption(sortBy);
    }
  }, [sortBy]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle select option
  const handleSelect = (value: string) => {
    setSelectedOption(value);
    handleSortBy(value); // Call parent function to update the sort
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} p-0`} ref={dropdownRef}>
      <div className={`${styles.input} ${styles.sortBySelect}`} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.selectedOption}>{selectedOption ? optionLabels[selectedOption] : 'Sort By'}</div>
        <span className={styles.arrow}>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </div>

      {isOpen && (
        <div className={`${styles.options}`}>
          {['latest', 'oldest', 'low_to_high', 'high_to_low'].map((option, index) => (
            <div
              key={index}
              className={`${styles.option} ${selectedOption === option ? styles.optionActive : ''} ${
                hoveredOption === option ? styles.hovered : ''
              }`}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHoveredOption(option)}
              onMouseLeave={() => setHoveredOption(null)}
            >
              {optionLabels[option]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
