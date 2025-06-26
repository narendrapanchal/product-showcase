import React, { useContext, useState } from "react";
import { FilterSortContext } from "../context/FilterSortContext";

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price_low", label: "Price -- Low to High" },
  { value: "price_high", label: "Price -- High to Low" },
  { value: "name", label: "Name" },
];

const MobileSortPopup = ({ open, onClose }) => {
  const { sort, setSort } = useContext(FilterSortContext);
  const [selected, setSelected] = useState(sort);

  if (!open) return null;

  const handleSelect = (value) => {
    setSelected(value);
    setSort(value);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end md:hidden">
      <div className="absolute inset-0 bg-black bg-opacity-40" onClick={onClose}></div>
      <div className="relative w-full bg-white rounded-t-2xl p-4 animate-slideUp">
        <h3 className="font-semibold text-gray-800 mb-4 text-lg tracking-wide">SORT BY</h3>
        <div className="space-y-3 mb-2">
          {sortOptions.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center justify-between py-2 px-2 rounded cursor-pointer transition-colors ${selected === opt.value ? 'bg-blue-50' : ''}`}
            >
              <span className="text-gray-800 font-medium">{opt.label}</span>
              <input
                type="radio"
                name="sort"
                value={opt.value}
                checked={selected === opt.value}
                onChange={() => handleSelect(opt.value)}
                className="form-radio accent-blue-600 w-5 h-5"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSortPopup; 