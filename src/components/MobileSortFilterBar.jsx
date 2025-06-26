import React, { useState } from "react";
import MobileSortPopup from "./MobileSortPopup";
import MobileFilterPopup from "./MobileFilterPopup";

const MobileSortFilterBar = ({ maxPrice = 10000 }) => {
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <div className="flex md:hidden bg-white z-40  border-b border-gray-200" style={{ minHeight: 56 }}>
        <button
          className={`flex-1 flex items-center justify-center py-3 font-bold text-lg transition-colors ${showSort ? 'text-blue-600' : 'text-gray-800'} bg-white`}
          onClick={() => setShowSort(true)}
        >
          <span className="align-middle">Sort</span>
        </button>
        <div className="w-px bg-gray-300 my-2" />
        <button
          className={`flex-1 flex items-center justify-center py-3 font-bold text-lg transition-colors ${showFilter ? 'text-blue-600' : 'text-gray-800'} bg-white`}
          onClick={() => setShowFilter(true)}
        >
          <span className="align-middle">Filter</span>
        </button>
      </div>
      <MobileSortPopup open={showSort} onClose={() => setShowSort(false)} />
      <MobileFilterPopup open={showFilter} onClose={() => setShowFilter(false)} maxPrice={maxPrice} />
    </>
  );
};

export default MobileSortFilterBar; 