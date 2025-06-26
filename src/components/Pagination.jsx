import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 4);
    let end = Math.min(totalPages, currentPage + 5);
    if (currentPage <= 5) {
      end = Math.min(10, totalPages);
    }
    if (currentPage > totalPages - 5) {
      start = Math.max(1, totalPages - 9);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center py-6">
      <button
        className="px-3 py-1 rounded font-medium border transition-colors mr-1 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        PREVIOUS
      </button>
      {getPages().map((page) => (
        <button
          key={page}
          className={`mx-1 w-9 h-9 flex items-center justify-center rounded-full font-semibold border transition-colors
            ${page === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-600 hover:bg-blue-50"}
          `}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded font-medium border transition-colors ml-1 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 bg-white text-blue-600 border-blue-600 hover:bg-blue-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        NEXT
      </button>
    </div>
  );
};

export default Pagination; 